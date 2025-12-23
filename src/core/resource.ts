// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Hindsight } from '../client';

export abstract class APIResource {
  protected _client: Hindsight;

  constructor(client: Hindsight) {
    this._client = client;
  }
}
