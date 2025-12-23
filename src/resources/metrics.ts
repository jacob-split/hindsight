// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Metrics extends APIResource {
  /**
   * Exports metrics in Prometheus format for scraping
   */
  retrieve(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/metrics', options);
  }
}

export type MetricRetrieveResponse = unknown;

export declare namespace Metrics {
  export { type MetricRetrieveResponse as MetricRetrieveResponse };
}
