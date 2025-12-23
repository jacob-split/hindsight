// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Mcp extends APIResource {
  /**
   * Streamable JSON-RPC endpoint for Model Context Protocol (MCP) requests. The
   * bank_id is required in the path. Accepts JSON-RPC 2.0 POST requests.
   *
   * @example
   * ```ts
   * const mcp = await client.mcp.create('bank_id', {
   *   id: 1,
   *   jsonrpc: '2.0',
   *   method: 'tools/list',
   * });
   * ```
   */
  create(bankID: string, body: McpCreateParams, options?: RequestOptions): APIPromise<McpCreateResponse> {
    return this._client.post(path`/mcp/${bankID}/`, { body, ...options });
  }
}

export interface McpCreateResponse {
  id: string | number;

  jsonrpc: string;

  error?: unknown | null;

  result?: unknown | Array<unknown> | string | number | boolean | null;
}

export interface McpCreateParams {
  id: string | number;

  jsonrpc: string;

  method: string;

  params?: unknown | Array<unknown> | null;
}

export declare namespace Mcp {
  export { type McpCreateResponse as McpCreateResponse, type McpCreateParams as McpCreateParams };
}
