"""
Embeddings abstraction for the memory system.

Provides an interface for generating embeddings with different backends.

IMPORTANT: All embeddings must produce 384-dimensional vectors to match
the database schema (pgvector column defined as vector(384)).

Configuration via environment variables - see hindsight_api.config for all env var names.
"""

import logging
import os
from abc import ABC, abstractmethod

import httpx

from ..config import (
    DEFAULT_EMBEDDINGS_LOCAL_MODEL,
    DEFAULT_EMBEDDINGS_PROVIDER,
    EMBEDDING_DIMENSION,
    ENV_EMBEDDINGS_API_KEY,
    ENV_EMBEDDINGS_AZURE_API_VERSION,
    ENV_EMBEDDINGS_AZURE_DEPLOYMENT,
    ENV_EMBEDDINGS_BASE_URL,
    ENV_EMBEDDINGS_DIMENSIONS,
    ENV_EMBEDDINGS_MODEL,
    ENV_EMBEDDINGS_LOCAL_MODEL,
    ENV_EMBEDDINGS_PROVIDER,
    ENV_EMBEDDINGS_TEI_URL,
)

logger = logging.getLogger(__name__)


class Embeddings(ABC):
    """
    Abstract base class for embedding generation.

    All implementations MUST generate 384-dimensional embeddings to match
    the database schema.
    """

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return a human-readable name for this provider (e.g., 'local', 'tei')."""
        pass

    @abstractmethod
    async def initialize(self) -> None:
        """
        Initialize the embedding model asynchronously.

        This should be called during startup to load/connect to the model
        and avoid cold start latency on first encode() call.
        """
        pass

    @abstractmethod
    def encode(self, texts: list[str]) -> list[list[float]]:
        """
        Generate 384-dimensional embeddings for a list of texts.

        Args:
            texts: List of text strings to encode

        Returns:
            List of 384-dimensional embedding vectors (each is a list of floats)
        """
        pass


class LocalSTEmbeddings(Embeddings):
    """
    Local embeddings implementation using SentenceTransformers.

    Call initialize() during startup to load the model and avoid cold starts.

    Default model is BAAI/bge-small-en-v1.5 which produces 384-dimensional
    embeddings matching the database schema.
    """

    def __init__(self, model_name: str | None = None):
        """
        Initialize local SentenceTransformers embeddings.

        Args:
            model_name: Name of the SentenceTransformer model to use.
                       Must produce 384-dimensional embeddings.
                       Default: BAAI/bge-small-en-v1.5
        """
        self.model_name = model_name or DEFAULT_EMBEDDINGS_LOCAL_MODEL
        self._model = None

    @property
    def provider_name(self) -> str:
        return "local"

    async def initialize(self) -> None:
        """Load the embedding model."""
        if self._model is not None:
            return

        try:
            from sentence_transformers import SentenceTransformer
        except ImportError:
            raise ImportError(
                "sentence-transformers is required for LocalSTEmbeddings. "
                "Install it with: pip install sentence-transformers"
            )

        logger.info(f"Embeddings: initializing local provider with model {self.model_name}")
        # Disable lazy loading (meta tensors) which causes issues with newer transformers/accelerate
        # Setting low_cpu_mem_usage=False and device_map=None ensures tensors are fully materialized
        self._model = SentenceTransformer(
            self.model_name,
            model_kwargs={"low_cpu_mem_usage": False, "device_map": None},
        )

        # Validate dimension matches database schema
        model_dim = self._model.get_sentence_embedding_dimension()
        if model_dim != EMBEDDING_DIMENSION:
            raise ValueError(
                f"Model {self.model_name} produces {model_dim}-dimensional embeddings, "
                f"but database schema requires {EMBEDDING_DIMENSION} dimensions. "
                f"Use a model that produces {EMBEDDING_DIMENSION}-dimensional embeddings."
            )

        logger.info(f"Embeddings: local provider initialized (dim: {model_dim})")

    def encode(self, texts: list[str]) -> list[list[float]]:
        """
        Generate 384-dimensional embeddings for a list of texts.

        Args:
            texts: List of text strings to encode

        Returns:
            List of 384-dimensional embedding vectors
        """
        if self._model is None:
            raise RuntimeError("Embeddings not initialized. Call initialize() first.")
        embeddings = self._model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
        return [emb.tolist() for emb in embeddings]


class RemoteTEIEmbeddings(Embeddings):
    """
    Remote embeddings implementation using HuggingFace Text Embeddings Inference (TEI) HTTP API.

    TEI provides a high-performance inference server for embedding models.
    See: https://github.com/huggingface/text-embeddings-inference

    The server should be running a model that produces 384-dimensional embeddings.
    """

    def __init__(
        self,
        base_url: str,
        timeout: float = 30.0,
        batch_size: int = 32,
        max_retries: int = 3,
        retry_delay: float = 0.5,
    ):
        """
        Initialize remote TEI embeddings client.

        Args:
            base_url: Base URL of the TEI server (e.g., "http://localhost:8080")
            timeout: Request timeout in seconds (default: 30.0)
            batch_size: Maximum batch size for embedding requests (default: 32)
            max_retries: Maximum number of retries for failed requests (default: 3)
            retry_delay: Initial delay between retries in seconds, doubles each retry (default: 0.5)
        """
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.batch_size = batch_size
        self.max_retries = max_retries
        self.retry_delay = retry_delay
        self._client: httpx.Client | None = None
        self._model_id: str | None = None

    @property
    def provider_name(self) -> str:
        return "tei"

    def _request_with_retry(self, method: str, url: str, **kwargs) -> httpx.Response:
        """Make an HTTP request with automatic retries on transient errors."""
        import time

        last_error = None
        delay = self.retry_delay

        for attempt in range(self.max_retries + 1):
            try:
                if method == "GET":
                    response = self._client.get(url, **kwargs)
                else:
                    response = self._client.post(url, **kwargs)
                response.raise_for_status()
                return response
            except (httpx.ConnectError, httpx.ReadTimeout, httpx.WriteTimeout) as e:
                last_error = e
                if attempt < self.max_retries:
                    logger.warning(
                        f"TEI request failed (attempt {attempt + 1}/{self.max_retries + 1}): {e}. Retrying in {delay}s..."
                    )
                    time.sleep(delay)
                    delay *= 2  # Exponential backoff
            except httpx.HTTPStatusError as e:
                # Retry on 5xx server errors
                if e.response.status_code >= 500 and attempt < self.max_retries:
                    last_error = e
                    logger.warning(
                        f"TEI server error (attempt {attempt + 1}/{self.max_retries + 1}): {e}. Retrying in {delay}s..."
                    )
                    time.sleep(delay)
                    delay *= 2
                else:
                    raise

        raise last_error

    async def initialize(self) -> None:
        """Initialize the HTTP client and verify server connectivity."""
        if self._client is not None:
            return

        logger.info(f"Embeddings: initializing TEI provider at {self.base_url}")
        self._client = httpx.Client(timeout=self.timeout)

        # Verify server is reachable and get model info
        try:
            response = self._request_with_retry("GET", f"{self.base_url}/info")
            info = response.json()
            self._model_id = info.get("model_id", "unknown")
            logger.info(f"Embeddings: TEI provider initialized (model: {self._model_id})")
        except httpx.HTTPError as e:
            raise RuntimeError(f"Failed to connect to TEI server at {self.base_url}: {e}")

    def encode(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings using the remote TEI server.

        Args:
            texts: List of text strings to encode

        Returns:
            List of embedding vectors
        """
        if self._client is None:
            raise RuntimeError("Embeddings not initialized. Call initialize() first.")

        if not texts:
            return []

        all_embeddings = []

        # Process in batches
        for i in range(0, len(texts), self.batch_size):
            batch = texts[i : i + self.batch_size]

            try:
                response = self._request_with_retry(
                    "POST",
                    f"{self.base_url}/embed",
                    json={"inputs": batch},
                )
                batch_embeddings = response.json()
                all_embeddings.extend(batch_embeddings)
            except httpx.HTTPError as e:
                raise RuntimeError(f"TEI embedding request failed: {e}")

        return all_embeddings


