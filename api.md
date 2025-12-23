# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">check</a>() -> unknown</code>

# Mcp

Types:

- <code><a href="./src/resources/mcp.ts">McpCreateResponse</a></code>

Methods:

- <code title="post /mcp/{bank_id}/">client.mcp.<a href="./src/resources/mcp.ts">create</a>(bankID, { ...params }) -> McpCreateResponse</code>

# Metrics

Types:

- <code><a href="./src/resources/metrics.ts">MetricRetrieveResponse</a></code>

Methods:

- <code title="get /metrics">client.metrics.<a href="./src/resources/metrics.ts">retrieve</a>() -> unknown</code>

# Default

Types:

- <code><a href="./src/resources/default/default.ts">DefaultGetChunkResponse</a></code>

Methods:

- <code title="get /v1/default/chunks/{chunk_id}">client.default.<a href="./src/resources/default/default.ts">getChunk</a>(chunkID) -> DefaultGetChunkResponse</code>

## Banks

Types:

- <code><a href="./src/resources/default/banks/banks.ts">DeleteResponse</a></code>
- <code><a href="./src/resources/default/banks/banks.ts">BankListResponse</a></code>
- <code><a href="./src/resources/default/banks/banks.ts">BankAddBackgroundResponse</a></code>
- <code><a href="./src/resources/default/banks/banks.ts">BankReflectResponse</a></code>

Methods:

- <code title="get /v1/default/banks">client.default.banks.<a href="./src/resources/default/banks/banks.ts">list</a>() -> BankListResponse</code>
- <code title="delete /v1/default/banks/{bank_id}">client.default.banks.<a href="./src/resources/default/banks/banks.ts">delete</a>(bankID) -> DeleteResponse</code>
- <code title="post /v1/default/banks/{bank_id}/background">client.default.banks.<a href="./src/resources/default/banks/banks.ts">addBackground</a>(bankID, { ...params }) -> BankAddBackgroundResponse</code>
- <code title="post /v1/default/banks/{bank_id}/reflect">client.default.banks.<a href="./src/resources/default/banks/banks.ts">reflect</a>(bankID, { ...params }) -> BankReflectResponse</code>
- <code title="put /v1/default/banks/{bank_id}">client.default.banks.<a href="./src/resources/default/banks/banks.ts">updateOrCreate</a>(bankID, { ...params }) -> BankProfile</code>

### Graph

Types:

- <code><a href="./src/resources/default/banks/graph.ts">GraphRetrieveResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/graph">client.default.banks.graph.<a href="./src/resources/default/banks/graph.ts">retrieve</a>(bankID, { ...params }) -> GraphRetrieveResponse</code>

### Memories

Types:

- <code><a href="./src/resources/default/banks/memories.ts">Budget</a></code>
- <code><a href="./src/resources/default/banks/memories.ts">MemoryListResponse</a></code>
- <code><a href="./src/resources/default/banks/memories.ts">MemoryRecallResponse</a></code>
- <code><a href="./src/resources/default/banks/memories.ts">MemoryRetainResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/memories/list">client.default.banks.memories.<a href="./src/resources/default/banks/memories.ts">list</a>(bankID, { ...params }) -> MemoryListResponse</code>
- <code title="delete /v1/default/banks/{bank_id}/memories">client.default.banks.memories.<a href="./src/resources/default/banks/memories.ts">clear</a>(bankID, { ...params }) -> DeleteResponse</code>
- <code title="post /v1/default/banks/{bank_id}/memories/recall">client.default.banks.memories.<a href="./src/resources/default/banks/memories.ts">recall</a>(bankID, { ...params }) -> MemoryRecallResponse</code>
- <code title="post /v1/default/banks/{bank_id}/memories">client.default.banks.memories.<a href="./src/resources/default/banks/memories.ts">retain</a>(bankID, { ...params }) -> MemoryRetainResponse</code>

### Stats

Types:

- <code><a href="./src/resources/default/banks/stats.ts">StatRetrieveResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/stats">client.default.banks.stats.<a href="./src/resources/default/banks/stats.ts">retrieve</a>(bankID) -> unknown</code>

### Entities

Types:

- <code><a href="./src/resources/default/banks/entities.ts">EntityDetail</a></code>
- <code><a href="./src/resources/default/banks/entities.ts">EntityListResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/entities/{entity_id}">client.default.banks.entities.<a href="./src/resources/default/banks/entities.ts">retrieve</a>(entityID, { ...params }) -> EntityDetail</code>
- <code title="get /v1/default/banks/{bank_id}/entities">client.default.banks.entities.<a href="./src/resources/default/banks/entities.ts">list</a>(bankID, { ...params }) -> EntityListResponse</code>
- <code title="post /v1/default/banks/{bank_id}/entities/{entity_id}/regenerate">client.default.banks.entities.<a href="./src/resources/default/banks/entities.ts">regenerate</a>(entityID, { ...params }) -> EntityDetail</code>

### Documents

Types:

- <code><a href="./src/resources/default/banks/documents.ts">DocumentRetrieveResponse</a></code>
- <code><a href="./src/resources/default/banks/documents.ts">DocumentListResponse</a></code>
- <code><a href="./src/resources/default/banks/documents.ts">DocumentDeleteResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/documents/{document_id}">client.default.banks.documents.<a href="./src/resources/default/banks/documents.ts">retrieve</a>(documentID, { ...params }) -> DocumentRetrieveResponse</code>
- <code title="get /v1/default/banks/{bank_id}/documents">client.default.banks.documents.<a href="./src/resources/default/banks/documents.ts">list</a>(bankID, { ...params }) -> DocumentListResponse</code>
- <code title="delete /v1/default/banks/{bank_id}/documents/{document_id}">client.default.banks.documents.<a href="./src/resources/default/banks/documents.ts">delete</a>(documentID, { ...params }) -> unknown</code>

### Operations

Types:

- <code><a href="./src/resources/default/banks/operations.ts">OperationListResponse</a></code>
- <code><a href="./src/resources/default/banks/operations.ts">OperationCancelResponse</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/operations">client.default.banks.operations.<a href="./src/resources/default/banks/operations.ts">list</a>(bankID) -> unknown</code>
- <code title="delete /v1/default/banks/{bank_id}/operations/{operation_id}">client.default.banks.operations.<a href="./src/resources/default/banks/operations.ts">cancel</a>(operationID, { ...params }) -> unknown</code>

### Profile

Types:

- <code><a href="./src/resources/default/banks/profile.ts">BankProfile</a></code>
- <code><a href="./src/resources/default/banks/profile.ts">DispositionTraits</a></code>

Methods:

- <code title="get /v1/default/banks/{bank_id}/profile">client.default.banks.profile.<a href="./src/resources/default/banks/profile.ts">retrieve</a>(bankID) -> BankProfile</code>
- <code title="put /v1/default/banks/{bank_id}/profile">client.default.banks.profile.<a href="./src/resources/default/banks/profile.ts">update</a>(bankID, { ...params }) -> BankProfile</code>
