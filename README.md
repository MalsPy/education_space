# 🎓 Education Space

> Modern EdTech SaaS platform — built with FastAPI + React + PostgreSQL

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React (Vite) + TailwindCSS        |
| Backend    | FastAPI + Python 3.13 + SQLAlchemy 2.0 |
| Database   | PostgreSQL                        |
| Infra      | Docker + Docker Compose + Nginx   |
| Auth       | JWT (python-jose)                 |

## Quick Start

```bash
cp .env.example .env
# Fill in BOT_TOKEN, CHAT_ID, SECRET_KEY, etc.

docker-compose up --build
```

Then open:
- **Frontend**: http://localhost
- **API Docs**: http://localhost/api/docs
- **Admin**: http://localhost/admin

## Features

- 📚 Public course catalog
- 📝 Lead capture / application form
- 🔐 JWT-authenticated admin panel
- 📊 Dashboard analytics
- 👩‍🏫 Teachers management
- 🎯 CRM leads pipeline
- 📱 Telegram notifications for new leads

## Phases

- [x] Phase 1 — Folder structure
- [ ] Phase 2 — Backend setup (uv)
- [ ] Phase 3 — Auth system
- [ ] Phase 4 — Courses / Teachers / Leads API
- [ ] Phase 5 — Frontend UI
- [ ] Phase 6 — Admin panel
- [ ] Phase 7 — Telegram integration
- [ ] Phase 8 — Docker + Nginx
- [ ] Phase 9 — Final integration
