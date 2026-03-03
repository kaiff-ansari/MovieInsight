const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeMovieSentiment(movie) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const ratingsStr =
    movie.Ratings && movie.Ratings.length > 0
      ? movie.Ratings.map((r) => `${r.Source}: ${r.Value}`).join(', ')
      : 'N/A';

  const prompt = `
You are a movie sentiment analyst. Based on the following movie data, analyze the overall audience sentiment.

Movie: "${movie.Title}" (${movie.Year})
IMDb Rating: ${movie.imdbRating}/10 (${movie.imdbVotes} votes)
Genre: ${movie.Genre}
Director: ${movie.Director}
Actors: ${movie.Actors}
Plot: ${movie.Plot}
All Ratings: ${ratingsStr}

Respond ONLY in this JSON format, no markdown, no extra text:
{"summary":"2-3 sentence audience sentiment summary","sentiment":"positive","score":80,"highlights":["highlight 1","highlight 2","highlight 3"]}
`.trim();

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const clean = text.replace(/```json|```/g, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    throw new Error('Failed to parse Gemini AI response');
  }

  if (!['positive', 'mixed', 'negative'].includes(parsed.sentiment)) {
    parsed.sentiment = 'mixed';
  }
  parsed.score = Math.min(100, Math.max(0, Number(parsed.score) || 50));

  return parsed;
}

module.exports = { analyzeMovieSentiment };