/**
 * ============================================================================
 * ☁️ DevOps Academy — 3D Cloud Migration & AWS Infrastructure Studio
 * 14-Stage Spatial Simulation:
 *   - 7 Stages: On-Premises Setup, Technician Laptop Crash Cart & Emergency Shutdown
 *   - 7 Stages: AWS Cloud Multi-AZ Architecture, Auto-Scaling & Automated Failover
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 14-Stage Architectural Specification ---
  const AWS_STEPS = [
    // =========================================================================
    // PHASE 1: PHYSICAL ON-PREMISES BARE-METAL INFRASTRUCTURE (STAGES 1 - 7)
    // Setup, Operational Friction, Capacity Ceilings & Emergency Shutdown
    // =========================================================================
    {
      num: 0,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-01: Procurement",
      title: "Stage 01/14: Physical Hardware Procurement & Delivery Delays",
      subtitle: "CapEx Purchase Orders, 8-12 weeks lead time, and pallet unloading",
      explanation: "Building on-premises begins with massive upfront Capital Expenditure (CapEx). Engineering teams draft capacity forecasts 6 months in advance, submit vendor POs ($120k+ per rack), and wait 8 to 12 weeks for physical Dell/HP bare-metal servers to arrive on wooden delivery pallets.",
      bullets: [
        "CapEx Lock-in: $120,000 committed before a single line of customer code executes.",
        "10–12 Weeks Lead Time: Supply chain bottlenecks stall product roadmaps and feature launches.",
        "Manual Logistics: Physical dock delivery, unboxing inspection, and warehouse staging required."
      ],
      cmd: "$ cat vendor_po_dell.json | jq '.status, .lead_time_weeks, .capex_total'",
      presenterNote: "\"On-premise deployment starts not with code, but with purchase orders and 3-month shipping delays. If your traffic spikes next week, you are out of luck.\"",
      telemetry: {
        onprem: "PO Approved ($120k CapEx) · Awaiting Delivery",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (Single Facility)",
        db: "N/A (Hardware Not Delivered)"
      },
      camera: { x: -4.3, y: 3.8, z: 10.8, targetX: -4.3, targetY: 2.1, targetZ: 0 },
      mode: 'onprem_procurement'
    },
    {
      num: 1,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-02: Rack & Cable",
      title: "Stage 02/14: 42U Steel Server Rack Mounting & Structural Cabling",
      subtitle: "Physical rail sliding, redundant PDU A/B power, and CAT6 patch trunking",
      explanation: "Data center technicians manually bolt sliding rails into heavy 42U steel cabinets, hoist 65-pound 2U chassis, and wire hundreds of copper CAT6 patch cables and dual 208V PDU power feeds. A single mislabeled cable creates hours of physical tracing and manual debugging.",
      bullets: [
        "Heavy Physical Labor: Bolting 42U rack posts, sliding chassis rails, and torque tightening.",
        "Cable Spaghetti: Hundreds of CAT6 patch cords, color-coded trunks, and redundant A/B PDU circuits.",
        "Human Error Risk: A single mislabeled patch port drops entire VLAN subnets with zero software audit logs."
      ],
      cmd: "$ ./test_rack_cabling.sh --trunk cat6-patch-bay --pdu A,B",
      presenterNote: "\"Every network connection is a physical copper wire pushed into a RJ45 jack by hand. Scaling requires physical floor space, cage leases, and manual technician labor.\"",
      telemetry: {
        onprem: "Mounting 42U Rails · Cable Trunking",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (Single Cage)",
        db: "N/A (Cabling in Progress)"
      },
      camera: { x: -4.1, y: 3.8, z: 10.6, targetX: -4.1, targetY: 2.2, targetZ: 0 },
      mode: 'onprem_cabling'
    },
    {
      num: 2,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-03: HVAC & Power",
      title: "Stage 03/14: Precision CRAC Cooling & 3-Phase Facility Power",
      subtitle: "Cold-aisle containment, industrial chillers, and diesel generator banks",
      explanation: "Silicon generates immense thermal heat. On-premise facilities require industrial CRAC (Computer Room Air Conditioning) units blowing continuous chilled air through raised floor tiles, heavy 3-phase utility transformers, and external diesel generators with lead-acid UPS battery banks for power backup.",
      bullets: [
        "Thermal Management: Industrial chillers must maintain 18°C–22°C to prevent silicon thermal throttling.",
        "Massive Utility Overhead: 480V 3-phase utility feed with high PUE (Power Usage Effectiveness) efficiency loss.",
        "Emergency Backup: Kohler diesel generators, transfer switches, and heavy toxic lead-acid UPS battery banks."
      ],
      cmd: "$ ./monitor_facility_env.py --check-crac --check-ups --ambient-temp",
      presenterNote: "\"In on-premises, you are not just running software; you are running an industrial utility plant with air chillers, diesel engines, and battery arrays that cost thousands each month.\"",
      telemetry: {
        onprem: "CRAC Running (18.2°C) · 3-Phase 480V IN",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (Single Building)",
        db: "Single MySQL Server (Idle)"
      },
      camera: { x: -4.8, y: 4.2, z: 11.2, targetX: -4.6, targetY: 2.2, targetZ: 0 },
      mode: 'onprem_cooling'
    },
    {
      num: 3,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-04: OS & Network",
      title: "Stage 04/14: Bare-Metal OS Provisioning & Static Network Binding",
      subtitle: "PXE boot flashing, hypervisor installation, and manual VLAN switches",
      explanation: "Servers do not boot with your code pre-installed. Sysadmins setup PXE network boot servers to flash Linux OS kernels or ESXi hypervisors onto physical disks, manually configure top-of-rack Arista/Cisco switches with static IP subnets (10.0.1.0/24), and bind hardware MAC addresses.",
      bullets: [
        "PXE Network Flashing: TFTP kernel delivery and kickstart scripts to flash Debian/RHEL onto bare metal.",
        "Static Network Topology: Top-of-Rack Arista/Cisco switch configuration with manual VLAN tagging.",
        "Slow Cluster Spin-Up: Provisioning a clean OS node takes 45 to 90 minutes per physical machine."
      ],
      cmd: "$ pxe-boot-flasher --cluster rack01 --os debian-12-minimal --dhcp-bind",
      presenterNote: "\"Before containers can even run, hours are spent installing hypervisors, burning firmware updates, and hardcoding static subnet routing tables into physical switch consoles.\"",
      telemetry: {
        onprem: "PXE Flashing Linux Kernel (10.0.1.10)",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (Static VLAN)",
        db: "Static IP MySQL (10.0.1.50)"
      },
      camera: { x: -4.1, y: 3.8, z: 10.6, targetX: -4.1, targetY: 2.2, targetZ: 0 },
      mode: 'onprem_provisioning'
    },
    {
      num: 4,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-05: Saturation",
      title: "Stage 05/14: Peak Traffic Surge Saturation & Thermal Overload",
      subtitle: "Fixed capacity limits, 100% CPU/RAM ceiling, and 504 Gateway Timeouts",
      explanation: "During peak product launches or Black Friday sales, web traffic surges beyond the rack's fixed 8-blade capacity. CPU utilization pins at 100%, RAM runs out, thermal temperatures spike to 96°C, and servers drop incoming packets. Because hardware is finite, you cannot add servers in seconds.",
      bullets: [
        "Traffic Surge: 10,000 requests/second hits a fixed infrastructure ceiling designed for only 2,500 req/s.",
        "Thermal Throttling: CPU pinned at 100%, temperatures exceed 96°C, clock speeds drop to survive.",
        "Cascading Failures: Out of memory (OOM killer), buffer overflows, and 504 Timeouts dropping 48% of users."
      ],
      cmd: "$ top -b -n 1 | head -15 # CPU: 100% | MEM: 99.8% | 504 DROP: 4,820/s",
      presenterNote: "\"This is the fundamental flaw of physical hardware: capacity is fixed. When your business succeeds and traffic spikes, your infrastructure bottlenecks and crashes.\"",
      telemetry: {
        onprem: "100% CPU PINNED · 96°C THERMAL OVERLOAD",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (Dropping 4,820 Req/s)",
        db: "Max Connection Pool Exhausted"
      },
      camera: { x: -4.2, y: 4.0, z: 11.0, targetX: -4.2, targetY: 2.2, targetZ: 0 },
      mode: 'onprem_saturation'
    },
    {
      num: 5,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-06: Hardware Fail",
      title: "Stage 06/14: Physical Hardware Failure & Single Point of Failure (SPOF)",
      subtitle: "Blown power supply unit (PSU), severed fiber line, and unrecoverable disk crash",
      explanation: "Bare metal wears out physically. A capacitor in a Power Supply Unit blows with an audible pop, a RAID disk controller suffers unrecoverable sector corruption, or an external construction crew severs the building's physical fiber line. The entire service crashes with zero automated failover.",
      bullets: [
        "Electrical Blowout: PSU #2 capacitor pops, creating an instantaneous power trip on the motherboard.",
        "Fiber Cut: External telco trenching severs the building's single incoming dark fiber carrier line.",
        "Zero Automated Failover: No second data center exists; engineers receive 3:00 AM PagerDuty alerts to drive on-site."
      ],
      cmd: "$ dmesg -T | grep -E \"EXT4-fs error|hardware error|carrier lost|kernel panic\"",
      presenterNote: "\"Silicon, copper, and capacitors degrade. Without automated multi-region replication, a single physical component failure brings down your entire company.\"",
      telemetry: {
        onprem: "FATAL: PSU BLOWN · FIBER CARRIER CUT",
        vpc: "N/A (Pre-Cloud Phase)",
        az: "0 Zones (0% Service Availability)",
        db: "RAID Controller Degraded (Disk 3 Lost)"
      },
      camera: { x: -4.1, y: 3.8, z: 10.6, targetX: -4.1, targetY: 2.2, targetZ: 0 },
      mode: 'onprem_failure'
    },
    {
      num: 6,
      phase: "Phase 1: On-Premises Bare Metal",
      pillLabel: "OP-07: Blackout",
      title: "Stage 07/14: Unscheduled Power Outage, Hard Shutdown & Decommissioning",
      subtitle: "Facility electrical trip, emergency rack shutdown, and hardware write-off",
      explanation: "The ultimate on-premise nightmare: total facility electrical trip! When utility power drops and generator automatic transfer switches fail, all 42U servers experience catastrophic hard power-off. After years of depreciation, the legacy hardware is decommissioned and scrapped for pennies on the dollar.",
      bullets: [
        "Total Facility Trip: Utility blackout + failed generator starter motor = catastrophic hard power-off.",
        "Capital Depreciation: $120,000 in servers depreciated to scrap metal value (-$250,000 total facility loss).",
        "End of Legacy Era: The decision is made to decommission on-premise hardware and migrate 100% to AWS Cloud."
      ],
      cmd: "$ sudo shutdown -h now # CATASTROPHIC FACILITY BLACKOUT · SCRAPPING RACK",
      presenterNote: "\"This marks the end of Phase 1. Physical on-premises infrastructure is expensive, fragile, and rigid. Now, let's step across the boundary into the elastic, self-healing world of AWS Cloud.\"",
      telemetry: {
        onprem: "BLACKOUT · DECOMMISSIONED & SCRAPPED",
        vpc: "Ready for Cloud Migration",
        az: "0 Zones (Facility Offline)",
        db: "Hard Crash (Depreciation: -$250,000)"
      },
      camera: { x: -4.3, y: 4.2, z: 11.4, targetX: -4.3, targetY: 2.1, targetZ: 0 },
      mode: 'onprem_blackout'
    },

    // =========================================================================
    // PHASE 2: AWS CLOUD ARCHITECTURE & HIGH AVAILABILITY (STAGES 8 - 14)
    // Elastic Multi-AZ Ingress, Container Orchestration & Automated Self-Healing
    // =========================================================================
    {
      num: 7,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-01: VPC & Multi-AZ",
      title: "Stage 08/14: AWS Global VPC & Isolated Multi-AZ Optical Mesh",
      subtitle: "Software-defined Virtual Private Cloud spanning us-east-1a & us-east-1b",
      explanation: "Instead of a physical cage, AWS provisions a software-defined Virtual Private Cloud (VPC) in milliseconds. An AWS Region consists of multiple isolated Availability Zones (AZs) separated by tens of kilometers, linked via redundant subterranean dark-fiber optical backbones with sub-millisecond latency.",
      bullets: [
        "Software-Defined Network: Subnets (10.0.1.0/24, 10.0.2.0/24), route tables, and gateways created via code.",
        "Physical Isolation: AZs are physically distinct data centers in separate flood zones with independent utility feeds.",
        "Sub-Millisecond Optical Mesh: Linked via redundant subterranean dark fiber cables with < 1ms round-trip latency."
      ],
      cmd: "$ terraform apply -target=module.vpc # Provisioned 2x AZs in 12 seconds",
      presenterNote: "\"In AWS, you don't buy cages; you define private software-defined networks in code. If an entire city has a power cut, your second Availability Zone keeps running.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "VPC 10.0.0.0/16 Active",
        az: "2 Isolated AZs (us-east-1a, us-east-1b)",
        db: "Private Subnets Allocated"
      },
      camera: { x: 5.2, y: 6.5, z: 14.2, targetX: 4.8, targetY: 1.6, targetZ: 0 },
      mode: 'aws_vpc'
    },
    {
      num: 8,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-02: Route 53 & ALB",
      title: "Stage 09/14: Route 53 Global Anycast DNS & Application Load Balancer (ALB)",
      subtitle: "Layer 7 TLS termination, HTTP health check pings, and smart traffic routing",
      explanation: "Amazon Route 53 directs global clients to an elastic Application Load Balancer (ALB). The ALB terminates TLS certificates, evaluates HTTP path rules, performs 5-second health check pings, and distributes requests evenly across healthy compute targets in all Availability Zones.",
      bullets: [
        "Global Anycast Routing: Route 53 resolves DNS with 100% SLA and latency-based geographic steering.",
        "Layer 7 Smart Ingress: ALB decrypts TLS/HTTPS, validates path rules (/api, /auth), and inspects HTTP headers.",
        "Automated Health Probes: 5-second HTTP health pings remove degraded nodes before users ever see an error."
      ],
      cmd: "$ aws elbv2 describe-target-health --target-group-arn arn:aws:... # 200 OK",
      presenterNote: "\"Traffic ingress is completely managed. Route 53 and ALB handle TLS termination, global DDoS mitigation, and cross-AZ health checks automatically.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "Route 53 Anycast + ALB Ingress",
        az: "Cross-AZ Load Balanced (Active/Active)",
        db: "Healthy Ingress Path Confirmed"
      },
      camera: { x: 4.6, y: 5.8, z: 13.2, targetX: 4.2, targetY: 1.8, targetZ: 0 },
      mode: 'aws_alb'
    },
    {
      num: 9,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-03: ECS / EKS Pods",
      title: "Stage 10/14: Elastic Container Compute Clusters (ECS / EKS on Fargate)",
      subtitle: "Pulling certified OCI images from Amazon ECR with zero bare-metal OS patching",
      explanation: "The Docker images packaged in our Docker studio deploy effortlessly to AWS ECS or EKS. AWS Fargate runs containers serverlessly: you manage zero virtual machines, zero kernel security patches, and zero hypervisors. Compute pods boot in seconds.",
      bullets: [
        "Pure Serverless Compute: Fargate allocates exact CPU/RAM slices on demand with zero EC2 VM overhead.",
        "Immutable Image Deployments: Container pods pull cryptographically verified images directly from Amazon ECR.",
        "Zero Patching Maintenance: AWS automatically patches host kernels and hypervisors with zero customer downtime."
      ],
      cmd: "$ aws ecs run-task --cluster prod --launch-type FARGATE # 4x pods booted in 3s",
      presenterNote: "\"Say goodbye to PXE booting and bare-metal OS patching. Our container images spin up in seconds on Fargate. We pay only for the exact seconds the code runs.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "ALB Target Group Connected",
        az: "4x Microservice Pods Across 2 AZs",
        db: "Pooled RDS Database Connections"
      },
      camera: { x: 5.0, y: 5.8, z: 13.2, targetX: 4.6, targetY: 1.8, targetZ: 0 },
      mode: 'aws_containers'
    },
    {
      num: 10,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-04: RDS Multi-AZ",
      title: "Stage 11/14: Amazon RDS Multi-AZ Synchronous Replication",
      subtitle: "Primary DB in AZ-A, Standby in AZ-B with transaction log shipping (Zero Data Loss)",
      explanation: "Unlike single-server on-premise database crashes, Amazon RDS synchronously replicates every write transaction from the Primary DB in us-east-1a to an active Standby DB in us-east-1b over dedicated fiber, guaranteeing ACID durability and continuous automated snapshots.",
      bullets: [
        "Synchronous Commit: Every SQL write is committed to disk in both us-east-1a and us-east-1b before returning success.",
        "Zero Data Loss Guarantee: RPO = 0 (Recovery Point Objective); transaction logs are durably mirrored in real-time.",
        "Continuous Automated Backups: Point-in-time recovery to any second within 35 days, stored in multi-datacenter S3."
      ],
      cmd: "$ aws rds describe-db-instances --query \"*.[DBInstanceId,Status,MultiAZ]\"",
      presenterNote: "\"Databases are the most vulnerable part of on-premises. With RDS Multi-AZ, every transaction is synchronously mirrored to a second facility miles away over private optical lines.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "VPC Private Database Subnet",
        az: "Primary (AZ-A) ➔ Standby (AZ-B)",
        db: "Synchronous Replication (RPO = 0)"
      },
      camera: { x: 5.2, y: 5.5, z: 12.8, targetX: 4.8, targetY: 1.6, targetZ: 0 },
      mode: 'aws_rds'
    },
    {
      num: 11,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-05: Auto-Scaling",
      title: "Stage 12/14: Elastic Auto-Scaling Group (ASG) Under Surge",
      subtitle: "CloudWatch CPU alarm > 70%, +3 dynamic instances in seconds (Pay per second)",
      explanation: "When traffic spikes from 1,000 to 10,000 requests/second, CloudWatch alarms trigger Auto Scaling. The ASG dynamically launches additional container replicas across both AZs within seconds. When traffic subsides, instances terminate automatically so you never pay for idle capacity.",
      bullets: [
        "Dynamic Horizontal Scaling: CloudWatch monitors P99 latency and CPU; spawns +3 replicas in under 15 seconds.",
        "100% Request Survival: Handles 10,000 req/s with 0 dropped packets and sub-20ms latency.",
        "Zero Idle Waste: When traffic subsides, instances terminate automatically. You never pay for idle hardware."
      ],
      cmd: "$ aws autoscaling set-desired-capacity --desired-capacity 7 # Surge absorbed",
      presenterNote: "\"Remember Slide 5 where on-premise crashed with 100% CPU? Here on AWS, the system detects the surge, launches 3 more instances across both zones, and absorbs 10,000 requests per second effortlessly.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "10,000 Req/s Absorbed (0 Drops)",
        az: "7x Dynamic Pods Scaled Across AZs",
        db: "RDS Connection Autoscaled"
      },
      camera: { x: 5.2, y: 6.5, z: 13.8, targetX: 4.8, targetY: 1.8, targetZ: 0 },
      mode: 'aws_scale'
    },
    {
      num: 12,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-06: 60s Failover",
      title: "Stage 13/14: Simulated AZ Outage & 48-Second Automated Self-Healing",
      subtitle: "Physical catastrophe in AZ-A; ALB reroutes to AZ-B, RDS auto-promotes Standby",
      explanation: "A simulated disaster destroys Availability Zone A! On-premises, this is a multi-day catastrophe. On AWS, the ALB immediately detects failed health checks and reroutes 100% of user traffic to AZ-B, while RDS automatically flips its CNAME DNS record to the Standby in under 48 seconds with zero data loss!",
      bullets: [
        "Disaster Simulated: Entire us-east-1a facility cut; compute and primary DB in AZ-A instantly lost.",
        "5-Second Traffic Reroute: ALB detects failed health check and routes 100% of incoming users to us-east-1b.",
        "48-Second RDS Promotion: Standby DB in AZ-B promoted to Primary via dynamic DNS CNAME flip with 0 data loss."
      ],
      cmd: "$ aws rds failover-db-instance # AZ-1 Cut ➔ AZ-2 Promoted in 48s · ZERO DATA LOSS",
      presenterNote: "\"This is the ultimate presentation punchline. When a disaster takes down an entire facility, AWS heals itself in 48 seconds without a single human opening a laptop or losing a single transaction.\"",
      telemetry: {
        onprem: "Legacy Deprecated",
        vpc: "100% User Ingress Rerouted to AZ-B",
        az: "AZ-A Offline ➔ AZ-B Surviving & Serving",
        db: "Standby Auto-Promoted to Primary (48s)"
      },
      camera: { x: 4.8, y: 6.2, z: 13.5, targetX: 4.4, targetY: 1.8, targetZ: 0 },
      mode: 'aws_failover'
    },
    {
      num: 13,
      phase: "Phase 2: AWS Cloud Architecture",
      pillLabel: "AWS-07: S3 & Serverless",
      title: "Stage 14/14: S3 Object Durability (11 9's), CloudFront CDN & Modern Economics",
      subtitle: "99.999999999% data durability, global edge caching, and 100% OpEx cost model",
      explanation: "The migration is complete! Static media and assets stream from Amazon S3 (replicated across 3+ facilities with 11 9's durability) and CloudFront global edge caches. You trade CapEx risk for pure OpEx flexibility: your company pays only for what it consumes, with 99.99% uptime.",
      bullets: [
        "11 9's Data Durability: Amazon S3 (99.999999999%) replicates data across 3+ distinct geographic facilities.",
        "Global Edge Network: Amazon CloudFront serves assets from 310+ edge locations with < 10ms worldwide latency.",
        "78% Cost Reduction: Traded $120k CapEx debt and $2,500/mo cooling bills for an elastic $18k/yr OpEx model."
      ],
      cmd: "$ aws s3 sync ./dist s3://cloud-academy-cdn # 100% OpEx Agility · Migration Complete",
      presenterNote: "\"We have migrated from physical, fragile, expensive bare metal to an elastic, highly available, self-healing cloud. You can now build, test, and ship software at global scale.\"",
      telemetry: {
        onprem: "Decommissioned & Eliminated",
        vpc: "CloudFront 310+ Edge PoPs Worldwide",
        az: "Multi-Region Durability (11 9's)",
        db: "Multi-AZ Aurora Serverless Active"
      },
      camera: { x: 2.5, y: 7.5, z: 16.5, targetX: 2.2, targetY: 1.8, targetZ: 0 },
      mode: 'aws_serverless'
    }
  ];

  let currentStep = 0;
  let isAutoPlaying = false;
  let autoTimer = null;
  let isTrafficSpike = false;
  let isAzOutage = false;

  // Three.js Core
  let scene, camera, renderer, controls;
  let canvasContainer;
  let clock;

  // Procedural 3D Objects — On-Premises (Stages 1-7)
  let onPremRackGroup, onPremBladeServers = [], onPremLeds = [];
  let onPremCrashCartGroup, laptopScreenCanvas, laptopScreenCtx, laptopScreenTexture, laptopScreenMesh;
  let onPremDeliveryGroup;     // Stage 1: Pallet, boxes, CapEx PO
  let onPremCablingGroup;      // Stage 2: CAT6 cabling bundles, open door, sliding rails, dual PDU
  let onPremHvacGroup, onPremBigFans = []; // Stage 3: CRAC chillers, generator
  let onPremProvisioningGroup; // Stage 4: 48-port switch, static IPs
  let onPremSaturationGroup, onPremHeatGlow; // Stage 5: Thermal overheat, 100% CPU
  let onPremFailureGroup;      // Stage 6: Blown PSU, severed fiber
  let onPremBlackoutGroup;     // Stage 7: Blackout, emergency strobe, decommissioned

  // Procedural 3D Objects — AWS Cloud Progressive Service Groups (Stages 8-14)
  let awsVpcGroup, awsFiberLinkMesh;
  let awsVpcBaseGroup, awsIngressGroup, awsComputeGroup, awsDatabaseGroup, awsScalingGroup, awsFailoverGroup, awsServerlessGroup;
  let route53GlobeMesh, albMesh, albRingMesh;
  let computeNodes = [], autoScaleNode, rdsPrimaryMesh, rdsStandbyMesh, replBeamMesh;
  let rdsFailoverBadge, awsDisasterHazardRing;
  let s3Mesh;

  // Dedicated AWS Cloud DevOps Workstation with Laptop (Right Side)
  let awsWorkstationGroup, awsLaptopScreenCanvas, awsLaptopScreenCtx, awsLaptopScreenTexture, awsLaptopScreenMesh;

  // All World Badges for Billboarding & Occlusion Management
  const allWorldBadges = [];

  // Hybrid Laptop Conduits
  let hybridConduitsGroup;
  let conduitPackets = [];

  // Camera Lerp
  let targetCamPos = new THREE.Vector3(-4.3, 3.8, 10.8);
  let targetLookAt = new THREE.Vector3(-4.3, 2.1, 0);
  let isCameraLerping = false;

  function init() {
    canvasContainer = document.getElementById('aws-3d-canvas-container');
    if (!canvasContainer) return;

    clock = new THREE.Clock();

    // High-Contrast Dark CAD Engineering Environment
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a101d);
    scene.fog = new THREE.FogExp2(0x0a101d, 0.022);

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
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
      controls.minDistance = 3.5;
      controls.maxDistance = 45;
      controls.target.copy(targetLookAt);
      controls.addEventListener('start', () => {
        isCameraLerping = false;
      });
    }

    // Build the 3D Environments
    setupStudioLighting();
    setupEngineeringFloor();
    setupOnPremiseFacility();
    setupAwsCloudInfrastructure();
    setupAwsRightWorkstation();
    setupHybridLaptopConduits();

    // UI Listeners
    window.addEventListener('resize', onWindowResize);
    setupUIControls();

    // Initial Step
    updateStep(0);

    // Render loop
    animate();
  }

  // --- 1. Studio Lighting ---
  function setupStudioLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    // Main Overhead Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 14, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // AWS Gold / Orange Accent Light
    const awsLight = new THREE.PointLight(0xff9900, 1.5, 20);
    awsLight.position.set(4.5, 6, 2);
    scene.add(awsLight);

    // On-Premise Industrial Blue/Red Fill
    const onPremLight = new THREE.PointLight(0x0284c7, 1.3, 16);
    onPremLight.position.set(-4.5, 5, 2);
    scene.add(onPremLight);
  }

  // --- 2. Technical Floor & Grid ---
  function setupEngineeringFloor() {
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      roughness: 0.7,
      metalness: 0.6
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Dual Grid: Left side slate-blue, Right side AWS Orange
    const grid = new THREE.GridHelper(30, 30, 0x0284c7, 0x1e293b);
    grid.position.y = 0.005;
    scene.add(grid);

    // Boundary demarcation line dividing On-Premise and AWS Cloud (Solid clean strip, zero dotted/dashed lines)
    const lineGeo = new THREE.PlaneGeometry(0.06, 24);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.65 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, 0.015, 0);
    scene.add(line);
  }

  // --- Helper: Floating 3D Text Badge ---
  function createWorldBadge(title, sub, colorHex, w = 1.8, h = 0.5) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 144;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 128, 16);
    ctx.fill();

    ctx.strokeStyle = colorHex || '#0284c7';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 128, 16);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillText(title, 28, 56);

    ctx.fillStyle = colorHex || '#38bdf8';
    ctx.font = 'bold 26px "SF Mono", monospace';
    ctx.fillText(sub, 28, 104);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    allWorldBadges.push(badgeMesh);
    return badgeMesh;
  }

  // --- Helper: Dynamic AWS Workstation Laptop Screen Renderer ---
  function updateAwsLaptopScreen(step) {
    if (!awsLaptopScreenCtx) return;
    const ctx = awsLaptopScreenCtx;
    const w = awsLaptopScreenCanvas.width;
    const h = awsLaptopScreenCanvas.height;

    // Dark terminal background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    // Terminal top bar in AWS dark slate
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, 36);

    // macOS window control buttons
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(18, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(36, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(54, 18, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ff9900';
    ctx.font = 'bold 13px "SF Mono", monospace';
    ctx.fillText('devops@aws-management-console:~ [us-east-1 · API Bridge]', 74, 23);

    // Output for AWS Stages (7 to 13)
    const AWS_LOGS = {
      7: [
        "$ terraform apply -target=module.vpc",
        "[+] aws_vpc.prod_vpc: 10.0.0.0/16 [CREATED]",
        "[+] Subnet us-east-1a: 10.0.1.0/24 [ACTIVE]",
        "[+] Subnet us-east-1b: 10.0.2.0/24 [ACTIVE]",
        "[+] Inter-AZ subterranean optical fiber UP",
        "[+] Provisioned 2x AZs in 12.4s"
      ],
      8: [
        "$ aws elbv2 describe-load-balancers",
        "[+] Route 53 Anycast Ingress: 100% SLA Active",
        "[+] ALB: Layer 7 HTTPS TLS Decrypted",
        "[+] Target Groups: Healthy HTTP 200 OK (5s)",
        "[+] Cross-AZ Ingress routing active",
        "[+] Zero manual switch patching required"
      ],
      9: [
        "$ aws ecs list-tasks --cluster prod-fargate",
        "[+] Pulling certified OCI image from ECR",
        "[+] AWS Fargate serverless pods active",
        "[+] 4x microservices running across AZs",
        "[+] Zero bare-metal hypervisors to patch",
        "[+] Automatic security kernel patches ON"
      ],
      10: [
        "$ aws rds describe-db-instances --multi-az",
        "[+] Primary DB (us-east-1a): READ/WRITE",
        "[+] Standby DB (us-east-1b): SYNCHRONOUS",
        "[+] Dedicated fiber optical log shipping",
        "[+] Automated 35-day point-in-time recovery",
        "[+] ZERO DATA LOSS commit (RPO = 0)"
      ],
      11: [
        "$ aws cloudwatch put-metric-alarm (CPU > 70%)",
        "[!] SURGE DETECTED: 10,000 Req/s incoming",
        "[+] ASG Alarm: CPU > 70% threshold crossed",
        "[+] Dynamic Scale: +3 Fargate pods launched",
        "[+] P99 Latency: 16ms · Zero 504 Timeouts",
        "[+] Pay per second · Zero idle waste"
      ],
      12: [
        "[!] SIMULATED DISASTER: AZ-1 Facility Cut",
        "[!] ALB Health Check: AZ-1 targets marked DOWN",
        "[+] ALB rerouting 100% user traffic to AZ-2",
        "[+] RDS CNAME flipped to Standby in 48s!",
        "[+] ZERO DATA LOSS · Self-healing complete",
        "[+] Production uptime preserved: 99.99%"
      ],
      13: [
        "$ aws s3 sync ./dist s3://cloud-academy-cdn",
        "[+] Amazon S3: 99.999999999% (11 9's) durability",
        "[+] CloudFront CDN: 310+ Global Edge PoPs",
        "[+] 0 physical servers · 0 noisy chillers",
        "[+] $0 CapEx debt · 100% Elastic OpEx agility",
        "[★] MIGRATION TO AWS CLOUD COMPLETE!"
      ]
    };

    const lines = AWS_LOGS[step] || [
      "$ aws sts get-caller-identity",
      "ACCOUNT: 894029103841 (Production-VPC)",
      "REGION:  us-east-1 (N. Virginia)",
      "STATUS:  Cloud Console Standing by..."
    ];

    lines.forEach((line, idx) => {
      ctx.fillStyle = line.includes('DISASTER') || line.includes('SURGE') ? '#ef4444' :
                      line.includes('ALARM') || line.includes('!') ? '#f59e0b' :
                      line.includes('[+]') || line.includes('[★]') ? '#10b981' :
                      line.startsWith('$') ? '#38bdf8' : '#e2e8f0';
      ctx.font = '15px "SF Mono", monospace';
      ctx.fillText(line, 18, 70 + idx * 40);
    });

    awsLaptopScreenTexture.needsUpdate = true;
  }

  // --- Helper: Dynamic Laptop Screen Terminal Renderer ---
  function updateLaptopScreen(step) {
    if (!laptopScreenCtx) return;
    const ctx = laptopScreenCtx;
    const w = laptopScreenCanvas.width;
    const h = laptopScreenCanvas.height;

    // Dark terminal background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    // Terminal top bar
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, 36);

    // macOS / Linux terminal window buttons
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(18, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(36, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(54, 18, 6, 0, Math.PI * 2); ctx.fill();

    const isAws = (step >= 7);
    ctx.fillStyle = isAws ? '#ff9900' : '#94a3b8';
    ctx.font = 'bold 13px "SF Mono", monospace';
    ctx.fillText(
      isAws ? 'cloud-operator@aws-console:~ [us-east-1 · API Bridge]' : 'sysadmin@onprem-rack01:~ [ttyUSB0 · 115200 baud · Local]',
      74, 23
    );

    // Dynamic terminal output tailored to each of the 14 stages (7 On-Premises + 7 AWS Cloud)
    const STAGE_OUTPUTS = [
      // Stage 0: Procurement
      [
        "$ cat vendor_po_dell.json",
        "STATUS: CapEx APPROVED ($120,000 PO)",
        "ITEMS:  8x Dell PowerEdge R750 2U Servers",
        "LEAD TIME: 10-12 WEEKS DELIVERY DELAY",
        "ETA: Dock shipment pending arrival...",
        "SPECS: Dual Xeon Gold 6330 · 64GB DDR4 ECC"
      ],
      // Stage 1: Cabling
      [
        "$ ./test_rack_cabling.sh",
        "[+] PDU-A: 208V / 16.2A [ACTIVE]",
        "[+] PDU-B: 208V / 14.8A [ACTIVE]",
        "[*] Tracing CAT6 Patch Trunk Cables 1-48...",
        "[+] SFP+ 10Gbps Uplink Link Detected",
        "[!] Cable #14 mislabeled; manual trace needed"
      ],
      // Stage 2: Cooling & Power
      [
        "$ ./monitor_facility_env.py",
        "[+] CRAC Unit 1: RUNNING (18.2°C Chilled Air)",
        "[+] Cold Aisle Containment: SEALED",
        "[+] 3-Phase Utility: 480V IN ➔ 208V PDU",
        "[+] Kohler Diesel Generator: STANDBY (100% Fuel)",
        "[+] Eaton UPS Batteries: CHARGED (15m Run-time)"
      ],
      // Stage 3: OS Provisioning
      [
        "$ pxe-boot-flasher --cluster rack01",
        "[*] DHCP DISCOVER on eth0 (MAC 00:1e:67:88)...",
        "[+] TFTP server: Sending vmlinuz & initrd",
        "[+] Flashing Debian Linux 12.5 minimal rootfs",
        "[+] eth0: 10.0.1.10/24 (STATIC LINK UP)",
        "[+] Server Blade 1-8 online and idle"
      ],
      // Stage 4: Saturation
      [
        "[!] HIGH PRIORITY ALERT: TRAFFIC SURGE!",
        "[*] Incoming: 10,000 Req/s (Black Friday)",
        "[CRITICAL] CPU UTILIZATION: 100% PINNED",
        "[CRITICAL] RAM CEILING: 63.8GB / 64GB (99.8%)",
        "[CRITICAL] THERMAL SENSOR: 96°C (THROTTLING)",
        "[!] 504 GATEWAY TIMEOUT: 4,820 REQS DROPPED"
      ],
      // Stage 5: Hardware Failure
      [
        "[FATAL HARDWARE FAILURE DETECTED]",
        "[-] PSU #2: VOLTAGE DROP 0.0V (CAPACITOR POP)",
        "[-] FIBER TRUNK: CARRIER SIGNAL LOST (CUT)",
        "[-] RAID CONTROLLER: DISK 3 FAILED / DEGRADED",
        "[!] SINGLE POINT OF FAILURE: NO BACKUP LINK",
        "[-] PRODUCTION SERVICE IS DOWN (0% AVAIL)"
      ],
      // Stage 6: Blackout
      [
        "[EMERGENCY POWER OUTAGE - CRITICAL]",
        "[-] UTILITY MAINS: 0V POWER LOSS",
        "[-] DIESEL TRANSFER SWITCH FAILED TO CRANK",
        "[-] UPS BATTERIES EXHAUSTED (0% REMAINING)",
        "[-] KERNEL PANIC: SYSTEM EMERGENCY HALTED",
        "[-] FACILITY DECOMMISSIONED · LOSS: -$250,000"
      ],
      // Stage 7: AWS VPC & Multi-AZ
      [
        "$ terraform apply -target=aws_vpc.prod",
        "[+] aws_vpc.prod_vpc: 10.0.0.0/16 [CREATED]",
        "[+] Subnet us-east-1a (10.0.1.0/24): ACTIVE",
        "[+] Subnet us-east-1b (10.0.2.0/24): ACTIVE",
        "[+] Subterranean dark-fiber mesh provisioned",
        "[+] Zero hardware lead times · Ready in 12s"
      ],
      // Stage 8: Route 53 & ALB
      [
        "$ aws elbv2 describe-load-balancers",
        "[+] Route 53: Anycast DNS 100% SLA Active",
        "[+] ALB: Layer 7 HTTPS TLS Terminated",
        "[+] Target Groups: Healthy HTTP 200 OK (5s)",
        "[+] Multi-AZ Ingress routing active",
        "[+] Zero manual switch patching required"
      ],
      // Stage 9: ECS / EKS Pods
      [
        "$ aws ecs list-tasks --cluster prod-fargate",
        "[+] Pulling certified OCI image from ECR",
        "[+] AWS Fargate: Serverless compute active",
        "[+] 4x microservice container pods online",
        "[+] Zero bare-metal hypervisors to patch",
        "[+] Automatic kernel security updates ON"
      ],
      // Stage 10: RDS Multi-AZ
      [
        "$ aws rds describe-db-instances --multi-az",
        "[+] Primary DB (us-east-1a): READ/WRITE ONLINE",
        "[+] Standby DB (us-east-1b): SYNC REPLICATED",
        "[+] Dedicated fiber optical log shipping",
        "[+] Automated 35-day point-in-time recovery",
        "[+] ZERO DATA LOSS synchronous commit"
      ],
      // Stage 11: Auto-Scaling
      [
        "$ aws cloudwatch put-metric-alarm (CPU > 70%)",
        "[!] TRAFFIC SPIKE DETECTED: 10,000 Req/s",
        "[+] ASG Alarm: CPU > 70% threshold crossed",
        "[+] Dynamic Scale: +3 Fargate pods launched",
        "[+] P99 Latency: 16ms · Zero 504 Timeouts",
        "[+] Pay per second · Zero overprovisioning"
      ],
      // Stage 12: 60s Failover
      [
        "[!] SIMULATED DISASTER: AZ-1 Facility Cut",
        "[!] ALB Health Check: AZ-1 targets marked DOWN",
        "[+] ALB rerouting 100% user traffic to AZ-2",
        "[+] RDS CNAME flipped to Standby in 48s!",
        "[+] ZERO DATA LOSS · Automated self-healing",
        "[+] Production uptime preserved: 99.99%"
      ],
      // Stage 13: S3 & Serverless
      [
        "$ aws s3 sync ./dist s3://cloud-academy-cdn",
        "[+] Amazon S3: 99.999999999% (11 9's) durability",
        "[+] CloudFront CDN: 310+ Global Edge PoPs",
        "[+] 0 physical servers · 0 noisy CRAC chillers",
        "[+] $0 CapEx debt · 100% Elastic OpEx agility",
        "[★] MIGRATION TO AWS CLOUD COMPLETE!"
      ]
    ];

    const lines = STAGE_OUTPUTS[step] || STAGE_OUTPUTS[0];
    lines.forEach((line, idx) => {
      ctx.fillStyle = line.includes('CRITICAL') || line.includes('FATAL') || line.includes('EMERGENCY') || line.includes('504') ? '#ef4444' :
                      line.includes('ALERT') || line.includes('PO') || line.includes('LEAD TIME') ? '#f59e0b' :
                      line.includes('[+]') || line.includes('RUNNING') ? '#10b981' :
                      line.startsWith('$') ? '#38bdf8' : '#e2e8f0';
      ctx.font = '15px "SF Mono", monospace';
      ctx.fillText(line, 18, 70 + idx * 40);
    });

    laptopScreenTexture.needsUpdate = true;
  }

  // --- 3. On-Premise Physical Facility (Left Bay, x: -5.0) ---
  function setupOnPremiseFacility() {
    onPremRackGroup = new THREE.Group();
    onPremRackGroup.position.set(-5.0, 0, 0);
    scene.add(onPremRackGroup);

    // Concrete Security Base Pad
    const padGeo = new THREE.BoxGeometry(6.2, 0.22, 4.4);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.4 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0.5, 0.11, 0);
    pad.receiveShadow = true;
    onPremRackGroup.add(pad);

    // Heavy Industrial 42U Steel Server Rack Cabinet
    const rackGeo = new THREE.BoxGeometry(2.4, 4.2, 1.8);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.3 });
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.position.set(0, 2.2, 0);
    rack.castShadow = true;
    onPremRackGroup.add(rack);

    // Rack Beveled Edges
    const rackEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(rackGeo),
      new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 })
    );
    rackEdge.position.copy(rack.position);
    onPremRackGroup.add(rackEdge);

    // 8 Stacked 2U Physical Blade Servers with Blinking Drive Trays
    for (let i = 0; i < 8; i++) {
      const sy = 0.7 + i * 0.42;
      const bladeGeo = new THREE.BoxGeometry(2.1, 0.32, 1.7);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.35 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(0, sy, 0.04);
      onPremRackGroup.add(blade);
      onPremBladeServers.push(blade);

      // Drive status LEDs on front face
      for (let lx = -0.8; lx <= 0.8; lx += 0.22) {
        const ledGeo = new THREE.BoxGeometry(0.08, 0.05, 0.02);
        const ledMat = new THREE.MeshBasicMaterial({ color: (i === 7 && lx > 0.4) ? 0xef4444 : 0x10b981 });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(lx, sy, 0.9);
        onPremRackGroup.add(led);
        onPremLeds.push(led);
      }
    }

    // Top HVAC Exhaust Fan Unit
    const fanHousingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.18, 24);
    const fanHousing = new THREE.Mesh(fanHousingGeo, new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 }));
    fanHousing.position.set(0, 4.35, 0);
    onPremRackGroup.add(fanHousing);

    const fanBladeGeo = new THREE.BoxGeometry(0.9, 0.03, 0.16);
    const onPremFanMesh = new THREE.Mesh(fanBladeGeo, new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 }));
    onPremFanMesh.position.set(0, 4.45, 0);
    onPremRackGroup.add(onPremFanMesh);
    onPremBigFans.push(onPremFanMesh);

    // Overheat / Smoke Glow Mesh (Stage 5)
    const glowGeo = new THREE.SphereGeometry(1.7, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0 });
    onPremHeatGlow = new THREE.Mesh(glowGeo, glowMat);
    onPremHeatGlow.position.set(0, 2.5, 0);
    onPremRackGroup.add(onPremHeatGlow);

    // =========================================================================
    // SYSADMIN CRASH CART & DIAGNOSTIC LAPTOP (Positioned right beside the rack)
    // =========================================================================
    onPremCrashCartGroup = new THREE.Group();
    onPremCrashCartGroup.position.set(2.4, 0, 0.65);
    onPremRackGroup.add(onPremCrashCartGroup);

    // 1. Crash Cart Base with 4 Rolling Wheels
    const cartBaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    const cartPad = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.2), cartBaseMat);
    cartPad.position.set(0, 0.16, 0);
    onPremCrashCartGroup.add(cartPad);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.4 });
    const wheelPositions = [
      [-0.65, 0.08, -0.45],
      [0.65, 0.08, -0.45],
      [-0.65, 0.08, 0.45],
      [0.65, 0.08, 0.45]
    ];
    wheelPositions.forEach(wp => {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 12), wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(...wp);
      onPremCrashCartGroup.add(w);
    });

    // 2. Telescoping Cart Columns
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });
    const pole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12), poleMat);
    pole1.position.set(-0.55, 0.65, 0);
    onPremCrashCartGroup.add(pole1);
    const pole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12), poleMat);
    pole2.position.set(0.55, 0.65, 0);
    onPremCrashCartGroup.add(pole2);

    // 3. Ergonomic Desktop Tray at y = 1.15
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.25 });
    const tray = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.06, 1.3), trayMat);
    tray.position.set(0, 1.15, 0);
    onPremCrashCartGroup.add(tray);

    // 4. Laptop Body & Keyboard Deck
    const lapBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.92, roughness: 0.2 });
    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.04, 0.82), lapBodyMat);
    lapBase.position.set(0, 1.20, 0.08);
    onPremCrashCartGroup.add(lapBase);

    // Keyboard keys area
    const kbArea = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.42), new THREE.MeshBasicMaterial({ color: 0x090d16 }));
    kbArea.rotation.x = -Math.PI / 2;
    kbArea.position.set(0, 1.225, -0.04);
    onPremCrashCartGroup.add(kbArea);

    // Trackpad
    const trackpad = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.2), new THREE.MeshBasicMaterial({ color: 0x334155 }));
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 1.225, 0.28);
    onPremCrashCartGroup.add(trackpad);

    // 5. Laptop Display Lid (Angled at -0.32 rad)
    const screenLid = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.78, 0.035), lapBodyMat);
    screenLid.position.set(0, 1.62, -0.32);
    screenLid.rotation.x = -0.32;
    onPremCrashCartGroup.add(screenLid);

    // 6. Dynamic Laptop Screen Texture Canvas
    laptopScreenCanvas = document.createElement('canvas');
    laptopScreenCanvas.width = 512;
    laptopScreenCanvas.height = 340;
    laptopScreenCtx = laptopScreenCanvas.getContext('2d');
    laptopScreenTexture = new THREE.CanvasTexture(laptopScreenCanvas);

    const screenDispMat = new THREE.MeshBasicMaterial({ map: laptopScreenTexture });
    laptopScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 0.72), screenDispMat);
    laptopScreenMesh.position.set(0, 1.62, -0.30);
    laptopScreenMesh.rotation.x = -0.32;
    onPremCrashCartGroup.add(laptopScreenMesh);

    // Initial draw of laptop screen
    updateLaptopScreen(0);

    // Updated badge: Hybrid Central Sysadmin Console
    const cartBadge = createWorldBadge("Central Sysadmin Console", "Hybrid On-Prem ➔ AWS Cloud Bridge", "#10b981", 2.4, 0.5);
    cartBadge.position.set(0, 2.25, 0);
    onPremCrashCartGroup.add(cartBadge);

    // =========================================================================
    // DETAILED 3D MODELS FOR ON-PREMISES STAGES 1 - 7
    // =========================================================================

    // Stage 1: Hardware Delivery Group (Realistic Wooden Slats Pallet & Dell Box)
    onPremDeliveryGroup = new THREE.Group();
    // 5 Top Wooden Planks
    for (let p = 0; p < 5; p++) {
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.05, 0.28),
        new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9 })
      );
      plank.position.set(0, 0.22, 0.8 + (p * 0.38));
      onPremDeliveryGroup.add(plank);
    }
    // 3 Pallet Stringers
    [-0.9, 0, 0.9].forEach(px => {
      const str = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.16, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.95 })
      );
      str.position.set(px, 0.12, 1.6);
      onPremDeliveryGroup.add(str);
    });

    // 2 Stacked Cardboard Shipment Boxes
    const crateGeo = new THREE.BoxGeometry(1.8, 0.75, 1.3);
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 });
    const crate = new THREE.Mesh(crateGeo, crateMat);
    crate.position.set(0, 0.65, 1.6);
    onPremDeliveryGroup.add(crate);

    // Fragile / Dell Stencil Label
    const lblMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const labelStrip = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.18), lblMat);
    labelStrip.position.set(0, 0.65, 2.26);
    onPremDeliveryGroup.add(labelStrip);

    const poBadge = createWorldBadge("CapEx PO #49201", "$120,000 APPROVED · 10 WEEKS LEAD TIME", "#f59e0b", 2.6, 0.6);
    poBadge.position.set(0, 1.65, 1.6);
    onPremDeliveryGroup.add(poBadge);
    onPremRackGroup.add(onPremDeliveryGroup);

    // Stage 2: Cabling Group (Curved CAT6 cascades, sliding rails, open rack door)
    onPremCablingGroup = new THREE.Group();
    // Swung Open Perforated Door on hinges
    const doorGeo = new THREE.BoxGeometry(0.04, 4.0, 1.6);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.6 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(-1.25, 2.2, 1.3);
    door.rotation.y = Math.PI / 4;
    onPremCablingGroup.add(door);

    // Extended 2U Blade on Sliding Rails
    const extBlade = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 1.6), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85 }));
    extBlade.position.set(0, 2.0, 0.8);
    onPremCablingGroup.add(extBlade);

    // CAT6 Colored Patch Cables
    const cableColors = [0x0284c7, 0xfacc15, 0xa855f7, 0xef4444];
    for (let c = 0; c < 12; c++) {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.95, 3.8, 0.85),
        new THREE.Vector3(-0.95 - (c * 0.04), 2.6, 1.2),
        new THREE.Vector3(-0.8 + (c * 0.15), 1.6, 1.0),
        new THREE.Vector3(-0.8 + (c * 0.15), 0.8 + (c % 5) * 0.38, 0.88)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.022, 6, false);
      const tube = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ color: cableColors[c % 4] }));
      onPremCablingGroup.add(tube);
    }

    // Dual PDU Power Strips with Green LEDs
    const pduMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.7 });
    const pduA = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 0.08), pduMat);
    pduA.position.set(-1.15, 2.2, 0);
    onPremCablingGroup.add(pduA);
    const pduB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 0.08), pduMat);
    pduB.position.set(1.15, 2.2, 0);
    onPremCablingGroup.add(pduB);

    const cabBadge = createWorldBadge("STRUCTURED CABLING", "Dual 208V PDU + CAT6 Patching", "#0284c7", 2.4, 0.55);
    cabBadge.position.set(0, 4.8, 0);
    onPremCablingGroup.add(cabBadge);
    onPremRackGroup.add(onPremCablingGroup);

    // Stage 3: Industrial CRAC Cooling & Power Facility
    onPremHvacGroup = new THREE.Group();
    const cracBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.4, 1.6), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 }));
    cracBody.position.set(-2.4, 1.7, 0);
    onPremHvacGroup.add(cracBody);

    // Dual Rotating Fan Impellers
    [-0.5, 0.5].forEach((fy, idx) => {
      const cracFan = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5 })
      );
      cracFan.rotation.z = Math.PI / 2;
      cracFan.position.set(-1.58, 2.2 + fy, 0);
      onPremHvacGroup.add(cracFan);
      onPremBigFans.push(cracFan);
    });

    // Diesel Generator Canister with Exhaust Stack
    const genBody = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.8, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.75 }));
    genBody.position.set(-2.4, 0.9, 2.0);
    onPremHvacGroup.add(genBody);
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.2, 12), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    exhaust.position.set(-2.4, 2.1, 2.0);
    onPremHvacGroup.add(exhaust);

    const hvacBadge = createWorldBadge("PRECISION CRAC COOLING", "Cold-Aisle Chiller & Diesel Backup", "#38bdf8", 2.6, 0.55);
    hvacBadge.position.set(-2.4, 3.8, 0);
    onPremHvacGroup.add(hvacBadge);
    onPremRackGroup.add(onPremHvacGroup);

    // Stage 4: Bare-Metal Provisioning Group
    onPremProvisioningGroup = new THREE.Group();
    // 48-port Arista top-of-rack switch
    const switchMesh = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.28, 1.4), new THREE.MeshStandardMaterial({ color: 0x0369a1, metalness: 0.85, emissive: 0x0284c7, emissiveIntensity: 0.5 }));
    switchMesh.position.set(0, 3.8, 0.05);
    onPremProvisioningGroup.add(switchMesh);

    // 48 Port LEDs
    for (let p = 0; p < 24; p++) {
      const portLed = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
      portLed.position.set(-0.85 + (p * 0.075), 3.8, 0.76);
      onPremProvisioningGroup.add(portLed);
    }

    const pxeBadge = createWorldBadge("PXE BOOT FLASHING", "eth0: 10.0.1.10/24 (Static Subnet)", "#10b981", 2.4, 0.55);
    pxeBadge.position.set(0, 4.8, 0);
    onPremProvisioningGroup.add(pxeBadge);
    onPremRackGroup.add(onPremProvisioningGroup);

    // Stage 5: Traffic Surge Saturation Warning
    onPremSaturationGroup = new THREE.Group();
    const satStrobe = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    satStrobe.position.set(0, 4.8, 0);
    onPremSaturationGroup.add(satStrobe);
    const satBadge = createWorldBadge("100% CPU OVERLOAD", "Thermal Ceiling · 504 Timeouts", "#ef4444", 2.6, 0.6);
    satBadge.position.set(0, 5.4, 0);
    onPremSaturationGroup.add(satBadge);
    onPremRackGroup.add(onPremSaturationGroup);

    // Stage 6: Physical Hardware Failure Group (Blown PSU & severed fiber)
    onPremFailureGroup = new THREE.Group();
    const sparkMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true }));
    sparkMesh.position.set(0.6, 3.2, 0.88);
    onPremFailureGroup.add(sparkMesh);

    // Severed Fiber Line on floor
    const cutFiber1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    cutFiber1.rotation.z = Math.PI / 2.5;
    cutFiber1.position.set(-0.6, 0.15, 1.4);
    onPremFailureGroup.add(cutFiber1);

    const failBadge = createWorldBadge("HARDWARE BLOWN (SPOF)", "PSU Blown & Fiber Cut", "#ef4444", 2.6, 0.6);
    failBadge.position.set(0, 5.0, 0);
    onPremFailureGroup.add(failBadge);
    onPremRackGroup.add(onPremFailureGroup);

    // Stage 7: Blackout & Decommissioning Plaque
    onPremBlackoutGroup = new THREE.Group();
    const decommBadge = createWorldBadge("FACILITY DECOMMISSIONED", "Hard Blackout · Write-Off -$250,000", "#ef4444", 3.0, 0.75);
    decommBadge.position.set(0, 5.0, 0);
    onPremBlackoutGroup.add(decommBadge);
    onPremRackGroup.add(onPremBlackoutGroup);

    // Global Facility Badge
    const badge = createWorldBadge("ON-PREMISE DATA CENTER", "CapEx · Manual Racking · Single AZ", "#ef4444", 2.8, 0.72);
    badge.position.set(0, 4.9, 0);
    onPremRackGroup.add(badge);
  }

  // --- 4. AWS Global Cloud Infrastructure (Right Bay, x: +4.0) ---
  function setupAwsCloudInfrastructure() {
    awsVpcGroup = new THREE.Group();
    awsVpcGroup.position.set(4.0, 0, 0);
    scene.add(awsVpcGroup);

    // Group 1: Base VPC Network Foundation (Stage 7+)
    awsVpcBaseGroup = new THREE.Group();
    awsVpcGroup.add(awsVpcBaseGroup);

    // AWS Cloud Foundation Base Pad (VPC Boundary)
    const vpcGeo = new THREE.BoxGeometry(8.5, 0.18, 6.2);
    const vpcMat = new THREE.MeshStandardMaterial({ color: 0x0b1329, metalness: 0.75, roughness: 0.35 });
    const vpcPad = new THREE.Mesh(vpcGeo, vpcMat);
    vpcPad.position.set(0, 0.09, 0);
    vpcPad.receiveShadow = true;
    awsVpcBaseGroup.add(vpcPad);

    // Glowing VPC Perimeter Boundary Line in AWS Orange
    const vpcEdges = new THREE.EdgesGeometry(vpcGeo);
    const vpcEdgeMesh = new THREE.LineSegments(vpcEdges, new THREE.LineBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.85 }));
    vpcEdgeMesh.position.copy(vpcPad.position);
    awsVpcBaseGroup.add(vpcEdgeMesh);

    // Multi-AZ Subnet Base Tiles
    const azConfigs = [
      { name: "AZ-1 (us-east-1a)", z: -1.7, color: 0x10b981, label: "Subnet 10.0.1.0/24" },
      { name: "AZ-2 (us-east-1b)", z: 1.7, color: 0x10b981, label: "Subnet 10.0.2.0/24" }
    ];

    azConfigs.forEach((az) => {
      // Subnet boundary tile
      const subGeo = new THREE.BoxGeometry(3.6, 0.1, 2.5);
      const subMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 });
      const subPad = new THREE.Mesh(subGeo, subMat);
      subPad.position.set(1.6, 0.16, az.z);
      awsVpcBaseGroup.add(subPad);

      const subEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(subGeo),
        new THREE.LineBasicMaterial({ color: az.color, transparent: true, opacity: 0.7 })
      );
      subEdges.position.copy(subPad.position);
      awsVpcBaseGroup.add(subEdges);
    });

    // Inter-AZ Subterranean Optical Fiber Link
    const fiberGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.4, 8);
    const fiberMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
    awsFiberLinkMesh = new THREE.Mesh(fiberGeo, fiberMat);
    awsFiberLinkMesh.rotation.x = Math.PI / 2;
    awsFiberLinkMesh.position.set(1.6, 0.18, 0);
    awsVpcBaseGroup.add(awsFiberLinkMesh);

    // VPC Header Badge
    const awsTitle = createWorldBadge("AWS CLOUD ARCHITECTURE", "Multi-AZ · Auto-Scaling · 99.99% SLA", "#ff9900", 3.2, 0.75);
    awsTitle.position.set(0, 4.9, 0);
    awsVpcBaseGroup.add(awsTitle);

    // Group 2: Global Ingress - Route 53 & ALB (Stage 8+)
    awsIngressGroup = new THREE.Group();
    awsVpcGroup.add(awsIngressGroup);

    // Route 53 Globe
    const r53Geo = new THREE.SphereGeometry(0.38, 16, 16);
    const r53Mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.5, wireframe: true });
    route53GlobeMesh = new THREE.Mesh(r53Geo, r53Mat);
    route53GlobeMesh.position.set(-2.4, 1.8, 0);
    awsIngressGroup.add(route53GlobeMesh);

    const r53Badge = createWorldBadge("Route 53 Global DNS", "100% SLA Anycast Ingress", "#8b5cf6", 2.2, 0.5);
    r53Badge.position.set(-2.4, 2.5, 0);
    awsIngressGroup.add(r53Badge);

    // Application Load Balancer (ALB) Diamond Hub
    const albGeo = new THREE.OctahedronGeometry(0.55, 0);
    const albMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    albMesh = new THREE.Mesh(albGeo, albMat);
    albMesh.position.set(-1.2, 0.9, 0);
    albMesh.castShadow = true;
    awsIngressGroup.add(albMesh);

    const albRingGeo = new THREE.TorusGeometry(0.85, 0.04, 16, 32);
    albRingMesh = new THREE.Mesh(albRingGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    albRingMesh.rotation.x = -Math.PI / 2;
    albRingMesh.position.set(-1.2, 0.9, 0);
    awsIngressGroup.add(albRingMesh);

    const albBadge = createWorldBadge("Application Load Balancer", "Layer 7 · Cross-AZ Routing", "#38bdf8", 2.2, 0.55);
    albBadge.position.set(-1.2, 1.8, 0);
    awsIngressGroup.add(albBadge);

    // Group 3: Compute Container Nodes (Stage 9+)
    awsComputeGroup = new THREE.Group();
    awsVpcGroup.add(awsComputeGroup);

    computeNodes = [];
    azConfigs.forEach((az) => {
      // Compute Container Node
      const nodeGeo = new THREE.BoxGeometry(1.2, 1.4, 1.1);
      const nodeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.25 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(1.4, 0.9, az.z);
      node.castShadow = true;
      awsComputeGroup.add(node);
      computeNodes.push(node);

      // Status LED indicator strip
      const ledGeo = new THREE.BoxGeometry(0.9, 0.08, 0.04);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(1.4, 1.45, az.z + 0.56);
      awsComputeGroup.add(led);

      // Node Label
      const nodeBadge = createWorldBadge(az.name, "ECS / EKS Fargate Pod", "#10b981", 1.8, 0.45);
      nodeBadge.position.set(1.4, 1.95, az.z);
      awsComputeGroup.add(nodeBadge);
    });

    // Group 4: Managed Multi-AZ Database: Amazon RDS (Stage 10+)
    awsDatabaseGroup = new THREE.Group();
    awsVpcGroup.add(awsDatabaseGroup);

    const rdsGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.1, 24);
    const rdsPrimaryMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.9, emissive: 0x1d4ed8, emissiveIntensity: 0.4 });
    rdsPrimaryMesh = new THREE.Mesh(rdsGeo, rdsPrimaryMat);
    rdsPrimaryMesh.position.set(3.4, 0.75, -1.6);
    awsDatabaseGroup.add(rdsPrimaryMesh);

    const rdsStandbyMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85 });
    rdsStandbyMesh = new THREE.Mesh(rdsGeo, rdsStandbyMat);
    rdsStandbyMesh.position.set(3.4, 0.75, 1.6);
    awsDatabaseGroup.add(rdsStandbyMesh);

    // Synchronous replication laser beam connecting Primary and Standby RDS
    const beamGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.2, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.75 });
    replBeamMesh = new THREE.Mesh(beamGeo, beamMat);
    replBeamMesh.rotation.x = Math.PI / 2;
    replBeamMesh.position.set(3.4, 0.75, 0);
    awsDatabaseGroup.add(replBeamMesh);

    const rdsBadge = createWorldBadge("Amazon RDS Multi-AZ", "Sync Replication · Auto-Failover", "#60a5fa", 2.2, 0.5);
    rdsBadge.position.set(3.4, 1.65, 0);
    awsDatabaseGroup.add(rdsBadge);

    // Group 5: Auto-Scaling Elastic Node (Stage 11+)
    awsScalingGroup = new THREE.Group();
    awsVpcGroup.add(awsScalingGroup);

    const autoNodeGeo = new THREE.BoxGeometry(1.2, 1.4, 1.1);
    const autoNodeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.6,
      metalness: 0.8
    });
    autoScaleNode = new THREE.Mesh(autoNodeGeo, autoNodeMat);
    autoScaleNode.position.set(2.9, 0.9, 0);
    autoScaleNode.scale.set(0.01, 0.01, 0.01);
    awsScalingGroup.add(autoScaleNode);

    const autoBadge = createWorldBadge("Auto Scaling Group", "+3 Dynamic Replicas Spawned", "#0ea5e9", 2.2, 0.5);
    autoBadge.position.set(2.9, 1.95, 0);
    autoScaleNode.userData = { badge: autoBadge };
    awsScalingGroup.add(autoBadge);

    // Group 6: AZ Outage Hazard Ring & RDS Failover Badge (Stage 12)
    awsFailoverGroup = new THREE.Group();
    awsVpcGroup.add(awsFailoverGroup);

    const hazGeo = new THREE.TorusGeometry(1.6, 0.04, 8, 32);
    awsDisasterHazardRing = new THREE.Mesh(hazGeo, new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.8 }));
    awsDisasterHazardRing.rotation.x = -Math.PI / 2;
    awsDisasterHazardRing.position.set(1.4, 0.22, -1.7);
    awsFailoverGroup.add(awsDisasterHazardRing);

    rdsFailoverBadge = createWorldBadge("AZ-2 PROMOTED TO PRIMARY", "60-Second DNS Failover · 0 Data Loss", "#10b981", 2.6, 0.6);
    rdsFailoverBadge.position.set(3.4, 2.35, 1.6);
    awsFailoverGroup.add(rdsFailoverBadge);

    // Group 7: Amazon S3 Storage & CloudFront (Stage 13)
    awsServerlessGroup = new THREE.Group();
    awsVpcGroup.add(awsServerlessGroup);

    const s3Geo = new THREE.CylinderGeometry(0.55, 0.45, 0.75, 24);
    const s3Mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, emissive: 0xd97706, emissiveIntensity: 0.4 });
    s3Mesh = new THREE.Mesh(s3Geo, s3Mat);
    s3Mesh.position.set(2.4, 0.55, 0);
    awsServerlessGroup.add(s3Mesh);

    const s3Badge = createWorldBadge("Amazon S3 & CloudFront", "99.999999999% Durability · $0 Idle", "#f59e0b", 2.4, 0.55);
    s3Badge.position.set(2.4, 1.45, 0);
    awsServerlessGroup.add(s3Badge);
  }

  // --- Dedicated AWS Cloud DevOps Workstation with Laptop (Right Side) ---
  function setupAwsRightWorkstation() {
    awsWorkstationGroup = new THREE.Group();
    awsWorkstationGroup.position.set(9.6, 0, 0.5);
    scene.add(awsWorkstationGroup);

    // 1. Standing Desk Podium
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.08, 32);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });
    const baseMesh = new THREE.Mesh(baseGeo, metalMat);
    baseMesh.position.set(0, 0.04, 0);
    baseMesh.receiveShadow = true;
    awsWorkstationGroup.add(baseMesh);

    const colGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.05, 16);
    const col1 = new THREE.Mesh(colGeo, metalMat);
    col1.position.set(-0.25, 0.58, 0);
    const col2 = new THREE.Mesh(colGeo, metalMat);
    col2.position.set(0.25, 0.58, 0);
    awsWorkstationGroup.add(col1);
    awsWorkstationGroup.add(col2);

    const deskGeo = new THREE.BoxGeometry(1.6, 0.06, 1.0);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.3 });
    const deskTop = new THREE.Mesh(deskGeo, deskMat);
    deskTop.position.set(0, 1.1, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    awsWorkstationGroup.add(deskTop);

    const deskEdges = new THREE.EdgesGeometry(deskGeo);
    const deskEdgeMesh = new THREE.LineSegments(deskEdges, new THREE.LineBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.6 }));
    deskEdgeMesh.position.copy(deskTop.position);
    awsWorkstationGroup.add(deskEdgeMesh);

    // 2. Open Laptop (MacBook Pro in Space Gray)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 1.13, 0.05);
    laptopGroup.rotation.y = -Math.PI / 12;
    awsWorkstationGroup.add(laptopGroup);

    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });

    const baseChassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.024, 0.5), chassisMat);
    baseChassis.castShadow = true;
    laptopGroup.add(baseChassis);

    const kbGeo = new THREE.BoxGeometry(0.62, 0.005, 0.22);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, 0.014, -0.05);
    laptopGroup.add(kbMesh);

    const trackGeo = new THREE.BoxGeometry(0.22, 0.003, 0.14);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.position.set(0, 0.013, 0.14);
    laptopGroup.add(trackMesh);

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.012, -0.245);
    lidGroup.rotation.x = -Math.PI * 0.1;
    laptopGroup.add(lidGroup);

    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.48, 0.015), chassisMat);
    lidMesh.position.set(0, 0.24, 0);
    lidGroup.add(lidMesh);

    const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    logoMesh.position.set(0, 0.24, -0.009);
    logoMesh.rotation.y = Math.PI;
    lidGroup.add(logoMesh);

    // 3. Screen Canvas
    awsLaptopScreenCanvas = document.createElement('canvas');
    awsLaptopScreenCanvas.width = 512;
    awsLaptopScreenCanvas.height = 320;
    awsLaptopScreenCtx = awsLaptopScreenCanvas.getContext('2d');
    awsLaptopScreenTexture = new THREE.CanvasTexture(awsLaptopScreenCanvas);

    const screenMat = new THREE.MeshBasicMaterial({ map: awsLaptopScreenTexture });
    awsLaptopScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.67, 0.43), screenMat);
    awsLaptopScreenMesh.position.set(0, 0.24, 0.009);
    lidGroup.add(awsLaptopScreenMesh);

    updateAwsLaptopScreen(currentStep);

    // 4. Workstation Badge
    const wsBadge = createWorldBadge("AWS Cloud DevOps Station", "Terraform IaC & CloudWatch Terminal", "#ff9900", 2.4, 0.55);
    wsBadge.position.set(0, 2.0, 0);
    awsWorkstationGroup.add(wsBadge);

    // 5. Optical Uplink Cable Connecting AWS Right Laptop to AWS VPC
    const uplinkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(9.25, 1.13, 0.5),
      new THREE.Vector3(8.8, 0.65, 0.35),
      new THREE.Vector3(8.4, 0.22, 0.15),
      new THREE.Vector3(8.0, 0.18, 0.0)
    ]);
    const uplinkTubeGeo = new THREE.TubeGeometry(uplinkCurve, 30, 0.025, 8, false);
    const uplinkTubeMat = new THREE.MeshStandardMaterial({
      color: 0xff9900,
      metalness: 0.8,
      emissive: 0xd97706,
      emissiveIntensity: 0.6
    });
    const uplinkMesh = new THREE.Mesh(uplinkTubeGeo, uplinkTubeMat);
    awsWorkstationGroup.add(uplinkMesh);

    // Packets flowing from Right Laptop to VPC
    for (let i = 0; i < 3; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffaa00 })
      );
      awsWorkstationGroup.add(pMesh);
      conduitPackets.push({
        mesh: pMesh,
        curve: uplinkCurve,
        progress: i * 0.33,
        speed: 0.25,
        reverse: false
      });
    }
  }

  // --- 5. Hybrid Console Conduits: Connect On-Premises to Laptop, and AWS materials to Laptop ---
  function setupHybridLaptopConduits() {
    hybridConduitsGroup = new THREE.Group();
    scene.add(hybridConduitsGroup);

    // Cable 1: On-Premises 42U Rack Switch to Laptop Console (Left Side Cable)
    const onPremCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, 2.65, 0.46),  // 42U Rack Switch
      new THREE.Vector3(-3.2, 1.85, 0.58),  // Graceful downward sag
      new THREE.Vector3(-2.6, 1.35, 0.66),  // Routing across cart
      new THREE.Vector3(-1.98, 1.22, 0.65)  // Laptop USB/RJ45 Left Port
    ]);
    const onPremTubeGeo = new THREE.TubeGeometry(onPremCurve, 40, 0.035, 12, false);
    const onPremTubeMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0088aa,
      emissiveIntensity: 0.5
    });
    const onPremTube = new THREE.Mesh(onPremTubeGeo, onPremTubeMat);
    hybridConduitsGroup.add(onPremTube);

    // Cable 2: CRAC Chiller & PDU Telemetry Cable to Laptop
    const chillerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6.4, 0.7, -1.2),  // CRAC Sensor
      new THREE.Vector3(-5.0, 0.12, -0.6), // Floor tray
      new THREE.Vector3(-3.0, 0.12, 0.2),  // Raised floor route
      new THREE.Vector3(-1.75, 0.4, 0.55), // Cart base column
      new THREE.Vector3(-1.98, 1.16, 0.65) // Laptop secondary port
    ]);
    const chillerTubeGeo = new THREE.TubeGeometry(chillerCurve, 40, 0.024, 10, false);
    const chillerTubeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0x065f46,
      emissiveIntensity: 0.45
    });
    const chillerTube = new THREE.Mesh(chillerTubeGeo, chillerTubeMat);
    hybridConduitsGroup.add(chillerTube);

    // Cable 3: Laptop to AWS Route 53 Global Gateway (Right Side Optical Link)
    const awsRoute53Curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.82, 1.22, 0.65), // Laptop Right Port
      new THREE.Vector3(-0.15, 1.58, 0.45), // Ascending arc across boundary
      new THREE.Vector3(0.65, 1.76, 0.25),  // High-speed optical conduit
      new THREE.Vector3(1.4, 1.8, 0.0)      // Route 53 Global DNS Globe
    ]);
    const awsR53TubeGeo = new THREE.TubeGeometry(awsRoute53Curve, 40, 0.038, 12, false);
    const awsR53TubeMat = new THREE.MeshStandardMaterial({
      color: 0xff9900,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0xd97706,
      emissiveIntensity: 0.65
    });
    const awsR53Tube = new THREE.Mesh(awsR53TubeGeo, awsR53TubeMat);
    hybridConduitsGroup.add(awsR53Tube);

    // Cable 4: Laptop to AWS Application Load Balancer (ALB) Hub
    const awsAlbCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.82, 1.15, 0.65), // Laptop Right Lower Port
      new THREE.Vector3(0.1, 0.72, 0.45),   // Flowing to ALB
      new THREE.Vector3(1.3, 0.46, 0.2),    // Ingress route
      new THREE.Vector3(2.6, 0.42, 0.0)     // ALB Diamond Ingress
    ]);
    const awsAlbTubeGeo = new THREE.TubeGeometry(awsAlbCurve, 40, 0.028, 10, false);
    const awsAlbTubeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.75,
      roughness: 0.22,
      emissive: 0x0284c7,
      emissiveIntensity: 0.55
    });
    const awsAlbTube = new THREE.Mesh(awsAlbTubeGeo, awsAlbTubeMat);
    hybridConduitsGroup.add(awsAlbTube);

    // Connector Transceivers at Laptop Ports
    const connectorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.1 });
    const rj45Boot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.12), connectorMat);
    rj45Boot.position.set(-1.98, 1.21, 0.65);
    hybridConduitsGroup.add(rj45Boot);

    const sfpBoot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.12), new THREE.MeshStandardMaterial({ color: 0xff9900, metalness: 0.9 }));
    sfpBoot.position.set(-0.82, 1.21, 0.65);
    hybridConduitsGroup.add(sfpBoot);

    // Animated Focused Data Packets Gliding Along Physical Conduits (Zero loose dots)
    // On-Premises to Laptop packets (Cyan / Emerald)
    for (let i = 0; i < 4; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
      );
      hybridConduitsGroup.add(pMesh);
      conduitPackets.push({
        mesh: pMesh,
        curve: onPremCurve,
        progress: i * 0.25,
        speed: 0.22,
        reverse: true // Flows from Rack towards Laptop
      });
    }

    // Laptop to AWS Route 53 packets (AWS Orange)
    for (let i = 0; i < 5; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffaa00 })
      );
      hybridConduitsGroup.add(pMesh);
      conduitPackets.push({
        mesh: pMesh,
        curve: awsRoute53Curve,
        progress: i * 0.2,
        speed: 0.24,
        reverse: false // Flows from Laptop towards AWS
      });
    }

    // Laptop to AWS ALB packets (Sky Blue)
    for (let i = 0; i < 4; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      hybridConduitsGroup.add(pMesh);
      conduitPackets.push({
        mesh: pMesh,
        curve: awsAlbCurve,
        progress: i * 0.25,
        speed: 0.22,
        reverse: false // Flows from Laptop towards ALB
      });
    }
  }

  // --- Step Orchestration (14 Stages - Presentation Grade) ---
  function updateStep(stepIndex) {
    currentStep = Math.max(0, Math.min(AWS_STEPS.length - 1, stepIndex));
    const data = AWS_STEPS[currentStep];

    const titleEl = document.getElementById('aws-step-title');
    const subtitleEl = document.getElementById('aws-step-subtitle');
    const explEl = document.getElementById('aws-step-explanation');
    const counterEl = document.getElementById('aws-step-counter');
    const phasePillEl = document.getElementById('aws-step-phase-pill');
    const bulletsEl = document.getElementById('aws-step-bullets');
    const cmdEl = document.getElementById('aws-step-cmd');
    const presenterNoteEl = document.getElementById('aws-step-presenter-note');

    const telOnPrem = document.getElementById('tel-onprem');
    const telVpc = document.getElementById('tel-vpc');
    const telAz = document.getElementById('tel-az');
    const telDb = document.getElementById('tel-db');

    if (counterEl) {
      counterEl.textContent = `STAGE ${String(currentStep + 1).padStart(2, '0')}/14`;
    }

    if (phasePillEl) {
      if (currentStep < 7) {
        phasePillEl.textContent = "PHASE 1: ON-PREMISES";
        phasePillEl.style.background = "#fef3c7";
        phasePillEl.style.color = "#d97706";
        phasePillEl.style.borderColor = "rgba(217, 119, 6, 0.3)";
      } else {
        phasePillEl.textContent = "PHASE 2: AWS CLOUD";
        phasePillEl.style.background = "rgba(255, 153, 0, 0.15)";
        phasePillEl.style.color = "#ff9900";
        phasePillEl.style.borderColor = "#ff9900";
      }
    }

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (explEl) explEl.textContent = data.explanation;

    // Render Presentation Bullet Points
    if (bulletsEl && data.bullets) {
      bulletsEl.innerHTML = '';
      const isAws = currentStep >= 7;
      data.bullets.forEach(b => {
        const row = document.createElement('div');
        row.className = `slide-bullet-item ${isAws ? 'aws' : 'onprem'}`;
        row.innerHTML = `<span class="bullet-icon">${isAws ? '☁️' : '⚠️'}</span><span>${b}</span>`;
        bulletsEl.appendChild(row);
      });
    }

    // Render Execution Command Snippet
    if (cmdEl && data.cmd) {
      cmdEl.textContent = data.cmd;
    }

    // Render Presenter Talking Point
    if (presenterNoteEl && data.presenterNote) {
      presenterNoteEl.textContent = data.presenterNote;
    }

    // Update Telemetry Panel directly from Stage Metadata
    if (data.telemetry) {
      if (telOnPrem) telOnPrem.textContent = data.telemetry.onprem;
      if (telVpc) telVpc.textContent = data.telemetry.vpc;
      if (telAz) telAz.textContent = data.telemetry.az;
      if (telDb) telDb.textContent = data.telemetry.db;
    }

    // Camera Lerp Target
    targetCamPos.set(data.camera.x, data.camera.y, data.camera.z);
    targetLookAt.set(data.camera.targetX, data.camera.targetY, data.camera.targetZ);
    isCameraLerping = true;

    // Segmented Control Pill Highlighting & Auto-Scroll (Horizontally ONLY, without jumping page scroll!)
    const pillsContainer = document.getElementById('aws-step-pills');
    if (pillsContainer) {
      const pills = pillsContainer.querySelectorAll('.aws-step-pill');
      pills.forEach((pill, idx) => {
        pill.classList.toggle('active', idx === currentStep);
      });
      const activePill = pills[currentStep];
      if (activePill) {
        const scrollLeft = activePill.offsetLeft - (pillsContainer.clientWidth / 2) + (activePill.clientWidth / 2);
        pillsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    // Update Progress Bar
    const progressFill = document.getElementById('aws-progress-fill');
    if (progressFill) {
      progressFill.style.width = ((currentStep / (AWS_STEPS.length - 1)) * 100) + '%';
    }

    // Update Navigation Buttons & Floating Viewport Arrows
    const prevBtn = document.getElementById('btn-aws-prev');
    const nextBtn = document.getElementById('btn-aws-next');
    const vpPrevArrow = document.getElementById('btn-vp-arrow-prev');
    const vpNextArrow = document.getElementById('btn-vp-arrow-next');

    if (prevBtn) prevBtn.disabled = currentStep === 0;
    if (nextBtn) nextBtn.disabled = currentStep === AWS_STEPS.length - 1;
    if (vpPrevArrow) vpPrevArrow.disabled = currentStep === 0;
    if (vpNextArrow) vpNextArrow.disabled = currentStep === AWS_STEPS.length - 1;

    // Trigger smooth content animation on sidebar (like CI/CD)
    const mainCard = document.getElementById('aws-slide-main-card');
    if (mainCard) {
      mainCard.classList.remove('slide-morph-anim');
      void mainCard.offsetWidth; // Force reflow
      mainCard.classList.add('slide-morph-anim');
    }

    // Auto-scroll sidebar smoothly to top so title and takeaways are always perfectly aligned
    const sidebar = document.querySelector('.studio-sidebar');
    if (sidebar) {
      sidebar.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- On-Premise Stages (0 - 6) Visibility & State ---
    if (onPremDeliveryGroup) onPremDeliveryGroup.visible = (currentStep === 0);
    if (onPremCablingGroup) onPremCablingGroup.visible = (currentStep === 1);
    if (onPremHvacGroup) onPremHvacGroup.visible = (currentStep === 2);
    if (onPremProvisioningGroup) onPremProvisioningGroup.visible = (currentStep === 3);
    if (onPremSaturationGroup) onPremSaturationGroup.visible = (currentStep === 4);
    if (onPremFailureGroup) onPremFailureGroup.visible = (currentStep === 5);
    if (onPremBlackoutGroup) onPremBlackoutGroup.visible = (currentStep === 6);

    // Update Sysadmin Laptop Screen with Live Stage Output for ALL 14 STAGES!
    updateLaptopScreen(currentStep);

    // Overheat glow on Stage 4 or Traffic Spike
    if (onPremHeatGlow) {
      onPremHeatGlow.material.opacity = (currentStep === 4 || isTrafficSpike) ? 0.75 : 0;
    }

    // Blackout state: turn server LEDs off at Stage 6
    if (onPremLeds.length > 0) {
      const isDead = (currentStep === 6);
      onPremLeds.forEach(led => {
        led.material.color.setHex(isDead ? 0x0f172a : 0x10b981);
      });
    }

    // --- AWS Cloud Progressive Service Revelation: Show services one by one! ---
    if (awsVpcBaseGroup) awsVpcBaseGroup.visible = (currentStep >= 7);
    if (awsIngressGroup) awsIngressGroup.visible = (currentStep >= 8);
    if (awsComputeGroup) awsComputeGroup.visible = (currentStep >= 9);
    if (awsDatabaseGroup) awsDatabaseGroup.visible = (currentStep >= 10);
    if (awsScalingGroup) awsScalingGroup.visible = (currentStep >= 11 || isTrafficSpike);
    if (awsFailoverGroup) awsFailoverGroup.visible = (currentStep === 12 || isAzOutage);
    if (awsServerlessGroup) awsServerlessGroup.visible = (currentStep >= 13);
    if (awsWorkstationGroup) awsWorkstationGroup.visible = (currentStep >= 7);

    // Update Right Workstation Laptop Screen with Live Stage Output!
    updateAwsLaptopScreen(currentStep);

    // --- AWS Cloud Stages (7 - 13) Visibility & Interactive 3D Highlights ---
    // Optical Fiber Link on Stage 7
    if (awsFiberLinkMesh) {
      awsFiberLinkMesh.material.opacity = (currentStep === 7) ? 1.0 : 0.6;
    }

    // Route 53 & ALB Emissive Highlight on Stage 8
    if (route53GlobeMesh) {
      route53GlobeMesh.material.emissiveIntensity = (currentStep === 8) ? 0.95 : 0.45;
    }
    if (albMesh) {
      albMesh.material.emissiveIntensity = (currentStep === 8) ? 0.95 : 0.45;
    }

    // Compute Nodes Highlight on Stage 9
    computeNodes.forEach(node => {
      if (node && node.material) {
        if (currentStep === 12 || isAzOutage) {
          if (node === computeNodes[0]) node.material.color.setHex(0xef4444);
          else node.material.color.setHex(0x10b981);
        } else if (currentStep === 9) {
          node.material.color.setHex(0x059669);
        } else {
          node.material.color.setHex(0x0f172a);
        }
      }
    });

    // RDS Replication Beam Highlight on Stage 10
    if (rdsPrimaryMesh) {
      rdsPrimaryMesh.material.emissiveIntensity = (currentStep === 10) ? 0.85 : 0.35;
    }
    if (rdsStandbyMesh) {
      rdsStandbyMesh.material.emissiveIntensity = (currentStep === 10) ? 0.85 : 0.35;
    }
    if (replBeamMesh) {
      replBeamMesh.material.opacity = (currentStep === 10) ? 0.95 : 0.45;
    }

    // Auto-Scaling at Stage 11
    if (currentStep === 11 || isTrafficSpike) {
      triggerAutoScaling(true);
    } else {
      triggerAutoScaling(false);
    }

    // Disaster Failover at Stage 12
    if (currentStep === 12 || isAzOutage) {
      if (awsDisasterHazardRing) awsDisasterHazardRing.visible = true;
      if (rdsFailoverBadge) rdsFailoverBadge.visible = true;
      if (computeNodes[0]) computeNodes[0].material.color.setHex(0xef4444);
      if (rdsStandbyMesh) rdsStandbyMesh.material.color.setHex(0x38bdf8);
    } else {
      if (awsDisasterHazardRing) awsDisasterHazardRing.visible = false;
      if (rdsFailoverBadge) rdsFailoverBadge.visible = false;
      if (computeNodes[0] && currentStep !== 9) computeNodes[0].material.color.setHex(0x0f172a);
      if (rdsStandbyMesh) rdsStandbyMesh.material.color.setHex(0x475569);
    }

    // S3 & Serverless Overview on Stage 13
    if (s3Mesh) {
      s3Mesh.material.emissiveIntensity = (currentStep === 13) ? 0.95 : 0.4;
    }
  }

  function triggerAutoScaling(active) {
    if (!autoScaleNode) return;
    autoScaleNode.visible = active;
    if (autoScaleNode.userData && autoScaleNode.userData.badge) {
      autoScaleNode.userData.badge.visible = active;
    }
  }

  // --- UI Controls ---
  function setupUIControls() {
    const prevBtn = document.getElementById('btn-aws-prev');
    const nextBtn = document.getElementById('btn-aws-next');
    const autoBtn = document.getElementById('btn-aws-auto');
    const resetBtn = document.getElementById('btn-aws-reset');
    const spikeBtn = document.getElementById('btn-spike-traffic');
    const outageBtn = document.getElementById('btn-simulate-outage');
    const cinemaBtn = document.getElementById('btn-aws-cinema');
    const zoomOutBtn = document.getElementById('btn-aws-zoom-out');
    const zoomInBtn = document.getElementById('btn-aws-zoom-in');
    const resetCamBtn = document.getElementById('btn-aws-reset-cam');
    const pillsContainer = document.getElementById('aws-step-pills');

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

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        isCameraLerping = false;
        if (controls && camera) {
          const offset = camera.position.clone().sub(controls.target);
          camera.position.add(offset.normalize().multiplyScalar(2.5));
          controls.update();
        }
      });
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        isCameraLerping = false;
        if (controls && camera) {
          const offset = camera.position.clone().sub(controls.target);
          if (offset.length() > 4.5) {
            camera.position.sub(offset.normalize().multiplyScalar(2.0));
            controls.update();
          }
        }
      });
    }

    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => {
        const s = AWS_STEPS[currentStep];
        if (s && s.camera) {
          targetCamPos.set(s.camera.x, s.camera.y, s.camera.z);
          targetLookAt.set(s.camera.targetX, s.camera.targetY, s.camera.targetZ);
          isCameraLerping = true;
        }
      });
    }

    // Deck Prev & Next Buttons
    if (prevBtn) prevBtn.addEventListener('click', () => { pauseAuto(); updateStep(currentStep - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { pauseAuto(); updateStep(currentStep + 1); });

    // Floating On-Canvas Viewport Navigation Arrows (‹ and ›)
    const vpPrevArrow = document.getElementById('btn-vp-arrow-prev');
    const vpNextArrow = document.getElementById('btn-vp-arrow-next');
    if (vpPrevArrow) {
      vpPrevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        pauseAuto();
        updateStep(currentStep - 1);
      });
    }
    if (vpNextArrow) {
      vpNextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        pauseAuto();
        updateStep(currentStep + 1);
      });
    }

    // Keyboard Navigation (ArrowLeft, ArrowRight, Space)
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        pauseAuto();
        updateStep(currentStep + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        pauseAuto();
        updateStep(currentStep - 1);
      }
    });
    if (resetBtn) resetBtn.addEventListener('click', () => {
      pauseAuto();
      isTrafficSpike = false;
      isAzOutage = false;
      triggerAutoScaling(false);
      updateStep(0);
    });

    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        if (isAutoPlaying) pauseAuto();
        else startAuto();
      });
    }

    if (spikeBtn) {
      spikeBtn.addEventListener('click', () => {
        isTrafficSpike = !isTrafficSpike;
        spikeBtn.classList.toggle('is-toggled', isTrafficSpike);
        spikeBtn.textContent = isTrafficSpike ? '⚡ Spike Active: 10,000 Req/s' : '⚡ Simulate Traffic Surge (10k Req/s)';
        if (onPremHeatGlow) onPremHeatGlow.material.opacity = isTrafficSpike ? 0.75 : 0;
        triggerAutoScaling(isTrafficSpike);
      });
    }

    if (outageBtn) {
      outageBtn.addEventListener('click', () => {
        isAzOutage = !isAzOutage;
        outageBtn.classList.toggle('is-toggled', isAzOutage);
        outageBtn.textContent = isAzOutage ? '⚠️ AZ-1 Outage Active (Auto-Rerouted)' : '💥 Simulate AZ-1 Disaster Outage';
        if (computeNodes[0]) {
          computeNodes[0].material.color.setHex(isAzOutage ? 0xef4444 : 0x0f172a);
        }
        if (awsDisasterHazardRing) awsDisasterHazardRing.visible = isAzOutage;
        if (rdsFailoverBadge) rdsFailoverBadge.visible = isAzOutage;
      });
    }

    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      AWS_STEPS.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = 'aws-step-pill' + (idx === 0 ? ' active' : '');
        btn.textContent = s.pillLabel || `S${idx + 1}`;
        btn.title = `${s.phase}: ${s.title}`;
        btn.addEventListener('click', () => {
          pauseAuto();
          updateStep(idx);
        });
        pillsContainer.appendChild(btn);
      });
    }
  }

  function startAuto() {
    isAutoPlaying = true;
    const autoBtn = document.getElementById('btn-aws-auto');
    if (autoBtn) autoBtn.textContent = '⏸ Pause';
    advanceAuto();
  }

  function pauseAuto() {
    isAutoPlaying = false;
    clearTimeout(autoTimer);
    const autoBtn = document.getElementById('btn-aws-auto');
    if (autoBtn) autoBtn.textContent = '▶ Auto-Play';
  }

  function advanceAuto() {
    clearTimeout(autoTimer);
    if (!isAutoPlaying) return;

    if (currentStep < AWS_STEPS.length - 1) {
      autoTimer = setTimeout(() => {
        if (!isAutoPlaying) return;
        updateStep(currentStep + 1);
        advanceAuto();
      }, 4200);
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

    // Smooth Camera Flight
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

    // Fan Rotations
    onPremBigFans.forEach(fan => {
      fan.rotation.y += delta * (isTrafficSpike || currentStep === 4 ? 24.0 : 8.0);
    });

    // Route 53 Globe & ALB Ring Rotation
    if (route53GlobeMesh) {
      route53GlobeMesh.rotation.y += delta * 1.2;
    }
    if (albMesh) {
      albMesh.rotation.y += delta * 1.5;
    }
    if (albRingMesh) {
      albRingMesh.rotation.z += delta * 2.2;
    }

    // Auto-Scale Node Spawning Animation
    if (autoScaleNode && autoScaleNode.visible) {
      autoScaleNode.scale.x += (1.0 - autoScaleNode.scale.x) * 0.15;
      autoScaleNode.scale.y += (1.0 - autoScaleNode.scale.y) * 0.15;
      autoScaleNode.scale.z += (1.0 - autoScaleNode.scale.z) * 0.15;
    }

    // Replication Beam Pulsing
    if (replBeamMesh) {
      replBeamMesh.material.opacity = 0.4 + Math.sin(elapsed * 5.0) * 0.35;
    }

    // Animated Data Packets Flowing Along Conduits (Zero loose dots)
    if (conduitPackets && conduitPackets.length > 0) {
      const speedMultiplier = isTrafficSpike ? 2.5 : 1.0;
      conduitPackets.forEach(p => {
        p.progress += delta * p.speed * speedMultiplier;
        if (p.progress > 1.0) p.progress -= 1.0;
        const t = p.reverse ? (1.0 - p.progress) : p.progress;
        p.mesh.position.copy(p.curve.getPointAt(t));
      });
    }

    // Billboard all world badges so text is always perpendicular to camera without distortion or overlap
    if (allWorldBadges && allWorldBadges.length > 0) {
      allWorldBadges.forEach(b => {
        if (b && b.visible) {
          b.quaternion.copy(camera.quaternion);
        }
      });
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
