# PulseOS 🚀

**PulseOS** is a premium, full-stack productivity and lifestyle tracking platform. It unifies focus sessions, media tracking, finance, health, gaming stats, and goals into a single glassmorphic dark-mode dashboard, backed by a FastAPI REST API.

---

## 🌟 Features

| Module | Description |
|---|---|
| **Dashboard** | Bento-grid overview of all trackers with live stats |
| **Analytics** | Deep-dive charts for productivity, focus time, and streaks |
| **Sessions** | Deep-work / Pomodoro session logger |
| **Media Library** | Track movies, anime, manga, and TV shows with TMDB integration |
| **Finance** | Income, expense, and budget management |
| **Health** | Workout logs, water intake, sleep tracking |
| **Gaming** | Game backlog and playtime tracker |
| **Goals** | OKR-style goal setting and progress tracking |
| **Productivity** | Task management and habit tracking |
| **Profile** | Avatar, banner, and social links (Cloudinary-backed uploads) |
| **Settings** | Account preferences and appearance settings |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | Core SPA framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion (`motion/react`) | Animations & micro-interactions |
| Recharts | Charts and data visualisation |
| lucide-react | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| SQLModel | ORM (SQLAlchemy + Pydantic v2) |
| Alembic | Database migrations |
| PostgreSQL | Primary database |
| python-jose | JWT authentication |
| bcrypt | Password hashing |
| httpx | Async HTTP client (TMDB API) |
| Cloudinary | Avatar & banner image storage |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Python** 3.10+
- **PostgreSQL** (running locally or remotely)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Awais-0/PulseOS.git
cd PulseOS
```

---

### 2. Backend Setup

```bash
cd backend
```

#### Install dependencies (recommended: use a virtual environment)
```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux

pip install -r requirements.txt
```

#### Environment Variables
Create a `.env` file inside `backend/` (copy from `.env.example`):
```env
PORT=8001

# PostgreSQL
DATABASE_USERNAME=postgres # default username is postgres
DATABASE_PASSWORD=your_password
DATABASE_HOSTNAME=localhost # default hostname is localhost
DATABASE_PORT=5432 # default port is 5432, but if you are using any other port, change it here
DATABASE_NAME=pulse_os

# JWT
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080   # 7 days

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# TMDB (media tracking)
THE_MOVIE_DB_ACCESS_TOKEN=your_tmdb_bearer_token
THE_MOVIE_DB_API_KEY=your_tmdb_api_key

# RAWG (video game tracking)
RAWG_API_KEY=your_rawg_api_key
```

> Get your TMDB credentials at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

> Get your RAWG credentials at [https://rawg.io/apidocs](https://rawg.io/apidocs)

#### Run database migrations
```bash
.venv\Scripts\alembic upgrade head
```

#### Start the backend server
```bash
python run.py
```

The API will be available at **`http://localhost:8001`**  
Interactive docs: **`http://localhost:8001/docs`**

---

### 3. Frontend Setup

```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Environment Variables
Create a `.env` file inside `frontend/`:
```env
VITE_API_URL=http://localhost:8001
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### Start the dev server
```bash
npm run dev
```

The app will be available at **`http://localhost:3001`**

---

## 🎬 Media Library & TMDB Integration

The **Media** page (`/media`) supports tracking your entertainment library:

- **Add** movies, anime, manga, or TV shows
- **Search TMDB live** while typing — results show poster, year, and media type
- **Auto-fill** cover image, genres, and episode/movie count from TMDB on selection
- **Manual entry** for manga or anything not on TMDB
- **Progress tracking** with inline `+` / `–` controls
- **Status management**: Planning → Active → Completed / Paused
- **Relative timestamps** ("2 days ago", "Just now") auto-computed server-side

---

## 📁 Project Structure

```text
PulseOS/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── components/          # Reusable UI (Button, Modal, Sidebar, Dropdown…)
│   │   ├── pages/               # Route-level pages
│   │   ├── lib/
│   │   └── assets/              # Global styles, images
│   └── package.json
│
└── backend/                     # FastAPI application
    ├── app/
    │   ├── api/v1/
    │   │   └── endpoints/       # auth.py, users.py, media.py
    │   ├── models/              # SQLModel table models (user, media)
    │   ├── schemas/             # Pydantic request/response schemas
    │   ├── services/
    │   ├── core/
    │   └── db/                  # SQLModel engine & session
    ├── alembic/                 # Database migration scripts
    │   └── versions/
    ├── tests/                   # Integration tests for APIs
    ├── requirements.txt
    ├── alembic.ini
    └── run.py                   # Uvicorn entry point
```

---

## 📜 Development Guidelines

- **Commit Messages**: Use conventional prefixes — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- **Styling**: Glassmorphism tokens via Tailwind — `glass`, `border-white/10`, `bg-white/5`
- **API responses**: All endpoints are wrapped by the `response_wrapper` middleware → `{ success, data, error }`
- **Schemas**: Always define a Pydantic schema for every request/response body
- **Migrations**: Always generate Alembic migrations for model changes — never let SQLModel auto-create tables in production

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'feat: add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

**Built with ❤️ by Muhammad Awais Raza**
