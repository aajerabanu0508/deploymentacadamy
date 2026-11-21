from flask import Flask, render_template, jsonify, abort

app = Flask(__name__)
TOPICS = {
    'cicd': {'title':'CI/CD', 'subtitle':'Automate testing, packaging and delivery', 'icon':'⚙️', 'modes': {
        'GitHub Actions': [
            ['💻','Commit','Developer commits code','git add . && git commit -m "Update app"','A commit records a version of the application.'],
            ['🐙','Push','GitHub receives the push','git push origin main','A push event can trigger a GitHub Actions workflow.'],
            ['🏃','Runner','Runner checks out code','actions/checkout@v4','A runner executes the jobs defined in workflow YAML.'],
            ['🧪','Test','Install dependencies and run tests','python -m pip install -r requirements.txt && python -m pytest','Tests must pass before publishing the image.'],
            ['🐳','Build','Build a versioned Docker image','docker build -t app:COMMIT_SHA .','A Dockerfile defines a reproducible application image.'],
            ['📦','Registry','Push image to a registry','docker push REGISTRY/app:COMMIT_SHA','A registry stores images for deployment.'],
            ['☁️','Deploy','Deploy image to AWS','deploy app:COMMIT_SHA to EC2/ECS/EKS','The deployment target pulls the tested image.'],
            ['❤️','Verify','Check health and monitor','curl -f https://app.example.com/health','A health check confirms the app responds after deployment.']
        ],
        'Jenkins': [
            ['💻','Commit','Developer commits code','git add . && git commit -m "Update app"','Code changes are versioned.'],
            ['🐙','Push','GitHub notifies Jenkins','git push origin main','A configured webhook can trigger a Jenkins job.'],
            ['⚙️','Agent','Jenkins agent checks out code','checkout scm','The Jenkins controller schedules work on an agent.'],
            ['🧪','Test','Execute Jenkinsfile test stage','sh "python -m pytest"','The pipeline fails if required tests fail.'],
            ['🐳','Build','Build a Docker image','docker build -t app:BUILD_NUMBER .','The build produces a versioned image.'],
            ['📦','Registry','Publish tested image','docker push REGISTRY/app:BUILD_NUMBER','Credentials should be provided securely.'],
            ['☁️','Deploy','Release image to AWS','deploy app:BUILD_NUMBER to EC2/ECS/EKS','The deployment stage updates the runtime.'],
            ['❤️','Verify','Check health and monitor','curl -f https://app.example.com/health','Post-deployment checks help catch regressions.']
        ]}},
    'docker': {'title':'Docker', 'subtitle':'From source code to running container', 'icon':'🐳', 'modes': {'Container lifecycle': [
        ['💻','Source','Write the Flask application','python app.py','Source code and dependencies are the starting point.'],
        ['📄','Dockerfile','Describe image build steps','FROM python:3.12-slim','A Dockerfile describes the image layers and startup command.'],
        ['🔨','Build','Build the image','docker build -t demo:v1 .','Docker builds a reusable image from the Dockerfile.'],
        ['🖼️','Image','Inspect local image','docker images','An image is an immutable template for containers.'],
        ['📦','Registry','Tag and push the image','docker tag demo:v1 REGISTRY/demo:v1','Registries distribute versioned images to other hosts.'],
        ['🚀','Container','Start a container','docker run -d --name demo -p 5000:5000 demo:v1','A container is a running instance of an image.'],
        ['❤️','Verify','Check logs and endpoint','docker logs demo','Logs and HTTP checks help verify behavior.']
    ]}},
    'kubernetes': {'title':'Kubernetes', 'subtitle':'Deploy, expose, scale and heal workloads', 'icon':'☸️', 'modes': {'Application lifecycle': [
        ['📄','Manifest','Define desired workload','kubectl apply -f deployment.yaml','A Deployment declares replicas and a container image.'],
        ['🧠','API Server','Accept desired state','kubectl get deployments','The API server stores and exposes cluster state.'],
        ['🎛️','Controller','Reconcile replicas','kubectl describe deployment demo','Controllers create or replace resources to match desired state.'],
        ['📅','Scheduler','Choose nodes for Pods','kubectl get pods -o wide','The scheduler assigns unscheduled Pods to suitable nodes.'],
        ['📦','Pods','Run application containers','kubectl get pods','The kubelet starts containers on the selected nodes.'],
        ['🌐','Service','Expose stable in-cluster access','kubectl get services','A Service provides stable access to matching Pods.'],
        ['📈','Scale','Increase replica count','kubectl scale deployment/demo --replicas=3','The Deployment controller creates more Pods.'],
        ['❤️','Self-heal','Replace failed Pods','kubectl rollout status deployment/demo','Controllers work to restore the desired replica count.']
    ]}},
    'aws': {'title':'AWS Cloud', 'subtitle':'Build a secure path from internet to application', 'icon':'☁️', 'modes': {'EC2 web app': [
        ['🌍','DNS','Resolve application domain','dig app.example.com','Route 53 can host DNS records that point users to an endpoint.'],
        ['🛡️','VPC','Create network boundaries','aws ec2 describe-vpcs','VPCs, subnets and route tables define network reachability.'],
        ['🔒','Security','Allow only required traffic','aws ec2 describe-security-groups','Security groups filter traffic to resources.'],
        ['⚖️','Load Balancer','Route incoming HTTP traffic','aws elbv2 describe-load-balancers','An ALB can terminate TLS and route traffic to healthy targets.'],
        ['🖥️','EC2','Run application container','docker ps','An EC2 instance provides compute for the app.'],
        ['📊','Monitoring','Collect metrics and logs','aws cloudwatch list-metrics','CloudWatch can collect telemetry and trigger alarms.'],
        ['❤️','Health','Validate application response','curl -f https://app.example.com/health','Health checks help verify availability.']
    ]}}
}

@app.get('/')
def home():
    return render_template('index.html', topics=TOPICS)

@app.get('/docker')
def docker_page():
    return render_template('docker.html')

@app.get('/aws')
def aws_page():
    return render_template('aws.html')

@app.get('/learn/<topic>')
def learn(topic):
    if topic == 'docker':
        return render_template('docker.html')
    if topic == 'aws':
        return render_template('aws.html')
    if topic not in TOPICS:
        abort(404)
    return render_template('topic.html', topic=TOPICS[topic], topic_id=topic)

@app.get('/cicd')
def cicd():
    return learn('cicd')

@app.get('/cicd-cinematic')
def cicd_cinematic():
    return render_template('cicd_cinematic.html')

@app.get('/health')
def health():
    return jsonify(status='healthy', application='DevOps Interactive Academy')

if __name__ == '__main__':
    import os, socket
    port = int(os.environ.get('PORT', 0))
    if not port:
        for p in [5000, 5001, 5002]:
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.bind(('127.0.0.1', p))
                    port = p
                    break
            except OSError:
                continue
    app.run(host='127.0.0.1', port=port or 5001, debug=True)
