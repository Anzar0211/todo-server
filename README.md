# Todo Server

Express API for the todo app. Uses MongoDB, JWT auth, and CORS for the client.

## Setup

```bash
npm install
cp .env.development.example .env.development
cp .env.production.example .env.production
```

Edit the env files for your environment (MongoDB URI, JWT secret, client URL).

## Environment

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | `development` or `production` (set by npm scripts) |
| `PORT` | API port (default `5000`) |
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `CLIENT_URL` | Frontend origin allowed by CORS |
| `JWT_SECRET` | Secret used to sign auth tokens |

Files:

- `.env.development` — loaded by `npm run dev`
- `.env.production` — loaded by `npm start`
- `.env` — optional shared overrides (loaded after the mode file)
- `*.example` — tracked templates (copy and fill in; never commit secrets)

## Run

```bash
npm run dev    # development (watch mode, `.env.development`)
npm start      # production (`.env.production`)
```

API listens on `http://localhost:5000` by default.

## Endpoints

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Create account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | No | Sign in (`email`, `password`) |
| `GET` | `/api/auth/me` | Bearer | Current user |

### Tasks

All task routes require `Authorization: Bearer <token>`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create task (`title`, `description`, `dueAt`, `priority`, `status`) |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |
