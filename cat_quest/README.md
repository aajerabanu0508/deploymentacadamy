# 🐾 Cat Quest — The DevOps Campaign

An interactive retro runner web game where you guide **Pip the Cat** through 8 DevOps campaign missions, dodging infrastructure crates and barriers to collect badges.

---

## 🎮 Game Concept & Missions

Pip must ship an application across 8 DevOps milestones:
1. **Linux** (🐧)
2. **Networking** (🌐)
3. **Git & GitHub** (🐙)
4. **CI** (⚙️)
5. **Docker** (🐳)
6. **Registry** (📦)
7. **Kubernetes** (☸️)
8. **Operations** (📡)

### Controls
- **Start**: Press `↑` (Up Arrow) or tap on-screen button.
- **Move Left / Right**: `←` / `→` arrow keys (switch between 3 lanes).
- **Jump**: `↑` (Up Arrow) to leap over crates (`▦`).
- **Slide**: `↓` (Down Arrow) to slide under high barriers (`▔`).

### Scoring & Badges
- **10 points**: Passing an obstacle row.
- **20 points**: Clearing an obstacle with the correct jump/slide maneuver.
- **100 XP**: Catching a milestone badge.
- Progress is persisted anonymously in SQLite / PostgreSQL across browser reloads.

---

## 🚀 Running Locally

### 1. Python Virtual Environment

```bash
cd cat_quest
python3 -m venv .venv
source .venv/bin/activate    # On Windows: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open [http://127.0.0.1:5002/](http://127.0.0.1:5002/) in your browser.

### 2. Docker

```bash
cd cat_quest
docker build -t cat-quest .
docker run -p 5002:5000 cat-quest
```

### 3. Docker Compose

```bash
cd cat_quest
docker compose up -d
```

---

## ⚙️ Configuration

- **`PORT`**: Port number for the standalone server (defaults to `5002` in development, `5000` in production container).
- **`DATABASE_URL`**: Optional PostgreSQL connection string (e.g. `postgresql://user:pass@localhost:5432/cat_quest`). If omitted, uses local SQLite database at `instance/cat_quest.sqlite3`.

---

## ☁️ EC2 Production Deployment

A pre-configured systemd service:

```ini
[Unit]
Description=Cat Quest Game
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/cat-quest/current
EnvironmentFile=-/etc/cat-quest.env
ExecStart=/home/ubuntu/cat-quest/current/.venv/bin/gunicorn --bind 127.0.0.1:8000 --workers 2 app:app
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

The GitHub Actions workflow in `.github/workflows/deploy-ec2.yml` deploys this directory directly to your target EC2 instance.
