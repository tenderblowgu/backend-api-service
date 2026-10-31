# backend-api-service

REST API backend built with Express.js. Handles user auth (JWT), product catalogue and Stripe checkout.

## Stack
- **Node.js 20** / Express 4
- **PostgreSQL** (via `pg`)
- **JWT** auth with bcrypt
- **Stripe** for payments
- **Docker** / docker-compose for local dev

## Quick start

```bash
cp .env.example .env   # fill in your secrets
docker-compose up -d   # starts API + Postgres
npm install
npm run dev
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/v1/auth/register | — | Create account |
| POST | /api/v1/auth/login | — | Get JWT token |
| GET | /api/v1/auth/me | Bearer | Current user |
| GET | /api/v1/products | — | List products |
| GET | /api/v1/products/:id | — | Single product |
| POST | /api/v1/products/:id/checkout | Bearer | Stripe checkout session |
| GET | /api/v1/health | — | Health check |

## Tests

```bash
npm test
```
