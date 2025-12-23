// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hindsight from 'hindsight';

const client = new Hindsight({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource profile', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.default.banks.profile.retrieve('bank_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.default.banks.profile.update('bank_id', {
      disposition: { empathy: 3, literalism: 3, skepticism: 3 },
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
  test.skip('update: required and optional params', async () => {
    const response = await client.default.banks.profile.update('bank_id', {
      disposition: { empathy: 3, literalism: 3, skepticism: 3 },
    });
  });
});
