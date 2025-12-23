// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hindsight from 'hindsight';

const client = new Hindsight({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memories', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.default.banks.memories.list('bank_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.default.banks.memories.list(
        'bank_id',
        { limit: 0, offset: 0, q: 'q', type: 'type' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hindsight.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('clear', async () => {
    const responsePromise = client.default.banks.memories.clear('bank_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('clear: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.default.banks.memories.clear('bank_id', { type: 'type' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Hindsight.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('recall: only required params', async () => {
    const responsePromise = client.default.banks.memories.recall('bank_id', {
      query: 'What did Alice say about machine learning?',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('recall: required and optional params', async () => {
    const response = await client.default.banks.memories.recall('bank_id', {
      query: 'What did Alice say about machine learning?',
      budget: 'mid',
      include: { chunks: { max_tokens: 0 }, entities: { max_tokens: 500 } },
      max_tokens: 4096,
      query_timestamp: '2023-05-30T23:40:00',
      trace: true,
      types: ['world', 'experience'],
    });
  });

  // Prism tests are disabled
  test.skip('retain: only required params', async () => {
    const responsePromise = client.default.banks.memories.retain('bank_id', {
      items: [{ content: 'Alice works at Google' }, { content: 'Bob went hiking yesterday' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retain: required and optional params', async () => {
    const response = await client.default.banks.memories.retain('bank_id', {
      items: [
        {
          content: 'Alice works at Google',
          context: 'work',
          document_id: 'conversation_123',
          metadata: { channel: 'engineering', source: 'slack' },
          timestamp: '2024-01-15T10:30:00Z',
        },
        {
          content: 'Bob went hiking yesterday',
          context: 'team meeting',
          document_id: 'conversation_123',
          metadata: { channel: 'engineering', source: 'slack' },
          timestamp: '2024-01-15T10:00:00Z',
        },
      ],
      async: false,
    });
  });
});
