import os

import pytest

from hindsight_api.engine.embeddings import OpenAIEmbeddings, create_embeddings_from_env


def test_create_embeddings_from_env_openai_provider(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_PROVIDER", "openai")
    emb = create_embeddings_from_env()
    assert isinstance(emb, OpenAIEmbeddings)


@pytest.mark.asyncio
async def test_openai_embeddings_requires_api_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_PROVIDER", "openai")
    monkeypatch.delenv("HINDSIGHT_API_EMBEDDINGS_API_KEY", raising=False)

    emb = create_embeddings_from_env()
    with pytest.raises(ValueError, match="HINDSIGHT_API_EMBEDDINGS_API_KEY"):
        await emb.initialize()


@pytest.mark.asyncio
async def test_openai_embeddings_dimension_mismatch_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_PROVIDER", "openai")
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_API_KEY", "dummy")
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_DIMENSIONS", "3072")

    emb = create_embeddings_from_env()
    with pytest.raises(ValueError, match="dimensions mismatch"):
        await emb.initialize()


@pytest.mark.asyncio
async def test_openai_embeddings_azure_requires_api_version(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_PROVIDER", "openai")
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_API_KEY", "dummy")
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_BASE_URL", "https://example.openai.azure.com")
    monkeypatch.setenv("HINDSIGHT_API_EMBEDDINGS_AZURE_DEPLOYMENT", "my-embeddings")
    monkeypatch.delenv("HINDSIGHT_API_EMBEDDINGS_AZURE_API_VERSION", raising=False)

    emb = create_embeddings_from_env()
    with pytest.raises(ValueError, match="AZURE_API_VERSION"):
        await emb.initialize()
