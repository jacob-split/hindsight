// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Operations extends APIResource {
  /**
   * Get a list of all async operations (pending and failed) for a specific agent,
   * including error messages for failed operations
   *
   * @example
   * ```ts
   * const operations =
   *   await client.default.banks.operations.list('bank_id');
   * ```
   */
  list(bankID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/default/banks/${bankID}/operations`, options);
  }

  /**
   * Cancel a pending async operation by removing it from the queue
   *
   * @example
   * ```ts
   * const response =
   *   await client.default.banks.operations.cancel(
   *     'operation_id',
   *     { bank_id: 'bank_id' },
   *   );
   * ```
   */
  cancel(operationID: string, params: OperationCancelParams, options?: RequestOptions): APIPromise<unknown> {
    const { bank_id } = params;
    return this._client.delete(path`/v1/default/banks/${bank_id}/operations/${operationID}`, options);
  }
}

export type OperationListResponse = unknown;

export type OperationCancelResponse = unknown;

export interface OperationCancelParams {
  bank_id: string;
}

export declare namespace Operations {
  export {
    type OperationListResponse as OperationListResponse,
    type OperationCancelResponse as OperationCancelResponse,
    type OperationCancelParams as OperationCancelParams,
  };
}
