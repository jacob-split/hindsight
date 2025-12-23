// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hindsight from 'hindsight';

const client = new Hindsight({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource banks', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.default.banks.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.default.banks.delete('bank_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addBackground: only required params', async () => {
    const responsePromise = client.default.banks.addBackground('bank_id', { content: 'I was born in Texas' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addBackground: required and optional params', async () => {
    const response = await client.default.banks.addBackground('bank_id', {
      content: 'I was born in Texas',
      update_disposition: true,
    });
  });

  // Prism tests are disabled
  test.skip('reflect: only required params', async () => {
    const responsePromise = client.default.banks.reflect('bank_id', {
      query: 'What do you think about artificial intelligence?',
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
  test.skip('reflect: required and optional params', async () => {
    const response = await client.default.banks.reflect('bank_id', {
      query: 'What do you think about artificial intelligence?',
      budget: 'low',
      context: 'This is for a research paper on AI ethics',
      include: { facts: {} },
    });
  });

  // Prism tests are disabled
  test.skip('updateOrCreate', async () => {
    const responsePromise = client.default.banks.updateOrCreate('bank_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
