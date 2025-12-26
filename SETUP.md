# FilmFlow AI - Quick Setup Guide

## Demo User Credentials

After running the seed script, you can login with:
- **Email:** `andrej.galad@gmail.com`
- **Password:** `tester123`

---

## Step 1: Create Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Create a new project called "filmflow-ai"
3. Copy the connection string (looks like: `postgresql://user:pass@host.neon.tech/neondb?sslmode=require`)
4. Update `.env.local` with your connection string:
   ```
   DATABASE_URL="your-neon-connection-string"
   ```

---

## Step 2: Setup Database & Create Demo User

Run this single command to set up everything:

```bash
npm run db:setup
```

This will:
- Generate Prisma client
- Push schema to database
- Create demo user with sample data

---

## Step 3: Start the App

```bash
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) and login with:
- Email: `andrej.galad@gmail.com`
- Password: `tester123`

---

## Optional: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to "APIs & Services" > "Credentials"
4. Create OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`:
   ```
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

---

## Optional: Modal.com Setup

1. Go to [modal.com](https://modal.com) and sign up
2. Install Modal CLI: `pip install modal`
3. Login: `modal token new`
4. Deploy backend:
   ```bash
   cd modal-backend
   modal deploy app.py
   ```

---

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run db:setup` | Setup database + seed data |
| `npm run prisma:studio` | Open Prisma database browser |
| `npm run test` | Run all tests |
| `npm run build` | Build for production |

---

## Troubleshooting

### "Cannot find module" errors
Run: `npm install`

### Database connection errors
1. Check your DATABASE_URL in `.env.local`
2. Make sure Neon project is active

### Login not working
1. Ensure database is seeded: `npm run prisma:seed`
2. Check that email is exactly: `andrej.galad@gmail.com`
3. Password is: `tester123`
