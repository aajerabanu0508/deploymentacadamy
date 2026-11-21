/**
 * ============================================================================
 * 🐳 DevOps Academy — High-Precision 3D Docker Containerizer Studio
 * Architectural Three.js 22-Stage Spatial Simulation:
 * From Source Code & Dependencies ➔ Dockerfile Layers ➔ Runtime Namespaces
 * ➔ Multi-Container Docker Compose Microservices Topology.
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 22 Sequential Stages from Source Code to Docker Compose ---
  const STEPS = [
    // Phase 1: Source Code & Pre-Build Context (Stages 0-3)
    {
      num: 0,
      phase: "Phase 1: Source Code",
      pillLabel: "S01: app.py",
      title: "Stage 01/22: Developer Workspace & Application Source",
      subtitle: "Authoring Flask microservice logic in app.py",
      cmd: "$ cat app.py\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return jsonify(service='catalog-api', status='online')\n\nif __name__ == '__main__':\n    app.run(host='0.0.0.0', port=5000)",
      explanation: "Before containers exist, there is application source code. The developer authors logic, routes, and endpoints on their local workstation. The goal of Docker is to take this raw code and package it into an immutable, environment-independent artifact.",
      lines: [],
      camera: { x: 0, y: 2.4, z: 9.0, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'source_code'
    },
    {
      num: 1,
      phase: "Phase 1: Source Code",
      pillLabel: "S02: reqs.txt",
      title: "Stage 02/22: Dependency Manifest Specification",
      subtitle: "Pinning deterministic package versions in requirements.txt",
      cmd: "$ cat requirements.txt\nFlask==3.0.2\nWerkzeug==3.0.1\nredis==5.0.3\npsycopg2-binary==2.9.9\ngunicorn==21.2.0\npytest==8.0.2",
      explanation: "Production services require deterministic dependency pinning. Without strict versioning, an upstream package update can introduce breaking changes. Docker will compile these dependencies into an isolated caching layer.",
      lines: [],
      camera: { x: 0, y: 2.4, z: 9.0, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'requirements'
    },
    {
      num: 2,
      phase: "Phase 1: Source Code",
      pillLabel: "S03: .dockerignore",
      title: "Stage 03/22: Context Filtering Optimization",
      subtitle: "Preventing bloated git history & secrets via .dockerignore",
      cmd: "$ cat .dockerignore\n.git\n.github\n.venv\n__pycache__\n*.pyc\n.env\n*.md\nnode_modules",
      explanation: "When running docker build, the entire current directory is compressed and sent to the Docker daemon. The .dockerignore filter excludes multi-megabyte git history, local virtual environments, and sensitive .env secrets, keeping images small and secure.",
      lines: [],
      camera: { x: 0, y: 2.4, z: 9.0, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'dockerignore'
    },
    {
      num: 3,
      phase: "Phase 1: Source Code",
      pillLabel: "S04: Dockerfile",
      title: "Stage 04/22: Dockerfile OCI Specification Genesis",
      subtitle: "Parsing declarative instructions into an execution graph",
      cmd: "$ cat Dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER appuser\nEXPOSE 5000\nHEALTHCHECK --interval=30s CMD curl -f http://localhost:5000/health || exit 1\nCMD [\"python\", \"app.py\"]",
      explanation: "The Dockerfile is the immutable recipe for the container. The Docker daemon's BuildKit engine parses these instructions into an acyclic dependency graph, calculating layer caching hashes before running any steps.",
      lines: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      camera: { x: 0, y: 3.2, z: 9.8, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'dockerfile_blueprint'
    },

    // Phase 2: Dockerfile Immutable Layers Assembly (Stages 4-12)
    {
      num: 4,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S05: L1 Base",
      title: "Stage 05/22: Base OS Kernel & Userland Chassis",
      subtitle: "FROM python:3.12-slim (Layer 1)",
      cmd: "Step 1/9 : FROM python:3.12-slim\n ---> Pulling from library/python:3.12-slim\n ---> Digest: sha256:672e1ab5a78c (Debian 12 Bookworm + Python 3.12)\n ---> Layer 1 Chassis mounted on assembly turntable (79.1 MB)",
      explanation: "Pulls the minimal official Debian Linux userland with Python 3.12 binaries pre-compiled. In our 3D spatial simulation, this lands on the turntable as the heavy titanium chassis with dual spinning cooling turbines.",
      lines: [0],
      camera: { x: 2.4, y: 2.8, z: 8.2, targetX: 0, targetY: 1.5, targetZ: 0 },
      state: 'layer_1'
    },
    {
      num: 5,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S06: L2 Workdir",
      title: "Stage 06/22: Isolated Working Directory Sandbox",
      subtitle: "WORKDIR /app (Layer 2)",
      cmd: "Step 2/9 : WORKDIR /app\n ---> Running in c92e104b2a3f\n ---> Created isolated directory /app and bound as root execution context\n ---> Layer 2 mounted (0 MB delta)",
      explanation: "WORKDIR creates /app if it doesn't exist and sets it as the working directory for all subsequent COPY, RUN, and CMD instructions, preventing accidental pollution of the host root filesystem.",
      lines: [1],
      camera: { x: 2.4, y: 3.0, z: 8.2, targetX: 0, targetY: 1.6, targetZ: 0 },
      state: 'layer_2'
    },
    {
      num: 6,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S07: L3 Reqs",
      title: "Stage 07/22: Dependency Manifest Insertion & Cache Key",
      subtitle: "COPY requirements.txt . (Layer 3)",
      cmd: "Step 3/9 : COPY requirements.txt .\n ---> 94 bytes transferred via robotic rail\n ---> Calculated cryptographic hash: 3d81b241ef9a\n ---> Layer 3 Gold data cartridge docked",
      explanation: "Copying requirements.txt BEFORE application source code is the #1 Docker optimization rule. Because dependencies change far less frequently than code, Docker reuses cached wheels, cutting build times from minutes to milliseconds.",
      lines: [2],
      camera: { x: 2.4, y: 3.2, z: 8.2, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'layer_3'
    },
    {
      num: 7,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S08: L4 Pip",
      title: "Stage 08/22: Wheel Compilation & Package Bank Assembly",
      subtitle: "RUN pip install --no-cache-dir -r reqs.txt (Layer 4)",
      cmd: "Step 4/9 : RUN pip install --no-cache-dir -r requirements.txt\n ---> Downloading Flask-3.0.2-py3-none-any.whl (59 kB)\n ---> Compiling psycopg2-binary, redis, gunicorn\n ---> Layer 4 Mounted 4 modular memory package banks (45.8 MB)\n ---> Purged compile cache",
      explanation: "Executes pip install inside an isolated container sandbox. Compiles C extensions and installs python wheels into /usr/local/lib/python3.12/site-packages. Rendered in 3D as illuminated modular RAM banks with glowing status LEDs.",
      lines: [3],
      camera: { x: 2.4, y: 3.4, z: 8.2, targetX: 0, targetY: 2.0, targetZ: 0 },
      state: 'layer_4'
    },
    {
      num: 8,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S09: L5 Code",
      title: "Stage 09/22: Application Source Logic Injection",
      subtitle: "COPY . . (Layer 5)",
      cmd: "Step 5/9 : COPY . .\n ---> 42 application files transferred (app.py, templates, routes)\n ---> Respecting .dockerignore (excluded .git, .venv)\n ---> Layer 5 High-Tech Python Code Crystal mounted (2.4 MB)",
      explanation: "Injects application logic into /app. Because this step appears AFTER package installation, modifying app.py invalidates ONLY this layer and subsequent layers, leaving the 45MB pip layer cached!",
      lines: [4],
      camera: { x: 2.4, y: 3.6, z: 8.2, targetX: 0, targetY: 2.2, targetZ: 0 },
      state: 'layer_5'
    },
    {
      num: 9,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S10: USER 10001",
      title: "Stage 10/22: Non-Root Security Hardening",
      subtitle: "USER appuser:10001 (Security Shield)",
      cmd: "Step 6/9 : RUN groupadd -g 10001 appgroup && useradd -u 10001 -g appgroup -s /bin/sh appuser\nStep 7/9 : USER appuser:10001\n ---> Switched runtime security context from root (UID 0) to unprivileged appuser (UID 10001)\n ---> Enforced CIS Docker Benchmark Security Standard",
      explanation: "By default, Docker containers run as root (UID 0). If an attacker finds a remote code execution vulnerability, running as root could allow them to escape to the host kernel. Creating an unprivileged user (UID 10001) neutralizes this risk.",
      lines: [5],
      camera: { x: 2.2, y: 3.6, z: 8.2, targetX: 0, targetY: 2.2, targetZ: 0 },
      state: 'security_user'
    },
    {
      num: 10,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S11: L6 Port",
      title: "Stage 11/22: Network Interface Bulkhead Gateway",
      subtitle: "EXPOSE 5000 (Layer 6)",
      cmd: "Step 8/9 : EXPOSE 5000\n ---> Documenting network ingress contract on port 5000/tcp\n ---> In-cluster listening socket: 0.0.0.0:5000\n ---> Layer 6 Golden network bulkhead ring mounted",
      explanation: "EXPOSE informs Docker and orchestrators that the container listens on port 5000 at runtime. In our 3D simulation, an industrial network bulkhead socket with an illuminated golden port ring docks onto the chamber side wall.",
      lines: [6],
      camera: { x: 2.8, y: 3.6, z: 8.0, targetX: 0, targetY: 2.2, targetZ: 0 },
      state: 'layer_6'
    },
    {
      num: 11,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S12: Healthcheck",
      title: "Stage 12/22: Automated Healthcheck Probe Protocol",
      subtitle: "HEALTHCHECK --interval=30s --timeout=3s",
      cmd: "HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n  CMD curl -f http://localhost:5000/health || exit 1\n ---> Configured in-container heartbeat probe\n ---> Active health monitor beacon deployed",
      explanation: "A process can be running in memory but deadlocked or unresponsive to HTTP requests. HEALTHCHECK tells the Docker daemon and Kubernetes controllers to actively query /health, automatically restarting stalled containers.",
      lines: [7],
      camera: { x: 2.0, y: 4.0, z: 8.0, targetX: 0, targetY: 2.5, targetZ: 0 },
      state: 'healthcheck'
    },
    {
      num: 12,
      phase: "Phase 2: Docker Image Layers",
      pillLabel: "S13: L7 CMD",
      title: "Stage 13/22: Runtime Engine Ignition",
      subtitle: 'CMD ["python", "app.py"] (Layer 7)',
      cmd: 'Step 9/9 : CMD ["python", "app.py"]\n ---> Configured exec array format entrypoint\n ---> Bound PID 1 to python app.py (clean SIGTERM signal propagation)\n ---> Layer 7 Gyroscopic dual-gimbal reactor ignited',
      explanation: "Using the exec array format (CMD [\"python\", \"app.py\"]) runs Python directly as PID 1 without an intermediary /bin/sh wrapper. This ensures SIGTERM shutdown signals are immediately caught, enabling zero-downtime rolling deploys.",
      lines: [8],
      camera: { x: 2.2, y: 4.2, z: 8.0, targetX: 0, targetY: 2.6, targetZ: 0 },
      state: 'layer_7'
    },

    // Phase 3: Image Sealing & Container Runtime Isolation (Stages 13-17)
    {
      num: 13,
      phase: "Phase 3: Image Sealing & Runtime",
      pillLabel: "S14: Image Seal",
      title: "Stage 14/22: Immutable Image Packaging & SHA-256 Digest Sealing",
      subtitle: "Successfully built sha256:7f9a8b13 · Tagged myapp:v1.0.0",
      cmd: "Successfully tagged myapp:v1.0.0\nSuccessfully tagged myapp:latest\n[+] Corrugated maritime container armor clamped shut\n[+] Overhead crane docked heavy corrugated roof\n[+] Stainless steel digital certification plaque stamped\n[+] 7/7 Immutable layers sealed\nTotal Image Size: 127.3 MB · Ready for Distribution 🚀",
      explanation: "The Docker build process concludes! The stack of 7 immutable layers is locked into an OCI-compliant shipping container enclosure, sealed with a unique SHA-256 cryptographic digest that guarantees 100% repeatability across any cloud.",
      lines: [0, 1, 2, 3, 4, 5, 6],
      camera: { x: 3.0, y: 4.2, z: 9.5, targetX: 0, targetY: 2.0, targetZ: 0 },
      state: 'sealed_image'
    },
    {
      num: 14,
      phase: "Phase 3: Image Sealing & Runtime",
      pillLabel: "S15: Namespaces",
      title: "Stage 15/22: Container Instantiation & Linux Namespaces Allocation",
      subtitle: "docker run -d --name myapp -p 5000:5000 myapp:v1.0.0",
      cmd: "$ docker run -d --name myapp -p 5000:5000 myapp:v1.0.0\n4f9b2c8a1e3d0f7a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a\n[+] Allocated Linux Namespaces:\n    - PID: Isolated process tree (app.py is PID 1)\n    - NET: Private virtual eth0 network interface\n    - MNT: Sandboxed root filesystem view\n    - IPC: Isolated inter-process shared memory",
      explanation: "A container is NOT a virtual machine with its own guest kernel. It is a native Linux process isolated by the host kernel using namespaces: PID gives it a private process tree, NET gives it a private network stack, and MNT confines its disk access.",
      lines: [],
      camera: { x: 2.8, y: 4.0, z: 9.2, targetX: 0, targetY: 2.0, targetZ: 0 },
      state: 'container_namespaces'
    },
    {
      num: 15,
      phase: "Phase 3: Image Sealing & Runtime",
      pillLabel: "S16: Cgroups",
      title: "Stage 16/22: Cgroups Resource Limits Enforcement",
      subtitle: "Preventing noisy-neighbor CPU & RAM starvation",
      cmd: "$ docker update --cpus=\"1.5\" --memory=\"512m\" --memory-swap=\"512m\" myapp\n[+] Linux cgroups v2 configured in /sys/fs/cgroup/docker/4f9b2c8a/:\n    - cpu.max: 150000 100000 (1.5 CPU cores quota)\n    - memory.max: 536870912 bytes (512 MB hard ceiling)\n    - pids.max: 200 (fork bomb mitigation)",
      explanation: "While namespaces provide isolation, cgroups (Control Groups) provide resource governance. Cgroups restrict CPU cycles, memory heap allocation, and max threads, ensuring that a memory leak in one container cannot bring down the host operating system.",
      lines: [],
      camera: { x: 2.8, y: 4.0, z: 9.2, targetX: 0, targetY: 2.2, targetZ: 0 },
      state: 'cgroups_limits'
    },
    {
      num: 16,
      phase: "Phase 3: Image Sealing & Runtime",
      pillLabel: "S17: CoW Layer",
      title: "Stage 17/22: Ephemeral Copy-on-Write Layer Mounting",
      subtitle: "OverlayFS upperdir writable diff layer",
      cmd: "$ docker exec myapp touch /tmp/session_cache.lock\n[+] Storage Driver: OverlayFS\n    - lowerdir: /var/lib/docker/overlay2/layers (100% Read-Only)\n    - upperdir: /var/lib/docker/overlay2/4f9b2c8a/diff (Writable CoW)\n    - merged:   /var/lib/docker/overlay2/4f9b2c8a/merged (Container rootfs)\n[!] Base image layers remain 100% pristine and unmodified",
      explanation: "When a container modifies a file, OverlayFS copies the file from the read-only lowerdir into the thin writable upperdir before editing. Multiple running containers share the exact same underlying base image, saving gigabytes of disk space!",
      lines: [],
      camera: { x: 2.8, y: 4.2, z: 9.0, targetX: 0, targetY: 2.2, targetZ: 0 },
      state: 'copy_on_write'
    },
    {
      num: 17,
      phase: "Phase 3: Image Sealing & Runtime",
      pillLabel: "S18: Port 5000",
      title: "Stage 18/22: Host Port Forwarding & NAT Bridge Routing",
      subtitle: "iptables DNAT: 0.0.0.0:5000 ➔ 172.17.0.2:5000",
      cmd: "$ iptables -t nat -L DOCKER -n -v\nChain DOCKER (2 references)\n pkts bytes target     prot opt in     out     source      destination\n    0     0 DNAT       tcp  --  !docker0 *       0.0.0.0/0   0.0.0.0/0   tcp dpt:5000 to:172.17.0.2:5000\n[+] Host port 5000 bridged to virtual eth0 adapter on docker0 network",
      explanation: "Because containers run in a private network namespace with their own subnet (172.17.0.0/16), Docker manipulates Linux iptables NAT rules to forward traffic hitting host port 5000 into the container's virtual socket.",
      lines: [],
      camera: { x: 3.2, y: 3.8, z: 8.5, targetX: 0, targetY: 2.0, targetZ: 0 },
      state: 'port_forwarding'
    },

    // Phase 4: Multi-Container Topologies with Docker Compose (Stages 18-21)
    {
      num: 18,
      phase: "Phase 4: Docker Compose Orchestration",
      pillLabel: "S19: Compose YAML",
      title: "Stage 19/22: Multi-Container Compose Blueprint Specification",
      subtitle: "Declarative multi-tier topology in docker-compose.yml",
      cmd: "$ cat docker-compose.yml\nversion: '3.8'\nservices:\n  web:\n    build: .\n    ports: [\"5000:5000\"]\n    environment:\n      - REDIS_HOST=redis\n      - DB_HOST=db\n    networks: [app-mesh]\n  redis:\n    image: redis:7-alpine\n    networks: [app-mesh]\n  db:\n    image: postgres:16\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    networks: [app-mesh]\nvolumes:\n  db-data:\nnetworks:\n  app-mesh:",
      explanation: "Modern cloud applications are not monoliths; they require caches (Redis) and persistent databases (PostgreSQL). Docker Compose replaces dozens of manual, fragile shell commands with a single declarative configuration file.",
      lines: [],
      camera: { x: 0, y: 3.4, z: 9.8, targetX: 0, targetY: 1.8, targetZ: 0 },
      state: 'compose_blueprint'
    },
    {
      num: 19,
      phase: "Phase 4: Docker Compose Orchestration",
      pillLabel: "S20: Bridge Mesh",
      title: "Stage 20/22: Isolated Bridge Network Mesh & DNS Discovery",
      subtitle: "docker network create app-mesh (Automated Service Discovery)",
      cmd: "$ docker network create --driver bridge app-mesh\n[+] Created private software-defined bridge network 'app-mesh'\n[+] Embedded DNS Server registered names:\n    - 'web'   ➔ 172.28.0.2\n    - 'redis' ➔ 172.28.0.3\n    - 'db'    ➔ 172.28.0.4\nNo hardcoded IP addresses needed in code!",
      explanation: "Compose automatically creates an isolated virtual bridge network. Docker's embedded 127.0.0.11 DNS server resolves container service names (e.g. http://redis:6379, http://db:5432) directly, eliminating hardcoded IP addresses.",
      lines: [],
      camera: { x: 0, y: 5.4, z: 11.2, targetX: 0, targetY: 1.4, targetZ: 0 },
      state: 'compose_network'
    },
    {
      num: 20,
      phase: "Phase 4: Docker Compose Orchestration",
      pillLabel: "S21: DB Volume",
      title: "Stage 21/22: Stateful Volume Persistence Mounting",
      subtitle: "Decoupling data lifecycle from container lifecycle (db-data)",
      cmd: "$ docker volume create db-data\n[+] Allocated persistent volume 'db-data'\n    - Host Storage: /var/lib/docker/volumes/db-data/_data\n    - Container Mount: /var/lib/postgresql/data\n[!] PostgreSQL data survives container crashes, upgrades, and teardowns",
      explanation: "Containers are cattle: they can be destroyed and recreated in seconds. Docker Volumes store stateful database tables outside the container filesystem on the host storage engine, ensuring zero data loss during application restarts.",
      lines: [],
      camera: { x: 3.2, y: 2.8, z: 6.8, targetX: 3.2, targetY: 1.2, targetZ: 0 },
      state: 'compose_volume'
    },
    {
      num: 21,
      phase: "Phase 4: Docker Compose Orchestration",
      pillLabel: "S22: 3-Tier Stack",
      title: "Stage 22/22: Three-Tier Microservices Stack Orchestration",
      subtitle: "docker compose up -d (Web API + Redis Cache + PostgreSQL DB)",
      cmd: "$ docker compose up -d\n[+] Running 3/3\n ✔ Network app-mesh     Created\n ✔ Volume db-data        Created\n ✔ Container redis-1     Started (Healthy · Port 6379)\n ✔ Container db-1        Started (Healthy · Port 5432)\n ✔ Container web-1       Started (Healthy · Port 5000)\nAll services connected & communicating over isolated bridge mesh! 🚀",
      explanation: "The complete microservice topology boots up simultaneously in dependency order! The Web API talks to Redis for ultra-fast in-memory caching and queries PostgreSQL for relational persistence, running in perfect harmony.",
      lines: [],
      camera: { x: 0, y: 5.2, z: 12.8, targetX: 0, targetY: 1.6, targetZ: 0 },
      state: 'compose_running'
    }
  ];

  let currentStep = 0;
  let isAutoPlaying = false;
  let autoTimer = null;
  let isExplodedView = false;

  // Three.js Core
  let scene, camera, renderer, controls;
  let canvasContainer;
  let clock;

  // Procedural 3D Objects
  let turntableGroup;
  let blueprintStandGroup, blueprintCanvas, blueprintCtx, blueprintTexture;
  let laserPointerMesh, dataBeamMesh;
  let layerObjects = [];
  let fanBlades = [];
  let reactorGimbalInner, reactorGimbalOuter;
  let portRingMesh;
  let outerContainerGroup;
  let containerWalls = [];
  let containerLid;
  let lockingRods = [];
  let sealPlateMesh;
  let sparkParticles;

  // Additional 3D Objects for 22 Stages
  let developerWorkstationGroup, pythonLogoMesh;
  let dependencyVaultGroup, vaultScannerRing;
  let dockerignoreFilterGroup;
  let securityShieldMesh, healthBeaconMesh, cowLayerMesh;
  let namespaceRingsGroup, cgroupsMesh;
  let composeYamlGroup, composeNetworkGroup, composeVolumeGroup, composeFullStackGroup;
  let dnsRadarGroup, volumeLaserHead, composeRedisMesh, composePgMesh, composeDataStream;

  // Camera Lerp
  let targetCamPos = new THREE.Vector3(0, 2.4, 9.0);
  let targetLookAt = new THREE.Vector3(0, 1.8, 0);
  let isCameraLerping = false;

  // --- Interactive 3D Raycasting & State Variables ---
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredLayerGroup = null;
  let separationRatio = 0.0;
  let isAutoSpinning = false;
  let isWireframeMode = false;

  const LAYER_DETAILS = [
    {
      num: 1,
      title: "Layer 1: Base OS Chassis & Linux Userland",
      instruction: "FROM python:3.12-slim",
      size: "79.1 MB",
      driver: "overlay2 (ro)",
      hash: "sha256:672e1ab5a78c",
      security: "Certified OCI Debian 12 Bookworm",
      files: [
        "+ /usr/local/bin/python3.12 (executable binary)",
        "+ /etc/debian_version (Bookworm 12.5 minimal)",
        "+ /lib/x86_64-linux-gnu/libc.so.6 (glibc 2.36)",
        "+ /usr/bin/dpkg (package manager)"
      ],
      explanation: "This immutable base layer supplies the stripped-down Debian Linux rootfs and pre-compiled Python 3.12 runtime. It is pulled once and permanently cached on the host daemon."
    },
    {
      num: 2,
      title: "Layer 2: Isolated Working Directory Sandbox",
      instruction: "WORKDIR /app",
      size: "0 MB delta",
      driver: "overlay2 (ro)",
      hash: "sha256:c92e104b2a3f",
      security: "Root Traversal & Host Isolation Guard",
      files: [
        "+ /app (drwxr-xr-x directory initialized)",
        "Sets execution context for subsequent COPY and RUN"
      ],
      explanation: "WORKDIR ensures all application files and execution paths reside in /app rather than polluting root filesystem / directory. If /app does not exist, Docker creates it with 0755 permissions."
    },
    {
      num: 3,
      title: "Layer 3: Pinned Dependency Manifest",
      instruction: "COPY requirements.txt .",
      size: "94 Bytes",
      driver: "overlay2 (ro)",
      hash: "sha256:3d81b241ef9a",
      security: "Layer Cache Invalidation Boundary",
      files: [
        "+ /app/requirements.txt (pinned package spec)",
        "Flask==3.0.2, redis==5.0.3, psycopg2-binary==2.9.9"
      ],
      explanation: "Separating requirements.txt copy from code copy is the golden rule of container engineering. Because requirements change infrequently, Docker skips re-downloading expensive pip packages on code modifications."
    },
    {
      num: 4,
      title: "Layer 4: Compiled Wheels & Library Packages",
      instruction: "RUN pip install --no-cache-dir -r requirements.txt",
      size: "45.8 MB",
      driver: "overlay2 (ro)",
      hash: "sha256:8e019f4a12bc",
      security: "--no-cache-dir eliminates pip tarballs",
      files: [
        "+ /usr/local/lib/python3.12/site-packages/flask",
        "+ /usr/local/lib/python3.12/site-packages/redis",
        "+ /usr/local/lib/python3.12/site-packages/psycopg2",
        "+ /usr/local/lib/python3.12/site-packages/gunicorn"
      ],
      explanation: "Compiles C extensions and wheels inside an isolated build container. Using --no-cache-dir removes unnecessary package tarballs, reducing image size by ~40 MB."
    },
    {
      num: 5,
      title: "Layer 5: Application Source Logic Injection",
      instruction: "COPY . .",
      size: "2.4 MB",
      driver: "overlay2 (ro)",
      hash: "sha256:7f9a8b13c241",
      security: ".dockerignore excludes secrets and .git",
      files: [
        "+ /app/app.py (Flask routes & Redis logic)",
        "+ /app/templates/ (HTML blueprints)",
        "+ /app/static/ (CSS & WebGL scripts)",
        "Excluded: .git, .env, __pycache__, .venv"
      ],
      explanation: "Injects user application logic into the image. Because this layer sits near the bottom of the Dockerfile, frequent code edits only rebuild this 2.4 MB layer in 0.2s without touching dependencies."
    },
    {
      num: 6,
      title: "Layer 6: Network Ingress Port Binding",
      instruction: "EXPOSE 5000",
      size: "0 MB metadata",
      driver: "network binding",
      hash: "sha256:1a2b3c4d5e6f",
      security: "Documentation metadata / Bridge isolate",
      files: [
        "Network Protocol: TCP",
        "Target Container Port: 5000",
        "Host bridge mapping: -p 5000:5000"
      ],
      explanation: "Declares that the container listens on port 5000 at runtime. Acts as architectural documentation for orchestration engines (Kubernetes, AWS ECS, Docker Compose) to attach load balancer target groups."
    },
    {
      num: 7,
      title: "Layer 7: Runtime Process & Daemon Entrypoint",
      instruction: 'CMD ["python", "app.py"]',
      size: "0 MB metadata",
      driver: "exec metadata",
      hash: "sha256:9f8e7d6c5b4a",
      security: "Non-Shell Exec Form (PID 1 signals)",
      files: [
        "Exec format: [\"python\", \"app.py\"]",
        "Process ID: PID 1 in container namespace",
        "Signal propagation: Handles SIGTERM & SIGINT"
      ],
      explanation: "Specifies the default command executed when instantiating the container. Using exec form JSON syntax ensures Python runs directly as PID 1, receiving Unix termination signals cleanly without orphan zombie processes."
    }
  ];

  function init() {
    canvasContainer = document.getElementById('three-canvas-container');
    if (!canvasContainer) return;

    clock = new THREE.Clock();

    // High-Contrast Engineering CAD Dock
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a101d);
    scene.fog = new THREE.FogExp2(0x0a101d, 0.02);

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.copy(targetCamPos);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    canvasContainer.appendChild(renderer.domElement);

    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.maxPolarAngle = Math.PI / 2 + 0.01;
      controls.minDistance = 2.5;
      controls.maxDistance = 38;
      controls.target.copy(targetLookAt);
      controls.addEventListener('start', () => {
        isCameraLerping = false;
      });
    }

    // Build the Studio Environment
    setupStudioLighting();
    setupStudioFloor();
    setupTurntableDock();
    setupBlueprintStation();
    setupDetailedContainerLayers();
    setupRealisticIsoShippingContainer();
    setupAdvancedStageObjects();
    setupVFXSystems();

    // UI & Raycaster Listeners
    window.addEventListener('resize', onWindowResize);
    setupRaycasterInteractions();
    setupUIControls();

    // Set initial step
    updateStep(0);

    // Render loop
    animate();
  }

  // --- 1. Studio Lighting ---
  function setupStudioLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(7, 14, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 28;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 1.5);
    rimLight.position.set(-8, 6, -5);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x38bdf8, 1.3, 20);
    accentLight.position.set(-5, 4, 4);
    scene.add(accentLight);

    const underLight = new THREE.PointLight(0x0284c7, 1.2, 10);
    underLight.position.set(0, 0.4, 0);
    scene.add(underLight);
  }

  // --- 2. Studio Floor ---
  function setupStudioFloor() {
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      roughness: 0.65,
      metalness: 0.7
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(28, 28, 0x0284c7, 0x1e293b);
    grid.position.y = 0.005;
    scene.add(grid);

    // Radial shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sctx = shadowCanvas.getContext('2d');
    const grad = sctx.createRadialGradient(256, 256, 40, 256, 256, 250);
    grad.addColorStop(0, 'rgba(2, 6, 23, 0.85)');
    grad.addColorStop(0.5, 'rgba(2, 6, 23, 0.4)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.95 });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.012;
    scene.add(contactShadow);
  }

  // --- 3. Industrial Turntable Dock ---
  function setupTurntableDock() {
    turntableGroup = new THREE.Group();
    scene.add(turntableGroup);

    const baseGeo = new THREE.CylinderGeometry(3.6, 3.85, 0.28, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const turntable = new THREE.Mesh(baseGeo, baseMat);
    turntable.position.y = 0.14;
    turntable.receiveShadow = true;
    turntableGroup.add(turntable);

    const insertGeo = new THREE.CylinderGeometry(3.4, 3.4, 0.02, 48);
    const insertMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });
    const insert = new THREE.Mesh(insertGeo, insertMat);
    insert.position.y = 0.285;
    insert.receiveShadow = true;
    turntableGroup.add(insert);

    const ringGeo = new THREE.RingGeometry(3.08, 3.16, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
    const markRing = new THREE.Mesh(ringGeo, ringMat);
    markRing.rotation.x = -Math.PI / 2;
    markRing.position.y = 0.298;
    turntableGroup.add(markRing);

    const stanchionGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.75, 24);
    const stanchionMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const stanchionPositions = [
      [-2.15, 0.42, -1.55],
      [2.15, 0.42, -1.55],
      [-2.15, 0.42, 1.55],
      [2.15, 0.42, 1.55]
    ];
    stanchionPositions.forEach(p => {
      const col = new THREE.Mesh(stanchionGeo, stanchionMat);
      col.position.set(...p);
      col.castShadow = true;
      turntableGroup.add(col);

      const collarGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.06, 24);
      const collarMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.set(p[0], 0.72, p[2]);
      turntableGroup.add(collar);
    });
  }

  // --- 4. Blueprint Tablet & Hologram Stand ---
  function setupBlueprintStation() {
    blueprintStandGroup = new THREE.Group();
    blueprintStandGroup.position.set(-4.6, 2.8, 0.2);
    blueprintStandGroup.rotation.y = Math.PI / 5.2;
    scene.add(blueprintStandGroup);

    blueprintCanvas = document.createElement('canvas');
    blueprintCanvas.width = 600;
    blueprintCanvas.height = 900;
    blueprintCtx = blueprintCanvas.getContext('2d');
    blueprintTexture = new THREE.CanvasTexture(blueprintCanvas);
    blueprintTexture.minFilter = THREE.LinearFilter;

    const screenGeo = new THREE.BoxGeometry(3.0, 4.5, 0.08);
    const screenMat = new THREE.MeshStandardMaterial({
      map: blueprintTexture,
      roughness: 0.2,
      metalness: 0.1
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    blueprintStandGroup.add(screen);

    const laserGeo = new THREE.BoxGeometry(3.04, 0.04, 0.06);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    laserPointerMesh = new THREE.Mesh(laserGeo, laserMat);
    laserPointerMesh.position.set(0, 1.8, 0.05);
    blueprintStandGroup.add(laserPointerMesh);

    const beamGeo = new THREE.CylinderGeometry(0.015, 0.015, 4.5, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    dataBeamMesh = new THREE.Mesh(beamGeo, beamMat);
    dataBeamMesh.position.set(2.0, 0, 0);
    dataBeamMesh.rotation.z = -Math.PI / 3.8;
    dataBeamMesh.visible = false;
    blueprintStandGroup.add(dataBeamMesh);

    drawBlueprintCanvas([], 'dockerfile');
  }

  function drawBlueprintCanvas(activeLineIndices, mode = 'dockerfile') {
    const ctx = blueprintCtx;
    const w = blueprintCanvas.width;
    const h = blueprintCanvas.height;

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, 70);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, w, 70);

    let headerTitle = 'Dockerfile Specification';
    let headerTag = 'OCI amd64';

    if (mode === 'source_app') {
      headerTitle = 'app.py (Flask Microservice)';
      headerTag = 'Python 3.12';
    } else if (mode === 'source_reqs') {
      headerTitle = 'requirements.txt';
      headerTag = '6 Pinned Pkgs';
    } else if (mode === 'source_dockerignore') {
      headerTitle = '.dockerignore';
      headerTag = 'Build Filter';
    } else if (mode === 'compose') {
      headerTitle = 'docker-compose.yml';
      headerTag = 'Stack v3.8';
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillText(headerTitle, 28, 44);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px monospace';
    ctx.fillText(headerTag, 420, 44);

    if (mode === 'source_app') {
      const codeLines = [
        "from flask import Flask, jsonify",
        "import os, redis, psycopg2",
        "",
        "app = Flask(__name__)",
        "cache = redis.Redis(host='redis', port=6379)",
        "",
        "@app.route('/health')",
        "def health():",
        "    return jsonify(status='healthy', pid=os.getpid())",
        "",
        "@app.route('/products/<id>')",
        "def get_product(id):",
        "    cached = cache.get(f'prod:{id}')",
        "    if cached: return jsonify(src='cache', data=cached)",
        "    # Query postgres database...",
        "    return jsonify(src='db', id=id)"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      codeLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('from') || l.startsWith('import') ? '#818cf8' : l.startsWith('@app') ? '#38bdf8' : l.startsWith('def') ? '#34d399' : l.startsWith('#') ? '#64748b' : '#e2e8f0';
        ctx.fillText(l, 32, 125 + i * 42);
      });
    } else if (mode === 'source_reqs') {
      const reqLines = [
        "# Deterministic Production Dependencies",
        "Flask==3.0.2",
        "Werkzeug==3.0.1",
        "redis==5.0.3",
        "psycopg2-binary==2.9.9",
        "gunicorn==21.2.0",
        "pytest==8.0.2",
        "",
        "# Pinned versions guarantee byte-for-byte",
        "# reproducibility across build runners."
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '17px "SF Mono", monospace';
      reqLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#64748b' : l.includes('Flask') || l.includes('gunicorn') ? '#fbbf24' : '#38bdf8';
        ctx.fillText(l, 32, 135 + i * 44);
      });
    } else if (mode === 'source_dockerignore') {
      const ignoreLines = [
        "# Exclude multi-megabyte dev artifacts & secrets",
        ".git/",
        ".github/",
        ".venv/",
        "__pycache__/",
        "*.pyc",
        ".env          # CRITICAL: Never commit secrets!",
        "node_modules/",
        "*.md",
        "Dockerfile*"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      ignoreLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#64748b' : l.includes('.env') ? '#ef4444' : '#f87171';
        ctx.fillText(l, 32, 135 + i * 44);
      });
    } else if (mode === 'compose_yaml' || mode === 'compose') {
      const composeLines = [
        "# STAGE 19: docker-compose.yml BLUEPRINT",
        "version: '3.8'",
        "services:",
        "  web:    # Web API Service (Python/Flask)",
        "    build: .",
        "    ports: ['5000:5000']",
        "  redis:  # In-Memory Cache Service",
        "    image: redis:7-alpine",
        "  db:     # Relational Database Service",
        "    image: postgres:16",
        "    volumes: [db-data:/var/lib/postgresql/data]",
        "volumes:",
        "  db-data:  # Named Persistent Storage"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      composeLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#94a3b8' : l.includes('services:') || l.includes('web:') || l.includes('redis:') || l.includes('db:') ? '#38bdf8' : l.includes('image:') || l.includes('build:') ? '#34d399' : '#e2e8f0';
        ctx.fillText(l, 32, 125 + i * 40);
      });
    } else if (mode === 'compose_network') {
      const netLines = [
        "# STAGE 20: ISOLATED BRIDGE NETWORK MESH",
        "$ docker network inspect app-mesh",
        "Network: app-mesh (Driver: bridge)",
        "Subnet:  172.28.0.0/16",
        "Gateway: 172.28.0.1",
        "",
        "# Automatic DNS Discovery (127.0.0.11):",
        "  'web'   ➔ 172.28.0.2 (Port 5000)",
        "  'redis' ➔ 172.28.0.3 (Port 6379)",
        "  'db'    ➔ 172.28.0.4 (Port 5432)",
        "",
        "# Zero hardcoded IPs · Secure isolated subnet"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      netLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#64748b' : l.includes('Network:') || l.includes('Subnet:') ? '#38bdf8' : l.includes('➔') ? '#10b981' : '#e2e8f0';
        ctx.fillText(l, 32, 125 + i * 40);
      });
    } else if (mode === 'compose_volume') {
      const volLines = [
        "# STAGE 21: STATEFUL DATA VOLUME PERSISTENCE",
        "$ docker volume inspect db-data",
        "Volume:   db-data (Driver: local)",
        "Host Path:",
        "  /var/lib/docker/volumes/db-data/_data",
        "Container Mount:",
        "  /var/lib/postgresql/data",
        "",
        "[!] ARCHITECTURAL RULE:",
        "  Containers = Cattle (Disposable & Ephemeral)",
        "  Data       = Pets (Persistent & Backed up)",
        "  PostgreSQL tables survive docker compose down!"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      volLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#64748b' : l.includes('Volume:') || l.includes('Host Path:') ? '#10b981' : l.includes('[!]') || l.includes('Cattle') ? '#facc15' : '#e2e8f0';
        ctx.fillText(l, 32, 125 + i * 40);
      });
    } else if (mode === 'compose_full') {
      const fullLines = [
        "# STAGE 22: THREE-TIER STACK RUNNING",
        "$ docker compose up -d",
        "[+] Running 3/3",
        " ✔ Network app-mesh     Created & Bridged",
        " ✔ Volume db-data        Mounted (/var/lib/...)",
        " ✔ Container redis-1     Started (Healthy :6379)",
        " ✔ Container db-1        Started (Healthy :5432)",
        " ✔ Container web-1       Started (Healthy :5000)",
        "",
        "# LIVE TOPOLOGY STATUS:",
        "  web ➔ redis: CACHE HIT (0.8ms latency)",
        "  web ➔ db:    SQL QUERY 200 OK (ACID)"
      ];
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px "SF Mono", monospace';
      fullLines.forEach((l, i) => {
        ctx.fillStyle = l.startsWith('#') ? '#64748b' : l.includes('✔') ? '#10b981' : l.includes('Running') || l.includes('STATUS:') ? '#38bdf8' : '#e2e8f0';
        ctx.fillText(l, 32, 125 + i * 40);
      });
    } else {
      const instructions = [
        { num: '01', kw: 'FROM', arg: 'python:3.12-slim', color: '#818cf8' },
        { num: '02', kw: 'WORKDIR', arg: '/app', color: '#38bdf8' },
        { num: '03', kw: 'COPY', arg: 'requirements.txt .', color: '#34d399' },
        { num: '04', kw: 'RUN', arg: 'pip install -r reqs.txt', color: '#fbbf24' },
        { num: '05', kw: 'COPY', arg: '. .', color: '#60a5fa' },
        { num: '06', kw: 'USER', arg: 'appuser:10001', color: '#f43f5e' },
        { num: '07', kw: 'EXPOSE', arg: '5000', color: '#f59e0b' },
        { num: '08', kw: 'HEALTH', arg: 'CMD curl /health', color: '#10b981' },
        { num: '09', kw: 'CMD', arg: '["python", "app.py"]', color: '#c084fc' }
      ];

      const startY = 125;
      const spacing = 78;

      instructions.forEach((ins, idx) => {
        const y = startY + idx * spacing;
        const isActive = activeLineIndices.includes(idx);

        if (isActive) {
          ctx.fillStyle = 'rgba(2, 132, 199, 0.28)';
          ctx.fillRect(18, y - 36, w - 36, 56);
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(18, y - 36, w - 36, 56);
        }

        ctx.fillStyle = isActive ? '#38bdf8' : '#64748b';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(ins.num, 34, y);

        ctx.fillStyle = ins.color;
        ctx.font = 'bold 20px "SF Mono", monospace';
        ctx.fillText(ins.kw, 85, y);

        ctx.fillStyle = isActive ? '#ffffff' : '#cbd5e1';
        ctx.font = '18px "SF Mono", monospace';
        ctx.fillText(ins.arg, 220, y);
      });
    }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, h - 50, w, 50);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '14px monospace';
    ctx.fillText('OCI Compliant · Dockerfile v1.7 · amd64 target', 28, h - 20);

    blueprintTexture.needsUpdate = true;
  }

  // --- Helper: Floating 3D HUD Canvas Badge ---
  function createLayerBadge(tag, cmd, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 144, 20);
    ctx.fill();

    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 144, 20);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px -apple-system, sans-serif';
    ctx.fillText(tag, 32, 62);

    ctx.fillStyle = colorHex;
    ctx.font = 'bold 28px "SF Mono", monospace';
    ctx.fillText(cmd, 32, 116);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    return new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.47), mat);
  }

  // --- 5. Procedural Container Layers (L1 - L7) ---
  function setupDetailedContainerLayers() {
    const LAYER_SPECS = [
      { name: "Layer 1: Base OS", code: "FROM python:3.12-slim", y: 0.52, h: 0.38, color: 0x334155, hex: "#38bdf8" },
      { name: "Layer 2: WORKDIR", code: "WORKDIR /app", y: 0.94, h: 0.38, color: 0x0284c7, hex: "#38bdf8" },
      { name: "Layer 3: REQS", code: "COPY requirements.txt .", y: 1.36, h: 0.38, color: 0x059669, hex: "#10b981" },
      { name: "Layer 4: LIBS", code: "RUN pip install -r reqs", y: 1.78, h: 0.38, color: 0xd97706, hex: "#f59e0b" },
      { name: "Layer 5: CODE", code: "COPY . . (app.py)", y: 2.20, h: 0.38, color: 0x2563eb, hex: "#60a5fa" },
      { name: "Layer 6: PORT", code: "EXPOSE 5000", y: 2.62, h: 0.38, color: 0xca8a04, hex: "#eab308" },
      { name: "Layer 7: RUNTIME", code: 'CMD ["python", "app.py"]', y: 3.04, h: 0.38, color: 0x7c3aed, hex: "#a855f7" }
    ];

    layerObjects = LAYER_SPECS.map((spec, index) => {
      const group = new THREE.Group();
      group.userData = {
        baseY: spec.y,
        explodedY: spec.y + index * 0.85,
        targetY: spec.y,
        stepIndex: index + 1
      };

      // Base tray
      const trayGeo = new THREE.BoxGeometry(3.5, 0.04, 2.4);
      const trayMat = new THREE.MeshStandardMaterial({
        color: spec.color,
        roughness: 0.35,
        metalness: 0.75
      });
      const tray = new THREE.Mesh(trayGeo, trayMat);
      tray.position.y = -spec.h / 2 + 0.02;
      tray.receiveShadow = true;
      group.add(tray);

      // Tinted glass chamber
      const glassGeo = new THREE.BoxGeometry(3.48, spec.h - 0.04, 2.38);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.35,
        roughness: 0.12,
        metalness: 0.25,
        transmission: 0.70,
        depthWrite: false
      });
      const glassBox = new THREE.Mesh(glassGeo, glassMat);
      glassBox.position.y = 0.02;
      group.add(glassBox);

      // Luminous edges
      const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.5, spec.h, 2.4));
      const edgeLine = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: spec.hex, transparent: true, opacity: 0.95 })
      );
      group.add(edgeLine);

      // 3D HUD Badge
      const badge = createLayerBadge(`L${index + 1}: ${spec.name.replace(/Layer \d+: /, '')}`, spec.code, spec.hex);
      badge.position.set(2.18, 0, 1.05);
      badge.rotation.y = -Math.PI / 10;
      group.add(badge);

      // Physical Internals
      if (index === 0) {
        // Base OS: Dual Cooling Turbines & Linux Kernel
        for (let fx of [-0.9, 0.9]) {
          const housingGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24);
          const housing = new THREE.Mesh(housingGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }));
          housing.position.set(fx, -spec.h / 2 + 0.06, 0);
          group.add(housing);

          const fanGeo = new THREE.BoxGeometry(0.55, 0.02, 0.1);
          const fan = new THREE.Mesh(fanGeo, new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, emissive: 0x38bdf8, emissiveIntensity: 0.2 }));
          fan.position.set(fx, -spec.h / 2 + 0.11, 0);
          group.add(fan);
          fanBlades.push(fan);
        }

        const coreGeo = new THREE.BoxGeometry(0.8, 0.06, 0.8);
        const core = new THREE.Mesh(coreGeo, new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0284c7, emissiveIntensity: 0.7, metalness: 0.8 }));
        core.position.set(0, -spec.h / 2 + 0.05, 0);
        group.add(core);

      } else if (index === 1) {
        // WORKDIR /app
        const postGeo = new THREE.CylinderGeometry(0.08, 0.08, spec.h - 0.04, 16);
        const postMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, emissive: 0x0284c7, emissiveIntensity: 0.4 });
        for (let px of [-1.6, 1.6]) {
          for (let pz of [-1.05, 1.05]) {
            const p = new THREE.Mesh(postGeo, postMat);
            p.position.set(px, 0.02, pz);
            group.add(p);
          }
        }
        const dirGeo = new THREE.PlaneGeometry(1.6, 1.0);
        const dirPlane = new THREE.Mesh(dirGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.6 }));
        dirPlane.rotation.x = -Math.PI / 2;
        dirPlane.position.set(0, -spec.h / 2 + 0.03, 0);
        group.add(dirPlane);

      } else if (index === 2) {
        // Requirements: Gold-Pin Cartridge
        const cardGeo = new THREE.BoxGeometry(0.85, 0.12, 0.6);
        const card = new THREE.Mesh(cardGeo, new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2, emissive: 0x78350f, emissiveIntensity: 0.4 }));
        card.position.set(0, 0.02, 0.3);
        group.add(card);

        const busGeo = new THREE.BoxGeometry(1.1, 0.06, 0.8);
        const bus = new THREE.Mesh(busGeo, new THREE.MeshStandardMaterial({ color: 0x059669, emissive: 0x10b981, emissiveIntensity: 0.6 }));
        bus.position.set(0, -spec.h / 2 + 0.04, 0.3);
        group.add(bus);

      } else if (index === 3) {
        // Pip Libraries: 4 RAM Banks
        for (let bx = -1.2; bx <= 1.2; bx += 0.8) {
          const bankGeo = new THREE.BoxGeometry(0.5, spec.h * 0.72, 0.8);
          const bank = new THREE.Mesh(bankGeo, new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, emissive: 0xb45309, emissiveIntensity: 0.5 }));
          bank.position.set(bx, 0.02, 0);
          group.add(bank);

          const led = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.04), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
          led.position.set(bx, spec.h * 0.32, 0.42);
          group.add(led);
        }

      } else if (index === 4) {
        // Source Logic: Python Code Crystal
        const crystalGeo = new THREE.OctahedronGeometry(0.24, 0);
        const crystal = new THREE.Mesh(crystalGeo, new THREE.MeshStandardMaterial({
          color: 0x60a5fa,
          emissive: 0x2563eb,
          emissiveIntensity: 0.85,
          roughness: 0.1,
          metalness: 0.3
        }));
        crystal.position.set(0, 0.04, 0);
        group.add(crystal);

        const chip = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 1.2), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 }));
        chip.position.set(0, -spec.h / 2 + 0.03, 0);
        group.add(chip);

      } else if (index === 5) {
        // EXPOSE 5000: Bulkhead socket & Golden Port Ring
        const socketMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.18, 32), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 }));
        socketMesh.rotation.z = Math.PI / 2;
        socketMesh.position.set(1.78, 0.02, 0);
        group.add(socketMesh);

        portRingMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 16, 32), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15, emissive: 0xb45309, emissiveIntensity: 0.4 }));
        portRingMesh.rotation.y = Math.PI / 2;
        portRingMesh.position.set(1.88, 0.02, 0);
        group.add(portRingMesh);

      } else if (index === 6) {
        // Runtime CMD: Dual-Gimbal Gyroscopic Reactor
        reactorGimbalOuter = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.04, 16, 32), new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.9, roughness: 0.2, emissive: 0x7c3aed, emissiveIntensity: 0.5 }));
        reactorGimbalOuter.position.y = 0.02;
        group.add(reactorGimbalOuter);

        reactorGimbalInner = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.04, 16, 32), new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.9, roughness: 0.2, emissive: 0x7c3aed, emissiveIntensity: 0.5 }));
        reactorGimbalInner.position.y = 0.02;
        group.add(reactorGimbalInner);

        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xe9d5ff }));
        nucleus.position.y = 0.02;
        group.add(nucleus);
      }

      group.visible = false;
      group.position.y = spec.y + 4.5;
      group.scale.set(0.01, 0.01, 0.01);
      scene.add(group);
      return group;
    });
  }

  // --- 6. ISO Shipping Container Enclosure (Step 13) ---
  function setupRealisticIsoShippingContainer() {
    outerContainerGroup = new THREE.Group();
    scene.add(outerContainerGroup);

    const cw = 3.9;
    const ch = 3.2;
    const cd = 2.7;
    const cy = 1.95;

    const maritimeBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.45,
      roughness: 0.45
    });

    const steelIronMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3
    });

    // 8 Corner Castings
    const cornerBoxGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    const cornerCoords = [
      [-cw/2, cy - ch/2 + 0.14, -cd/2], [cw/2, cy - ch/2 + 0.14, -cd/2],
      [-cw/2, cy - ch/2 + 0.14,  cd/2], [cw/2, cy - ch/2 + 0.14,  cd/2],
      [-cw/2, cy + ch/2 - 0.14, -cd/2], [cw/2, cy + ch/2 - 0.14, -cd/2],
      [-cw/2, cy + ch/2 - 0.14,  cd/2], [cw/2, cy + ch/2 - 0.14,  cd/2],
    ];
    cornerCoords.forEach(pos => {
      const c = new THREE.Mesh(cornerBoxGeo, steelIronMat);
      c.position.set(...pos);
      c.castShadow = true;
      outerContainerGroup.add(c);
    });

    // Back Wall
    function createCorrugatedSideWall() {
      const wallGroup = new THREE.Group();
      const sheet = new THREE.Mesh(new THREE.BoxGeometry(cw - 0.1, ch - 0.2, 0.06), maritimeBlueMat);
      wallGroup.add(sheet);
      for (let rx = -cw/2 + 0.25; rx <= cw/2 - 0.25; rx += 0.24) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.12, ch - 0.22, 0.08), maritimeBlueMat);
        rib.position.set(rx, 0, 0.04);
        wallGroup.add(rib);
      }
      return wallGroup;
    }

    // Cutaway Observation Window Front Wall
    function createCutawayFrontWall() {
      const wallGroup = new THREE.Group();
      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.38, 0.08), maritimeBlueMat);
      topBeam.position.set(0, ch/2 - 0.19, 0);
      wallGroup.add(topBeam);

      const bottomBeam = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.38, 0.08), maritimeBlueMat);
      bottomBeam.position.set(0, -ch/2 + 0.19, 0);
      wallGroup.add(bottomBeam);

      const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, ch - 0.76, 0.08), maritimeBlueMat);
      leftPost.position.set(-cw/2 + 0.175, 0, 0);
      wallGroup.add(leftPost);

      const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, ch - 0.76, 0.08), maritimeBlueMat);
      rightPost.position.set(cw/2 - 0.175, 0, 0);
      wallGroup.add(rightPost);

      const windowGeo = new THREE.BoxGeometry(cw - 0.7, ch - 0.76, 0.04);
      const windowMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.26,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.82,
        depthWrite: false
      });
      const windowMesh = new THREE.Mesh(windowGeo, windowMat);
      wallGroup.add(windowMesh);

      const winLine = new THREE.LineSegments(new THREE.EdgesGeometry(windowGeo), new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 }));
      wallGroup.add(winLine);
      return wallGroup;
    }

    const frontWall = createCutawayFrontWall();
    frontWall.position.set(0, cy, cd/2);
    frontWall.userData = { targetZ: cd/2, startZ: cd/2 + 4.5 };

    const backWall = createCorrugatedSideWall();
    backWall.position.set(0, cy, -cd/2);
    backWall.userData = { targetZ: -cd/2, startZ: -cd/2 - 4.5 };

    const leftEndWall = new THREE.Mesh(new THREE.BoxGeometry(0.08, ch - 0.2, cd - 0.1), maritimeBlueMat);
    leftEndWall.position.set(-cw/2, cy, 0);
    leftEndWall.userData = { targetX: -cw/2, startX: -cw/2 - 4.5 };

    const rightDoorGroup = new THREE.Group();
    const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(0.08, ch - 0.2, cd - 0.1), maritimeBlueMat);
    rightDoorGroup.add(rightDoor);

    const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, ch - 0.3, 16);
    for (let rz of [-0.45, 0.45]) {
      const rod = new THREE.Mesh(rodGeo, steelIronMat);
      rod.position.set(0.08, 0, rz);
      rightDoorGroup.add(rod);
      lockingRods.push(rod);
    }
    rightDoorGroup.position.set(cw/2, cy, 0);
    rightDoorGroup.userData = { targetX: cw/2, startX: cw/2 + 4.5 };

    // Roof
    const roofGroup = new THREE.Group();
    const roofBase = new THREE.Mesh(new THREE.BoxGeometry(cw + 0.1, 0.12, cd + 0.1), maritimeBlueMat);
    roofGroup.add(roofBase);
    for (let rx = -cw/2 + 0.3; rx <= cw/2 - 0.3; rx += 0.32) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, cd - 0.1), maritimeBlueMat);
      ridge.position.set(rx, 0.08, 0);
      roofGroup.add(ridge);
    }

    const interiorLight = new THREE.PointLight(0xffffff, 2.2, 7.0);
    interiorLight.position.set(0, -0.2, 0);
    roofGroup.add(interiorLight);

    roofGroup.position.set(0, cy + ch/2 + 0.06, 0);
    roofGroup.userData = { targetY: cy + ch/2 + 0.06, startY: cy + ch/2 + 5.5 };
    containerLid = roofGroup;

    // Seal plate
    const sealCanvas = document.createElement('canvas');
    sealCanvas.width = 512;
    sealCanvas.height = 256;
    const sctx = sealCanvas.getContext('2d');
    sctx.fillStyle = '#ffffff';
    sctx.fillRect(0, 0, 512, 256);
    sctx.strokeStyle = '#0284c7';
    sctx.lineWidth = 10;
    sctx.strokeRect(5, 5, 502, 246);
    sctx.fillStyle = '#0f172a';
    sctx.font = 'bold 32px -apple-system, sans-serif';
    sctx.fillText('OCI CONTAINER CERTIFIED', 40, 60);
    sctx.fillStyle = '#334155';
    sctx.font = '24px monospace';
    sctx.fillText('TAG: myapp:v1.0.0', 40, 115);
    sctx.fillText('SHA: 7f9a8b13c2 (7 Layers)', 40, 160);
    sctx.fillStyle = '#059669';
    sctx.font = 'bold 26px monospace';
    sctx.fillText('STATUS: IMMUTABLE SEALED ✓', 40, 215);

    const sealTex = new THREE.CanvasTexture(sealCanvas);
    sealPlateMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.75), new THREE.MeshBasicMaterial({ map: sealTex, side: THREE.DoubleSide }));
    sealPlateMesh.position.set(-0.85, cy + ch/2 - 0.28, cd/2 + 0.12);
    sealPlateMesh.visible = false;

    containerWalls = [frontWall, backWall, leftEndWall, rightDoorGroup];
    outerContainerGroup.add(frontWall);
    outerContainerGroup.add(backWall);
    outerContainerGroup.add(leftEndWall);
    outerContainerGroup.add(rightDoorGroup);
    outerContainerGroup.add(containerLid);
    outerContainerGroup.add(sealPlateMesh);
    outerContainerGroup.visible = false;
  }

  // --- 7. Advanced Objects for Stages 0-22 (Developer Station, Vault, Filter, Namespaces, etc.) ---
  function setupAdvancedStageObjects() {
    // Stage 0: Developer Workstation & Holographic Code Node
    developerWorkstationGroup = new THREE.Group();
    developerWorkstationGroup.position.set(0, 0.32, 0);
    scene.add(developerWorkstationGroup);

    const deskGeo = new THREE.CylinderGeometry(1.8, 1.9, 0.1, 32);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.25 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    developerWorkstationGroup.add(desk);

    // Laptop Base
    const lapBaseGeo = new THREE.BoxGeometry(1.4, 0.05, 0.95);
    const lapBaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const lapBase = new THREE.Mesh(lapBaseGeo, lapBaseMat);
    lapBase.position.set(0, 0.08, 0.1);
    developerWorkstationGroup.add(lapBase);

    // Trackpad
    const trackpad = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.25), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.11, 0.32);
    developerWorkstationGroup.add(trackpad);

    // Laptop Screen
    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.92, 0.04), lapBaseMat);
    screenFrame.position.set(0, 0.58, -0.36);
    screenFrame.rotation.x = -0.32;
    developerWorkstationGroup.add(screenFrame);

    const screenDisplay = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.84), new THREE.MeshStandardMaterial({ color: 0x082f49, emissive: 0x0284c7, emissiveIntensity: 0.85 }));
    screenDisplay.position.set(0, 0.58, -0.34);
    screenDisplay.rotation.x = -0.32;
    developerWorkstationGroup.add(screenDisplay);

    // Floating 3D Python Code Crystal
    pythonLogoMesh = new THREE.Group();
    pythonLogoMesh.position.set(0, 1.45, 0);
    const pyTop = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.7, metalness: 0.8 }));
    pyTop.position.set(-0.12, 0.12, 0);
    pythonLogoMesh.add(pyTop);
    const pyBtm = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xd97706, emissiveIntensity: 0.7, metalness: 0.8 }));
    pyBtm.position.set(0.12, -0.12, 0);
    pythonLogoMesh.add(pyBtm);
    developerWorkstationGroup.add(pythonLogoMesh);

    const devBadge = createLayerBadge("catalog-api", "localhost:5000 · Flask", "#38bdf8");
    devBadge.position.set(0, 2.25, 0);
    developerWorkstationGroup.add(devBadge);
    developerWorkstationGroup.visible = false;

    // Stage 1: Dependency Manifest Vault (requirements.txt)
    dependencyVaultGroup = new THREE.Group();
    dependencyVaultGroup.position.set(0, 0.32, 0);
    scene.add(dependencyVaultGroup);

    const vaultPedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.1, 0.12, 6), deskMat);
    dependencyVaultGroup.add(vaultPedestal);

    // 6 Floating Dependency Cartridges
    const DEPS_DATA = [
      { name: "Flask", ver: "3.0.2", col: 0xf59e0b, hex: "#f59e0b" },
      { name: "Werkzeug", ver: "3.0.1", col: 0x38bdf8, hex: "#38bdf8" },
      { name: "redis", ver: "5.0.3", col: 0xef4444, hex: "#ef4444" },
      { name: "psycopg2", ver: "2.9.9", col: 0x2563eb, hex: "#60a5fa" },
      { name: "gunicorn", ver: "21.2.0", col: 0x10b981, hex: "#10b981" },
      { name: "pytest", ver: "8.0.2", col: 0xa855f7, hex: "#c084fc" }
    ];

    DEPS_DATA.forEach((dep, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const r = 1.35;
      const cartGroup = new THREE.Group();
      cartGroup.position.set(Math.cos(angle) * r, 0.95, Math.sin(angle) * r);

      const cartBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.55, 0.14),
        new THREE.MeshStandardMaterial({ color: dep.col, metalness: 0.85, roughness: 0.25, emissive: dep.col, emissiveIntensity: 0.4 })
      );
      cartGroup.add(cartBody);

      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.04), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95 }));
      pin.position.set(0, -0.3, 0);
      cartGroup.add(pin);

      dependencyVaultGroup.add(cartGroup);
    });

    vaultScannerRing = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.025, 16, 48), new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.85 }));
    vaultScannerRing.rotation.x = Math.PI / 2;
    vaultScannerRing.position.set(0, 0.95, 0);
    dependencyVaultGroup.add(vaultScannerRing);

    const vaultBadge = createLayerBadge("requirements.txt", "6 Pinned Dependencies", "#10b981");
    vaultBadge.position.set(0, 2.25, 0);
    dependencyVaultGroup.add(vaultBadge);
    dependencyVaultGroup.visible = false;

    // Stage 2: Context Sanitization Laser Filter Gateway (.dockerignore)
    dockerignoreFilterGroup = new THREE.Group();
    dockerignoreFilterGroup.position.set(0, 0.32, 0);
    scene.add(dockerignoreFilterGroup);

    const filterBase = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.2, 0.12, 32), deskMat);
    dockerignoreFilterGroup.add(filterBase);

    // Allowed Clean Source Zone (Left)
    const allowedGroup = new THREE.Group();
    allowedGroup.position.set(-1.15, 0.65, 0);
    const cleanFiles = ["app.py", "templates/", "static/"];
    cleanFiles.forEach((f, idx) => {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.35, 0.42),
        new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5, metalness: 0.8 })
      );
      cube.position.set(0, idx * 0.45, 0);
      allowedGroup.add(cube);
    });
    dockerignoreFilterGroup.add(allowedGroup);

    // Deflected Bloat / Secrets Zone (Right)
    const bloatGroup = new THREE.Group();
    bloatGroup.position.set(1.15, 0.65, 0);
    const bloatFiles = [
      { name: ".git (48MB)", col: 0xef4444 },
      { name: ".venv (120MB)", col: 0xef4444 },
      { name: ".env (SECRET!)", col: 0xdc2626 }
    ];
    bloatFiles.forEach((b, idx) => {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.38, 0.45),
        new THREE.MeshStandardMaterial({ color: b.col, emissive: b.col, emissiveIntensity: 0.6, metalness: 0.7, wireframe: true })
      );
      cube.position.set(0, idx * 0.48, 0);
      bloatGroup.add(cube);
    });
    dockerignoreFilterGroup.add(bloatGroup);

    // Central Laser Forcefield Barrier
    const laserBarrier = new THREE.Mesh(
      new THREE.PlaneGeometry(0.04, 2.2),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7, wireframe: true })
    );
    laserBarrier.position.set(0, 1.15, 0);
    dockerignoreFilterGroup.add(laserBarrier);

    const filterBadge = createLayerBadge(".dockerignore", "184MB Bloat Deflected", "#ef4444");
    filterBadge.position.set(0, 2.35, 0);
    dockerignoreFilterGroup.add(filterBadge);
    dockerignoreFilterGroup.visible = false;

    // A. Non-Root Security Shield (Stage 9)
    const secGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const secMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    securityShieldMesh = new THREE.Mesh(secGeo, secMat);
    securityShieldMesh.position.set(0, 2.2, 0);
    securityShieldMesh.visible = false;
    scene.add(securityShieldMesh);

    // B. Automated Healthcheck Beacon (Stage 11)
    const bGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.28, 16);
    const bMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.8 });
    healthBeaconMesh = new THREE.Mesh(bGeo, bMat);
    healthBeaconMesh.position.set(0, 3.42, 0);
    healthBeaconMesh.visible = false;
    scene.add(healthBeaconMesh);

    // C. Linux Namespaces Orbiting Rings (Stage 14)
    namespaceRingsGroup = new THREE.Group();
    const ringColors = [0xa855f7, 0x0ea5e9, 0x10b981];
    ringColors.forEach((col, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.4 + i * 0.35, 0.03, 16, 48),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 })
      );
      ring.rotation.x = Math.PI / 2 + i * 0.2;
      ring.rotation.y = i * 0.35;
      ring.position.y = 2.0;
      namespaceRingsGroup.add(ring);
    });
    namespaceRingsGroup.visible = false;
    scene.add(namespaceRingsGroup);

    // D. Cgroups Governor Hex Shield (Stage 15)
    const cgGeo = new THREE.CylinderGeometry(2.8, 2.8, 3.6, 6);
    const cgMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 });
    cgroupsMesh = new THREE.Mesh(cgGeo, cgMat);
    cgroupsMesh.position.set(0, 2.0, 0);
    cgroupsMesh.visible = false;
    scene.add(cgroupsMesh);

    // E. Writable Copy-on-Write Layer (Stage 16)
    const cowGeo = new THREE.BoxGeometry(3.6, 0.12, 2.5);
    const cowMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.6, metalness: 0.8 });
    cowLayerMesh = new THREE.Mesh(cowGeo, cowMat);
    cowLayerMesh.position.set(0, 3.65, 0);
    cowLayerMesh.visible = false;
    scene.add(cowLayerMesh);

    // F. Compose Multi-Tier Nodes — 4 Distinct Architectural Stages (18-21)

    // Stage 18: Compose YAML Specification & Holographic Planning Blueprint
    composeYamlGroup = new THREE.Group();
    scene.add(composeYamlGroup);

    // Floating Holographic YAML Manifest Tablet above turntable
    const yamlBoardGeo = new THREE.PlaneGeometry(2.2, 1.4);
    const yamlBoardMat = new THREE.MeshStandardMaterial({
      color: 0x07111e,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
      side: THREE.DoubleSide
    });
    const yamlBoard = new THREE.Mesh(yamlBoardGeo, yamlBoardMat);
    yamlBoard.position.set(0, 3.4, 0.2);
    composeYamlGroup.add(yamlBoard);

    const yamlBadge = createLayerBadge("docker-compose.yml", "services: web, redis, db", "#38bdf8");
    yamlBadge.position.set(0, 3.4, 0.25);
    composeYamlGroup.add(yamlBadge);

    // Holographic Ghost Nodes (Planned Declarations)
    // Ghost Redis (Wireframe Amber Cylinder at -3.8)
    const ghostRMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.75 });
    const ghostRedis = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 16), ghostRMat);
    ghostRedis.position.set(-3.8, 0.75, 0);
    composeYamlGroup.add(ghostRedis);
    const ghostRBadge = createLayerBadge("[PLANNED]", "redis:7-alpine (:6379)", "#f59e0b");
    ghostRBadge.position.set(-3.8, 1.85, 0);
    composeYamlGroup.add(ghostRBadge);

    // Ghost Postgres (Wireframe Blue Cylinder at 3.8)
    const ghostPMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.75 });
    const ghostPg = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.5, 16), ghostPMat);
    ghostPg.position.set(3.8, 0.8, 0);
    composeYamlGroup.add(ghostPg);
    const ghostPBadge = createLayerBadge("[PLANNED]", "postgres:16 (:5432)", "#38bdf8");
    ghostPBadge.position.set(3.8, 1.95, 0);
    composeYamlGroup.add(ghostPBadge);

    // Ghost Volume Canister (Wireframe Green Cylinder at 4.65)
    const ghostVMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.8 });
    const ghostVol = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.6, 12), ghostVMat);
    ghostVol.position.set(4.65, 0.35, 0.8);
    composeYamlGroup.add(ghostVol);

    // Laser Projection Beams linking YAML tablet to the 3 services
    const beamLineMat = new THREE.LineDashedMaterial({ color: 0x38bdf8, dashSize: 0.25, gapSize: 0.15, transparent: true, opacity: 0.8 });
    const beamWebGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 2.7, 0.2), new THREE.Vector3(0, 1.4, 0)]);
    const beamRedisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 2.7, 0.2), new THREE.Vector3(-3.8, 1.5, 0)]);
    const beamDbGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 2.7, 0.2), new THREE.Vector3(3.8, 1.6, 0)]);
    composeYamlGroup.add(new THREE.Line(beamWebGeo, beamLineMat));
    composeYamlGroup.add(new THREE.Line(beamRedisGeo, beamLineMat));
    composeYamlGroup.add(new THREE.Line(beamDbGeo, beamLineMat));

    const s18Badge = createLayerBadge("STAGE 19", "Declarative YAML Topology Blueprint", "#38bdf8");
    s18Badge.position.set(0, 4.3, 0);
    composeYamlGroup.add(s18Badge);
    composeYamlGroup.visible = false;


    // Stage 19: Software-Defined Bridge Network & Embedded DNS Mesh (app-mesh)
    composeNetworkGroup = new THREE.Group();
    scene.add(composeNetworkGroup);

    // Glowing Bridge Network Floor Plane
    const netFloorGeo = new THREE.PlaneGeometry(13, 6);
    const netFloorMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true, transparent: true, opacity: 0.45 });
    const netFloor = new THREE.Mesh(netFloorGeo, netFloorMat);
    netFloor.rotation.x = -Math.PI / 2;
    netFloor.position.set(0, 0.02, 0);
    composeNetworkGroup.add(netFloor);

    // Central DNS Router Antenna Tower (127.0.0.11)
    const dnsBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.4, 16), new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 }));
    dnsBase.position.set(0, 0.2, -2.4);
    composeNetworkGroup.add(dnsBase);

    const dnsPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 12), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, emissive: 0x0284c7, emissiveIntensity: 0.5 }));
    dnsPole.position.set(0, 1.1, -2.4);
    composeNetworkGroup.add(dnsPole);

    const dnsBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.9 }));
    dnsBeacon.position.set(0, 2.0, -2.4);
    composeNetworkGroup.add(dnsBeacon);

    // Rotating DNS Radar Rings
    dnsRadarGroup = new THREE.Group();
    dnsRadarGroup.position.set(0, 2.0, -2.4);
    for (let r = 0; r < 2; r++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55 + r * 0.35, 0.02, 8, 32), new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 }));
      ring.rotation.x = Math.PI / 2 + r * 0.4;
      dnsRadarGroup.add(ring);
    }
    composeNetworkGroup.add(dnsRadarGroup);

    const dnsBadge = createLayerBadge("127.0.0.11 DNS", "Embedded Docker Resolver", "#10b981");
    dnsBadge.position.set(0, 2.7, -2.4);
    composeNetworkGroup.add(dnsBadge);

    // Illuminated Neon Conduit Tubes connecting all services to the network
    const conduitMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
    // Tube DNS -> Web
    const tubeDnsWeb = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8), conduitMat);
    tubeDnsWeb.rotation.x = Math.PI / 2;
    tubeDnsWeb.position.set(0, 0.08, -1.2);
    composeNetworkGroup.add(tubeDnsWeb);

    // Tube Web -> Redis
    const tubeWebRedis = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.8, 8), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    tubeWebRedis.rotation.z = Math.PI / 2;
    tubeWebRedis.position.set(-1.9, 0.08, 0);
    composeNetworkGroup.add(tubeWebRedis);

    // Tube Web -> Postgres
    const tubeWebPg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.8, 8), new THREE.MeshBasicMaterial({ color: 0x2563eb }));
    tubeWebPg.rotation.z = Math.PI / 2;
    tubeWebPg.position.set(1.9, 0.08, 0);
    composeNetworkGroup.add(tubeWebPg);

    // Node platforms and IP tags
    const webIpBadge = createLayerBadge("web: 172.28.0.2", "DNS: http://web:5000", "#38bdf8");
    webIpBadge.position.set(0, 2.3, 0);
    composeNetworkGroup.add(webIpBadge);

    // Solid Redis Node in Stage 19
    const rMat19 = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xb45309, emissiveIntensity: 0.4, metalness: 0.8 });
    const redisMesh19 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 24), rMat19);
    redisMesh19.position.set(-3.8, 0.75, 0);
    composeNetworkGroup.add(redisMesh19);
    const rIpBadge = createLayerBadge("redis: 172.28.0.3", "DNS: redis:6379", "#f59e0b");
    rIpBadge.position.set(-3.8, 1.85, 0);
    composeNetworkGroup.add(rIpBadge);

    // Solid Postgres Node in Stage 19
    const pMat19 = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x1d4ed8, emissiveIntensity: 0.4, metalness: 0.9 });
    const pgMesh19 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.5, 24), pMat19);
    pgMesh19.position.set(3.8, 0.8, 0);
    composeNetworkGroup.add(pgMesh19);
    const pgIpBadge = createLayerBadge("db: 172.28.0.4", "DNS: db:5432", "#38bdf8");
    pgIpBadge.position.set(3.8, 1.95, 0);
    composeNetworkGroup.add(pgIpBadge);

    const s19Badge = createLayerBadge("NETWORK MESH", "app-mesh · Driver: bridge", "#0284c7");
    s19Badge.position.set(0, 4.3, 0);
    composeNetworkGroup.add(s19Badge);
    composeNetworkGroup.visible = false;


    // Stage 20: Stateful Volume Persistence Mounting (db-data)
    composeVolumeGroup = new THREE.Group();
    scene.add(composeVolumeGroup);

    // Shifted focus to Postgres DB & Persistent Storage Canister
    // Heavy Industrial Postgres Database Tower at (2.2, 0.8, 0)
    const pgTowerMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, emissive: 0x1e40af, emissiveIntensity: 0.5, metalness: 0.9, roughness: 0.2 });
    const pgTower = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.6, 24), pgTowerMat);
    pgTower.position.set(2.2, 0.85, 0);
    composeVolumeGroup.add(pgTower);

    // Database Status Rings
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 12, 32), new THREE.MeshBasicMaterial({ color: 0x60a5fa }));
      ring.rotation.x = Math.PI / 2;
      ring.position.set(2.2, 0.4 + i * 0.45, 0);
      composeVolumeGroup.add(ring);
    }
    const pgVolBadge = createLayerBadge("postgres_db", "Mount: /var/lib/postgresql/data", "#38bdf8");
    pgVolBadge.position.set(2.2, 2.0, 0);
    composeVolumeGroup.add(pgVolBadge);

    // Reinforced Persistent Volume Canister (db-data) at (4.2, 0.65, 0.4)
    const volMat = new THREE.MeshStandardMaterial({ color: 0x059669, emissive: 0x10b981, emissiveIntensity: 0.6, metalness: 0.85, roughness: 0.2 });
    const volCanister = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 24), volMat);
    volCanister.position.set(4.2, 0.65, 0.4);
    composeVolumeGroup.add(volCanister);

    // Golden Locking Latches
    const latchMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95 });
    const latch1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), latchMat);
    latch1.position.set(3.65, 0.65, 0.4);
    composeVolumeGroup.add(latch1);
    const latch2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), latchMat);
    latch2.position.set(4.75, 0.65, 0.4);
    composeVolumeGroup.add(latch2);

    // Subterranean Host Mount Pipeline plunging below floor into host storage
    const subPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 }));
    subPipe.position.set(4.2, -0.4, 0.4);
    composeVolumeGroup.add(subPipe);

    const hostDiskBase = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.1, 0.25, 24), new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x10b981, emissiveIntensity: 0.3 }));
    hostDiskBase.position.set(4.2, 0.05, 0.4);
    composeVolumeGroup.add(hostDiskBase);

    // Volume Laser Read/Write Head
    volumeLaserHead = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    volumeLaserHead.position.set(4.2, 0.7, 1.0);
    composeVolumeGroup.add(volumeLaserHead);

    const laserBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8), new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.85 }));
    laserBeam.rotation.x = Math.PI / 2;
    laserBeam.position.set(4.2, 0.7, 0.7);
    composeVolumeGroup.add(laserBeam);

    // Connecting Data Conduit between PostgreSQL and Volume
    const pipeGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 12);
    const pipe = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xd97706, emissiveIntensity: 0.5, metalness: 0.9 }));
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(3.2, 0.6, 0.2);
    composeVolumeGroup.add(pipe);

    // Badges & Persistence Guarantee Plaque
    const volBadge = createLayerBadge("VOLUME: db-data", "/var/lib/docker/volumes/db-data", "#10b981");
    volBadge.position.set(4.2, 1.5, 0.4);
    composeVolumeGroup.add(volBadge);

    const persistBanner = createLayerBadge("DATA SURVIVES TEARDOWNS", "Cattle Container vs Pet Data", "#facc15");
    persistBanner.position.set(3.2, 2.7, 0.2);
    composeVolumeGroup.add(persistBanner);

    // Low-opacity silhouettes for Web & Redis in background
    const bgWebGhost = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 1.6), new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.25 }));
    bgWebGhost.position.set(-1.2, 0.7, 0);
    composeVolumeGroup.add(bgWebGhost);

    const bgRedisGhost = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 16), new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.2 }));
    bgRedisGhost.position.set(-4.2, 0.75, 0);
    composeVolumeGroup.add(bgRedisGhost);

    composeVolumeGroup.visible = false;


    // Stage 21: Full Three-Tier Microservices Topology Orchestrated
    composeFullStackGroup = new THREE.Group();
    scene.add(composeFullStackGroup);

    // Solid Redis Node (:6379)
    const rMatFull = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xb45309, emissiveIntensity: 0.6, metalness: 0.85 });
    composeRedisMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.5, 24), rMatFull);
    composeRedisMesh.position.set(-3.8, 0.8, 0);
    composeFullStackGroup.add(composeRedisMesh);
    const rBadgeFull = createLayerBadge("redis:7-alpine", ":6379 (In-Memory L1 Cache)", "#f59e0b");
    rBadgeFull.position.set(-3.8, 1.95, 0);
    composeFullStackGroup.add(rBadgeFull);

    // Solid Postgres Node (:5432)
    const pMatFull = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x1d4ed8, emissiveIntensity: 0.5, metalness: 0.9 });
    composePgMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.6, 24), pMatFull);
    composePgMesh.position.set(3.8, 0.85, 0);
    composeFullStackGroup.add(composePgMesh);
    const pBadgeFull = createLayerBadge("postgres:16", ":5432 (Relational ACID Storage)", "#38bdf8");
    pBadgeFull.position.set(3.8, 2.05, 0);
    composeFullStackGroup.add(pBadgeFull);

    // Attached Persistent Volume Canister
    const vCanFull = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.65, 16), new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.7, metalness: 0.85 }));
    vCanFull.position.set(4.65, 0.38, 0.7);
    composeFullStackGroup.add(vCanFull);
    const vBadgeFull = createLayerBadge("Vol: db-data", "Host Bound Storage", "#10b981");
    vBadgeFull.position.set(4.65, 1.1, 0.7);
    composeFullStackGroup.add(vBadgeFull);

    // Central Web Node Tag on turntable (:5000)
    const webBadgeFull = createLayerBadge("web: catalog-api", "0.0.0.0:5000 (Flask Gunicorn)", "#38bdf8");
    webBadgeFull.position.set(0, 2.45, 0);
    composeFullStackGroup.add(webBadgeFull);

    // Bridge Network Floor Grid
    const meshPlaneFull = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 6),
      new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true, transparent: true, opacity: 0.4 })
    );
    meshPlaneFull.rotation.x = -Math.PI / 2;
    meshPlaneFull.position.set(0, 0.02, 0);
    composeFullStackGroup.add(meshPlaneFull);

    // Active Packet Particle Streams between Web <-> Redis and Web <-> DB
    const streamGeoFull = new THREE.BufferGeometry();
    const sPosFull = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      sPosFull[i * 3] = (Math.random() - 0.5) * 8.2;
      sPosFull[i * 3 + 1] = 0.65 + Math.random() * 0.5;
      sPosFull[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
    }
    streamGeoFull.setAttribute('position', new THREE.BufferAttribute(sPosFull, 3));
    composeDataStream = new THREE.Points(streamGeoFull, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.18, transparent: true, opacity: 0.95 }));
    composeFullStackGroup.add(composeDataStream);

    // Top Master Orchestration Plaque
    const topFullBadge = createLayerBadge("3/3 CONTAINERS RUNNING", "docker compose up -d (Mesh Active)", "#10b981");
    topFullBadge.position.set(0, 4.3, 0);
    composeFullStackGroup.add(topFullBadge);

    composeFullStackGroup.visible = false;
  }

  // --- 8. VFX Systems ---
  function setupVFXSystems() {
    const steamGeo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i+1] = 0.5 + Math.random() * 2.5;
      positions[i+2] = (Math.random() - 0.5) * 3;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.0
    });
    sparkParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(sparkParticles);
  }

  // --- Step Orchestration ---
  function updateStep(stepIndex) {
    currentStep = Math.max(0, Math.min(STEPS.length - 1, stepIndex));
    const data = STEPS[currentStep];

    const titleEl = document.getElementById('step-title');
    const subtitleEl = document.getElementById('step-subtitle');
    const explEl = document.getElementById('step-explanation');
    const counterEl = document.getElementById('step-counter');
    const termEl = document.getElementById('docker-terminal-logs');

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (explEl) explEl.textContent = data.explanation;
    if (counterEl) counterEl.textContent = `STAGE ${currentStep + 1} OF ${STEPS.length}`;

    if (termEl) {
      termEl.innerHTML = '';
      const lines = data.cmd.split('\n');
      lines.forEach(l => {
        const div = document.createElement('div');
        div.className = 'term-line ' + (l.startsWith('Step') || l.startsWith('docker') || l.startsWith('$') ? 'term-cmd' : l.startsWith('--->') || l.startsWith('[+]') ? 'term-ok' : 'term-info');
        div.textContent = l;
        termEl.appendChild(div);
      });
      termEl.scrollTop = termEl.scrollHeight;
    }

    // Blueprint Tablet Mode
    if (currentStep === 0) {
      drawBlueprintCanvas([], 'source_app');
    } else if (currentStep === 1) {
      drawBlueprintCanvas([], 'source_reqs');
    } else if (currentStep === 2) {
      drawBlueprintCanvas([], 'source_dockerignore');
    } else if (currentStep === 18) {
      drawBlueprintCanvas([], 'compose_yaml');
    } else if (currentStep === 19) {
      drawBlueprintCanvas([], 'compose_network');
    } else if (currentStep === 20) {
      drawBlueprintCanvas([], 'compose_volume');
    } else if (currentStep === 21) {
      drawBlueprintCanvas([], 'compose_full');
    } else {
      drawBlueprintCanvas(data.lines, 'dockerfile');
    }

    if (data.lines && data.lines.length > 0 && currentStep >= 4 && currentStep <= 12) {
      const activeLine = data.lines[0];
      laserPointerMesh.visible = true;
      laserPointerMesh.position.y = 1.82 - activeLine * 0.44;
      dataBeamMesh.visible = true;
    } else {
      laserPointerMesh.visible = false;
      dataBeamMesh.visible = false;
    }

    // Camera Lerp — trigger smooth flight
    if (data.camera) {
      targetCamPos.set(data.camera.x, data.camera.y, data.camera.z);
      targetLookAt.set(data.camera.targetX !== undefined ? data.camera.targetX : 0, data.camera.targetY, data.camera.targetZ !== undefined ? data.camera.targetZ : 0);
      isCameraLerping = true;
    }

    // Visual Objects State Machine
    // Stages 0, 1, 2 Rich 3D Features
    if (developerWorkstationGroup) developerWorkstationGroup.visible = (currentStep === 0);
    if (dependencyVaultGroup) dependencyVaultGroup.visible = (currentStep === 1);
    if (dockerignoreFilterGroup) dockerignoreFilterGroup.visible = (currentStep === 2);

    // Exactly maps each of the 22 stages to the exact number of 3D layers built so far:
    const VISIBLE_LAYERS = [
      0, // Step 0 (app.py: Developer Workstation)
      0, // Step 1 (reqs.txt: Dependency Vault)
      0, // Step 2 (.dockerignore: Context Laser Filter)
      0, // Step 3 (Dockerfile overview: Clean turntable)
      1, // Step 4 (L1 Base OS: FROM python:3.12-slim) -> Layer 0
      2, // Step 5 (L2 Workdir: WORKDIR /app) -> Layers 0, 1
      3, // Step 6 (L3 Reqs: COPY reqs) -> Layers 0, 1, 2
      4, // Step 7 (L4 Pip: RUN pip install) -> Layers 0, 1, 2, 3
      5, // Step 8 (L5 Code: COPY . .) -> Layers 0, 1, 2, 3, 4
      5, // Step 9 (USER 10001: Non-root) -> Layers 0..4 + security shield
      6, // Step 10 (L6 Port: EXPOSE 5000) -> Layers 0..5 (Port ring docks)
      6, // Step 11 (Healthcheck: HEALTHCHECK) -> Layers 0..5 + health beacon
      7, // Step 12 (L7 CMD: Runtime ignition) -> Layers 0..6 (Gyroscopic reactor)
      7, // Step 13 (Sealed Container)
      7, // Step 14 (Namespaces)
      7, // Step 15 (Cgroups)
      7, // Step 16 (CoW Layer)
      7, // Step 17 (Host Port 5000 NAT)
      0, // Step 18 (Compose YAML)
      0, // Step 19 (Bridge Mesh)
      0, // Step 20 (DB Volume)
      0  // Step 21 (3-Tier Running)
    ];

    const layerLimit = VISIBLE_LAYERS[currentStep] !== undefined ? VISIBLE_LAYERS[currentStep] : 0;
    layerObjects.forEach((lg, idx) => {
      if (idx < layerLimit && currentStep < 18) {
        lg.visible = true;
      } else {
        lg.visible = false;
        lg.position.y = lg.userData.baseY + 4.5;
        lg.scale.set(0.01, 0.01, 0.01);
      }
    });

    // 2. Security Shield (Stage 9)
    if (securityShieldMesh) securityShieldMesh.visible = (currentStep === 9);

    // 3. Health Beacon (Stage 11)
    if (healthBeaconMesh) healthBeaconMesh.visible = (currentStep === 11 || currentStep === 12);

    // 4. ISO Container Enclosure (Stages 13 - 17, plus active Web container in Stages 18, 19, 21)
    if ((currentStep >= 13 && currentStep <= 17) || currentStep === 18 || currentStep === 19 || currentStep === 21) {
      outerContainerGroup.visible = true;
      containerWalls[0].position.z = containerWalls[0].userData.targetZ;
      containerWalls[1].position.z = containerWalls[1].userData.targetZ;
      containerWalls[2].position.x = containerWalls[2].userData.targetX;
      containerWalls[3].position.x = containerWalls[3].userData.targetX;
      containerLid.position.y = containerLid.userData.targetY;
      sealPlateMesh.visible = true;
    } else {
      outerContainerGroup.visible = false;
      sealPlateMesh.visible = false;
    }

    // 5. Namespaces Rings (Stage 14)
    if (namespaceRingsGroup) namespaceRingsGroup.visible = (currentStep === 14);

    // 6. Cgroups Hex Mesh (Stage 15)
    if (cgroupsMesh) cgroupsMesh.visible = (currentStep === 15);

    // 7. Copy-on-Write Layer (Stage 16)
    if (cowLayerMesh) cowLayerMesh.visible = (currentStep === 16);

    // 8. Compose Groups (Stages 18 - 21) — 4 Distinct Architectural Views
    if (composeYamlGroup) composeYamlGroup.visible = (currentStep === 18);
    if (composeNetworkGroup) composeNetworkGroup.visible = (currentStep === 19);
    if (composeVolumeGroup) composeVolumeGroup.visible = (currentStep === 20);
    if (composeFullStackGroup) composeFullStackGroup.visible = (currentStep === 21);

    // Update Step Pills
    document.querySelectorAll('.step-pill').forEach((pill, idx) => {
      pill.classList.remove('active', 'done');
      if (idx === currentStep) {
        pill.classList.add('active');
        try {
          pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch (e) {}
      }
      else if (idx < currentStep) pill.classList.add('done');
    });

    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    if (prevBtn) prevBtn.disabled = currentStep === 0;
    if (nextBtn) nextBtn.disabled = currentStep === STEPS.length - 1;
  }

  // --- UI Controls ---
  function setupUIControls() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const autoBtn = document.getElementById('btn-auto');
    const resetBtn = document.getElementById('btn-reset');
    const explodeBtn = document.getElementById('btn-explode');
    const camResetBtn = document.getElementById('btn-cam-reset');
    const cinemaBtn = document.getElementById('btn-cinema-mode');
    const pillsContainer = document.getElementById('step-pills');

    // Continuous Explode Slider
    const explodeRange = document.getElementById('layer-explode-range');
    const explodeVal = document.getElementById('layer-explode-val');
    if (explodeRange) {
      explodeRange.addEventListener('input', (e) => {
        separationRatio = parseFloat(e.target.value) / 100;
        if (explodeVal) explodeVal.textContent = `${e.target.value}%`;
        isExplodedView = separationRatio > 0.1;
        if (explodeBtn) explodeBtn.textContent = separationRatio > 0.1 ? 'Collapse Stack' : 'Exploded View';
      });
    }

    // Camera Preset Buttons
    const camFrontBtn = document.getElementById('btn-cam-front');
    const camOverviewBtn = document.getElementById('btn-cam-overview');
    const camFocusBtn = document.getElementById('btn-cam-focus');
    const camContainerBtn = document.getElementById('btn-cam-container');
    const camTopcadBtn = document.getElementById('btn-cam-topcad');
    const camPresetBtns = [camFrontBtn, camOverviewBtn, camFocusBtn, camContainerBtn, camTopcadBtn];

    function setCamPresetActive(activeBtn) {
      camPresetBtns.forEach(b => { if (b) b.classList.remove('active'); });
      if (activeBtn) activeBtn.classList.add('active');
    }

    if (camFrontBtn) {
      camFrontBtn.addEventListener('click', () => {
        setCamPresetActive(camFrontBtn);
        targetCamPos.set(0, 2.4, 9.0);
        targetLookAt.set(0, 1.8, 0);
        isCameraLerping = true;
      });
    }

    if (camOverviewBtn) {
      camOverviewBtn.addEventListener('click', () => {
        setCamPresetActive(camOverviewBtn);
        targetCamPos.set(0, 6.5, 12.5);
        targetLookAt.set(0, 1.8, 0);
        isCameraLerping = true;
      });
    }

    if (camFocusBtn) {
      camFocusBtn.addEventListener('click', () => {
        setCamPresetActive(camFocusBtn);
        targetCamPos.set(4.6, 3.4, 5.8);
        targetLookAt.set(0, 1.8, 0);
        isCameraLerping = true;
      });
    }

    if (camContainerBtn) {
      camContainerBtn.addEventListener('click', () => {
        setCamPresetActive(camContainerBtn);
        targetCamPos.set(5.8, 4.4, 6.8);
        targetLookAt.set(0, 2.0, 0);
        isCameraLerping = true;
      });
    }

    if (camTopcadBtn) {
      camTopcadBtn.addEventListener('click', () => {
        setCamPresetActive(camTopcadBtn);
        targetCamPos.set(0, 14.2, 0.1);
        targetLookAt.set(0, 1.0, 0);
        isCameraLerping = true;
      });
    }

    // Auto-Spin Turntable Toggle
    const spinBtn = document.getElementById('btn-toggle-spin');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => {
        isAutoSpinning = !isAutoSpinning;
        if (controls) {
          controls.autoRotate = isAutoSpinning;
          controls.autoRotateSpeed = 2.4;
        }
        spinBtn.classList.toggle('active', isAutoSpinning);
        spinBtn.textContent = isAutoSpinning ? '🔄 Spin: ON' : '🔄 Spin: OFF';
      });
    }

    // CAD Wireframe Structural Toggle
    const wireframeBtn = document.getElementById('btn-toggle-wireframe');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        isWireframeMode = !isWireframeMode;
        wireframeBtn.classList.toggle('active', isWireframeMode);
        scene.traverse((obj) => {
          if (obj.isMesh && obj.material && !obj.material.isLineBasicMaterial) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => { m.wireframe = isWireframeMode; });
            } else {
              obj.material.wireframe = isWireframeMode;
            }
          }
        });
      });
    }

    // Live HTTP Traffic Packet Injector
    const trafficBtn = document.getElementById('btn-inject-traffic');
    if (trafficBtn) {
      trafficBtn.addEventListener('click', () => {
        injectSimulatedTraffic();
      });
    }

    // Modal Close
    const closeModalBtn = document.getElementById('btn-close-inspect-modal');
    const inspectModal = document.getElementById('layer-inspect-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeLayerInspectModal);
    if (inspectModal) {
      inspectModal.addEventListener('click', (e) => {
        if (e.target === inspectModal) closeLayerInspectModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLayerInspectModal();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { pauseAuto(); updateStep(currentStep - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { pauseAuto(); updateStep(currentStep + 1); });
    if (resetBtn) resetBtn.addEventListener('click', () => {
      pauseAuto();
      if (explodeRange) {
        explodeRange.value = 0;
        separationRatio = 0.0;
        if (explodeVal) explodeVal.textContent = '0%';
      }
      updateStep(0);
    });

    if (cinemaBtn) {
      cinemaBtn.addEventListener('click', () => {
        const grid = document.querySelector('.studio-layout-grid');
        if (grid) {
          const isCinema = grid.classList.toggle('is-cinema-mode');
          cinemaBtn.classList.toggle('is-toggled', isCinema);
          cinemaBtn.textContent = isCinema ? 'Standard View' : '⛶ Cinema View';
          setTimeout(() => { onWindowResize(); }, 320);
        }
      });
    }

    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        if (isAutoPlaying) pauseAuto();
        else startAuto();
      });
    }

    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => {
        isExplodedView = !isExplodedView;
        separationRatio = isExplodedView ? 1.0 : 0.0;
        if (explodeRange) {
          explodeRange.value = isExplodedView ? 100 : 0;
          if (explodeVal) explodeVal.textContent = isExplodedView ? '100%' : '0%';
        }
        explodeBtn.classList.toggle('is-toggled', isExplodedView);
        explodeBtn.textContent = isExplodedView ? 'Collapse Stack' : 'Exploded View';
      });
    }

    if (camResetBtn) {
      camResetBtn.addEventListener('click', () => {
        setCamPresetActive(camFrontBtn);
        targetCamPos.set(0, 2.4, 9.0);
        targetLookAt.set(0, 1.8, 0);
        isCameraLerping = true;
      });
    }

    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      STEPS.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = 'step-pill' + (idx === 0 ? ' active' : '');
        btn.textContent = s.pillLabel || `S${idx + 1}`;
        btn.title = `${s.phase}: ${s.title}`;
        btn.addEventListener('click', () => {
          pauseAuto();
          updateStep(idx);
        });
        pillsContainer.appendChild(btn);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        pauseAuto();
        updateStep(currentStep + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        pauseAuto();
        updateStep(currentStep - 1);
      } else if (e.key.toLowerCase() === 'p') {
        autoBtn?.click();
      }
    });
  }

  // --- Raycaster Mouse Interactions ---
  function setupRaycasterInteractions() {
    if (!canvasContainer) return;

    canvasContainer.addEventListener('mousemove', (e) => {
      const rect = canvasContainer.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const targets = [];
      layerObjects.forEach(lg => {
        if (lg.visible) {
          lg.traverse(child => {
            if (child.isMesh) {
              child.userData.layerGroup = lg;
              targets.push(child);
            }
          });
        }
      });

      const intersects = raycaster.intersectObjects(targets, false);
      const tooltip = document.getElementById('vp-3d-tooltip');

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.userData.layerGroup;
        if (hitGroup) {
          canvasContainer.style.cursor = 'pointer';
          hoveredLayerGroup = hitGroup;
          const layerIdx = hitGroup.userData.stepIndex - 1;
          const detail = LAYER_DETAILS[layerIdx];
          if (tooltip && detail) {
            const titleEl = document.getElementById('tt-layer-title');
            const cmdEl = document.getElementById('tt-layer-cmd');
            if (titleEl) titleEl.textContent = `L${detail.num}: ${detail.title.split(':')[1] || detail.title}`;
            if (cmdEl) cmdEl.textContent = `${detail.instruction} · ${detail.size}`;
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.clientX - rect.left}px`;
            tooltip.style.top = `${e.clientY - rect.top}px`;
          }
          return;
        }
      }

      // No hit
      canvasContainer.style.cursor = 'grab';
      hoveredLayerGroup = null;
      if (tooltip) tooltip.style.display = 'none';
    });

    canvasContainer.addEventListener('click', () => {
      if (hoveredLayerGroup) {
        const layerIdx = hoveredLayerGroup.userData.stepIndex - 1;
        openLayerInspectModal(layerIdx);
        const stepIdx = layerIdx + 4;
        if (stepIdx < STEPS.length) {
          pauseAuto();
          updateStep(stepIdx);
        }
      }
    });
  }

  function openLayerInspectModal(layerIdx) {
    const detail = LAYER_DETAILS[layerIdx];
    if (!detail) return;

    const modal = document.getElementById('layer-inspect-modal');
    if (!modal) return;

    const titleEl = document.getElementById('lim-title');
    const instEl = document.getElementById('lim-instruction');
    const sizeEl = document.getElementById('lim-size');
    const driverEl = document.getElementById('lim-driver');
    const hashEl = document.getElementById('lim-hash');
    const secEl = document.getElementById('lim-security');
    const explEl = document.getElementById('lim-explanation');
    const fileTree = document.getElementById('lim-file-tree');

    if (titleEl) titleEl.textContent = detail.title;
    if (instEl) instEl.textContent = detail.instruction;
    if (sizeEl) sizeEl.textContent = detail.size;
    if (driverEl) driverEl.textContent = detail.driver;
    if (hashEl) hashEl.textContent = detail.hash;
    if (secEl) secEl.textContent = detail.security;
    if (explEl) explEl.textContent = detail.explanation;

    if (fileTree) {
      fileTree.innerHTML = detail.files.map(f => `<div class="added">${f}</div>`).join('');
    }

    modal.classList.add('is-open');
  }

  function closeLayerInspectModal() {
    const modal = document.getElementById('layer-inspect-modal');
    if (modal) modal.classList.remove('is-open');
  }

  // Live HTTP Packet Simulation Burst
  function injectSimulatedTraffic() {
    if (portRingMesh) {
      portRingMesh.material.color.setHex(0x10b981);
      setTimeout(() => { portRingMesh.material.color.setHex(0xeab308); }, 800);
    }

    // Flash runtime nucleus
    const l7 = layerObjects[6];
    if (l7 && l7.visible) {
      l7.scale.set(1.08, 1.08, 1.08);
      setTimeout(() => { l7.scale.set(1.0, 1.0, 1.0); }, 300);
    }

    // Append to live terminal
    const termCmd = document.getElementById('term-cmd');
    if (termCmd) {
      const cur = termCmd.textContent;
      termCmd.textContent = cur + `\n\n$ curl -i http://localhost:5000/products/42\nHTTP/1.1 200 OK\nContent-Type: application/json\n{"service":"catalog-api","status":"online","cached":true,"latency_ms":11}`;
    }
  }

  function startAuto() {
    isAutoPlaying = true;
    const autoBtn = document.getElementById('btn-auto');
    if (autoBtn) autoBtn.textContent = '⏸ Pause';
    advanceAuto();
  }

  function pauseAuto() {
    isAutoPlaying = false;
    clearTimeout(autoTimer);
    const autoBtn = document.getElementById('btn-auto');
    if (autoBtn) autoBtn.textContent = '▶ Auto-Play';
  }

  function advanceAuto() {
    clearTimeout(autoTimer);
    if (!isAutoPlaying) return;

    if (currentStep < STEPS.length - 1) {
      autoTimer = setTimeout(() => {
        if (!isAutoPlaying) return;
        updateStep(currentStep + 1);
        advanceAuto();
      }, 3800);
    } else {
      pauseAuto();
    }
  }

  function onWindowResize() {
    if (!canvasContainer || !camera || !renderer) return;
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Camera Lerp — Only runs while transitioning between steps/presets
    if (isCameraLerping) {
      camera.position.lerp(targetCamPos, 0.055);
      if (controls) controls.target.lerp(targetLookAt, 0.06);
      if (camera.position.distanceTo(targetCamPos) < 0.06) {
        camera.position.copy(targetCamPos);
        if (controls) controls.target.copy(targetLookAt);
        isCameraLerping = false;
      }
    }
    if (controls) controls.update();

    // Stage 0 Python Emblem & Stage 1 Scanner Rotations
    if (pythonLogoMesh && developerWorkstationGroup && developerWorkstationGroup.visible) {
      pythonLogoMesh.rotation.y += delta * 1.6;
    }
    if (vaultScannerRing && dependencyVaultGroup && dependencyVaultGroup.visible) {
      vaultScannerRing.rotation.z += delta * 1.5;
    }

    // Blueprint Floating
    if (blueprintStandGroup) {
      blueprintStandGroup.position.y = 2.8 + Math.sin(elapsed * 1.6) * 0.05;
    }

    // Fans & Reactors
    fanBlades.forEach(fan => { fan.rotation.y += delta * 12.0; });
    if (reactorGimbalOuter) reactorGimbalOuter.rotation.x += delta * 1.6;
    if (reactorGimbalInner) reactorGimbalInner.rotation.y += delta * 2.4;
    if (portRingMesh) portRingMesh.rotation.z += delta * 3.2;

    // Security Shield Pulse
    if (securityShieldMesh && securityShieldMesh.visible) {
      securityShieldMesh.rotation.y += delta * 1.2;
    }

    // Namespaces Rings Rotation
    if (namespaceRingsGroup && namespaceRingsGroup.visible) {
      namespaceRingsGroup.children.forEach((r, i) => {
        r.rotation.z += delta * (1.0 + i * 0.5);
      });
    }

    // Stage 19: DNS Radar Rings Animation
    if (dnsRadarGroup && composeNetworkGroup && composeNetworkGroup.visible) {
      dnsRadarGroup.children.forEach((r, idx) => {
        r.rotation.z += delta * (1.2 + idx * 0.8);
      });
    }

    // Stage 20: Volume Laser Read/Write Head Animation
    if (volumeLaserHead && composeVolumeGroup && composeVolumeGroup.visible) {
      volumeLaserHead.position.y = 0.65 + Math.sin(elapsed * 4.0) * 0.35;
    }

    // Stage 21: Redis Core Rotation
    if (composeRedisMesh && composeFullStackGroup && composeFullStackGroup.visible) {
      composeRedisMesh.rotation.y += delta * 1.5;
    }

    // Stage 21: Compose Data Packets Animation
    if (composeDataStream && composeFullStackGroup && composeFullStackGroup.visible) {
      const pos = composeDataStream.geometry.attributes.position.array;
      for (let i = 0; i < 90; i++) {
        pos[i * 3] += (Math.random() - 0.48) * 0.2;
        if (pos[i * 3] > 4.4) pos[i * 3] = -4.4;
      }
      composeDataStream.geometry.attributes.position.needsUpdate = true;
    }

    // Layer Physics & Continuous Explode Lerp
    layerObjects.forEach((lg, idx) => {
      if (lg.visible) {
        let targetY;
        if (separationRatio > 0.001) {
          targetY = lg.userData.baseY + idx * 0.95 * (separationRatio * 1.85);
        } else {
          targetY = isExplodedView ? lg.userData.explodedY : lg.userData.baseY;
        }
        lg.position.y += (targetY - lg.position.y) * 0.15;

        // Hover scale feedback
        const isHovered = hoveredLayerGroup === lg;
        const targetScale = isHovered ? 1.03 : 1.0;
        lg.scale.x += (targetScale - lg.scale.x) * 0.18;
        lg.scale.y += (targetScale - lg.scale.y) * 0.18;
        lg.scale.z += (targetScale - lg.scale.z) * 0.18;
      }
    });

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
