/**
 * ============================================================================
 * ⚙️ DevOps Academy — Enterprise 12-Stage CI/CD Pipeline Simulator
 * Interactive Step-by-Step Production Delivery Assembly Line:
 * From Shift-Left Linting & GPG Commits to Multi-Arch Buildx, Trivy CVE Gates,
 * Cosign Signing, and Zero-Downtime Blue/Green Canary Deployment.
 * ============================================================================
 */

(function () {
  'use strict';

  const CICD_STAGES = [
    {
      id: 1,
      badge: "Stage 01",
      title: "Pre-Commit & Shift-Left Static Analysis",
      gateType: "security",
      gateLabel: "Security & Quality Gate",
      summary: "Catches formatting errors, syntax flaws, type violations, and accidental secret commits locally before any code leaves the developer's laptop.",
      metrics: [
        { label: "Linters", val: "Ruff & Black" },
        { label: "Type Checker", val: "Mypy Strict" },
        { label: "Secret Scan", val: "Gitleaks (0 leaks)" }
      ],
      cmd: "$ pre-commit run --all-files",
      termOutput: `[INFO] Initializing environment for https://github.com/astral-sh/ruff-pre-commit.
[INFO] Initializing environment for https://github.com/psf/black.
[INFO] Initializing environment for https://github.com/gitleaks/gitleaks.
ruff check...............................................................Passed
ruff format..............................................................Passed
black....................................................................Passed
mypy (type checking).....................................................Passed
detect-secrets / gitleaks (entropy scan).................................Passed
check-merge-conflict.....................................................Passed
check-json / check-yaml..................................................Passed

✔ All 7 pre-commit shift-left hooks passed in 0.84s. Ready to commit.`
    },
    {
      id: 2,
      badge: "Stage 02",
      title: "Conventional Commit & GPG Cryptographic Signing",
      gateType: "quality",
      gateLabel: "Identity & Audit Verification",
      summary: "Enforces semantic commit messages for automated changelog generation and cryptographically signs git commits with the developer's GPG private key.",
      metrics: [
        { label: "Commit Spec", val: "Conventional v1.0" },
        { label: "Sign Algorithm", val: "RSA 4096 / GPG" },
        { label: "Identity", val: "Verified Developer" }
      ],
      cmd: '$ git commit -S -m "feat(catalog): add Redis cache layer with auto healthcheck"',
      termOutput: `[main 7a3b91c] feat(catalog): add Redis cache layer with auto healthcheck
 3 files changed, 84 insertions(+), 12 deletions(-)
 create mode 100644 app/cache.py

[DEBUG] GPG signing process:
 gpg: using "4A8F9B1E3C2D10FA" as default secret key for signing
 gpg: signing and encryption succeeded
 gpg: Good signature from "Kerthik DevOps <engineer@devopsacademy.internal>" [ultimate]

✔ Signed commit 7a3b91c created with cryptographically verified identity.`
    },
    {
      id: 3,
      badge: "Stage 03",
      title: "Pull Request Event & Webhook Ingestion",
      gateType: "build",
      gateLabel: "Branch Governance Gate",
      summary: "Code pushed to GitHub triggers an automated webhook event. Branch protection rules prevent direct pushes to main, enforcing peer review and CI status checks.",
      metrics: [
        { label: "Target Branch", val: "refs/heads/main" },
        { label: "Protection", val: "Strict (PR Required)" },
        { label: "Webhook Latency", val: "140ms" }
      ],
      cmd: "$ git push origin feature/redis-cache\n# GitHub Webhook triggers .github/workflows/pipeline.yml",
      termOutput: `Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 10 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 1.84 KiB | 1.84 MiB/s, done.
Total 7 (delta 4), reused 0 (delta 0), pack-reused 0
To github.com:devops-academy/microservices-platform.git
 * [new branch]      feature/redis-cache -> feature/redis-cache

>> GitHub Webhook Event Received: pull_request.opened #42
>> Evaluating branch policies for target 'main':
   [✔] Direct push blocked: Pull Request required
   [✔] Mandatory status checks pending: [test, security-scan, build-container]
   [✔] Required approvals: Minimum 1 CODEOWNER review`
    },
    {
      id: 4,
      badge: "Stage 04",
      title: "Ephemeral Clean Runner VM Provisioning",
      gateType: "build",
      gateLabel: "Isolated Runtime Setup",
      summary: "GitHub Actions provisions a fresh, isolated Ubuntu virtual machine. Dependencies are fetched and restored using cryptographic content-addressable cache keys.",
      metrics: [
        { label: "OS Runner", val: "Ubuntu 22.04 LTS" },
        { label: "vCPU / RAM", val: "4 vCPU / 16 GB" },
        { label: "Cache Status", val: "Cache Hit (2.1s)" }
      ],
      cmd: `name: Enterprise Delivery Pipeline
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'`,
      termOutput: `Starting Job: validate & test
Runner Image: ubuntu-22.04
Operating System: Linux 5.15.0-1045-azure
Virtual Environment: /opt/hostedtoolcache/Python/3.12.2/x64
Cache restored successfully from key: pip-Linux-f49d28c7e90
  - Extracted 42.8 MB of pre-compiled wheels in 0.62s
  - Virtualenv created at /home/runner/work/_temp/venv

✔ Ephemeral build environment isolated and ready in 2.1 seconds.`
    },
    {
      id: 5,
      badge: "Stage 05",
      title: "Parallel Matrix Testing & Coverage Verification",
      gateType: "quality",
      gateLabel: "Quality Assurance Gate",
      summary: "Runs deterministic unit, integration, and mocking tests across Python matrices in parallel. The pipeline strictly halts if test coverage falls below 90%.",
      metrics: [
        { label: "Total Tests", val: "64 Passed (0 Failed)" },
        { label: "Execution Time", val: "1.42s (4 workers)" },
        { label: "Code Coverage", val: "94.6% (Gate: 90%)" }
      ],
      cmd: "$ pytest -n auto --cov=app --cov-report=term-missing --cov-fail-under=90",
      termOutput: `============================= test session starts ==============================
platform linux -- Python 3.12.2, pytest-8.1.1, pluggy-1.4.0
rootdir: /home/runner/work/devops-academy
plugins: xdist-3.5.0, cov-5.0.0
4 workers [64 items]
................................................................ [100%]

---------- coverage: platform linux, python 3.12.2 -----------
Name                  Stmts   Miss  Cover   Missing
---------------------------------------------------
app/__init__.py           8      0   100%
app/routes.py            42      2    95%   68-71
app/cache.py             28      1    96%   44
app/models.py            36      3    92%   88, 102-104
---------------------------------------------------
TOTAL                   114      6    94.6%

Required test coverage of 90.0% reached. Total coverage: 94.62%
============================== 64 passed in 1.42s ==============================`
    },
    {
      id: 6,
      badge: "Stage 06",
      title: "SAST (Static Application Security) & Dependency CVE Audit",
      gateType: "security",
      gateLabel: "Zero-Day Vulnerability Gate",
      summary: "AST security parsers scan application source code for SQL injections and insecure deserialization, while pip-audit checks third-party packages against national vulnerability databases.",
      metrics: [
        { label: "SAST Tool", val: "Bandit AST Scan" },
        { label: "CVE Checker", val: "pip-audit / OSV" },
        { label: "High / Critical", val: "0 Detected" }
      ],
      cmd: "$ bandit -r ./app -ll && pip-audit -r requirements.txt",
      termOutput: `[main]  INFO    profile include tests: None
[main]  INFO    cli include tests: None
[main]  INFO    running on 12 python source files...
>> Issue: [B101:assert_used] Use of assert detected. (Low severity, skipped)
--------------------------------------------------
Code scanned:
        Total lines of code: 842
        Total lines skipped: 0

Run metrics:
        Total issues (by severity):
                Undefined: 0
                Low: 2
                Medium: 0
                High: 0
--------------------------------------------------
>> Auditing requirements.txt against PyPI Advisory & GitHub OSV Database...
Found 26 known dependencies.
No known vulnerabilities found across 26 scanned packages.

✔ Security Gate PASSED: 0 High/Critical findings.`
    },
    {
      id: 7,
      badge: "Stage 07",
      title: "Multi-Architecture Container Compilation (Docker Buildx)",
      gateType: "build",
      gateLabel: "Multi-Arch OCI Packaging",
      summary: "Builds production OCI images for both AMD64 (cloud x86) and ARM64 (Apple Silicon & AWS Graviton3) using BuildKit daemon with remote GitHub Actions cache layers.",
      metrics: [
        { label: "Target Arches", val: "linux/amd64, arm64" },
        { label: "Build Driver", val: "docker-container" },
        { label: "Layer Cache", val: "85% Reused (GHA)" }
      ],
      cmd: "$ docker buildx build --platform linux/amd64,linux/arm64 \\\n    --cache-from=type=gha --cache-to=type=gha,mode=max \\\n    -t catalog-api:7a3b91c .",
      termOutput: `[+] Building 8.6s (18/18) FINISHED
 => [internal] booting buildkit builder multi-arch-builder
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 512B
 => [internal] load .dockerignore
 => [linux/amd64 internal] load metadata for docker.io/library/python:3.12-slim
 => [linux/arm64 internal] load metadata for docker.io/library/python:3.12-slim
 => [linux/amd64 1/5] FROM docker.io/library/python:3.12-slim@sha256:7e029... CACHED
 => [linux/amd64 2/5] WORKDIR /app                                         CACHED
 => [linux/amd64 3/5] COPY requirements.txt .                               CACHED
 => [linux/amd64 4/5] RUN pip install --no-cache-dir -r requirements.txt   CACHED
 => [linux/amd64 5/5] COPY . .                                             0.2s
 => [linux/arm64 5/5] COPY . .                                             0.2s
 => exporting to image
 => => exporting layers
 => => exporting manifest list sha256:4b219018e6c780f2...
 => => writing cache to GitHub Actions Cache

✔ Multi-arch OCI image built: catalog-api:7a3b91c (142MB)`
    },
    {
      id: 8,
      badge: "Stage 08",
      title: "Container Image Vulnerability Scanning (Trivy)",
      gateType: "security",
      gateLabel: "Container Hardening Gate",
      summary: "Inspects every Linux OS package and root filesystem binary inside the final container artifact. Pipeline fails immediately if unpatched HIGH or CRITICAL CVEs exist.",
      metrics: [
        { label: "Scanner", val: "Aqua Trivy v0.50" },
        { label: "Fail Threshold", val: "HIGH,CRITICAL" },
        { label: "Scan Target", val: "catalog-api:7a3b91c" }
      ],
      cmd: "$ trivy image --exit-code 1 --severity HIGH,CRITICAL catalog-api:7a3b91c",
      termOutput: `2026-11-21T18:24:10Z INFO Need to update DB
2026-11-21T18:24:12Z INFO Vulnerability DB updated successfully
2026-11-21T18:24:12Z INFO Detecting Debian vulnerabilities...

catalog-api:7a3b91c (debian 12.5)
=================================
Total: 0 (HIGH: 0, CRITICAL: 0)

catalog-api:7a3b91c (python-pkg)
================================
Total: 0 (HIGH: 0, CRITICAL: 0)

✔ Container Vulnerability Gate PASSED. Zero critical vulnerabilities found.`
    },
    {
      id: 9,
      badge: "Stage 09",
      title: "Cryptographic Image Signing & SBOM Attestation (Sigstore Cosign)",
      gateType: "security",
      gateLabel: "Supply Chain Security (SLSA 3)",
      summary: "Generates an immutable Software Bill of Materials (SBOM) and signs the container digest using keyless OpenID Connect (OIDC) via Sigstore Cosign.",
      metrics: [
        { label: "Signing Standard", val: "Sigstore Cosign OIDC" },
        { label: "SBOM Format", val: "SPDX 2.3 JSON" },
        { label: "Transparency Log", val: "Rekor Public Ledger" }
      ],
      cmd: "$ syft catalog-api:7a3b91c -o spdx-json > sbom.spdx.json\n$ cosign sign --yes $ECR_REGISTRY/catalog-api@$DIGEST \\\n    --attachment sbom sbom.spdx.json",
      termOutput: `✔ Generated Software Bill of Materials with 48 packages using Syft.
[INFO] Generating ephemeral signing certificate using GitHub OIDC token...
Generating signing keys...
Signing image with certificate identity:
  https://github.com/devops-academy/microservices-platform/.github/workflows/pipeline.yml@refs/heads/main
Logging signature to Rekor transparency log (index 28941092)...
Signature uploaded to registry:
  123456789012.dkr.ecr.us-east-1.amazonaws.com/catalog-api:sha256-4b219018.sig

✔ Supply Chain Integrity verified. Tamper-proof certificate recorded.`
    },
    {
      id: 10,
      badge: "Stage 10",
      title: "Amazon ECR Immutable Registry Push & AWS KMS Encryption",
      gateType: "deploy",
      gateLabel: "Registry Artifact Lock",
      summary: "Pushes the signed multi-arch container to Amazon Elastic Container Registry (ECR). Tag immutability guarantees existing production tags cannot be overwritten.",
      metrics: [
        { label: "Registry", val: "AWS ECR (us-east-1)" },
        { label: "Encryption", val: "AWS KMS Customer Key" },
        { label: "Tag Policy", val: "IMMUTABLE" }
      ],
      cmd: "$ aws ecr get-login-password --region us-east-1 | docker login \\\n    --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com\n$ docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/catalog-api:v1.4.2",
      termOutput: `Login Succeeded!
The push refers to repository [123456789012.dkr.ecr.us-east-1.amazonaws.com/catalog-api]
7e02919ab23a: Layer already exists
4f9810ac8b11: Layer already exists
8b1a329d4c20: Pushed [================================>] 1.4MB/1.4MB
v1.4.2: digest: sha256:4b219018e6c780f2... size: 2842

>> ECR ScanOnPush triggered.
>> Image locked under KMS Key ID: arn:aws:kms:us-east-1:123456789012:key/ecr-prod
✔ Successfully published to Amazon ECR.`
    },
    {
      id: 11,
      badge: "Stage 11",
      title: "Staging Deployment & Automated Database Migrations",
      gateType: "deploy",
      gateLabel: "Staging Environment Gate",
      summary: "Applies non-destructive schema migrations via Alembic before container launch, then runs end-to-end synthetic Playwright browser workflows against Staging.",
      metrics: [
        { label: "Migration Engine", val: "Alembic / SQLAlchemy" },
        { label: "E2E Framework", val: "Playwright Headless" },
        { label: "Synthetic Tests", val: "16 / 16 Passed" }
      ],
      cmd: "$ alembic upgrade head && playwright test --config=playwright.staging.config.ts",
      termOutput: `[INFO] Connecting to Staging Aurora PostgreSQL Cluster (us-east-1)...
[INFO] Current DB Revision: 3a1b028c (Add user auth tables)
[INFO] Applying migration: 4f2c019d (Add redis caching metadata table)
[INFO] Running upgrade 3a1b028c -> 4f2c019d ... Done in 0.38s.

Running 16 Playwright synthetic browser test cases against https://staging.catalog.internal:
  ✔ [chromium] › smoke/healthcheck.spec.ts:8:5 › API responds HTTP 200 with JSON payload (18ms)
  ✔ [chromium] › smoke/cache.spec.ts:14:5 › Cold request loads DB; Warm request hits Redis cache (32ms)
  ✔ [chromium] › smoke/auth.spec.ts:28:5 › JWT token validation and rotation (45ms)
16 passed (4.2s)

✔ Staging verification complete. Pipeline promoted to Production Approval Gate.`
    },
    {
      id: 12,
      badge: "Stage 12",
      title: "Production Blue/Green Canary Traffic Shift & Zero-Downtime Rollout",
      gateType: "deploy",
      gateLabel: "Production SLO & Rollback Gate",
      summary: "AWS Application Load Balancer shifts traffic progressively to the Green cluster while real-time Datadog/CloudWatch monitors latency and HTTP 5xx errors.",
      metrics: [
        { label: "Traffic Policy", val: "Canary (10% ➔ 50% ➔ 100%)" },
        { label: "Error Budget", val: "5xx Rate < 0.05%" },
        { label: "P99 Latency", val: "38ms (SLO: < 100ms)" }
      ],
      cmd: "# AWS CodeDeploy / ALB Target Group Traffic Weight Shift\naws elbv2 modify-listener-certificates --listener-arn $ALB_LISTENER ...",
      termOutput: `[00:00] Initializing Canary Rollout:
        Blue Target Group (v1.4.1): 100% Traffic (Healthy)
        Green Target Group (v1.4.2):  0% Traffic (Healthy, Warm)

[00:30] Shifting Traffic: 10% to Green, 90% to Blue...
        Monitoring CloudWatch Alarms: ErrorRate5xx, LatencyP99, SyntheticCanary
        Metrics: Requests=4,280, 5xx=0 (0.00%), P99 Latency=38ms -> HEALTHY

[01:00] Shifting Traffic: 50% to Green, 50% to Blue...
        Metrics: Requests=21,400, 5xx=1 (0.004%), P99 Latency=41ms -> HEALTHY

[02:00] Shifting Traffic: 100% to Green Target Group...
        All production traffic successfully routed to v1.4.2.
        Draining Blue Target Group connections (deregistration delay 30s)...

🎉 DEPLOYMENT COMPLETE: v1.4.2 is LIVE in Multi-AZ Production with Zero Downtime!`
    }
  ];

  let currentStageIdx = 0;
  let autoTimer = null;
  let isAutoRunning = false;

  function initCicdRunner() {
    const container = document.getElementById('cicd-interactive-runner');
    if (!container) return;

    renderStageTabs();
    loadStage(0);
    bindControls();
  }

  function renderStageTabs() {
    const track = document.getElementById('cicd-stages-track');
    if (!track) return;

    track.innerHTML = '';
    CICD_STAGES.forEach((stage, idx) => {
      const btn = document.createElement('button');
      btn.className = 'cicd-stage-tab' + (idx === 0 ? ' active' : '');
      btn.setAttribute('data-idx', idx);
      btn.innerHTML = `
        <span class="cicd-stage-status"></span>
        <span class="cicd-stage-badge">${stage.badge}</span>
        <span>${stage.title.split('&')[0].trim()}</span>
      `;
      btn.addEventListener('click', () => {
        pauseAuto();
        loadStage(idx);
      });
      track.appendChild(btn);
    });
  }

  function loadStage(idx) {
    if (idx < 0 || idx >= CICD_STAGES.length) return;
    currentStageIdx = idx;

    const stage = CICD_STAGES[idx];

    // Update Tab Styles
    const tabs = document.querySelectorAll('.cicd-stage-tab');
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === idx);
      tab.classList.toggle('completed', i < idx);
    });

    // Auto-scroll tab into view
    const activeTab = tabs[idx];
    if (activeTab && activeTab.scrollIntoView) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Update Counter & Badge
    const counterEl = document.getElementById('cicd-stage-counter');
    if (counterEl) counterEl.textContent = `Stage ${idx + 1} of ${CICD_STAGES.length}`;

    const badgeEl = document.getElementById('cicd-gate-badge');
    if (badgeEl) {
      badgeEl.className = `cicd-gate-badge ${stage.gateType}`;
      badgeEl.textContent = stage.gateLabel;
    }

    // Update Title & Summary
    const titleEl = document.getElementById('cicd-stage-title');
    if (titleEl) titleEl.textContent = `${stage.badge}: ${stage.title}`;

    const summaryEl = document.getElementById('cicd-stage-summary');
    if (summaryEl) summaryEl.textContent = stage.summary;

    // Update Metrics
    const metricsContainer = document.getElementById('cicd-metrics-container');
    if (metricsContainer) {
      metricsContainer.innerHTML = stage.metrics.map(m => `
        <div class="cicd-spec-metric">
          <div class="cicd-spec-label">${m.label}</div>
          <div class="cicd-spec-val">${m.val}</div>
        </div>
      `).join('');
    }

    // Update Terminal
    const cmdEl = document.getElementById('cicd-term-cmd');
    if (cmdEl) cmdEl.textContent = stage.cmd;

    const outputEl = document.getElementById('cicd-term-output');
    if (outputEl) outputEl.textContent = stage.termOutput;

    // Update Progress Bar
    const progressEl = document.getElementById('cicd-progress-fill');
    if (progressEl) {
      const pct = Math.round(((idx + 1) / CICD_STAGES.length) * 100);
      progressEl.style.width = `${pct}%`;
    }
  }

  function bindControls() {
    const prevBtn = document.getElementById('btn-cicd-prev');
    const nextBtn = document.getElementById('btn-cicd-next');
    const autoBtn = document.getElementById('btn-cicd-autorun');
    const resetBtn = document.getElementById('btn-cicd-reset');
    const toggleYamlBtn = document.getElementById('btn-toggle-cicd-yaml');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        pauseAuto();
        if (currentStageIdx > 0) loadStage(currentStageIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        pauseAuto();
        if (currentStageIdx < CICD_STAGES.length - 1) loadStage(currentStageIdx + 1);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        pauseAuto();
        loadStage(0);
      });
    }

    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        if (isAutoRunning) {
          pauseAuto();
        } else {
          startAuto();
        }
      });
    }

    if (toggleYamlBtn) {
      toggleYamlBtn.addEventListener('click', () => {
        const body = document.getElementById('cicd-yaml-content');
        if (body) {
          const isHidden = body.style.display === 'none';
          body.style.display = isHidden ? 'block' : 'none';
          toggleYamlBtn.textContent = isHidden ? '▲ Hide .github/workflows/deploy.yml' : '▼ View .github/workflows/deploy.yml';
        }
      });
    }
  }

  function startAuto() {
    isAutoRunning = true;
    const autoBtn = document.getElementById('btn-cicd-autorun');
    if (autoBtn) autoBtn.textContent = '⏸ Pause Pipeline';
    advanceAuto();
  }

  function pauseAuto() {
    isAutoRunning = false;
    clearTimeout(autoTimer);
    const autoBtn = document.getElementById('btn-cicd-autorun');
    if (autoBtn) autoBtn.textContent = '▶ Auto-Run Pipeline';
  }

  function advanceAuto() {
    clearTimeout(autoTimer);
    if (!isAutoRunning) return;

    if (currentStageIdx < CICD_STAGES.length - 1) {
      autoTimer = setTimeout(() => {
        if (!isAutoRunning) return;
        loadStage(currentStageIdx + 1);
        advanceAuto();
      }, 3600);
    } else {
      pauseAuto();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCicdRunner);
  } else {
    initCicdRunner();
  }
})();
