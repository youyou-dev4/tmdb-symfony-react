## TMDB Explorer

A web application that displays the best rated movies and TV shows,
powered by [The Movie Database (TMDB)](https://www.themoviedb.org/).

Built with **Symfony** (backend API) and **React** (frontend), fully dockerized.

---

## Features

- Top Rated Movies with pagination
- Top Rated TV Shows with pagination
- Search for any movie or series instantly
- Movie / TV Show detail modal on click
- Dark / Light mode toggle (stored in `localStorage`)

---

## Tech Stack

| Layer    | Technology                      |
|----------|---------------------------------|
| Backend  | Symfony 8 (PHP ≥ 8.4)          |
| Frontend | React 19 + React Router 7      |
| API      | TMDB v3 REST API               |
| Docker   | Docker Compose                 |

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/youyou-dev4/tmdb-symfony-react.git
cd tmdb-symfony-react

### 2. Configure environment variables

At the project root:

cp .env.example .env 
Then open `.env` and fill in your TMDB API key:

TMDB_API_KEY=your_tmdb_api_key_here
> Get your free API key at `https://www.themoviedb.org/settings/api`.  
> The key is injected into the **backend container** via Docker and is **not exposed in the React bundle**.

### 3. Launch with Docker

docker compose up --build

### 4. Open the app

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8000 |

---

## Project Structure

tmdb-symfony-react/
├── backend/              # Symfony API
│   ├── src/
│   │   ├── Controller/   # ApiController (REST endpoints)
│   │   └── Service/      # TmdbService (calls TMDB)
│   └── Dockerfile
├── frontend/             # React App
│   ├── src/
│   │   ├── components/   # Card, Header, Modal, Pagination, Spinner...
│   │   └── pages/        # Home, Movies, TV, Search
│   └── Dockerfile
├── .env.example          # Example env (TMDB_API_KEY)
├── .gitignore
└── docker-compose.yml

---

## API Endpoints (Backend)

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| GET    | /api/movies?page=1   | Top rated movies            |
| GET    | /api/tv?page=1       | Top rated TV shows          |
| GET    | /api/search?query=…  | Search movies and TV shows  |

Responses are JSON and include:

- `status`: `"success"` or `"error"`
- `results`: TMDB results array
- `page`, `total_pages`, `total_results`

---

## Security Notes

- The TMDB API key is read from `TMDB_API_KEY` (environment variable), **not hard-coded**.
- `.env` files and heavy folders (`vendor`, `node_modules`, `var`) are ignored by Git.
- CORS is restricted to `http://localhost:3000` on `/api/*` routes using `nelmio/cors-bundle`.

---

## Author

Younes MATOUB