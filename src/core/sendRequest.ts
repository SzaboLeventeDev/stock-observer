import { QueryString } from '@/types/apis';

type RequestMethods = 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * @function sendRequest
 * @description Core and base function of the network communication.
 * @param {QueryString} queryString An object to manage the data for the url based on the documentation.
 * @param {object} body An object to send data like in a POST, PUT, UPDATE, DELETE request.
 * @param {HeadersInit} headers Header of the request.
 * @param {RequestMethods} method Desired method for the request. The default value is GET.
 * @returns
 */
export const sendRequest = async (
  queryString: QueryString,
  body?: object,
  headers?: HeadersInit,
  method: RequestMethods = 'GET',
) => {
  try {
    const { functionName, ...params } = queryString;
    const query = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    const url = `https://www.alphavantage.co/query?function=${functionName}&${query}`;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, fetchOptions);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Not a JSON response!');
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error during request:', error);
    throw error;
  }
};
