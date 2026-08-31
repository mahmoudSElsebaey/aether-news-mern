# Aether News — Multilingual News & Sports Media SaaS

Modern production-ready News & Media platform built with the **MERN stack**.

**Languages:** Arabic (RTL) · English (LTR)  
**Stack:** React 19 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB

**Repo:** https://github.com/mahmoudSElsebaey/aether-news-mern

---

## Quick start

### Frontend

```bash
cd client && npm install && npm run dev
```

- Public site: http://localhost:5173 → `/en` or `/ar`
- Admin: http://localhost:5173/admin/login

**Admin demo accounts**
| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@aether.news   | Admin123!  |
| Editor | editor@aether.news  | Editor123! |

### Backend

```bash
cd server && cp .env.example .env && npm install && npm run seed && npm run dev
```

---

## Admin features (Phase 5)

- Overview with stats
- Articles list (search, filter, delete)
- Multilingual article editor (EN / AR tabs, SEO fields, featured/trending/breaking)
- Categories CRUD (bilingual)
- Users list (admin only)
- Analytics snapshot
- Media & Settings placeholders
- Role-based access (admin / editor)

---

## URL strategy

```
/en, /ar
/en/article/slug
/ar/article/slug-ar
/admin
```

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
| 6 — Integration | Pending |
| 7 — Polish & Quality | Pending |

---

## License

MIT
