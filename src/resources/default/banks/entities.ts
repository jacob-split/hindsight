// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Entities extends APIResource {
  /**
   * Get detailed information about an entity including observations (mental model).
   *
   * @example
   * ```ts
   * const entityDetail =
   *   await client.default.banks.entities.retrieve(
   *     'entity_id',
   *     { bank_id: 'bank_id' },
   *   );
   * ```
   */
  retrieve(
    entityID: string,
    params: EntityRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<EntityDetail> {
    const { bank_id } = params;
    return this._client.get(path`/v1/default/banks/${bank_id}/entities/${entityID}`, options);
  }

  /**
   * List all entities (people, organizations, etc.) known by the bank, ordered by
   * mention count.
   *
   * @example
   * ```ts
   * const entities = await client.default.banks.entities.list(
   *   'bank_id',
   * );
   * ```
   */
  list(
    bankID: string,
    query: EntityListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EntityListResponse> {
    return this._client.get(path`/v1/default/banks/${bankID}/entities`, { query, ...options });
  }

  /**
   * Regenerate observations for an entity based on all facts mentioning it.
   *
   * @example
   * ```ts
   * const entityDetail =
   *   await client.default.banks.entities.regenerate(
   *     'entity_id',
   *     { bank_id: 'bank_id' },
   *   );
   * ```
   */
  regenerate(
    entityID: string,
    params: EntityRegenerateParams,
    options?: RequestOptions,
  ): APIPromise<EntityDetail> {
    const { bank_id } = params;
    return this._client.post(path`/v1/default/banks/${bank_id}/entities/${entityID}/regenerate`, options);
  }
}

/**
 * Response model for entity detail endpoint.
 */
export interface EntityDetail {
  id: string;

  canonical_name: string;

  mention_count: number;

  observations: Array<EntityDetail.Observation>;

  first_seen?: string | null;

  last_seen?: string | null;

  metadata?: { [key: string]: unknown } | null;
}

export namespace EntityDetail {
  /**
   * An observation about an entity.
   */
  export interface Observation {
    text: string;

    mentioned_at?: string | null;
  }
}

/**
 * Response model for entity list endpoint.
 */
export interface EntityListResponse {
  items: Array<EntityListResponse.Item>;
}

export namespace EntityListResponse {
  /**
   * Entity list item with summary.
   */
  export interface Item {
    id: string;

    canonical_name: string;

    mention_count: number;

    first_seen?: string | null;

    last_seen?: string | null;

    metadata?: { [key: string]: unknown } | null;
  }
}

export interface EntityRetrieveParams {
  bank_id: string;
}

export interface EntityListParams {
  /**
   * Maximum number of entities to return
   */
  limit?: number;
}

export interface EntityRegenerateParams {
  bank_id: string;
}

export declare namespace Entities {
  export {
    type EntityDetail as EntityDetail,
    type EntityListResponse as EntityListResponse,
    type EntityRetrieveParams as EntityRetrieveParams,
    type EntityListParams as EntityListParams,
    type EntityRegenerateParams as EntityRegenerateParams,
  };
}
