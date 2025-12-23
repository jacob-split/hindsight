// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BanksAPI from './banks/banks';
import {
  BankAddBackgroundParams,
  BankAddBackgroundResponse,
  BankListResponse,
  BankReflectParams,
  BankReflectResponse,
  BankUpdateOrCreateParams,
  Banks,
  DeleteResponse,
} from './banks/banks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Default extends APIResource {
  banks: BanksAPI.Banks = new BanksAPI.Banks(this._client);

  /**
   * Get a specific chunk by its ID
   *
   * @example
   * ```ts
   * const response = await client.default.getChunk('chunk_id');
   * ```
   */
  getChunk(chunkID: string, options?: RequestOptions): APIPromise<DefaultGetChunkResponse> {
    return this._client.get(path`/v1/default/chunks/${chunkID}`, options);
  }
}

/**
 * Response model for get chunk endpoint.
 */
export interface DefaultGetChunkResponse {
  bank_id: string;

  chunk_id: string;

  chunk_index: number;

  chunk_text: string;

  created_at: string;

  document_id: string;
}

Default.Banks = Banks;

export declare namespace Default {
  export { type DefaultGetChunkResponse as DefaultGetChunkResponse };

  export {
    Banks as Banks,
    type DeleteResponse as DeleteResponse,
    type BankListResponse as BankListResponse,
    type BankAddBackgroundResponse as BankAddBackgroundResponse,
    type BankReflectResponse as BankReflectResponse,
    type BankAddBackgroundParams as BankAddBackgroundParams,
    type BankReflectParams as BankReflectParams,
    type BankUpdateOrCreateParams as BankUpdateOrCreateParams,
  };
}
