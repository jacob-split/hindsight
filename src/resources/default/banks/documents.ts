// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Get a specific document including its original text
   *
   * @example
   * ```ts
   * const document =
   *   await client.default.banks.documents.retrieve(
   *     'document_id',
   *     { bank_id: 'bank_id' },
   *   );
   * ```
   */
  retrieve(
    documentID: string,
    params: DocumentRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DocumentRetrieveResponse> {
    const { bank_id } = params;
    return this._client.get(path`/v1/default/banks/${bank_id}/documents/${documentID}`, options);
  }

  /**
   * List documents with pagination and optional search. Documents are the source
   * content from which memory units are extracted.
   *
   * @example
   * ```ts
   * const documents = await client.default.banks.documents.list(
   *   'bank_id',
   * );
   * ```
   */
  list(
    bankID: string,
    query: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentListResponse> {
    return this._client.get(path`/v1/default/banks/${bankID}/documents`, { query, ...options });
  }

  /**
   * Delete a document and all its associated memory units and links.
   *
   * This will cascade delete:
   *
   * - The document itself
   * - All memory units extracted from this document
   * - All links (temporal, semantic, entity) associated with those memory units
   *
   * This operation cannot be undone.
   *
   * @example
   * ```ts
   * const document =
   *   await client.default.banks.documents.delete(
   *     'document_id',
   *     { bank_id: 'bank_id' },
   *   );
   * ```
   */
  delete(documentID: string, params: DocumentDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { bank_id } = params;
    return this._client.delete(path`/v1/default/banks/${bank_id}/documents/${documentID}`, options);
  }
}

/**
 * Response model for get document endpoint.
 */
export interface DocumentRetrieveResponse {
  id: string;

  bank_id: string;

  content_hash: string | null;

  created_at: string;

  memory_unit_count: number;

  original_text: string;

  updated_at: string;
}

/**
 * Response model for list documents endpoint.
 */
export interface DocumentListResponse {
  items: Array<{ [key: string]: unknown }>;

  limit: number;

  offset: number;

  total: number;
}

export type DocumentDeleteResponse = unknown;

export interface DocumentRetrieveParams {
  bank_id: string;
}

export interface DocumentListParams {
  limit?: number;

  offset?: number;

  q?: string | null;
}

export interface DocumentDeleteParams {
  bank_id: string;
}

export declare namespace Documents {
  export {
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentRetrieveParams as DocumentRetrieveParams,
    type DocumentListParams as DocumentListParams,
    type DocumentDeleteParams as DocumentDeleteParams,
  };
}
