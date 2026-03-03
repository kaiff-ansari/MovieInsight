import { NextResponse } from 'next/server';
import { fetchMovieDetails, validateImdbId } from '@/lib/omdb';
import { analyzeMovieSentiment } from '@/lib/gemini';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get('id')?.trim();

  if (!imdbId) {
    return NextResponse.json({ error: 'IMDb ID is required' }, { status: 400 });
  }

  if (!validateImdbId(imdbId)) {
    return NextResponse.json(
      { error: 'Invalid IMDb ID. Format must be: tt followed by 7-8 digits (e.g. tt0133093)' },
      { status: 400 }
    );
  }

  try {
    // Step 1: Movie details from OMDB
    const movie = await fetchMovieDetails(imdbId);

    // Step 2: Gemini AI — agar fail ho toh bhi movie dikhao
    let sentiment = null;
    try {
      sentiment = await analyzeMovieSentiment(movie);
    } catch (aiError) {
      console.warn('Gemini AI failed:', aiError.message);
      const rating = parseFloat(movie.imdbRating) || 5;
      sentiment = {
        summary: 'AI analysis unavailable. Please add a valid Gemini API key.',
        sentiment: rating >= 7 ? 'positive' : rating >= 5 ? 'mixed' : 'negative',
        score: Math.round(rating * 10),
        highlights: [
          `IMDb Rating: ${movie.imdbRating}/10`,
          `Total Votes: ${movie.imdbVotes}`,
          'Add Gemini API key for full AI analysis',
        ],
      };
    }

    return NextResponse.json({ movie, sentiment });

  } catch (error) {
    const message = error.message || 'Unexpected server error';
    const isNotFound = message.toLowerCase().includes('not found');
    return NextResponse.json({ error: message }, { status: isNotFound ? 404 : 500 });
  }
}