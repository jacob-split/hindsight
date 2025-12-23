// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DocumentsAPI from './documents';
import {
  DocumentDeleteParams,
  DocumentDeleteResponse,
  DocumentListParams,
  DocumentListResponse,
  DocumentRetrieveParams,
  DocumentRetrieveResponse,
  Documents,
} from './documents';
import * as EntitiesAPI from './entities';
import {
  Entities,
  EntityDetail,
  EntityListParams,
  EntityListResponse,
  EntityRegenerateParams,
  EntityRetrieveParams,
} from './entities';
import * as GraphAPI from './graph';
import { Graph, GraphRetrieveParams, GraphRetrieveResponse } from './graph';
import * as MemoriesAPI from './memories';
import {
  Budget,
  Memories,
  MemoryClearParams,
  MemoryListParams,
  MemoryListResponse,
  MemoryRecallParams,
  MemoryRecallResponse,
  MemoryRetainParams,
  MemoryRetainResponse,
} from './memories';
import * as OperationsAPI from './operations';
import {
  OperationCancelParams,
  OperationCancelResponse,
  OperationListResponse,
  Operations,
} from './operations';
import * as ProfileAPI from './profile';
import { BankProfile, DispositionTraits, Profile, ProfileUpdateParams } from './profile';
import * as StatsAPI from './stats';
import { StatRetrieveResponse, Stats } from './stats';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Banks extends APIResource {
  graph: GraphAPI.Graph = new GraphAPI.Graph(this._client);
  memories: MemoriesAPI.Memories = new MemoriesAPI.Memories(this._client);
  stats: StatsAPI.Stats = new StatsAPI.Stats(this._client);
  entities: EntitiesAPI.Entities = new EntitiesAPI.Entities(this._client);
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);
  operations: OperationsAPI.Operations = new OperationsAPI.Operations(this._client);
  profile: ProfileAPI.Profile = new ProfileAPI.Profile(this._client);

  /**
   * Get a list of all agents with their profiles
   *
   * @example
   * ```ts
   * const banks = await client.default.banks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<BankListResponse> {
    return this._client.get('/v1/default/banks', options);
  }

  /**
   * Delete an entire memory bank including all memories, entities, documents, and
   * the bank profile itself. This is a destructive operation that cannot be undone.
   *
   * @example
   * ```ts
   * const deleteResponse = await client.default.banks.delete(
   *   'bank_id',
   * );
   * ```
   */
  delete(bankID: string, options?: RequestOptions): APIPromise<DeleteResponse> {
    return this._client.delete(path`/v1/default/banks/${bankID}`, options);
  }

  /**
   * Add new background information or merge with existing. LLM intelligently
   * resolves conflicts, normalizes to first person, and optionally infers
   * disposition traits.
   *
   * @example
   * ```ts
   * const response = await client.default.banks.addBackground(
   *   'bank_id',
   *   { content: 'I was born in Texas' },
   * );
   * ```
   */
  addBackground(
    bankID: string,
    body: BankAddBackgroundParams,
    options?: RequestOptions,
  ): APIPromise<BankAddBackgroundResponse> {
    return this._client.post(path`/v1/default/banks/${bankID}/background`, { body, ...options });
  }

  /**
   * Reflect and formulate an answer using bank identity, world facts, and opinions.
   *
   * This endpoint:
   *
   * 1. Retrieves experience (conversations and events)
   * 2. Retrieves world facts relevant to the query
   * 3. Retrieves existing opinions (bank's perspectives)
   * 4. Uses LLM to formulate a contextual answer
   * 5. Extracts and stores any new opinions formed
   * 6. Returns plain text answer, the facts used, and new opinions
   *
   * @example
   * ```ts
   * const response = await client.default.banks.reflect(
   *   'bank_id',
   *   {
   *     query:
   *       'What do you think about artificial intelligence?',
   *   },
   * );
   * ```
   */
  reflect(
    bankID: string,
    body: BankReflectParams,
    options?: RequestOptions,
  ): APIPromise<BankReflectResponse> {
    return this._client.post(path`/v1/default/banks/${bankID}/reflect`, { body, ...options });
  }

  /**
   * Create a new agent or update existing agent with disposition and background.
   * Auto-fills missing fields with defaults.
   *
   * @example
   * ```ts
   * const bankProfile =
   *   await client.default.banks.updateOrCreate('bank_id');
   * ```
   */
  updateOrCreate(
    bankID: string,
    body: BankUpdateOrCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProfileAPI.BankProfile> {
    return this._client.put(path`/v1/default/banks/${bankID}`, { body, ...options });
  }
}