class OpenAIEmbeddings(Embeddings):
    """OpenAI-compatible embeddings backend.

        Supports:
        - OpenAI: base_url like https://api.openai.com/v1, Authorization: Bearer
        - Azure OpenAI (deployments route): base_url like https://<resource>.openai.azure.com, header: api-key,
            and uses /openai/deployments/<deployment>/embeddings?api-version=...
        - Azure AI Foundry / Azure OpenAI (OpenAI v1 route): base_url like
            https://<resource>.services.ai.azure.com/openai/v1 (or https://<resource>.openai.azure.com/openai/v1),
            header: api-key, and uses /embeddings with model=<deployment-name>

    IMPORTANT: This backend enforces EMBEDDING_DIMENSION to match the pgvector schema.
    If you want to use 3072 dims (text-embedding-3-large max), you must migrate the DB schema
    and re-embed existing rows.
    """

    def __init__(self, *, timeout: float = 30.0, batch_size: int = 128):
        self.timeout = timeout
        self.batch_size = batch_size

        self.api_key = os.environ.get(ENV_EMBEDDINGS_API_KEY)
        self.base_url = (os.environ.get(ENV_EMBEDDINGS_BASE_URL) or "").rstrip("/")
        self.model = os.environ.get(ENV_EMBEDDINGS_MODEL, "text-embedding-3-large")
        self.dimensions = int(os.environ.get(ENV_EMBEDDINGS_DIMENSIONS, str(EMBEDDING_DIMENSION)))

        # Azure OpenAI settings
        self.azure_deployment = os.environ.get(ENV_EMBEDDINGS_AZURE_DEPLOYMENT)
        self.azure_api_version = os.environ.get(ENV_EMBEDDINGS_AZURE_API_VERSION)

        self._client: httpx.Client | None = None

    @property
    def provider_name(self) -> str:
        return "openai"

    async def initialize(self) -> None:
        if self._client is not None:
            return

        if not self.api_key:
            raise ValueError(f"{ENV_EMBEDDINGS_API_KEY} is required when {ENV_EMBEDDINGS_PROVIDER} is 'openai'")

        if not self.base_url:
            # Default to OpenAI public API.
            self.base_url = "https://api.openai.com/v1"

        lower_base = self.base_url.lower()
        is_openai_v1_azure = (
            ("services.ai.azure.com" in lower_base or "openai.azure.com" in lower_base) and "/openai/v1" in lower_base
        )

        # Be forgiving: if a Foundry resource endpoint was provided without /openai/v1, add it.
        if "services.ai.azure.com" in lower_base and "/openai/v1" not in lower_base:
            self.base_url = self.base_url.rstrip("/") + "/openai/v1"
            lower_base = self.base_url.lower()
            is_openai_v1_azure = True

        if self.dimensions != EMBEDDING_DIMENSION:
            raise ValueError(
                f"Embeddings dimensions mismatch: configured {self.dimensions}, but schema requires {EMBEDDING_DIMENSION}. "
                f"Either set {ENV_EMBEDDINGS_DIMENSIONS}={EMBEDDING_DIMENSION} or migrate the database/schema and re-embed."
            )

        if is_openai_v1_azure and self.azure_deployment:
            raise ValueError(
                f"Do not set {ENV_EMBEDDINGS_AZURE_DEPLOYMENT} when using an OpenAI v1 base URL ({ENV_EMBEDDINGS_BASE_URL} contains /openai/v1). "
                "Set the embeddings deployment name via HINDSIGHT_API_EMBEDDINGS_MODEL instead."
            )

        if self.azure_deployment:
            if not self.azure_api_version:
                raise ValueError(
                    f"{ENV_EMBEDDINGS_AZURE_API_VERSION} is required when {ENV_EMBEDDINGS_AZURE_DEPLOYMENT} is set"
                )
            if self.base_url.endswith("/v1"):
                raise ValueError(
                    f"{ENV_EMBEDDINGS_BASE_URL} for Azure should be the resource endpoint (no /v1). Got: {self.base_url}"
                )

        self._client = httpx.Client(timeout=self.timeout)

        logger.info(
            "Embeddings: OpenAI-compatible provider initialized "
            f"(azure={bool(self.azure_deployment)}, model={self.model}, dimensions={self.dimensions})"
        )

    def _build_request(self, inputs: list[str]) -> tuple[str, dict[str, str], dict[str, object], dict[str, str] | None]:
        lower_base = self.base_url.lower()
        is_openai_v1_azure = (
            ("services.ai.azure.com" in lower_base or "openai.azure.com" in lower_base) and "/openai/v1" in lower_base
        )

        if is_openai_v1_azure:
            url = f"{self.base_url}/embeddings"
            headers = {"api-key": self.api_key, "Content-Type": "application/json"}  # type: ignore[arg-type]
            payload: dict[str, object] = {"model": self.model, "input": inputs}
            if self.dimensions:
                payload["dimensions"] = self.dimensions
            return url, headers, payload, None

        if self.azure_deployment:
            url = f"{self.base_url}/openai/deployments/{self.azure_deployment}/embeddings"
            headers = {"api-key": self.api_key, "Content-Type": "application/json"}  # type: ignore[arg-type]
            params = {"api-version": self.azure_api_version}  # type: ignore[dict-item]
            # Azure selects model via deployment name; some API versions accept dimensions.
            payload: dict[str, object] = {"input": inputs}
            if self.dimensions:
                payload["dimensions"] = self.dimensions
            return url, headers, payload, params

        url = f"{self.base_url}/embeddings"
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}  # type: ignore[arg-type]
        payload = {"model": self.model, "input": inputs, "dimensions": self.dimensions}
        return url, headers, payload, None

    def encode(self, texts: list[str]) -> list[list[float]]:
        if self._client is None:
            raise RuntimeError("Embeddings not initialized. Call initialize() first.")

        if not texts:
            return []

        all_embeddings: list[list[float]] = []

        for i in range(0, len(texts), self.batch_size):
            batch = texts[i : i + self.batch_size]
            url, headers, payload, params = self._build_request(batch)

            resp = self._client.post(url, headers=headers, params=params, json=payload)
            resp.raise_for_status()
            body = resp.json()

            items = body.get("data")
            if not isinstance(items, list):
                raise RuntimeError("Unexpected embeddings response: missing 'data' list")

            # OpenAI returns in index order; be defensive and sort by index.
            indexed: list[tuple[int, list[float]]] = []
            for item in items:
                if not isinstance(item, dict):
                    raise RuntimeError("Unexpected embeddings response item")
                idx = item.get("index")
                emb = item.get("embedding")
                if not isinstance(idx, int) or not isinstance(emb, list):
                    raise RuntimeError("Unexpected embeddings response item shape")
                if len(emb) != EMBEDDING_DIMENSION:
                    raise RuntimeError(
                        f"Embedding dimension mismatch from provider: got {len(emb)}, expected {EMBEDDING_DIMENSION}."
                    )
                indexed.append((idx, emb))

            indexed.sort(key=lambda t: t[0])
            all_embeddings.extend([emb for _, emb in indexed])

        return all_embeddings


def create_embeddings_from_env() -> Embeddings:
    """
    Create an Embeddings instance based on environment variables.

    See hindsight_api.config for environment variable names and defaults.

    Returns:
        Configured Embeddings instance
    """
    provider = os.environ.get(ENV_EMBEDDINGS_PROVIDER, DEFAULT_EMBEDDINGS_PROVIDER).lower()

    if provider == "openai":
        return OpenAIEmbeddings()
    elif provider == "tei":
        url = os.environ.get(ENV_EMBEDDINGS_TEI_URL)
        if not url:
            raise ValueError(f"{ENV_EMBEDDINGS_TEI_URL} is required when {ENV_EMBEDDINGS_PROVIDER} is 'tei'")
        return RemoteTEIEmbeddings(base_url=url)
    elif provider == "local":
        model = os.environ.get(ENV_EMBEDDINGS_LOCAL_MODEL)
        model_name = model or DEFAULT_EMBEDDINGS_LOCAL_MODEL
        return LocalSTEmbeddings(model_name=model_name)
    else:
        raise ValueError(f"Unknown embeddings provider: {provider}. Supported: 'local', 'tei', 'openai'")
