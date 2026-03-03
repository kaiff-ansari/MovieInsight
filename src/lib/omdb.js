const OMDB_BASE_URL = 'https://www.omdbapi.com';

/**
 * Validates IMDb ID format — must be tt followed by 7 or 8 digits
 * e.g. tt0133093 or tt12345678
 * @param {string} id
 * @returns {boolean}
 */
function validateImdbId(id) {
  return /^tt\d{7,8}$/.test(id.trim());
}

/**
 * Fetches movie details from OMDB API
 * @param {string} imdbId
 * @returns {Promise<Object>}
 */
async function fetchMovieDetails(imdbId) {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error('OMDB_API_KEY is not configured in environment variables');
  }

  const url = `${OMDB_BASE_URL}/?i=${imdbId}&plot=short&apikey=${apiKey}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // cache response for 1 hour
  });

  if (!response.ok) {
    throw new Error(`OMDB API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found');
  }

  return data;
}

module.exports = { validateImdbId, fetchMovieDetails };
