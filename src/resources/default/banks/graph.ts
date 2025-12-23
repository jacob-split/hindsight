// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Graph extends APIResource {
  /**
   * Retrieve graph data for visualization, optionally filtered by type
   * (world/experience/opinion). Limited to 1000 most recent items.
   *
   * @example
   * ```ts
   * const graph = await client.default.banks.graph.retrieve(
   *   'bank_id',
   * );
   * ```
   */
  retrieve(
    bankID: string,
    query: GraphRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GraphRetrieveResponse> {
    return this._client.get(path`/v1/default/banks/${bankID}/graph`, { query, ...options });
  }
}

/**
 * Response model for graph data endpoint.
 */
export interface GraphRetrieveResponse {
  edges: Array<{ [key: string]: unknown }>;

  nodes: Array<{ [key: string]: unknown }>;

  table_rows: Array<{ [key: string]: unknown }>;

  total_units: number;
}

export interface GraphRetrieveParams {
  type?: string | null;
}

export declare namespace Graph {
  export {
    type GraphRetrieveResponse as GraphRetrieveResponse,
    type GraphRetrieveParams as GraphRetrieveParams,
  };
}
