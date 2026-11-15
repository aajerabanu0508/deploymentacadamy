# DevOps Cat Academy

Flask-based animated classroom learning website for CI/CD (GitHub Actions and Jenkins), Docker, Kubernetes, and AWS.

## Windows PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

Open http://127.0.0.1:5000/ .

## Routes

- `/` Home
- `/cicd` CI/CD shortcut
- `/learn/cicd` CI/CD
- `/learn/docker` Docker
- `/learn/kubernetes` Kubernetes
- `/learn/aws` AWS
- `/health` Flask health endpoint

**Important:** Animations are educational simulations, not real cloud provisioning, pipeline runs, or deployments. The Flask development server is for local use only; use a production WSGI server and reverse proxy for production.
