// jokes api service module
const API_URL = "https://official-joke-api.appspot.com/random_ten";

/**
 * fetches random jokes from the api
 * @returns {Promise<Array>} array of joke objects with added liked property
 * @throws {Error} if the api request fails
 */
export async function fetchJokes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`api request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data.map((joke) => ({
        ...joke,
        liked: false,
    }));
}
