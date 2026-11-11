# Todo Server

Express API for the todo app. Uses MongoDB, JWT auth, and CORS for the client.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` if needed (MongoDB URI, JWT secret, client URL).

## Run

```bash
npm run dev    # watch mode
npm start      # production
```

API listens on `http://localhost:5000` by default.
