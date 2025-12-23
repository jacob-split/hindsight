// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BanksAPI from './banks';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Memories extends APIResource {
  /**
   * List memory units with pagination and optional full-text search. Supports
   * filtering by type. Results are sorted by most recent first (mentioned_at DESC,
   * then created_at DESC).
   *
   * @example
   * ```ts
   * const memories = await client.default.banks.memories.list(
   *   'bank_id',
   * );
   * ```
   */
  list(
    bankID: string,
    query: MemoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryListResponse> {
    return this._client.get(path`/v1/default/banks/${bankID}/memories/list`, { query, ...options });
  }

  /**
   * Delete memory units for a memory bank. Optionally filter by type (world,
   * experience, opinion) to delete only specific types. This is a destructive
   * operation that cannot be undone. The bank profile (disposition and background)
   * will be preserved.
   *
   * @example
   * ```ts
   * const deleteResponse =
   *   await client.default.banks.memories.clear('bank_id');
   * ```
   */
  clear(
    bankID: string,
    params: MemoryClearParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BanksAPI.DeleteResponse> {
    const { type } = params ?? {};
    return this._client.delete(path`/v1/default/banks/${bankID}/memories`, { query: { type }, ...options });
  }

  /**
   * Recall memory using semantic similarity and spreading activation.
   *
   * The type parameter is optional and must be one of:
   *
   * - `world`: General knowledge about people, places, events, and things that
   *   happen
   * - `experience`: Memories about experience, conversations, actions taken, and
   *   tasks performed
   * - `opinion`: The bank's formed beliefs, perspectives, and viewpoints
   *
   * Set `include_entities=true` to get entity observations alongside recall results.
   *
   * @example
   * ```ts
   * const response = await client.default.banks.memories.recall(
   *   'bank_id',
   *   { query: 'What did Alice say about machine learning?' },
   * );
   * ```
   */
  recall(
    bankID: string,
    body: MemoryRecallParams,
    options?: RequestOptions,
  ): APIPromise<MemoryRecallResponse> {
    return this._client.post(path`/v1/default/banks/${bankID}/memories/recall`, { body, ...options });
  }

  /**
   * Retain memory items with automatic fact extraction.
   *
   * This is the main endpoint for storing memories. It supports both synchronous and
   * asynchronous processing via the `async` parameter.
   *
   * **Features:**
   *
   * - Efficient batch processing
   * - Automatic fact extraction from natural language
   * - Entity recognition and linking
   * - Document tracking with automatic upsert (when document_id is provided)
   * - Temporal and semantic linking
   * - Optional asynchronous processing
   *
   * **The system automatically:**
   *
   * 1. Extracts semantic facts from the content
   * 2. Generates embeddings
   * 3. Deduplicates similar facts
   * 4. Creates temporal, semantic, and entity links
   * 5. Tracks document metadata
   *
   * **When `async=true`:** Returns immediately after queuing. Use the operations
   * endpoint to monitor progress.
   *
   * **When `async=false` (default):** Waits for processing to complete.
   *
   * **Note:** If a memory item has a `document_id` that already exists, the old
   * document and its memory units will be deleted before creating new ones (upsert
   * behavior).
   *
   * @example
   * ```ts
   * const response = await client.default.banks.memories.retain(
   *   'bank_id',
   *   {
   *     items: [
   *       { content: 'Alice works at Google' },
   *       { content: 'Bob went hiking yesterday' },
   *     ],
   *   },
   * );
   * ```
   */
  retain(
    bankID: string,
    body: MemoryRetainParams,
    options?: RequestOptions,
  ): APIPromise<MemoryRetainResponse> {
    return this._client.post(path`/v1/default/banks/${bankID}/memories`, { body, ...options });
  }
}

/**
 * Budget levels for recall/reflect operations.
 */
export type Budget = 'low' | 'mid' | 'high';

/**
 * Response model for list memory units endpoint.
 */
export interface MemoryListResponse {
  items: Array<{ [key: string]: unknown }>;

  limit: number;

  offset: number;

  total: number;
}

/**
 * Response model for recall endpoints.
 */
export interface MemoryRecallResponse {
  results: Array<MemoryRecallResponse.Result>;

  /**
   * Chunks for facts, keyed by chunk_id
   */
  chunks?: { [key: string]: MemoryRecallResponse.Chunks } | null;

  /**
   * Entity states for entities mentioned in results
   */
  entities?: { [key: string]: MemoryRecallResponse.Entities } | null;

  trace?: { [key: string]: unknown } | null;
}

export namespace MemoryRecallResponse {
  /**
   * Single recall result item.
   */
  export interface Result {
    id: string;

    text: string;

    chunk_id?: string | null;

    context?: string | null;

    document_id?: string | null;

    entities?: Array<string> | null;

    mentioned_at?: string | null;

    metadata?: { [key: string]: string } | null;

    occurred_end?: string | null;

    occurred_start?: string | null;

    type?: string | null;
  }

  /**
   * Chunk data for a single chunk.
   */
  export interface Chunks {
    id: string;

    chunk_index: number;

    text: string;

    /**
     * Whether the chunk text was truncated due to token limits
     */
    truncated?: boolean;
  }

  /**
   * Current mental model of an entity.
   */
  export interface Entities {
    canonical_name: string;

    entity_id: string;

    observations: Array<Entities.Observation>;
  }

  export namespace Entities {
    /**
     * An observation about an entity.
     */
    export interface Observation {
      text: string;

      mentioned_at?: string | null;
    }
  }
}

/**
 * Response model for retain endpoint.
 */
export interface MemoryRetainResponse {
  /**
   * Whether the operation was processed asynchronously
   */
  async: boolean;

  bank_id: string;

  items_count: number;

  success: boolean;
}

export interface MemoryListParams {
  limit?: number;

  offset?: number;

  q?: string | null;

  type?: string | null;
}

export interface MemoryClearParams {
  /**
   * Optional fact type filter (world, experience, opinion)
   */
  type?: string | null;
}

export interface MemoryRecallParams {
  query: string;

  /**
   * Budget levels for recall/reflect operations.
   */
  budget?: Budget;

  /**
   * Options for including additional data (entities are included by default)
   */
  include?: MemoryRecallParams.Include;

  max_tokens?: number;

  /**
   * ISO format date string (e.g., '2023-05-30T23:40:00')
   */
  query_timestamp?: string | null;

  trace?: boolean;

  /**
   * List of fact types to recall (defaults to all if not specified)
   */
  types?: Array<string> | null;
}

export namespace MemoryRecallParams {
  /**
   * Options for including additional data (entities are included by default)
   */
  export interface Include {
    /**
     * Options for including chunks in recall results.
     */
    chunks?: Include.Chunks | null;

    /**
     * Options for including entity observations in recall results.
     */
    entities?: Include.Entities | null;
  }

  export namespace Include {
    /**
     * Options for including chunks in recall results.
     */
    export interface Chunks {
      /**
       * Maximum tokens for chunks (chunks may be truncated)
       */
      max_tokens?: number;
    }

    /**
     * Options for including entity observations in recall results.
     */
    export interface Entities {
      /**
       * Maximum tokens for entity observations
       */
      max_tokens?: number;
    }
  }
}

export interface MemoryRetainParams {
  items: Array<MemoryRetainParams.Item>;

  /**
   * If true, process asynchronously in background. If false, wait for completion
   * (default: false)
   */
  async?: boolean;
}

export namespace MemoryRetainParams {
  /**
   * Single memory item for retain.
   */
  export interface Item {
    content: string;

    context?: string | null;

    /**
     * Optional document ID for this memory item.
     */
    document_id?: string | null;

    metadata?: { [key: string]: string } | null;

    timestamp?: string | null;
  }
}

export declare namespace Memories {
  export {
    type Budget as Budget,
    type MemoryListResponse as MemoryListResponse,
    type MemoryRecallResponse as MemoryRecallResponse,
    type MemoryRetainResponse as MemoryRetainResponse,
    type MemoryListParams as MemoryListParams,
    type MemoryClearParams as MemoryClearParams,
    type MemoryRecallParams as MemoryRecallParams,
    type MemoryRetainParams as MemoryRetainParams,
  };
}
