# 🚀 DevOps Deployment Academy

An interactive engineering education platform featuring 3D spatial simulations, production CI/CD pipelines, multi-AZ cloud architecture, and an interactive gamified DevOps campaign.

---

## 📁 Repository Structure

```
deploymentacadamy/
├── .github/
│   └── workflows/
│       └── deploy-ec2.yml      # Automated EC2 deployment workflow for Cat Quest
├── devops_academy/             # 🎓 Main DevOps Technical Academy
│   ├── app.py                  # Core Flask Academy server
│   ├── static/                 # 3D assets, Three.js engine, styles, video
│   ├── templates/              # Docker, CI/CD, AWS Cloud & Home templates
│   └── requirements.txt        # Academy dependencies
└── cat_quest/                  # 🐾 Standalone Cat Quest Game
    ├── app.py                  # Standalone game server
    ├── cat_quest.py            # Game logic & mission tracking
    ├── static/                 # Retro arcade CSS and runner engine
    ├── templates/              # Game canvas templates
    ├── Dockerfile              # Container deployment
    ├── docker-compose.yml      # Docker Compose definition
    └── requirements.txt        # Game dependencies
```

---

## 🎓 1. DevOps Technical Academy (`devops_academy/`)

An interactive, visual engineering platform:
- 🐳 **Docker Masterclass**: Image vs Container process isolation and 3D Layer Assembly Dock.
- ⚙️ **12-Stage CI/CD Pipeline**: Shift-Left SAST, Trivy CVE security scanning, Cosign signing, and canary traffic shifting.
- ☸️ **Kubernetes Orchestration**: Declarative workload reconciliation and self-healing Pod lifecycle.
- ☁️ **AWS Cloud Studio (14 Stages)**: On-premises disaster comparison vs AWS Multi-AZ auto-failover with dual workstations.

```bash
cd devops_academy
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Open [http://127.0.0.1:5001/](http://127.0.0.1:5001/).

---

## 🐾 2. Cat Quest Game (`cat_quest/`)

A retro runner web game guiding **Pip the Cat** through 8 DevOps campaign milestones (Linux, Networking, Git, CI, Docker, Registry, K8s, Operations).

```bash
cd cat_quest
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Open [http://127.0.0.1:5002/](http://127.0.0.1:5002/).
