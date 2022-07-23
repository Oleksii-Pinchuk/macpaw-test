export const BASE_URL = 'https://api.thecatapi.com/v1';

export const request
  = async (
      endpoint: string,
      option?: Option
    ) => {
    const response = await fetch(
      `${BASE_URL}/${endpoint}`,
      option
    );

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  };