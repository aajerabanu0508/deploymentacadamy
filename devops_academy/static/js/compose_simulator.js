/**
 * 🐙 Why Docker Compose? Interactive Multi-Service Simulator
 * Simulates Web + Redis Cache + PostgreSQL Database with live packet flow,
 * cache hit/miss logic, and declarative orchestration.
 */

(function () {
  'use strict';

  let hasCachedData = false;
  let requestCount = 0;
  let webReplicas = 1;
  let isSimulating = false;

  function init() {
    const sendReqBtn = document.getElementById('btn-simulate-request');
    const scaleBtn = document.getElementById('btn-scale-web');
    const resetCacheBtn = document.getElementById('btn-reset-cache');
    const toggleViewBtn = document.getElementById('btn-toggle-cli-compose');

    if (!sendReqBtn) return;

    sendReqBtn.addEventListener('click', () => {
      if (isSimulating) return;
      runRequestSimulation();
    });

    if (scaleBtn) {
      scaleBtn.addEventListener('click', () => {
        webReplicas = webReplicas === 1 ? 3 : 1;
        scaleBtn.textContent = webReplicas === 3 ? '📉 Scale Web (1x)' : '📈 Scale Web (3x Replicas)';
        renderTopology();
        logCompose(`$ docker compose up -d --scale web=${webReplicas}\n[+] Running ${webReplicas}/3\n ✔ Container web-${webReplicas} Started`);
      });
    }

    if (resetCacheBtn) {
      resetCacheBtn.addEventListener('click', () => {
        hasCachedData = false;
        const redisStatus = document.getElementById('redis-cache-badge');
        if (redisStatus) redisStatus.textContent = '0 items cached';
        logCompose('$ docker compose exec redis redis-cli FLUSHALL\nOK (Cache cleared)');
      });
    }

    if (toggleViewBtn) {
      toggleViewBtn.addEventListener('click', () => {
        const cliView = document.getElementById('compose-cli-comparison');
        const yamlView = document.getElementById('compose-yaml-view');
        if (cliView && yamlView) {
          const isYaml = yamlView.style.display !== 'none';
          yamlView.style.display = isYaml ? 'none' : 'block';
          cliView.style.display = isYaml ? 'block' : 'none';
          toggleViewBtn.textContent = isYaml ? '📄 View docker-compose.yml' : '⚙️ View Raw Docker Commands';
        }
      });
    }

    renderTopology();
  }

  function renderTopology() {
    const webContainerBox = document.getElementById('web-replicas-container');
    if (!webContainerBox) return;

    webContainerBox.innerHTML = '';
    for (let i = 1; i <= webReplicas; i++) {
      const pod = document.createElement('div');
      pod.className = 'service-node service-web' + (i === 1 ? ' active-target' : '');
      pod.id = `pod-web-${i}`;
      pod.innerHTML = `
        <div class="s-node-head">
          <span>🌐 web_${i}</span>
          <span class="s-node-port">500${i}:5000</span>
        </div>
        <div class="s-node-desc">Python / Flask Web API</div>
        <div class="s-node-dns">DNS: http://web_${i}</div>
      `;
      webContainerBox.appendChild(pod);
    }
  }

  function runRequestSimulation() {
    isSimulating = true;
    requestCount++;
    const sendBtn = document.getElementById('btn-simulate-request');
    const logEl = document.getElementById('compose-live-logs');
    const clientBox = document.getElementById('node-client');
    const redisBox = document.getElementById('node-redis');
    const dbBox = document.getElementById('node-db');
    const statusPill = document.getElementById('request-status-pill');

    if (sendBtn) sendBtn.disabled = true;

    // Pick target web replica
    const targetReplicaId = `pod-web-${((requestCount - 1) % webReplicas) + 1}`;
    const targetWeb = document.getElementById(targetReplicaId);

    // Step 1: Client -> Web
    highlightNode(clientBox, 'pulse-cyan');
    if (statusPill) {
      statusPill.className = 'pill-pending';
      statusPill.textContent = `Req #${requestCount}: Client ➔ ${targetReplicaId} (Port 5000)`;
    }
    logCompose(`[HTTP Request #${requestCount}] GET /api/products/42 HTTP/1.1\n  └── Routed to container: ${targetReplicaId}`);

    setTimeout(() => {
      removeHighlight(clientBox, 'pulse-cyan');
      highlightNode(targetWeb, 'pulse-cyan');

      // Step 2: Web -> Redis (Check Cache)
      setTimeout(() => {
        highlightNode(redisBox, 'pulse-amber');
        logCompose(`  ├── Checking Redis Cache: redis:6379 -> GET product:42`);

        setTimeout(() => {
          removeHighlight(redisBox, 'pulse-amber');

          if (hasCachedData) {
            // CACHE HIT!
            highlightNode(redisBox, 'pulse-green');
            if (statusPill) {
              statusPill.className = 'pill-success';
              statusPill.textContent = `⚡ CACHE HIT in Redis (2ms)! No DB query needed.`;
            }
            logCompose(`  ├── ⚡ CACHE HIT! Key 'product:42' found in Redis memory.\n  └── Returning HTTP 200 OK (Response: 2ms)`);

            finishSimulation(targetWeb, redisBox);
          } else {
            // CACHE MISS -> DB
            highlightNode(redisBox, 'pulse-orange');
            logCompose(`  ├── ⚠️ CACHE MISS! Key 'product:42' not in cache.`);
            if (statusPill) {
              statusPill.className = 'pill-warn';
              statusPill.textContent = `⚠️ Cache Miss! Querying PostgreSQL db:5432...`;
            }

            setTimeout(() => {
              removeHighlight(redisBox, 'pulse-orange');
              highlightNode(dbBox, 'pulse-purple');
              logCompose(`  ├── Connecting to DB via Compose DNS: postgresql://db:5432/shop\n  ├── Executing SQL: SELECT * FROM products WHERE id = 42;\n  └── DB Query execution time: 14ms`);

              setTimeout(() => {
                removeHighlight(dbBox, 'pulse-purple');
                highlightNode(redisBox, 'pulse-green');
                hasCachedData = true;
                const redisBadge = document.getElementById('redis-cache-badge');
                if (redisBadge) redisBadge.textContent = '1 item cached (product:42)';

                logCompose(`  ├── Saving result into Redis: SET product:42 [JSON] EX 300\n  └── Returning HTTP 200 OK to Client (Total: 18ms)`);

                if (statusPill) {
                  statusPill.className = 'pill-success';
                  statusPill.textContent = `✅ Complete (18ms). Next request will be a blazing fast CACHE HIT!`;
                }

                finishSimulation(targetWeb, redisBox);
              }, 900);
            }, 750);
          }
        }, 650);
      }, 600);
    }, 500);
  }

  function finishSimulation(targetWeb, otherNode) {
    setTimeout(() => {
      removeHighlight(targetWeb, 'pulse-cyan');
      if (otherNode) removeHighlight(otherNode, 'pulse-green');
      isSimulating = false;
      const sendBtn = document.getElementById('btn-simulate-request');
      if (sendBtn) sendBtn.disabled = false;
    }, 1200);
  }

  function highlightNode(el, className) {
    if (el) el.classList.add(className);
  }

  function removeHighlight(el, className) {
    if (el) el.classList.remove(className);
  }

  function logCompose(text) {
    const logEl = document.getElementById('compose-live-logs');
    if (!logEl) return;
    const div = document.createElement('div');
    div.className = 'compose-log-line';
    div.textContent = text;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
