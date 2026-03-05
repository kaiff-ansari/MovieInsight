# AI Movie Insight Builder 🎬

AI Movie Insight Builder is a full-stack web application where users can enter an IMDb movie ID and get detailed movie insights. The app fetches movie data from an external API and uses AI to generate audience sentiment summaries.

## 🚀 Live Demo

🔗 https://movie-insight-six.vercel.app/

## 🎥 Demo Video


https://github.com/user-attachments/assets/60f8b65e-5863-4f21-8bd2-0c6c6f7c5f98

vie Insight.mp4…
here)

## ✨ Features

* Enter an **IMDb Movie ID**
* Fetch movie details like **title, poster, cast, year, rating, and plot**
* Generate **AI-powered audience sentiment summary**
* Display **overall sentiment classification** (Positive / Mixed / Negative)
* **Responsive UI** for desktop and mobile
* Basic validation and error handling

## 🛠 Tech Stack

* **Frontend:** Next.js
* **Backend:** Next.js API Routes
* **AI:** Gemini API
* **Movie Data:** OMDb API
* **Deployment:** Vercel

## 📥 How It Works

1. User enters an **IMDb movie ID** (example: `tt0133093`).
2. The application fetches movie data from OMDb API.
3. Reviews are processed using AI.
4. AI generates a **summary and sentiment classification**.
5. Results are displayed in a clean UI.

## ⚙️ Environment Variables

Create a `.env.local` file:

OMDB_API_KEY=your_api_key
GEMINI_API_KEY=your_api_key

## 💻 Run Locally

Clone the repository:

git clone https://github.com/your-username/your-repo-name

Install dependencies:

npm install

Run the project:

npm run dev

Open in browser:

http://localhost:3000

## 📌 Example IMDb ID

Example movie:
https://www.imdb.com/title/tt0133093/

IMDb ID → `tt0133093`

## 📄 License

This project is created for an internship assignment and educational purposes.
