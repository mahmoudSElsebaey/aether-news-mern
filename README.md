# Aether News — Multilingual News & Sports Media SaaS

Modern production-ready News & Media platform built with the **MERN stack**.

**Languages:** Arabic (RTL) · English (LTR)  
**Stack:** React 19 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB

**Repo:** https://github.com/mahmoudSElsebaey/aether-news-mern

---

## Quick start (full stack)

### 1. Backend

```bash
cd server
cp .env.example .env
# Set MONGODB_URI and JWT_SECRET
npm install
npm run seed
npm run dev
```

API: http://localhost:5000/api/health

### 2. Frontend

```bash
cd client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

- Public: http://localhost:5173 → `/en` or `/ar`
- Admin: http://localhost:5173/admin/login

**Accounts (after seed)**
| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@aether.news   | Admin123!  |
| Editor | editor@aether.news  | Editor123! |

---

## What is integrated (Phase 6)

- JWT auth (httpOnly cookie) end-to-end
- Public homepage, categories, article detail, search → live API
- Admin articles CRUD → API
- Admin categories CRUD → API
- Bookmarks API from article page
- Loading / error / retry states
- Axios client with credentials

---

## Phases

| Phase | Status |
|-------|--------|
| 0 — Discovery | ✅ |
| 1 — Brand & Design System | ✅ |
| 2 — Public Website | ✅ |
| 3 — Backend | ✅ |
| 4 — Multilingual Content | ✅ |
| 5 — Admin Dashboard | ✅ |
| 6 — Integration | ✅ |
| 7 — Polish & Quality | Pending |

---

## License

MIT
