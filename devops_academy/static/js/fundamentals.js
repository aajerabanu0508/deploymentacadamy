/**
 * 🧠 Fundamentals Engine: Image vs Container
 * Visualizes the immutable read-only image layers and dynamic read-write container layers.
 */

(function () {
  'use strict';

  let spawnedContainers = [];
  let nextPort = 5001;

  function init() {
    const spawnBtn = document.getElementById('btn-spawn-container');
    const killAllBtn = document.getElementById('btn-kill-containers');
    const writeTestBtn = document.getElementById('btn-test-cow');
    const containersGrid = document.getElementById('active-containers-list');
    const imageStatusBadge = document.getElementById('image-status-badge');

    if (!spawnBtn || !containersGrid) return;

    spawnBtn.addEventListener('click', () => {
      if (spawnedContainers.length >= 4) {
        alert("Maximum 4 demo containers running. Click 'Stop All' to clear.");
        return;
      }
      spawnContainer();
    });

    if (killAllBtn) {
      killAllBtn.addEventListener('click', () => {
        spawnedContainers = [];
        renderContainers();
        updateImageBadge();
      });
    }

    if (writeTestBtn) {
      writeTestBtn.addEventListener('click', () => {
        if (spawnedContainers.length === 0) {
          spawnContainer();
        }
        // Write to Container #1's read-write layer
        const target = spawnedContainers[0];
        target.writes.push(`order_${Math.floor(Math.random() * 900 + 100)}.json (1.2 KB)`);
        renderContainers();
        
        const feedback = document.getElementById('cow-feedback');
        if (feedback) {
          feedback.innerHTML = `✅ Wrote file to <strong>${target.name}</strong>'s Read-Write layer only! The underlying <strong>Image remains 100% untouched and pristine</strong>.`;
          feedback.classList.remove('hidden');
          setTimeout(() => feedback.classList.add('hidden'), 5000);
        }
      });
    }

    // Spawn 1 container by default
    spawnContainer();
  }

  function spawnContainer() {
    const id = Math.random().toString(16).substring(2, 8);
    const containerNum = spawnedContainers.length + 1;
    const port = nextPort++;
    const container = {
      id: id,
      name: `web-app-${containerNum}`,
      port: port,
      ram: Math.floor(Math.random() * 15 + 40) + ' MB',
      cpu: (Math.random() * 1.5 + 0.2).toFixed(1) + '%',
      pid: Math.floor(Math.random() * 8000 + 1000),
      status: 'Up (healthy)',
      writes: []
    };
    spawnedContainers.push(container);
    renderContainers();
    updateImageBadge();
  }

  function renderContainers() {
    const grid = document.getElementById('active-containers-list');
    const emptyState = document.getElementById('containers-empty-state');
    const countEl = document.getElementById('container-count-badge');
    if (!grid) return;

    if (countEl) countEl.textContent = `${spawnedContainers.length} Running`;

    if (spawnedContainers.length === 0) {
      grid.innerHTML = '<div style="color:var(--text-dim);padding:24px;text-align:center;font-size:13px;">No containers running. Click "docker run" to instantiate one from the image!</div>';
      return;
    }

    grid.innerHTML = '';
    spawnedContainers.forEach((c, idx) => {
      const card = document.createElement('div');
      card.className = 'active-c-card';
      card.innerHTML = `
        <div class="c-card-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="pulse-dot"></span>
            <strong style="color:#fff;font-size:13px;">${c.name}</strong>
          </div>
          <span class="c-card-id">${c.id}</span>
        </div>
        <div class="c-card-stats">
          <div><span style="color:var(--text-dim);">Port:</span> 0.0.0.0:${c.port}➔5000</div>
          <div><span style="color:var(--text-dim);">PID:</span> ${c.pid}</div>
          <div><span style="color:var(--text-dim);">RAM:</span> ${c.ram}</div>
          <div><span style="color:var(--text-dim);">CPU:</span> ${c.cpu}</div>
        </div>
        <div class="c-card-layer">
          <div style="font-size:10px;font-weight:800;color:var(--amber);letter-spacing:0.5px;text-transform:uppercase;">
            Top Read/Write Layer (Isolated):
          </div>
          <div style="font-size:11px;font-family:var(--font-mono);color:#cbd5e1;margin-top:3px;">
            ${c.writes.length > 0 ? c.writes.map(w => '📄 ' + w).join('<br>') : '<span style="color:var(--text-dim);">[Empty · using underlying image]</span>'}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function updateImageBadge() {
    const badge = document.getElementById('image-status-badge');
    if (!badge) return;
    badge.textContent = `Used by ${spawnedContainers.length} running container${spawnedContainers.length === 1 ? '' : 's'}`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
