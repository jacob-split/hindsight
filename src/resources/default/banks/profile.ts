// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Profile extends APIResource {
  /**
   * Get disposition traits and background for a memory bank. Auto-creates agent with
   * defaults if not exists.
   *
   * @example
   * ```ts
   * const bankProfile =
   *   await client.default.banks.profile.retrieve('bank_id');
   * ```
   */
  retrieve(bankID: string, options?: RequestOptions): APIPromise<BankProfile> {
    return this._client.get(path`/v1/default/banks/${bankID}/profile`, options);
  }

  /**
   * Update bank's disposition traits (skepticism, literalism, empathy)
   *
   * @example
   * ```ts
   * const bankProfile =
   *   await client.default.banks.profile.update('bank_id', {
   *     disposition: {
   *       empathy: 3,
   *       literalism: 3,
   *       skepticism: 3,
   *     },
   *   });
   * ```
   */
  update(bankID: string, body: ProfileUpdateParams, options?: RequestOptions): APIPromise<BankProfile> {
    return this._client.put(path`/v1/default/banks/${bankID}/profile`, { body, ...options });
  }
}

/**
 * Response model for bank profile.
 */
export interface BankProfile {
  background: string;

  bank_id: string;

  /**
   * Disposition traits that influence how memories are formed and interpreted.
   */
  disposition: DispositionTraits;

  name: string;
}

/**
 * Disposition traits that influence how memories are formed and interpreted.
 */
export interface DispositionTraits {
  /**
   * How much to consider emotional context (1=detached, 5=empathetic)
   */
  empathy: number;

  /**
   * How literally to interpret information (1=flexible, 5=literal)
   */
  literalism: number;

  /**
   * How skeptical vs trusting (1=trusting, 5=skeptical)
   */
  skepticism: number;
}

export interface ProfileUpdateParams {
  /**
   * Disposition traits that influence how memories are formed and interpreted.
   */
  disposition: DispositionTraits;
}

export declare namespace Profile {
  export {
    type BankProfile as BankProfile,
    type DispositionTraits as DispositionTraits,
    type ProfileUpdateParams as ProfileUpdateParams,
  };
}