/**
 * Response model for delete operations.
 */
export interface DeleteResponse {
  success: boolean;

  deleted_count?: number | null;

  message?: string | null;
}

/**
 * Response model for listing all banks.
 */
export interface BankListResponse {
  banks: Array<BankListResponse.Bank>;
}

export namespace BankListResponse {
  /**
   * Bank list item with profile summary.
   */
  export interface Bank {
    bank_id: string;

    /**
     * Disposition traits that influence how memories are formed and interpreted.
     */
    disposition: ProfileAPI.DispositionTraits;

    background?: string | null;

    created_at?: string | null;

    name?: string | null;

    updated_at?: string | null;
  }
}

/**
 * Response model for background update.
 */
export interface BankAddBackgroundResponse {
  background: string;

  /**
   * Disposition traits that influence how memories are formed and interpreted.
   */
  disposition?: ProfileAPI.DispositionTraits | null;
}

/**
 * Response model for think endpoint.
 */
export interface BankReflectResponse {
  text: string;

  based_on?: Array<BankReflectResponse.BasedOn>;
}

export namespace BankReflectResponse {
  /**
   * A fact used in think response.
   */
  export interface BasedOn {
    text: string;

    id?: string | null;

    context?: string | null;

    occurred_end?: string | null;

    occurred_start?: string | null;

    type?: string | null;
  }
}

export interface BankAddBackgroundParams {
  /**
   * New background information to add or merge
   */
  content: string;

  /**
   * If true, infer disposition traits from the merged background (default: true)
   */
  update_disposition?: boolean;
}

export interface BankReflectParams {
  query: string;

  /**
   * Budget levels for recall/reflect operations.
   */
  budget?: MemoriesAPI.Budget;

  context?: string | null;

  /**
   * Options for including additional data (disabled by default)
   */
  include?: BankReflectParams.Include;
}

export namespace BankReflectParams {
  /**
   * Options for including additional data (disabled by default)
   */
  export interface Include {
    /**
     * Options for including facts (based_on) in reflect results.
     */
    facts?: unknown | null;
  }
}

export interface BankUpdateOrCreateParams {
  background?: string | null;

  /**
   * Disposition traits that influence how memories are formed and interpreted.
   */
  disposition?: ProfileAPI.DispositionTraits | null;

  name?: string | null;
}

Banks.Graph = Graph;
Banks.Memories = Memories;
Banks.Stats = Stats;
Banks.Entities = Entities;
Banks.Documents = Documents;
Banks.Operations = Operations;
Banks.Profile = Profile;

export declare namespace Banks {
  export {
    type DeleteResponse as DeleteResponse,
    type BankListResponse as BankListResponse,
    type BankAddBackgroundResponse as BankAddBackgroundResponse,
    type BankReflectResponse as BankReflectResponse,
    type BankAddBackgroundParams as BankAddBackgroundParams,
    type BankReflectParams as BankReflectParams,
    type BankUpdateOrCreateParams as BankUpdateOrCreateParams,
  };

  export {
    Graph as Graph,
    type GraphRetrieveResponse as GraphRetrieveResponse,
    type GraphRetrieveParams as GraphRetrieveParams,
  };

  export {
    Memories as Memories,
    type Budget as Budget,
    type MemoryListResponse as MemoryListResponse,
    type MemoryRecallResponse as MemoryRecallResponse,
    type MemoryRetainResponse as MemoryRetainResponse,
    type MemoryListParams as MemoryListParams,
    type MemoryClearParams as MemoryClearParams,
    type MemoryRecallParams as MemoryRecallParams,
    type MemoryRetainParams as MemoryRetainParams,
  };

  export { Stats as Stats, type StatRetrieveResponse as StatRetrieveResponse };

  export {
    Entities as Entities,
    type EntityDetail as EntityDetail,
    type EntityListResponse as EntityListResponse,
    type EntityRetrieveParams as EntityRetrieveParams,
    type EntityListParams as EntityListParams,
    type EntityRegenerateParams as EntityRegenerateParams,
  };

  export {
    Documents as Documents,
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentRetrieveParams as DocumentRetrieveParams,
    type DocumentListParams as DocumentListParams,
    type DocumentDeleteParams as DocumentDeleteParams,
  };

  export {
    Operations as Operations,
    type OperationListResponse as OperationListResponse,
    type OperationCancelResponse as OperationCancelResponse,
    type OperationCancelParams as OperationCancelParams,
  };

  export {
    Profile as Profile,
    type BankProfile as BankProfile,
    type DispositionTraits as DispositionTraits,
    type ProfileUpdateParams as ProfileUpdateParams,
  };
}
