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

## Cat Quest

From the `devops_academy` directory, run `python -m pip install -r requirements.txt` and `python app.py`. Open `/cat-quest/` on the local URL printed by Flask, or use **Cat Quest** in the academy navigation.

Press Up or tap the on-screen **↑** to begin. Switch lanes with Left and Right, jump with Up, and slide with Down. Passing a row earns 10 points, clearing an obstacle with the right move earns 20, and catching a badge earns 100. A crash ends the run and shows your score. **Restart run** returns to Linux with a score of zero and waits for Up.

Flask saves badge checkpoints for an anonymous player cookie. Progress resumes in the same browser and does not follow users across devices. The run score is not saved across reloads.

Without configuration, the game uses `instance/cat_quest.sqlite3`. To use PostgreSQL, set `DATABASE_URL` in the server environment (for example, a `postgresql://...` connection string) before starting Flask. Do not commit the real URL. The database user must be able to create and update the `cat_quest_progress` table. Switching databases does not migrate existing progress.

## Deploy to EC2

The **Deploy Cat Quest to EC2** workflow is manual and runs only from `main`. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add:

- `EC2_HOST`: the EC2 public IPv4 address or DNS name, without a scheme or port.
- `EC2_SSH_KEY`: the full private SSH deploy key (including the header and footer). Install its public key for the deployment user on EC2.
- `EC2_KNOWN_HOSTS`: the verified SSH host-key entry for that exact host. Verify the host key through a trusted channel such as the EC2 console before saving it.
- Optional Actions variable `EC2_USER`: defaults to `ubuntu`.

On Ubuntu EC2, install `python3`, `python3-venv`, and `curl`. The runner must be able to reach SSH port 22. Use a trusted network path or runner if SSH is restricted; don't open SSH to the world just for this workflow.

Install this as `/etc/systemd/system/cat-quest.service`, adjusting the user and home directory if you set `EC2_USER`:

```ini
[Unit]
Description=Cat Quest
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

Run `sudo systemctl daemon-reload` and `sudo systemctl enable cat-quest.service`. If the deploy user doesn't already have the required access, use `visudo` to grant passwordless access only to the exact restart command (confirm the `systemctl` path first):

```sudoers
ubuntu ALL=(root) NOPASSWD: /usr/bin/systemctl restart cat-quest.service
```

For PostgreSQL, put `DATABASE_URL` in a root-owned, mode-0600 `/etc/cat-quest.env` on EC2. Otherwise, SQLite data persists in `~/cat-quest/instance` across releases. For public access, configure an HTTPS reverse proxy to forward requests to `127.0.0.1:8000`.

After pushing the app and workflow to `main`, select **Actions → Deploy Cat Quest to EC2 → Run workflow**. It uploads the app, installs dependencies, restarts the service, and checks that the Cat Quest page responds.
