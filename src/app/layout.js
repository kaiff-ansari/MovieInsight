import './globals.css';

export const metadata = {
  title: 'CineInsight — AI Movie Sentiment Analyzer',
  description: 'Enter any IMDb movie ID to get AI-powered audience sentiment, cast info, ratings and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
