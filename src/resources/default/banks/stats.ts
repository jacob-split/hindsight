// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Stats extends APIResource {
  /**
   * Get statistics about nodes and links for a specific agent
   *
   * @example
   * ```ts
   * const stat = await client.default.banks.stats.retrieve(
   *   'bank_id',
   * );
   * ```
   */
  retrieve(bankID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/default/banks/${bankID}/stats`, options);
  }
}

export type StatRetrieveResponse = unknown;

export declare namespace Stats {
  export { type StatRetrieveResponse as StatRetrieveResponse };
}
