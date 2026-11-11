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

