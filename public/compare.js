// AWS Cloud Referee - Service Comparison Frontend

// AWS Services with Official Icon URLs
const awsServices = [
    { name: 'Lambda', iconUrl: 'https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg', color: '#FF9900' },
    { name: 'EC2', iconUrl: 'https://icon.icepanel.io/AWS/svg/Compute/EC2.svg', color: '#FF9900' },
    { name: 'S3', iconUrl: 'https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg', color: '#569A31' },
    { name: 'DynamoDB', iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg', color: '#4053D6' },
    { name: 'RDS', iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/RDS.svg', color: '#527FFF' },
    { name: 'API Gateway', iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg', color: '#FF4F8B' },
    { name: 'CloudFront', iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/CloudFront.svg', color: '#8C4FFF' },
    { name: 'ECS', iconUrl: 'https://icon.icepanel.io/AWS/svg/Containers/Elastic-Container-Service.svg', color: '#FF9900' },
    { name: 'Fargate', iconUrl: 'https://icon.icepanel.io/AWS/svg/Containers/Fargate.svg', color: '#FF9900' },
    { name: 'Aurora', iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/Aurora.svg', color: '#527FFF' },
    { name: 'ElastiCache', iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/ElastiCache.svg', color: '#DD344C' },
    { name: 'Kinesis', iconUrl: 'https://icon.icepanel.io/AWS/svg/Analytics/Kinesis.svg', color: '#8C4FFF' },
    { name: 'SQS', iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Queue-Service.svg', color: '#FF4F8B' },
    { name: 'SNS', iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Notification-Service.svg', color: '#FF4F8B' },
    { name: 'Cognito', iconUrl: 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg', color: '#DD344C' },
    { name: 'IAM', iconUrl: 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Identity-and-Access-Management.svg', color: '#DD344C' },
];

// Create falling ice cubes
function createIceCube() {
    const container = document.getElementById('iceCubesContainer');
    if (!container) return;

    const iceCube = document.createElement('div');
    iceCube.className = 'ice-cube';
    
    const service = awsServices[Math.floor(Math.random() * awsServices.length)];
    
    const iconImg = document.createElement('img');
    iconImg.className = 'ice-cube-icon';
    iconImg.src = service.iconUrl;
    iconImg.alt = service.name;
    iconImg.loading = 'lazy';
    
    iconImg.onerror = function() {
        this.style.display = 'none';
        const fallbackText = document.createElement('div');
        fallbackText.className = 'ice-cube-fallback';
        fallbackText.textContent = service.name;
        fallbackText.style.color = service.color;
        iceCube.appendChild(fallbackText);
    };
    
    iceCube.appendChild(iconImg);
    
    // Random horizontal position
    const leftPosition = Math.random() * 100;
    iceCube.style.left = `${leftPosition}%`;
    
    // Random animation duration (8-15 seconds)
    const duration = 8 + Math.random() * 7;
    iceCube.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 2;
    iceCube.style.animationDelay = `${delay}s`;
    
    // Random size variation
    const size = 70 + Math.random() * 30; // 70-100px
    iceCube.style.width = `${size}px`;
    iceCube.style.height = `${size}px`;
    
    container.appendChild(iceCube);
    
    // Remove ice cube after animation completes
    setTimeout(() => {
        iceCube.remove();
    }, (duration + delay) * 1000);
}

// Initialize ice cubes
function initIceCubes() {
    // Create initial batch of ice cubes
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createIceCube();
        }, i * 1000);
    }
    
    // Continuously create new ice cubes
    setInterval(() => {
        createIceCube();
    }, 2000); // New ice cube every 2 seconds
}

// Initialize ice cubes on page load
document.addEventListener('DOMContentLoaded', () => {
    initIceCubes();
});

// Service definitions with detailed information
const services = {
    compute: [
        {
            name: 'EC2',
            icon: '🖥️',
            cost: 'Moderate to high - pay for running instances even when idle. Predictable costs with reserved instances.',
            scalability: 'Excellent - manual or auto-scaling groups, handles high sustained load',
            maintenance: 'High - requires OS patching, security updates, monitoring, and infrastructure management',
            performance: 'Excellent - full control over hardware, GPU support, ideal for ML workloads',
            bestFor: 'Long-running applications, complex workloads, ML/AI, applications requiring specific OS configurations',
            pros: ['Full control over infrastructure', 'GPU support for ML', 'Consistent performance', 'Wide range of instance types'],
            cons: ['High maintenance overhead', 'Pay for idle time', 'Manual scaling configuration', 'Infrastructure management required']
        },
        {
            name: 'ECS',
            icon: '🐳',
            cost: 'Moderate - pay for underlying EC2/Fargate. Better than raw EC2 for variable loads with Fargate.',
            scalability: 'Excellent - automatic container orchestration, scales containers independently',
            maintenance: 'Medium - AWS manages orchestration, you manage container images and task definitions',
            performance: 'Excellent - efficient resource utilization through containerization, fast deployment',
            bestFor: 'Containerized applications, microservices, applications needing orchestration',
            pros: ['Container orchestration', 'Efficient resource usage', 'Fast deployments', 'Microservices friendly'],
            cons: ['Learning curve for containers', 'Still need to manage images', 'Fargate can be expensive', 'Complexity for simple apps']
        },
        {
            name: 'Lambda',
            icon: 'λ',
            cost: 'Excellent - pay only for execution time, no idle costs, generous free tier',
            scalability: 'Excellent - automatic scaling, handles variable load perfectly',
            maintenance: 'Very Low - fully managed, no infrastructure to maintain, automatic scaling',
            performance: 'Good - cold starts can add latency, excellent for event-driven workloads',
            bestFor: 'Event-driven applications, APIs with variable traffic, serverless architectures, startups',
            pros: ['No idle costs', 'Automatic scaling', 'Zero infrastructure management', 'Generous free tier'],
            cons: ['15-minute execution limit', 'Cold start latency', 'Limited runtime options', 'Not for long-running tasks']
        },
        {
            name: 'Fargate',
            icon: '🚢',
            cost: 'Moderate - pay per vCPU and memory, no EC2 management costs, more expensive than EC2 but simpler',
            scalability: 'Excellent - automatic scaling, serverless containers, no capacity planning',
            maintenance: 'Very Low - AWS manages infrastructure, you only manage containers',
            performance: 'Excellent - fast startup, consistent performance, no cold starts',
            bestFor: 'Serverless containers, microservices, batch processing, applications needing containers without EC2',
            pros: ['No server management', 'Pay per task', 'Fast scaling', 'No capacity planning'],
            cons: ['More expensive than EC2', 'Less control than EC2', 'Limited customization', 'Not for GPU workloads']
        },
        {
            name: 'Elastic Beanstalk',
            icon: '🌱',
            cost: 'Moderate - pay for underlying resources (EC2, RDS, etc.), no additional Beanstalk charges',
            scalability: 'Excellent - automatic scaling, load balancing, health monitoring',
            maintenance: 'Low - AWS manages platform updates, you manage application code',
            performance: 'Excellent - optimized configurations, automatic load balancing',
            bestFor: 'Web applications, quick deployments, developers wanting PaaS experience',
            pros: ['Quick deployment', 'Automatic scaling', 'Multiple language support', 'Integrated monitoring'],
            cons: ['Less control than raw EC2', 'Can be complex to customize', 'Vendor lock-in', 'Learning curve']
        },
        {
            name: 'EKS',
            icon: '☸️',
            cost: 'Moderate to high - $0.10/hour per cluster (~$73/month) + EC2/Fargate costs',
            scalability: 'Excellent - Kubernetes auto-scaling, handles massive workloads',
            maintenance: 'Medium - AWS manages control plane, you manage worker nodes and K8s configs',
            performance: 'Excellent - production-grade Kubernetes, high availability',
            bestFor: 'Kubernetes workloads, complex microservices, multi-cloud strategy, container orchestration at scale',
            pros: ['Standard Kubernetes', 'Multi-cloud portability', 'Extensive ecosystem', 'Advanced orchestration'],
            cons: ['Kubernetes complexity', 'Higher cost', 'Steep learning curve', 'More management than ECS'],
            pricingExample: '💰 Cluster: $73/month + 3x t3.medium nodes = $163/month total. Fargate option available for serverless.',
            realWorldExample: '🏢 <strong>Enterprise microservices:</strong> 50 services across 10-node cluster. Auto-scales from 10 to 50 nodes during peak. Perfect for K8s expertise.',
            whenToChoose: '✅ Choose EKS when: You need standard Kubernetes, have K8s expertise, want multi-cloud portability, or running complex microservices at scale.'
        },
        {
            name: 'App Runner',
            icon: '🏃',
            cost: 'Good - pay per vCPU/memory + requests, automatic scaling to zero',
            scalability: 'Excellent - automatic scaling, serverless containers',
            maintenance: 'Very Low - fully managed, deploy from source code or container',
            performance: 'Excellent - fast deployments, automatic load balancing',
            bestFor: 'Web apps, APIs, simple container deployments, developers wanting simplicity',
            pros: ['Deploy from source', 'Automatic scaling', 'Simple pricing', 'No infrastructure'],
            cons: ['Less control', 'Limited customization', 'Newer service', 'Not for complex workloads'],
            pricingExample: '💰 1 vCPU, 2GB: $0.064/hour (~$47/month) + $0.40 per million requests. Scales to zero when idle.',
            realWorldExample: '🏢 <strong>Startup web app:</strong> Deploy Node.js app from GitHub in 5 minutes. Auto-scales from 1 to 10 instances. Perfect for simple deployments.',
            whenToChoose: '✅ Choose App Runner when: You want simplest container deployment, deploying from source code, need auto-scaling, or building web apps/APIs.'
        },
        {
            name: 'ECR',
            icon: '📦',
            cost: 'Good - $0.10/GB-month storage, $0.09/GB data transfer out',
            scalability: 'Excellent - unlimited container images, automatic scaling',
            maintenance: 'Very Low - fully managed, integrated with ECS/EKS',
            performance: 'Excellent - fast image pulls, integrated with AWS services',
            bestFor: 'Container image storage, Docker registry, ECS/EKS deployments, CI/CD pipelines',
            pros: ['Integrated with AWS', 'Image scanning', 'Lifecycle policies', 'IAM integration'],
            cons: ['AWS-only', 'Cost for large images', 'Not multi-cloud', 'Limited compared to Docker Hub'],
            pricingExample: '💰 10GB storage: $1/month. 100GB transfer: $9/month. First 500MB storage FREE for 12 months!',
            realWorldExample: '🏢 <strong>Microservices:</strong> Store 50 Docker images (20GB total). Automated vulnerability scanning. Perfect for ECS/EKS deployments.',
            whenToChoose: '✅ Choose ECR when: You need Docker registry on AWS, using ECS/EKS, want image scanning, or building CI/CD pipelines with containers.'
        }
    ],
    database: [
        {
            name: 'RDS',
            icon: '🗄️',
            cost: 'Moderate to high - pay for running instances even during low usage. Cost-effective with reserved instances.',
            scalability: 'Good - vertical scaling and read replicas, but requires planning',
            maintenance: 'Low - AWS manages patching and backups, strong compliance features',
            performance: 'Excellent - consistent performance, complex queries, ACID transactions, relational integrity',
            bestFor: 'Relational data, complex queries, transactions, existing SQL applications, enterprise apps',
            pros: ['ACID transactions', 'Complex query support', 'Relational integrity', 'SQL compatibility'],
            cons: ['Scaling requires planning', 'Pay for idle time', 'Vertical scaling has downtime', 'More expensive than NoSQL']
        },
        {
            name: 'DynamoDB',
            icon: '⚡',
            cost: 'Good - pay per request option available, scales to zero, generous free tier',
            scalability: 'Excellent - automatic horizontal scaling, handles massive scale seamlessly',
            maintenance: 'Very Low - fully managed, automatic scaling, no infrastructure management',
            performance: 'Excellent - single-digit millisecond latency at any scale',
            bestFor: 'Key-value data, high-traffic applications, serverless architectures, simple access patterns',
            pros: ['Automatic scaling', 'Low latency at scale', 'Pay per request option', 'Zero maintenance'],
            cons: ['Limited query flexibility', 'No complex joins', 'Learning curve for data modeling', 'Can be expensive for small workloads']
        },
        {
            name: 'Aurora',
            icon: '🌟',
            cost: 'Moderate to high - more expensive than RDS but better performance, serverless option available',
            scalability: 'Excellent - automatic storage scaling, up to 15 read replicas, global database',
            maintenance: 'Very Low - fully managed, automatic backups, continuous monitoring',
            performance: 'Excellent - 5x faster than MySQL, 3x faster than PostgreSQL, high availability',
            bestFor: 'High-performance relational databases, enterprise applications, global applications',
            pros: ['High performance', 'Automatic scaling', 'High availability', 'MySQL/PostgreSQL compatible'],
            cons: ['More expensive than RDS', 'Vendor lock-in', 'Complex pricing', 'Overkill for small apps']
        },
        {
            name: 'ElastiCache',
            icon: '🔥',
            cost: 'Moderate - pay for cache nodes, cost-effective for reducing database load',
            scalability: 'Excellent - automatic scaling, cluster mode for Redis, replication',
            maintenance: 'Low - AWS manages infrastructure, you manage cache strategies',
            performance: 'Excellent - sub-millisecond latency, in-memory performance',
            bestFor: 'Caching, session storage, real-time analytics, leaderboards, pub/sub',
            pros: ['Ultra-fast performance', 'Reduces database load', 'Redis/Memcached support', 'High availability'],
            cons: ['Additional cost', 'Data volatility', 'Cache invalidation complexity', 'Not a primary database']
        },
        {
            name: 'DocumentDB',
            icon: '📄',
            cost: 'Moderate - pay for instances and storage, similar to RDS pricing',
            scalability: 'Excellent - automatic storage scaling, read replicas, cluster support',
            maintenance: 'Low - fully managed, automatic backups, patching',
            performance: 'Excellent - MongoDB-compatible, fast document queries',
            bestFor: 'Document databases, MongoDB migrations, JSON data, content management',
            pros: ['MongoDB compatible', 'Fully managed', 'Automatic scaling', 'High availability'],
            cons: ['Not 100% MongoDB compatible', 'More expensive than DynamoDB', 'Vendor lock-in', 'Limited to AWS']
        },
        {
            name: 'Neptune',
            icon: '🔗',
            cost: 'Moderate to high - db.t3.medium: ~$70/month, storage: $0.10/GB-month',
            scalability: 'Excellent - scales to billions of relationships, read replicas',
            maintenance: 'Low - fully managed, automatic backups, patching',
            performance: 'Excellent - optimized for graph queries, millisecond latency',
            bestFor: 'Graph databases, social networks, recommendation engines, fraud detection, knowledge graphs',
            pros: ['Graph queries', 'Gremlin/SPARQL support', 'High performance', 'Fully managed'],
            cons: ['Expensive', 'Niche use case', 'Learning curve', 'Not for relational data'],
            pricingExample: '💰 db.t3.medium: $70/month + 100GB storage = $80/month. Read replicas add $70/month each.',
            realWorldExample: '🏢 <strong>Social network:</strong> 10M users, 100M relationships. Query "friends of friends" in milliseconds. Perfect for connected data.',
            whenToChoose: '✅ Choose Neptune when: You need graph database, analyzing relationships, building recommendation engines, or fraud detection with connected data.'
        },
        {
            name: 'MemoryDB',
            icon: '⚡',
            cost: 'Moderate - db.t4g.small: ~$50/month, more expensive than ElastiCache',
            scalability: 'Excellent - scales to hundreds of nodes, multi-AZ',
            maintenance: 'Very Low - fully managed, automatic failover, backups',
            performance: 'Excellent - microsecond read, single-digit ms write latency',
            bestFor: 'Redis-compatible primary database, real-time applications, gaming leaderboards, session stores',
            pros: ['Redis compatible', 'Durable storage', 'Multi-AZ', 'Microsecond latency'],
            cons: ['More expensive than ElastiCache', 'Redis-only', 'Newer service', 'Overkill for caching'],
            pricingExample: '💰 db.t4g.small: $50/month. db.r6g.large: $250/month. Storage: $0.20/GB-month.',
            realWorldExample: '🏢 <strong>Gaming platform:</strong> Store player data with microsecond latency. 1M concurrent users. Durable unlike ElastiCache.',
            whenToChoose: '✅ Choose MemoryDB when: You need Redis as primary database (not cache), require durability, need multi-AZ, or building real-time apps.'
        },
        {
            name: 'Timestream',
            icon: '⏱️',
            cost: 'Good - $0.50/GB ingested, $0.03/GB-hour stored, query-based pricing',
            scalability: 'Excellent - serverless, handles trillions of events',
            maintenance: 'Very Low - fully managed, serverless, automatic scaling',
            performance: 'Excellent - optimized for time-series, fast queries',
            bestFor: 'Time-series data, IoT applications, DevOps monitoring, industrial telemetry',
            pros: ['Serverless', 'Time-series optimized', 'Automatic tiering', 'SQL queries'],
            cons: ['Specific use case', 'Learning curve', 'Cost for high ingestion', 'Not for general data'],
            pricingExample: '💰 Ingest 1GB/day: $15/month. Store 100GB: $72/month. Queries: $0.01 per GB scanned.',
            realWorldExample: '🏢 <strong>IoT platform:</strong> 10K sensors sending data every second. 1TB/month ingested. Query patterns across time ranges.',
            whenToChoose: '✅ Choose Timestream when: You have time-series data, IoT applications, DevOps metrics, or need time-based analytics.'
        },
        {
            name: 'QLDB',
            icon: '📒',
            cost: 'Good - $0.30 per million write requests, $0.09 per million read requests',
            scalability: 'Excellent - serverless, automatic scaling',
            maintenance: 'Very Low - fully managed, serverless, immutable ledger',
            performance: 'Excellent - 2-3x faster than blockchain frameworks',
            bestFor: 'Immutable ledger, audit trails, supply chain, financial transactions, regulatory compliance',
            pros: ['Immutable ledger', 'Cryptographically verifiable', 'SQL queries', 'Serverless'],
            cons: ['Niche use case', 'No delete operations', 'Cost for high writes', 'Not a blockchain'],
            pricingExample: '💰 1M writes: $0.30. 1M reads: $0.09. Storage: $0.20/GB-month. Example: 10M writes = $3/month.',
            realWorldExample: '🏢 <strong>Supply chain:</strong> Track 1M product movements/month. Immutable audit trail. Verify authenticity cryptographically.',
            whenToChoose: '✅ Choose QLDB when: You need immutable ledger, audit trails, regulatory compliance, or cryptographically verifiable history.'
        }
    ],
    storage: [
        {
            name: 'S3',
            icon: '🪣',
            cost: 'Excellent - pay only for storage used, very low cost per GB, lifecycle policies reduce costs',
            scalability: 'Excellent - unlimited storage, automatic scaling, globally distributed',
            maintenance: 'Very Low - fully managed, automatic durability (99.999999999%), no infrastructure',
            performance: 'Good - high throughput for large files, not suitable for low-latency random access',
            bestFor: 'Object storage, static files, backups, data lakes, media files, serverless architectures',
            pros: ['Unlimited storage', 'Very low cost', 'High durability', 'Lifecycle policies'],
            cons: ['Not for low-latency access', 'No file system interface', 'Eventual consistency for some operations', 'Not for block storage']
        },
        {
            name: 'EBS',
            icon: '💾',
            cost: 'Moderate - pay for provisioned storage even if unused, snapshots add cost',
            scalability: 'Limited - attached to single EC2 instance, requires manual volume resizing',
            maintenance: 'Low - AWS manages physical storage, you manage volumes and snapshots',
            performance: 'Excellent - low latency, high IOPS, ideal for databases and applications needing block storage',
            bestFor: 'EC2 instance storage, databases, applications requiring low-latency block storage',
            pros: ['Low latency', 'High IOPS', 'Snapshot backups', 'Block-level storage'],
            cons: ['Single instance attachment', 'Pay for provisioned capacity', 'Manual scaling', 'Requires EC2']
        },
        {
            name: 'EFS',
            icon: '📁',
            cost: 'Moderate to high - more expensive than S3, pay for storage used with lifecycle management',
            scalability: 'Excellent - automatically scales, shared across multiple instances',
            maintenance: 'Very Low - fully managed, automatic scaling, no capacity planning',
            performance: 'Good - shared file system performance, suitable for concurrent access',
            bestFor: 'Shared file storage, content management, web serving, applications needing NFS',
            pros: ['Shared access', 'Automatic scaling', 'NFS compatible', 'No capacity planning'],
            cons: ['Higher cost than S3', 'Lower performance than EBS', 'Overkill for simple storage', 'Regional service']
        },
        {
            name: 'Glacier',
            icon: '❄️',
            cost: 'Excellent - extremely low cost for archival, pay for retrieval',
            scalability: 'Excellent - unlimited storage, automatic scaling',
            maintenance: 'Very Low - fully managed, automatic durability',
            performance: 'Low - retrieval takes minutes to hours, not for frequent access',
            bestFor: 'Long-term archival, compliance, backups, infrequently accessed data',
            pros: ['Lowest cost storage', 'High durability', 'Compliance features', 'Unlimited storage'],
            cons: ['Slow retrieval', 'Retrieval costs', 'Not for active data', 'Complex pricing']
        },
        {
            name: 'FSx',
            icon: '📂',
            cost: 'Moderate to high - FSx for Windows: $0.013/GB-month, FSx for Lustre: $0.14/GB-month',
            scalability: 'Excellent - scales to hundreds of GB/s throughput',
            maintenance: 'Low - fully managed, automatic backups, patching',
            performance: 'Excellent - high throughput, low latency, optimized for specific workloads',
            bestFor: 'Windows file shares, HPC workloads, machine learning training, media processing',
            pros: ['High performance', 'Windows compatibility', 'Lustre for HPC', 'Fully managed'],
            cons: ['Expensive', 'Specific use cases', 'Complex pricing', 'Overkill for simple storage'],
            pricingExample: '💰 FSx Windows 1TB: $195/month. FSx Lustre 1.2TB: $168/month. High-performance storage.',
            realWorldExample: '🏢 <strong>Media company:</strong> 10TB FSx Lustre for video rendering. 1GB/s throughput. Processes 4K videos 10x faster than EFS.',
            whenToChoose: '✅ Choose FSx when: You need Windows file shares, HPC workloads, high-performance file system, or Lustre for ML/media processing.'
        },
        {
            name: 'Backup',
            icon: '💾',
            cost: 'Good - $0.05/GB-month for warm storage, $0.01/GB-month for cold storage',
            scalability: 'Excellent - unlimited backup storage, automatic scaling',
            maintenance: 'Very Low - fully managed, centralized backup policies',
            performance: 'Good - automated backups, fast restores',
            bestFor: 'Centralized backup management, compliance, disaster recovery, multi-service backups',
            pros: ['Centralized management', 'Policy-based', 'Cross-region backup', 'Compliance features'],
            cons: ['Cost for large backups', 'Restore time', 'Learning curve', 'Not for real-time replication'],
            pricingExample: '💰 1TB warm backup: $50/month. 1TB cold: $10/month. Restore: $0.02/GB. Example: 5TB cold = $50/month.',
            realWorldExample: '🏢 <strong>Enterprise:</strong> Backup 100 EC2 instances, 50 RDS databases daily. Centralized policies. Compliance-ready.',
            whenToChoose: '✅ Choose Backup when: You need centralized backup management, compliance requirements, cross-service backups, or disaster recovery planning.'
        },
        {
            name: 'Storage Gateway',
            icon: '🔗',
            cost: 'Moderate - pay for gateway, storage, and data transfer',
            scalability: 'Excellent - scales to petabytes, hybrid cloud',
            maintenance: 'Low - managed service, you manage on-prem gateway',
            performance: 'Good - local caching, async upload to S3',
            bestFor: 'Hybrid cloud storage, on-prem to cloud migration, backup to cloud, file/volume/tape gateway',
            pros: ['Hybrid cloud', 'Local caching', 'S3 integration', 'Multiple gateway types'],
            cons: ['Complex setup', 'On-prem hardware needed', 'Bandwidth dependent', 'Cost can add up'],
            pricingExample: '💰 File Gateway: $125/month + S3 storage. Volume Gateway: $125/month + EBS snapshots. Tape Gateway: $125/month.',
            realWorldExample: '🏢 <strong>Hybrid setup:</strong> On-prem apps write to local gateway. Data syncs to S3. 10TB migrated over 6 months.',
            whenToChoose: '✅ Choose Storage Gateway when: You need hybrid cloud storage, migrating on-prem to cloud, backup to S3, or gradual cloud migration.'
        }
    ],
    api: [
        {
            name: 'API Gateway',
            icon: '🚪',
            cost: 'Good for low traffic - pay per request, no minimum costs, generous free tier. Expensive at high scale.',
            scalability: 'Excellent - automatic scaling, handles traffic spikes seamlessly',
            maintenance: 'Very Low - fully managed, built-in features (throttling, caching, auth)',
            performance: 'Good - adds some latency, excellent for serverless and microservices',
            bestFor: 'Serverless APIs, Lambda integration, REST/WebSocket APIs, low to medium traffic, startups',
            pros: ['Pay per request', 'Built-in features', 'Lambda integration', 'Automatic scaling'],
            cons: ['Expensive at high scale', 'Adds latency', 'Complex pricing', 'Limited customization']
        },
        {
            name: 'ALB',
            icon: '⚖️',
            cost: 'Cost-effective at high scale - fixed hourly cost plus data processing, better economics at volume',
            scalability: 'Excellent - automatic scaling, handles millions of requests',
            maintenance: 'Low - managed by AWS, requires configuration of target groups and health checks',
            performance: 'Excellent - very low latency, optimized for high throughput',
            bestFor: 'High-traffic applications, EC2/ECS workloads, applications needing advanced routing, enterprise apps',
            pros: ['Low latency', 'Cost-effective at scale', 'Advanced routing', 'WebSocket support'],
            cons: ['Fixed hourly cost', 'Less economical for low traffic', 'Requires target configuration', 'Not serverless-native']
        },
        {
            name: 'CloudFront',
            icon: '🌐',
            cost: 'Good - pay for data transfer and requests, free tier available, cost-effective for global delivery',
            scalability: 'Excellent - global CDN, automatic scaling, edge locations worldwide',
            maintenance: 'Very Low - fully managed, automatic SSL, DDoS protection',
            performance: 'Excellent - low latency globally, edge caching, fast content delivery',
            bestFor: 'Content delivery, static websites, video streaming, global applications',
            pros: ['Global distribution', 'Low latency', 'DDoS protection', 'SSL included'],
            cons: ['Cache invalidation costs', 'Complex configuration', 'Not for dynamic content', 'Propagation delays']
        },
        {
            name: 'AppSync',
            icon: '🔄',
            cost: 'Good - $4 per million query/mutation operations, $2 per million real-time updates',
            scalability: 'Excellent - serverless, automatic scaling, handles millions of requests',
            maintenance: 'Very Low - fully managed GraphQL, automatic scaling',
            performance: 'Excellent - real-time subscriptions, optimized resolvers',
            bestFor: 'GraphQL APIs, real-time applications, mobile/web apps, data synchronization',
            pros: ['Managed GraphQL', 'Real-time subscriptions', 'Offline sync', 'Multiple data sources'],
            cons: ['GraphQL learning curve', 'Vendor lock-in', 'Complex pricing', 'Not for REST APIs'],
            pricingExample: '💰 1M queries + 500K real-time updates = $5/month. First 250K queries FREE for 12 months!',
            realWorldExample: '🏢 <strong>Chat application:</strong> 100K users, 10M messages/month. Real-time updates to all clients. Perfect for collaborative apps.',
            whenToChoose: '✅ Choose AppSync when: You need GraphQL API, real-time subscriptions, offline sync, or building mobile/web apps with live data.'
        }
    ],
    messaging: [
        {
            name: 'SQS',
            icon: '📬',
            cost: 'Excellent - pay per request, very low cost, generous free tier',
            scalability: 'Excellent - unlimited throughput, automatic scaling',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Good - reliable message delivery, at-least-once delivery',
            bestFor: 'Decoupling microservices, async processing, job queues, buffering',
            pros: ['Fully managed', 'Unlimited throughput', 'Low cost', 'Reliable delivery'],
            cons: ['No message ordering (standard)', 'Polling overhead', 'Message size limits', 'Visibility timeout complexity']
        },
        {
            name: 'SNS',
            icon: '📢',
            cost: 'Excellent - pay per message, very low cost, generous free tier',
            scalability: 'Excellent - unlimited throughput, fan-out to millions',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Excellent - push-based, low latency, real-time delivery',
            bestFor: 'Pub/sub messaging, notifications, fan-out patterns, mobile push',
            pros: ['Push-based', 'Fan-out to multiple subscribers', 'Low cost', 'Mobile push support'],
            cons: ['No message persistence', 'No retry logic', 'Message size limits', 'Delivery not guaranteed']
        },
        {
            name: 'EventBridge',
            icon: '🎯',
            cost: 'Good - pay per event, reasonable pricing for event-driven architectures',
            scalability: 'Excellent - unlimited throughput, automatic scaling',
            maintenance: 'Very Low - fully managed, schema registry, event replay',
            performance: 'Excellent - low latency, event filtering, routing',
            bestFor: 'Event-driven architectures, SaaS integrations, scheduled events, complex routing',
            pros: ['Event filtering', 'SaaS integrations', 'Schema registry', 'Event replay'],
            cons: ['More expensive than SQS/SNS', 'Learning curve', 'Complex pricing', 'Overkill for simple queues']
        },
        {
            name: 'Kinesis',
            icon: '🌊',
            cost: 'Moderate - pay for shards and data throughput, can be expensive at scale',
            scalability: 'Excellent - scales with shards, handles massive streaming data',
            maintenance: 'Low - managed service, you manage shard count',
            performance: 'Excellent - real-time streaming, sub-second latency, ordered records',
            bestFor: 'Real-time analytics, log processing, streaming data, IoT data',
            pros: ['Real-time processing', 'Ordered records', 'Data replay', 'Multiple consumers'],
            cons: ['Complex shard management', 'Higher cost', 'Learning curve', 'Overkill for simple queues']
        },
        {
            name: 'Step Functions',
            icon: '🔀',
            cost: 'Good - $25 per million state transitions, Express workflows: $1 per million',
            scalability: 'Excellent - serverless, handles complex workflows at scale',
            maintenance: 'Very Low - fully managed, visual workflow designer',
            performance: 'Excellent - orchestrates Lambda, ECS, and other services',
            bestFor: 'Serverless workflows, ETL pipelines, order processing, complex business logic',
            pros: ['Visual workflows', 'Error handling', 'Parallel execution', 'Service integration'],
            cons: ['Cost at high scale', 'Learning curve', 'State machine complexity', 'Not for simple tasks'],
            pricingExample: '💰 Standard: $25 per 1M transitions. Express: $1 per 1M. Example: 100K workflows/month = $2.50.',
            realWorldExample: '🏢 <strong>E-commerce order:</strong> Orchestrate payment, inventory, shipping, email. Retry failed steps automatically. Perfect for complex workflows.',
            whenToChoose: '✅ Choose Step Functions when: You need workflow orchestration, coordinating multiple services, error handling/retries, or complex business logic.'
        },
        {
            name: 'EventBridge Scheduler',
            icon: '⏰',
            cost: 'Good - $1.00 per million invocations',
            scalability: 'Excellent - millions of schedules, automatic scaling',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Excellent - precise scheduling, flexible patterns',
            bestFor: 'Scheduled tasks, cron jobs, recurring workflows, time-based automation',
            pros: ['Flexible scheduling', 'One-time or recurring', 'Timezone support', 'No infrastructure'],
            cons: ['Cost for many schedules', 'Newer service', 'Learning curve', 'Not for real-time events'],
            pricingExample: '💰 $1 per million invocations. Example: 100K scheduled tasks/month = $0.10. Very cost-effective!',
            realWorldExample: '🏢 <strong>Data pipeline:</strong> Schedule 1000 ETL jobs daily at different times. Timezone-aware. Perfect for automation.',
            whenToChoose: '✅ Choose EventBridge Scheduler when: You need scheduled tasks, replacing cron jobs, time-based automation, or flexible scheduling patterns.'
        },
        {
            name: 'AppFlow',
            icon: '🔄',
            cost: 'Good - $0.001 per flow run + $0.02 per GB processed',
            scalability: 'Excellent - handles billions of records, automatic scaling',
            maintenance: 'Very Low - fully managed, no-code integration',
            performance: 'Excellent - fast data transfer, automatic retries',
            bestFor: 'SaaS integration, data transfer, ETL, Salesforce/Slack/ServiceNow integration',
            pros: ['No-code integration', 'SaaS connectors', 'Data transformation', 'Scheduled/event-driven'],
            cons: ['Limited connectors', 'Cost for large data', 'Not for complex ETL', 'Vendor lock-in'],
            pricingExample: '💰 1000 flow runs + 100GB: $1 + $2 = $3/month. Example: Daily Salesforce sync = $30/month.',
            realWorldExample: '🏢 <strong>Sales analytics:</strong> Sync Salesforce to S3 hourly. 10GB/day. Transform and load to Redshift. No code needed.',
            whenToChoose: '✅ Choose AppFlow when: You need SaaS integration, no-code data transfer, Salesforce/Slack sync, or simple ETL workflows.'
        }
    ],
    security: [
        {
            name: 'IAM',
            icon: '🔐',
            cost: 'Free - no charge for IAM service',
            scalability: 'Excellent - unlimited users, roles, policies',
            maintenance: 'Low - managed by AWS, you manage policies and permissions',
            performance: 'Excellent - fast authentication and authorization',
            bestFor: 'Access control, user management, service permissions, security policies',
            pros: ['Free service', 'Fine-grained control', 'Integration with all AWS services', 'MFA support'],
            cons: ['Complex policy language', 'Easy to misconfigure', 'Learning curve', 'No built-in user directory']
        },
        {
            name: 'Cognito',
            icon: '👤',
            cost: 'Good - free tier for 50k MAU, pay per active user after',
            scalability: 'Excellent - handles millions of users, automatic scaling',
            maintenance: 'Very Low - fully managed, user pools, identity pools',
            performance: 'Excellent - fast authentication, token-based',
            bestFor: 'User authentication, mobile apps, web apps, social login, user directories',
            pros: ['User management', 'Social login', 'MFA support', 'Token-based auth'],
            cons: ['Limited customization', 'Vendor lock-in', 'Complex pricing', 'UI customization limited']
        },
        {
            name: 'Secrets Manager',
            icon: '🔑',
            cost: 'Moderate - pay per secret and API call, can add up',
            scalability: 'Excellent - unlimited secrets, automatic rotation',
            maintenance: 'Very Low - fully managed, automatic rotation',
            performance: 'Excellent - fast secret retrieval, caching support',
            bestFor: 'Database credentials, API keys, secrets rotation, compliance',
            pros: ['Automatic rotation', 'Encryption', 'Audit logging', 'Cross-region replication'],
            cons: ['Cost per secret', 'API call charges', 'Overkill for simple configs', 'More expensive than Parameter Store']
        },
        {
            name: 'WAF',
            icon: '🛡️',
            cost: 'Moderate - pay per web ACL, rule, and request',
            scalability: 'Excellent - automatic scaling, global protection',
            maintenance: 'Low - managed rules available, you configure policies',
            performance: 'Excellent - minimal latency, edge protection',
            bestFor: 'Web application security, DDoS protection, bot mitigation, compliance',
            pros: ['DDoS protection', 'Managed rules', 'Custom rules', 'Real-time metrics'],
            cons: ['Complex configuration', 'Cost can add up', 'Learning curve', 'False positives']
        }
    ],
    networking: [
        {
            name: 'VPC',
            icon: '🌐',
            cost: 'Free - no charge for VPC itself, pay for resources within it',
            scalability: 'Excellent - isolated networks, multiple availability zones',
            maintenance: 'Low - AWS manages infrastructure, you configure network',
            performance: 'Excellent - low latency, high throughput, private networking',
            bestFor: 'Network isolation, security, hybrid cloud, multi-tier applications',
            pros: ['Network isolation', 'Security control', 'Free service', 'Flexible configuration'],
            cons: ['Complex setup', 'Learning curve', 'Requires networking knowledge', 'Easy to misconfigure']
        },
        {
            name: 'Route 53',
            icon: '🗺️',
            cost: 'Good - pay per hosted zone and queries, reasonable pricing',
            scalability: 'Excellent - global DNS, automatic scaling, high availability',
            maintenance: 'Very Low - fully managed, automatic failover',
            performance: 'Excellent - low latency globally, fast DNS resolution',
            bestFor: 'Domain management, DNS routing, health checks, traffic management',
            pros: ['Global DNS', 'Health checks', 'Traffic routing', 'High availability'],
            cons: ['Cost per query', 'Complex routing policies', 'Learning curve', 'Not cheapest DNS']
        },
        {
            name: 'CloudFront',
            icon: '🚀',
            cost: 'Good - pay for data transfer and requests, free tier available',
            scalability: 'Excellent - global CDN, automatic scaling, edge locations',
            maintenance: 'Very Low - fully managed, automatic SSL, DDoS protection',
            performance: 'Excellent - low latency globally, edge caching',
            bestFor: 'Content delivery, static websites, video streaming, global apps',
            pros: ['Global distribution', 'Low latency', 'DDoS protection', 'SSL included'],
            cons: ['Cache invalidation costs', 'Complex configuration', 'Propagation delays', 'Not for dynamic content']
        },
        {
            name: 'Direct Connect',
            icon: '🔌',
            cost: 'High - dedicated connection costs, port hours, data transfer',
            scalability: 'Good - dedicated bandwidth, multiple connections possible',
            maintenance: 'Medium - requires physical setup, AWS manages infrastructure',
            performance: 'Excellent - consistent network performance, low latency, high bandwidth',
            bestFor: 'Hybrid cloud, large data transfers, consistent performance, compliance',
            pros: ['Consistent performance', 'High bandwidth', 'Reduced costs for large transfers', 'Private connection'],
            cons: ['High cost', 'Setup complexity', 'Physical infrastructure needed', 'Long setup time']
        },
        {
            name: 'Global Accelerator',
            icon: '🌍',
            cost: 'Moderate - $0.025/hour per accelerator (~$18/month) + data transfer',
            scalability: 'Excellent - global anycast network, automatic scaling',
            maintenance: 'Very Low - fully managed, automatic failover',
            performance: 'Excellent - up to 60% performance improvement, static IPs',
            bestFor: 'Global applications, gaming, IoT, low-latency requirements, static IP needs',
            pros: ['Global performance', 'Static IPs', 'Automatic failover', 'DDoS protection'],
            cons: ['Additional cost', 'Overkill for regional apps', 'Complex pricing', 'Not for all use cases'],
            pricingExample: '💰 Accelerator: $18/month + $0.015/GB processed. Example: 1TB/month = $33/month total.',
            realWorldExample: '🏢 <strong>Global gaming:</strong> Players worldwide connect to nearest edge. 60% lower latency. Static IPs for whitelisting.',
            whenToChoose: '✅ Choose Global Accelerator when: You need global performance, static IPs, automatic failover, or building gaming/IoT applications.'
        },
        {
            name: 'Transit Gateway',
            icon: '🔀',
            cost: 'Moderate - $0.05/hour per attachment (~$36/month) + data processing',
            scalability: 'Excellent - connects thousands of VPCs, on-prem networks',
            maintenance: 'Low - managed service, you configure routing',
            performance: 'Excellent - high throughput, low latency, centralized routing',
            bestFor: 'Multi-VPC connectivity, hub-and-spoke architecture, complex network topologies, enterprise networks',
            pros: ['Centralized routing', 'Scales to thousands of VPCs', 'Simplified management', 'Inter-region peering'],
            cons: ['Cost per attachment', 'Complex for simple setups', 'Data processing charges', 'Overkill for few VPCs'],
            pricingExample: '💰 10 VPC attachments: $360/month + $0.02/GB processed. Example: 10TB = $560/month total.',
            realWorldExample: '🏢 <strong>Enterprise network:</strong> Connect 50 VPCs and 5 on-prem datacenters. Centralized routing. Perfect for complex topologies.',
            whenToChoose: '✅ Choose Transit Gateway when: You have many VPCs, need centralized routing, building hub-and-spoke, or complex network architecture.'
        }
    ],
    analytics: [
        {
            name: 'Athena',
            icon: '🔍',
            cost: 'Excellent - pay per query, no infrastructure costs, scan-based pricing',
            scalability: 'Excellent - serverless, automatic scaling, handles petabytes',
            maintenance: 'Very Low - fully managed, no infrastructure, serverless',
            performance: 'Good - fast queries on S3 data, parallel processing',
            bestFor: 'Ad-hoc queries, log analysis, data lake queries, serverless analytics',
            pros: ['Serverless', 'Pay per query', 'SQL interface', 'No infrastructure'],
            cons: ['Cost per TB scanned', 'Not for real-time', 'Query optimization needed', 'S3 dependency']
        },
        {
            name: 'Redshift',
            icon: '📊',
            cost: 'Moderate to high - pay for cluster nodes, reserved instances available',
            scalability: 'Excellent - scales to petabytes, add nodes easily',
            maintenance: 'Low - AWS manages infrastructure, you manage queries',
            performance: 'Excellent - fast complex queries, columnar storage, parallel processing',
            bestFor: 'Data warehousing, complex analytics, BI tools, large datasets',
            pros: ['Fast queries', 'Petabyte scale', 'SQL compatible', 'BI tool integration'],
            cons: ['Always-on cost', 'Complex optimization', 'Requires planning', 'Not serverless']
        },
        {
            name: 'EMR',
            icon: '🐘',
            cost: 'Moderate - pay for EC2 instances plus EMR charges',
            scalability: 'Excellent - scales to thousands of nodes, elastic clusters',
            maintenance: 'Medium - AWS manages infrastructure, you manage jobs',
            performance: 'Excellent - distributed processing, handles massive datasets',
            bestFor: 'Big data processing, Spark/Hadoop jobs, ETL, machine learning',
            pros: ['Flexible frameworks', 'Massive scale', 'Cost-effective for big data', 'Multiple tools'],
            cons: ['Complex setup', 'Requires expertise', 'Management overhead', 'Not serverless']
        },
        {
            name: 'Glue',
            icon: '🔗',
            cost: 'Good - pay per DPU hour, serverless, no infrastructure costs',
            scalability: 'Excellent - serverless, automatic scaling',
            maintenance: 'Very Low - fully managed, serverless ETL',
            performance: 'Good - parallel processing, automatic optimization',
            bestFor: 'ETL jobs, data cataloging, serverless data prep, schema discovery',
            pros: ['Serverless', 'Data catalog', 'Schema discovery', 'No infrastructure'],
            cons: ['Can be expensive', 'Limited customization', 'Learning curve', 'Cold start delays']
        }
    ],
    ml: [
        {
            name: 'SageMaker',
            icon: '🤖',
            cost: 'Moderate to high - pay for instances, training, and inference',
            scalability: 'Excellent - scales for training and inference, distributed training',
            maintenance: 'Low - managed infrastructure, you manage models',
            performance: 'Excellent - GPU support, optimized for ML, fast training',
            bestFor: 'ML model training, deployment, MLOps, custom models',
            pros: ['Complete ML platform', 'Built-in algorithms', 'Model deployment', 'MLOps tools'],
            cons: ['Complex pricing', 'Learning curve', 'Can be expensive', 'Overkill for simple ML']
        },
        {
            name: 'Rekognition',
            icon: '👁️',
            cost: 'Good - pay per image/video analyzed, free tier available',
            scalability: 'Excellent - serverless, automatic scaling',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Excellent - fast image/video analysis, pre-trained models',
            bestFor: 'Image recognition, face detection, content moderation, video analysis',
            pros: ['Pre-trained models', 'Easy to use', 'Serverless', 'Fast results'],
            cons: ['Limited customization', 'Privacy concerns', 'Cost per image', 'Not for custom models']
        },
        {
            name: 'Comprehend',
            icon: '📝',
            cost: 'Good - pay per request, free tier available',
            scalability: 'Excellent - serverless, automatic scaling',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Excellent - fast NLP analysis, pre-trained models',
            bestFor: 'Text analysis, sentiment analysis, entity extraction, language detection',
            pros: ['Pre-trained NLP', 'Easy to use', 'Serverless', 'Multiple languages'],
            cons: ['Limited customization', 'Cost per request', 'Not for custom NLP', 'English-focused']
        },
        {
            name: 'Bedrock',
            icon: '🧠',
            cost: 'Moderate - pay per token/request, varies by model',
            scalability: 'Excellent - serverless, automatic scaling',
            maintenance: 'Very Low - fully managed, no infrastructure',
            performance: 'Excellent - fast inference, multiple foundation models',
            bestFor: 'Generative AI, chatbots, content generation, AI applications',
            pros: ['Multiple models', 'Serverless', 'Easy integration', 'Pre-trained models'],
            cons: ['Cost per token', 'Model limitations', 'Privacy considerations', 'Newer service']
        }
    ],
    monitoring: [
        {
            name: 'CloudWatch',
            icon: '📈',
            cost: 'Good - free tier generous, pay for metrics, logs, and alarms',
            scalability: 'Excellent - handles massive scale, automatic',
            maintenance: 'Very Low - fully managed, automatic collection',
            performance: 'Excellent - real-time monitoring, fast queries',
            bestFor: 'Monitoring, logging, alarms, dashboards, operational insights',
            pros: ['Integrated with AWS', 'Real-time monitoring', 'Custom metrics', 'Alarms'],
            cons: ['Cost can add up', 'Log retention costs', 'Query limitations', 'Complex pricing']
        },
        {
            name: 'X-Ray',
            icon: '🔬',
            cost: 'Good - pay per trace, free tier available',
            scalability: 'Excellent - handles high trace volumes',
            maintenance: 'Very Low - fully managed, automatic tracing',
            performance: 'Excellent - low overhead, detailed traces',
            bestFor: 'Distributed tracing, debugging, performance analysis, microservices',
            pros: ['Distributed tracing', 'Service map', 'Low overhead', 'Integrated with AWS'],
            cons: ['Requires instrumentation', 'Cost per trace', 'Learning curve', 'Limited customization']
        },
        {
            name: 'CloudTrail',
            icon: '📜',
            cost: 'Good - management events free, pay for data events and storage',
            scalability: 'Excellent - logs all API calls, automatic',
            maintenance: 'Very Low - fully managed, automatic logging',
            performance: 'Good - comprehensive logging, searchable',
            bestFor: 'Audit logging, compliance, security analysis, governance',
            pros: ['Complete audit trail', 'Compliance', 'Security analysis', 'Integrated'],
            cons: ['Storage costs', 'Log volume', 'Query complexity', 'Retention management']
        },
        {
            name: 'Config',
            icon: '⚙️',
            cost: 'Moderate - pay per configuration item, rules, and evaluations',
            scalability: 'Excellent - tracks all resources, automatic',
            maintenance: 'Very Low - fully managed, automatic tracking',
            performance: 'Good - continuous monitoring, compliance checking',
            bestFor: 'Configuration management, compliance, resource tracking, change management',
            pros: ['Configuration history', 'Compliance rules', 'Change tracking', 'Automated remediation'],
            cons: ['Cost per resource', 'Complex setup', 'Rule management', 'Can be expensive']
        }
    ],
    devops: [
        {
            name: 'CodePipeline',
            icon: '🔄',
            cost: 'Good - $1 per active pipeline/month, free tier: 1 pipeline',
            scalability: 'Excellent - handles multiple pipelines, parallel execution',
            maintenance: 'Low - managed service, you configure pipeline stages',
            performance: 'Excellent - fast deployments, parallel stages',
            bestFor: 'CI/CD pipelines, automated deployments, release automation, DevOps workflows',
            pros: ['Integrated with AWS', 'Visual pipeline', 'Multiple stages', 'Easy setup'],
            cons: ['AWS-centric', 'Limited compared to Jenkins', 'Cost for many pipelines', 'Less flexible'],
            pricingExample: '💰 $1 per pipeline/month. Example: 10 pipelines = $10/month. First pipeline FREE!',
            realWorldExample: '🏢 <strong>Microservices deployment:</strong> 20 pipelines for 20 services. Auto-deploy to dev/staging/prod on git push. Perfect for AWS-native CI/CD.',
            whenToChoose: '✅ Choose CodePipeline when: You need AWS-native CI/CD, automated deployments, integrating with CodeBuild/CodeDeploy, or simple pipeline setup.'
        },
        {
            name: 'CodeBuild',
            icon: '🔨',
            cost: 'Good - pay per build minute, free tier: 100 minutes/month',
            scalability: 'Excellent - parallel builds, scales automatically',
            maintenance: 'Very Low - fully managed, no build servers',
            performance: 'Excellent - fast builds, cached dependencies',
            bestFor: 'Building code, running tests, creating artifacts, Docker image builds',
            pros: ['No build servers', 'Pay per minute', 'Docker support', 'Integrated with AWS'],
            cons: ['Cost for heavy usage', 'AWS-centric', 'Learning curve', 'Limited compared to Jenkins'],
            pricingExample: '💰 $0.005/build minute (general1.small). Example: 1000 minutes/month = $5. First 100 minutes FREE!',
            realWorldExample: '🏢 <strong>Node.js app:</strong> Build, test, create Docker image in 5 minutes. 200 builds/month = $5. Perfect for automated builds.',
            whenToChoose: '✅ Choose CodeBuild when: You need managed build service, Docker image builds, no build server management, or AWS-integrated CI/CD.'
        },
        {
            name: 'CodeDeploy',
            icon: '🚀',
            cost: 'Free for EC2/Lambda/ECS deployments, pay for underlying resources',
            scalability: 'Excellent - deploys to thousands of instances',
            maintenance: 'Low - managed service, you configure deployment strategies',
            performance: 'Excellent - blue/green deployments, rolling updates',
            bestFor: 'Automated deployments, blue/green deployments, rolling updates, deployment strategies',
            pros: ['Free service', 'Multiple strategies', 'Rollback support', 'Integrated with AWS'],
            cons: ['AWS-only', 'Complex configuration', 'Learning curve', 'Limited compared to Spinnaker'],
            pricingExample: '💰 FREE! No charge for CodeDeploy. Pay only for EC2/Lambda/ECS resources.',
            realWorldExample: '🏢 <strong>Production deployment:</strong> Blue/green deploy to 50 EC2 instances. Zero downtime. Automatic rollback on errors.',
            whenToChoose: '✅ Choose CodeDeploy when: You need automated deployments, blue/green strategy, rolling updates, or zero-downtime deployments on AWS.'
        }
    ],
    iot: [
        {
            name: 'IoT Core',
            icon: '📡',
            cost: 'Good - $1.00 per million messages, $0.08 per million connection minutes',
            scalability: 'Excellent - billions of devices, trillions of messages',
            maintenance: 'Very Low - fully managed, device registry, rules engine',
            performance: 'Excellent - low latency, MQTT/HTTP/WebSocket support',
            bestFor: 'IoT device connectivity, device management, telemetry, smart home/industrial IoT',
            pros: ['Massive scale', 'Device registry', 'Rules engine', 'Security features'],
            cons: ['Cost at scale', 'Learning curve', 'Complex for simple IoT', 'Protocol limitations'],
            pricingExample: '💰 1M messages: $1. 1M connection minutes: $0.08. Example: 1K devices 24/7 = $35/month + messages.',
            realWorldExample: '🏢 <strong>Smart factory:</strong> 10K sensors sending data every minute. Rules route to Lambda/Kinesis. Perfect for industrial IoT.',
            whenToChoose: '✅ Choose IoT Core when: You need IoT device connectivity, managing thousands of devices, telemetry collection, or building smart home/industrial IoT.'
        },
        {
            name: 'Greengrass',
            icon: '🌿',
            cost: 'Free software - pay for underlying devices and AWS services used',
            scalability: 'Excellent - scales to thousands of edge devices',
            maintenance: 'Low - managed updates, you manage edge devices',
            performance: 'Excellent - local processing, offline capability',
            bestFor: 'Edge computing, local ML inference, offline IoT, industrial automation',
            pros: ['Local processing', 'Offline capability', 'ML at edge', 'Lambda at edge'],
            cons: ['Complex setup', 'Device requirements', 'Learning curve', 'Management overhead'],
            pricingExample: '💰 Software FREE! Pay for devices and cloud services. Example: 100 devices with Lambda = $0 software cost.',
            realWorldExample: '🏢 <strong>Autonomous vehicles:</strong> Process camera data locally with ML. Works offline. Sync to cloud when connected.',
            whenToChoose: '✅ Choose Greengrass when: You need edge computing, local ML inference, offline IoT capability, or low-latency processing at edge.'
        },
        {
            name: 'Lambda@Edge',
            icon: '⚡',
            cost: 'Moderate - $0.60 per 1M requests + $0.00005001/GB-second',
            scalability: 'Excellent - runs at CloudFront edge locations globally',
            maintenance: 'Very Low - fully managed, serverless at edge',
            performance: 'Excellent - low latency globally, runs close to users',
            bestFor: 'Edge computing, content customization, A/B testing, authentication at edge',
            pros: ['Global edge execution', 'Low latency', 'Serverless', 'CloudFront integration'],
            cons: ['More expensive than Lambda', 'Limited runtime', 'Size limits', 'Debugging complexity'],
            pricingExample: '💰 1M requests: $0.60 + compute. Example: 10M requests/month = $6 + compute (~$10 total).',
            realWorldExample: '🏢 <strong>Global SaaS:</strong> Customize content by region at edge. A/B testing. Auth checks. 50ms latency worldwide.',
            whenToChoose: '✅ Choose Lambda@Edge when: You need edge computing, content customization, low latency globally, or CloudFront integration.'
        },
        {
            name: 'CloudFront Functions',
            icon: '⚡',
            cost: 'Excellent - $0.10 per 1M invocations, very cost-effective',
            scalability: 'Excellent - sub-millisecond startup, massive scale',
            maintenance: 'Very Low - fully managed, lightweight functions',
            performance: 'Excellent - sub-ms latency, runs at edge',
            bestFor: 'Simple edge logic, URL rewrites, header manipulation, cache key normalization',
            pros: ['Very cheap', 'Sub-ms latency', 'Simple to use', 'High scale'],
            cons: ['Limited functionality', 'JavaScript only', 'No network access', 'Max 10KB code'],
            pricingExample: '💰 $0.10 per 1M invocations. Example: 100M requests/month = $10. 10x cheaper than Lambda@Edge!',
            realWorldExample: '🏢 <strong>CDN optimization:</strong> Rewrite URLs, add security headers, normalize cache keys. 100M requests = $10/month.',
            whenToChoose: '✅ Choose CloudFront Functions when: You need simple edge logic, URL rewrites, header manipulation, or very high scale at low cost.'
        }
    ],
    governance: [
        {
            name: 'Cost Explorer',
            icon: '💰',
            cost: 'Free for basic usage, API calls: $0.01 per request',
            scalability: 'Excellent - analyzes all AWS spending',
            maintenance: 'Very Low - fully managed, automatic data collection',
            performance: 'Good - historical analysis, forecasting',
            bestFor: 'Cost analysis, budget tracking, cost optimization, spending forecasts',
            pros: ['Free basic usage', 'Cost forecasting', 'Detailed breakdowns', 'Custom reports'],
            cons: ['API costs', 'Learning curve', 'Delayed data', 'Limited real-time'],
            pricingExample: '💰 Basic usage: FREE! API calls: $0.01 each. Example: 1000 API calls/month = $10.',
            realWorldExample: '🏢 <strong>Cost optimization:</strong> Identify $5K/month in unused resources. Forecast next quarter spending. Save 30% annually.',
            whenToChoose: '✅ Choose Cost Explorer when: You need cost analysis, budget tracking, spending forecasts, or identifying cost optimization opportunities.'
        },
        {
            name: 'Organizations',
            icon: '🏢',
            cost: 'Free - no charge for AWS Organizations',
            scalability: 'Excellent - manage thousands of accounts',
            maintenance: 'Low - managed service, you configure policies',
            performance: 'Excellent - centralized management, consolidated billing',
            bestFor: 'Multi-account management, consolidated billing, organizational policies, account governance',
            pros: ['Free service', 'Consolidated billing', 'Policy management', 'Account isolation'],
            cons: ['Complex setup', 'Learning curve', 'Policy management overhead', 'Not for single account'],
            pricingExample: '💰 FREE! No charge for Organizations. Manage unlimited accounts. Consolidated billing included.',
            realWorldExample: '🏢 <strong>Enterprise:</strong> Manage 100 AWS accounts. Consolidated billing saves 15%. SCPs enforce security policies.',
            whenToChoose: '✅ Choose Organizations when: You have multiple AWS accounts, need consolidated billing, enforcing policies, or enterprise governance.'
        },
        {
            name: 'Service Catalog',
            icon: '📋',
            cost: 'Free - no charge for Service Catalog, pay for provisioned resources',
            scalability: 'Excellent - manage thousands of products',
            maintenance: 'Low - managed service, you create products',
            performance: 'Excellent - self-service provisioning, governance',
            bestFor: 'Self-service IT, approved products catalog, governance, standardized deployments',
            pros: ['Free service', 'Self-service', 'Governance', 'Version control'],
            cons: ['Setup complexity', 'Learning curve', 'Maintenance overhead', 'Not for simple setups'],
            pricingExample: '💰 FREE! No charge for Service Catalog. Pay only for resources users provision (EC2, RDS, etc.).',
            realWorldExample: '🏢 <strong>Enterprise IT:</strong> 500 developers self-provision from 50 approved products. Governance enforced. Reduce IT tickets by 80%.',
            whenToChoose: '✅ Choose Service Catalog when: You need self-service IT, approved products catalog, governance enforcement, or standardized deployments.'
        }
    ]
};

// State
let selectedService1 = null;
let selectedService2 = null;
let selectedCategory1 = null;
let selectedCategory2 = null;

// DOM Elements
const category1Select = document.getElementById('category1');
const category2Select = document.getElementById('category2');
const serviceCards1 = document.getElementById('serviceCards1');
const serviceCards2 = document.getElementById('serviceCards2');
const compareBtn = document.getElementById('compareBtn');
const resetBtn = document.getElementById('resetBtn');
const selectionSection = document.getElementById('selectionSection');
const resultsSection = document.getElementById('resultsSection');
const comparisonGrid = document.getElementById('comparisonGrid');

// Event Listeners
category1Select.addEventListener('change', (e) => {
    selectedCategory1 = e.target.value;
    selectedService1 = null;
    renderServiceCards(selectedCategory1, serviceCards1, 1);
    updateCompareButton();
});

category2Select.addEventListener('change', (e) => {
    selectedCategory2 = e.target.value;
    selectedService2 = null;
    renderServiceCards(selectedCategory2, serviceCards2, 2);
    updateCompareButton();
});

compareBtn.addEventListener('click', () => {
    if (selectedService1 && selectedService2) {
        showComparison();
    }
});

resetBtn.addEventListener('click', () => {
    resetComparison();
});

// Functions
function renderServiceCards(category, container, selectorNum) {
    if (!category) {
        container.innerHTML = '<p class="placeholder-text">Select a category first</p>';
        return;
    }

    const categoryServices = services[category];
    container.innerHTML = categoryServices.map(service => `
        <div class="service-card" data-service="${service.name}" data-selector="${selectorNum}">
            <span class="service-icon">${service.icon}</span>
            <span class="service-name">${service.name}</span>
        </div>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.dataset.service;
            const selector = card.dataset.selector;
            
            // Remove previous selection
            container.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
            
            // Add selection
            card.classList.add('selected');
            
            // Update state
            if (selector === '1') {
                selectedService1 = categoryServices.find(s => s.name === serviceName);
            } else {
                selectedService2 = categoryServices.find(s => s.name === serviceName);
            }
            
            updateCompareButton();
        });
    });
}

function updateCompareButton() {
    compareBtn.disabled = !(selectedService1 && selectedService2);
}

function showComparison() {
    // Scroll to results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Build comparison HTML
    const html = `
        <!-- Service Headers -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="service-header">
                    <span class="service-header-icon">${selectedService1.icon}</span>
                    <h3 class="service-header-name">${selectedService1.name}</h3>
                </div>
                <div class="category-badge">${getCategoryName(selectedCategory1)}</div>
            </div>
            <div class="vs-badge">
                <span class="vs-text">VS</span>
            </div>
            <div class="comparison-card">
                <div class="service-header">
                    <span class="service-header-icon">${selectedService2.icon}</span>
                    <h3 class="service-header-name">${selectedService2.name}</h3>
                </div>
                <div class="category-badge">${getCategoryName(selectedCategory2)}</div>
            </div>
        </div>

        <!-- Cost Comparison -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">💰 Cost</span>
                    <p class="metric-value">${selectedService1.cost}</p>
                </div>
            </div>
            <div class="category-badge">Cost</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">💰 Cost</span>
                    <p class="metric-value">${selectedService2.cost}</p>
                </div>
            </div>
        </div>

        <!-- Scalability Comparison -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">📈 Scalability</span>
                    <p class="metric-value">${selectedService1.scalability}</p>
                </div>
            </div>
            <div class="category-badge">Scalability</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">📈 Scalability</span>
                    <p class="metric-value">${selectedService2.scalability}</p>
                </div>
            </div>
        </div>

        <!-- Maintenance Comparison -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🔧 Maintenance</span>
                    <p class="metric-value">${selectedService1.maintenance}</p>
                </div>
            </div>
            <div class="category-badge">Maintenance</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🔧 Maintenance</span>
                    <p class="metric-value">${selectedService2.maintenance}</p>
                </div>
            </div>
        </div>

        <!-- Performance Comparison -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">⚡ Performance</span>
                    <p class="metric-value">${selectedService1.performance}</p>
                </div>
            </div>
            <div class="category-badge">Performance</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">⚡ Performance</span>
                    <p class="metric-value">${selectedService2.performance}</p>
                </div>
            </div>
        </div>

        <!-- Best For Comparison -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🎯 Best For</span>
                    <p class="metric-value">${selectedService1.bestFor}</p>
                </div>
            </div>
            <div class="category-badge">Use Cases</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🎯 Best For</span>
                    <p class="metric-value">${selectedService2.bestFor}</p>
                </div>
            </div>
        </div>

        <!-- Pros & Cons -->
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">✅ Pros</span>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${selectedService1.pros.map(pro => `<li class="metric-value" style="margin-bottom: 0.5rem;">${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="metric-item" style="margin-top: 1.5rem;">
                    <span class="metric-label">❌ Cons</span>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${selectedService1.cons.map(con => `<li class="metric-value" style="margin-bottom: 0.5rem;">${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="category-badge">Pros & Cons</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">✅ Pros</span>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${selectedService2.pros.map(pro => `<li class="metric-value" style="margin-bottom: 0.5rem;">${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="metric-item" style="margin-top: 1.5rem;">
                    <span class="metric-label">❌ Cons</span>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${selectedService2.cons.map(con => `<li class="metric-value" style="margin-bottom: 0.5rem;">${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Pricing Examples -->
        ${generatePricingExamples()}

        <!-- Real-World Scenarios -->
        ${generateRealWorldScenarios()}

        <!-- When to Choose -->
        ${generateWhenToChoose()}

        <!-- Recommendation -->
        ${generateRecommendation()}
    `;

    comparisonGrid.innerHTML = html;
}

function generatePricingExamples() {
    const pricing1 = getPricingExample(selectedService1.name);
    const pricing2 = getPricingExample(selectedService2.name);
    
    return `
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">💵 Pricing Example</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6;">${pricing1}</p>
                </div>
            </div>
            <div class="category-badge">Real Costs</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">💵 Pricing Example</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6;">${pricing2}</p>
                </div>
            </div>
        </div>
    `;
}

function generateRealWorldScenarios() {
    const scenario1 = getRealWorldExample(selectedService1.name);
    const scenario2 = getRealWorldExample(selectedService2.name);
    
    return `
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🌍 Real-World Example</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6;">${scenario1}</p>
                </div>
            </div>
            <div class="category-badge">Use Cases</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">🌍 Real-World Example</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6;">${scenario2}</p>
                </div>
            </div>
        </div>
    `;
}

function generateWhenToChoose() {
    const when1 = getWhenToChoose(selectedService1.name);
    const when2 = getWhenToChoose(selectedService2.name);
    
    return `
        <div class="comparison-row">
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">✅ When to Choose</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6; font-weight: 600;">${when1}</p>
                </div>
            </div>
            <div class="category-badge">Decision Guide</div>
            <div class="comparison-card">
                <div class="metric-item">
                    <span class="metric-label">✅ When to Choose</span>
                    <p class="metric-value" style="font-size: 1rem; line-height: 1.6; font-weight: 600;">${when2}</p>
                </div>
            </div>
        </div>
    `;
}

function getPricingExample(serviceName) {
    const examples = {
        'Lambda': '$0.20 per 1M requests + $0.0000166667/GB-second. <strong>Example:</strong> 1M requests/month with 512MB, 1s avg = <strong>$5/month</strong>. First 1M requests FREE!',
        'EC2': 't3.medium: ~<strong>$30/month</strong> (730 hours), t3.large: ~<strong>$60/month</strong>. Reserved instances save up to 72%. Spot instances save up to 90%!',
        'ECS': 'Fargate: $0.04/vCPU-hour + $0.004/GB-hour. <strong>Example:</strong> 1 vCPU, 2GB = ~<strong>$36/month</strong> running 24/7.',
        'Fargate': '0.25 vCPU, 0.5GB: ~<strong>$9/month</strong>. 1 vCPU, 2GB: ~<strong>$36/month</strong>. Pay only when tasks run.',
        'Elastic Beanstalk': 'Free service! Pay only for resources: t3.small + RDS = ~<strong>$50/month</strong>. Includes load balancer, auto-scaling, monitoring.',
        'RDS': 'db.t3.micro: ~<strong>$15/month</strong>, db.t3.small: ~<strong>$30/month</strong>. Multi-AZ doubles cost. Reserved instances save 60%.',
        'DynamoDB': 'On-demand: $1.25 per million writes, $0.25 per million reads. <strong>Example:</strong> 1M reads + 100K writes = <strong>$0.38/month</strong>. 25GB storage FREE!',
        'Aurora': 'db.t3.medium: ~<strong>$73/month</strong>. Serverless: $0.06/ACU-hour. <strong>Example:</strong> 2 ACUs avg = <strong>$88/month</strong>.',
        'ElastiCache': 'cache.t3.micro: ~<strong>$12/month</strong>, cache.t3.small: ~<strong>$24/month</strong>. Redis or Memcached.',
        'DocumentDB': 'db.t3.medium: ~<strong>$70/month</strong>. Storage: $0.10/GB-month. I/O: $0.20 per million requests.',
        'S3': 'Standard: $0.023/GB-month. <strong>Example:</strong> 100GB = <strong>$2.30/month</strong>. First 50TB: $0.023/GB, next 450TB: $0.022/GB.',
        'EBS': 'gp3: $0.08/GB-month. <strong>Example:</strong> 100GB = <strong>$8/month</strong>. Snapshots: $0.05/GB-month.',
        'EFS': 'Standard: $0.30/GB-month. <strong>Example:</strong> 100GB = <strong>$30/month</strong>. Infrequent Access: $0.016/GB-month.',
        'Glacier': 'Deep Archive: $0.00099/GB-month. <strong>Example:</strong> 1TB = <strong>$1/month</strong>! Retrieval: 12-48 hours.',
        'API Gateway': 'REST: $3.50 per million requests. <strong>Example:</strong> 1M requests = <strong>$3.50/month</strong>. First 1M FREE for 12 months!',
        'ALB': '$0.0225/hour (~<strong>$16/month</strong>) + $0.008/LCU-hour. <strong>Example:</strong> Medium traffic = <strong>$25/month</strong>.',
        'CloudFront': '$0.085/GB for first 10TB. <strong>Example:</strong> 1TB transfer = <strong>$85/month</strong>. 1TB FREE for 12 months!',
        'SQS': '$0.40 per million requests. <strong>Example:</strong> 10M messages = <strong>$4/month</strong>. First 1M FREE!',
        'SNS': '$0.50 per million requests. <strong>Example:</strong> 1M notifications = <strong>$0.50/month</strong>. First 1M FREE!',
        'EventBridge': '$1.00 per million events. <strong>Example:</strong> 5M events = <strong>$5/month</strong>.',
        'Kinesis': '$0.015/shard-hour + $0.014/million PUT records. <strong>Example:</strong> 1 shard = <strong>$11/month</strong> + data costs.',
        'IAM': '<strong>FREE!</strong> No charge for IAM users, groups, roles, or policies. Unlimited users and policies.',
        'Cognito': 'First 50K MAU FREE! Then $0.0055/MAU. <strong>Example:</strong> 100K users = <strong>$275/month</strong>.',
        'Secrets Manager': '$0.40/secret/month + $0.05 per 10K API calls. <strong>Example:</strong> 10 secrets, 100K calls = <strong>$4.50/month</strong>.',
        'WAF': '$5/web ACL/month + $1/rule/month + $0.60 per million requests. <strong>Example:</strong> 1 ACL, 5 rules, 10M requests = <strong>$16/month</strong>.',
        'VPC': '<strong>FREE!</strong> No charge for VPC itself. Pay for NAT Gateway ($32/month), VPN ($36/month), or other resources.',
        'Route 53': '$0.50/hosted zone/month + $0.40 per million queries. <strong>Example:</strong> 1 domain, 10M queries = <strong>$4.50/month</strong>.',
        'Direct Connect': '1Gbps port: <strong>$216/month</strong> + data transfer. 10Gbps: <strong>$2,250/month</strong>. Requires physical setup.',
        'Athena': '$5 per TB scanned. <strong>Example:</strong> Query 100GB = <strong>$0.50</strong>. Partition data to reduce costs!',
        'Redshift': 'dc2.large: ~<strong>$180/month</strong>. ra3.xlplus: ~<strong>$1,086/month</strong>. Reserved instances save 75%.',
        'EMR': 'EC2 cost + 25% EMR charge. <strong>Example:</strong> 5x m5.xlarge = <strong>$750/month</strong> + $188 EMR = <strong>$938/month</strong>.',
        'Glue': '$0.44/DPU-hour. <strong>Example:</strong> 10 DPUs for 1 hour/day = <strong>$132/month</strong>.',
        'SageMaker': 'ml.t3.medium: $0.05/hour. <strong>Example:</strong> Training 10 hours = <strong>$0.50</strong>. Inference: ml.t2.medium = <strong>$36/month</strong>.',
        'Rekognition': '$1.00 per 1K images. <strong>Example:</strong> 10K images = <strong>$10/month</strong>. First 5K FREE!',
        'Comprehend': '$0.0001 per unit (100 chars). <strong>Example:</strong> 1M units = <strong>$100/month</strong>.',
        'Bedrock': 'Varies by model. Claude: $0.008/1K input tokens. <strong>Example:</strong> 1M tokens = <strong>$8</strong>.',
        'CloudWatch': 'First 10 metrics FREE! Then $0.30/metric/month. Logs: $0.50/GB ingested. <strong>Example:</strong> 50 metrics, 10GB logs = <strong>$20/month</strong>.',
        'X-Ray': '$5 per million traces recorded. <strong>Example:</strong> 1M traces = <strong>$5/month</strong>. First 100K FREE!',
        'CloudTrail': 'Management events FREE! Data events: $0.10 per 100K events. <strong>Example:</strong> 1M data events = <strong>$1/month</strong>.',
        'Config': '$0.003 per configuration item. <strong>Example:</strong> 1K resources = <strong>$3/month</strong>. Rules: $2/rule/month.',
        'EKS': 'Cluster: <strong>$73/month</strong> + worker nodes. Example: 3x t3.medium = $163/month total. Fargate option available.',
        'App Runner': '1 vCPU, 2GB: $0.064/hour (~<strong>$47/month</strong>) + $0.40 per million requests. Scales to zero.',
        'Neptune': 'db.t3.medium: <strong>$70/month</strong> + 100GB storage = <strong>$80/month</strong>. Read replicas add $70/month each.',
        'FSx': 'FSx Windows 1TB: <strong>$195/month</strong>. FSx Lustre 1.2TB: <strong>$168/month</strong>. High-performance storage.',
        'AppSync': '$4 per million queries + $2 per million real-time updates. <strong>Example:</strong> 1M queries + 500K updates = <strong>$5/month</strong>.',
        'Step Functions': 'Standard: $25 per 1M transitions. Express: $1 per 1M. <strong>Example:</strong> 100K workflows = <strong>$2.50/month</strong>.',
        'CodePipeline': '$1 per pipeline/month. <strong>Example:</strong> 10 pipelines = <strong>$10/month</strong>. First pipeline FREE!',
        'CodeBuild': '$0.005/build minute. <strong>Example:</strong> 1000 minutes/month = <strong>$5</strong>. First 100 minutes FREE!',
        'CodeDeploy': '<strong>FREE!</strong> No charge for CodeDeploy. Pay only for EC2/Lambda/ECS resources.',
        'ECR': '10GB storage: <strong>$1/month</strong>. 100GB transfer: <strong>$9/month</strong>. First 500MB storage FREE for 12 months!',
        'Global Accelerator': 'Accelerator: <strong>$18/month</strong> + $0.015/GB processed. Example: 1TB/month = <strong>$33/month</strong> total.',
        'Transit Gateway': '10 VPC attachments: <strong>$360/month</strong> + $0.02/GB processed. Example: 10TB = <strong>$560/month</strong> total.',
        'EventBridge Scheduler': '$1 per million invocations. Example: 100K scheduled tasks/month = <strong>$0.10</strong>. Very cost-effective!',
        'AppFlow': '1000 flow runs + 100GB: $1 + $2 = <strong>$3/month</strong>. Example: Daily Salesforce sync = <strong>$30/month</strong>.',
        'MemoryDB': 'db.t4g.small: <strong>$50/month</strong>. db.r6g.large: <strong>$250/month</strong>. Storage: $0.20/GB-month.',
        'Timestream': 'Ingest 1GB/day: <strong>$15/month</strong>. Store 100GB: <strong>$72/month</strong>. Queries: $0.01 per GB scanned.',
        'QLDB': '1M writes: $0.30. 1M reads: $0.09. Storage: $0.20/GB-month. Example: 10M writes = <strong>$3/month</strong>.',
        'Backup': '1TB warm backup: <strong>$50/month</strong>. 1TB cold: <strong>$10/month</strong>. Restore: $0.02/GB. Example: 5TB cold = <strong>$50/month</strong>.',
        'Storage Gateway': 'File Gateway: <strong>$125/month</strong> + S3 storage. Volume Gateway: <strong>$125/month</strong> + EBS snapshots. Tape Gateway: <strong>$125/month</strong>.',
        'IoT Core': '1M messages: $1. 1M connection minutes: $0.08. Example: 1K devices 24/7 = <strong>$35/month</strong> + messages.',
        'Greengrass': 'Software <strong>FREE!</strong> Pay for devices and cloud services. Example: 100 devices with Lambda = $0 software cost.',
        'Lambda@Edge': '1M requests: $0.60 + compute. Example: 10M requests/month = $6 + compute (~<strong>$10 total</strong>).',
        'CloudFront Functions': '$0.10 per 1M invocations. Example: 100M requests/month = <strong>$10</strong>. 10x cheaper than Lambda@Edge!',
        'Cost Explorer': 'Basic usage: <strong>FREE!</strong> API calls: $0.01 each. Example: 1000 API calls/month = <strong>$10</strong>.',
        'Organizations': '<strong>FREE!</strong> No charge for Organizations. Manage unlimited accounts. Consolidated billing included.',
        'Service Catalog': '<strong>FREE!</strong> No charge for Service Catalog. Pay only for resources users provision (EC2, RDS, etc.).'
    };
    return examples[serviceName] || 'Pricing varies based on usage. Check AWS pricing calculator for estimates.';
}

function getRealWorldExample(serviceName) {
    const examples = {
        'Lambda': '🏢 <strong>Startup API:</strong> 100K requests/month costs <strong>$1/month</strong> vs $30+ for EC2. Scales automatically during launch spike to 1M requests without code changes.',
        'EC2': '🏢 <strong>E-commerce site:</strong> Run 3x t3.large instances ($180/month) with auto-scaling for peak hours. Perfect for 24/7 consistent workloads with predictable traffic.',
        'ECS': '🏢 <strong>Microservices app:</strong> 5 services deployed as ECS tasks. API service scales to 10 tasks during peak (9am-5pm), others stay at 2. Efficient resource usage.',
        'Fargate': '🏢 <strong>Batch processing:</strong> Run 10 tasks nightly for 2 hours each. Cost: <strong>$5/month</strong> vs $30/month for always-on EC2. Perfect for scheduled workloads.',
        'Elastic Beanstalk': '🏢 <strong>Node.js web app:</strong> Deploy with one command, auto-scales from 2 to 10 instances during traffic spikes. Perfect for developers who want simplicity.',
        'RDS': '🏢 <strong>SaaS application:</strong> PostgreSQL with 50GB data, 1K transactions/sec. db.t3.medium ($60/month) with Multi-AZ for high availability ($120/month total).',
        'DynamoDB': '🏢 <strong>Mobile game:</strong> 10M reads/day, 1M writes/day. Cost: <strong>$15/month</strong>. Scales automatically during viral growth to 100M reads without downtime.',
        'Aurora': '🏢 <strong>Enterprise app:</strong> MySQL-compatible with 500GB data. 15 read replicas for global users. Serverless scales from 2 to 64 ACUs during peak hours.',
        'ElastiCache': '🏢 <strong>Social media app:</strong> Cache user sessions and feed data. Reduces RDS load by 80%. cache.t3.small ($24/month) handles 10K concurrent users.',
        'DocumentDB': '🏢 <strong>Content management:</strong> MongoDB-compatible with 100GB documents. 3-node cluster for high availability. Perfect for JSON-heavy applications.',
        'S3': '🏢 <strong>Media startup:</strong> Store 10TB of user photos/videos. Cost: <strong>$230/month</strong>. Lifecycle policy moves old content to Glacier ($10/month for 10TB).',
        'EBS': '🏢 <strong>Database server:</strong> 500GB gp3 volume for MySQL database. Cost: <strong>$40/month</strong>. Snapshots for daily backups add $25/month.',
        'EFS': '🏢 <strong>Web hosting:</strong> Shared file system for 10 web servers. 200GB of WordPress files. Cost: <strong>$60/month</strong>. All servers access same files.',
        'Glacier': '🏢 <strong>Compliance archival:</strong> Store 100TB of old records for 7 years. Cost: <strong>$99/month</strong> vs $2,300/month on S3. Retrieval takes 12 hours.',
        'API Gateway': '🏢 <strong>Serverless API:</strong> 500K requests/month with Lambda backend. Cost: <strong>$1.75/month</strong>. Built-in throttling, caching, and auth.',
        'ALB': '🏢 <strong>High-traffic site:</strong> 10M requests/month across 5 EC2 instances. Cost: <strong>$30/month</strong>. Path-based routing to microservices.',
        'CloudFront': '🏢 <strong>Global SaaS:</strong> Deliver 5TB/month to users worldwide. Cost: <strong>$425/month</strong>. 90% faster load times in Asia/Europe.',
        'SQS': '🏢 <strong>Order processing:</strong> Decouple web app from order fulfillment. 5M messages/month. Cost: <strong>$2/month</strong>. Handles traffic spikes automatically.',
        'SNS': '🏢 <strong>Notification system:</strong> Send 1M push notifications to mobile users. Cost: <strong>$0.50/month</strong>. Fan-out to email, SMS, and mobile.',
        'EventBridge': '🏢 <strong>Event-driven app:</strong> 10M events/month from 20 SaaS apps. Cost: <strong>$10/month</strong>. Route events to Lambda, SQS, or Step Functions.',
        'Kinesis': '🏢 <strong>Real-time analytics:</strong> Process 1GB/hour of clickstream data. 2 shards handle 2K records/sec. Cost: <strong>$50/month</strong>.',
        'IAM': '🏢 <strong>Enterprise security:</strong> 500 users, 50 roles, 100 policies. Cost: <strong>FREE!</strong> Manage all AWS access with fine-grained permissions.',
        'Cognito': '🏢 <strong>Mobile app:</strong> 200K monthly active users with social login. Cost: <strong>$825/month</strong>. Includes user pools, MFA, and password reset.',
        'Secrets Manager': '🏢 <strong>Microservices:</strong> Rotate 20 database passwords automatically. Cost: <strong>$8/month</strong>. Integrates with RDS, Redshift, DocumentDB.',
        'WAF': '🏢 <strong>Web protection:</strong> Block SQL injection and XSS attacks. 50M requests/month. Cost: <strong>$35/month</strong>. Managed rules for OWASP Top 10.',
        'VPC': '🏢 <strong>Secure network:</strong> Isolate production from dev/test. 3 subnets across 3 AZs. Cost: <strong>FREE!</strong> NAT Gateway adds $32/month.',
        'Route 53': '🏢 <strong>Multi-region app:</strong> Route traffic to closest region. 50M queries/month. Cost: <strong>$20.50/month</strong>. Health checks for failover.',
        'Direct Connect': '🏢 <strong>Hybrid cloud:</strong> 1Gbps dedicated connection to on-prem datacenter. Transfer 10TB/month. Cost: <strong>$216/month</strong> + $900 transfer.',
        'Athena': '🏢 <strong>Log analysis:</strong> Query 1TB of S3 logs daily. Cost: <strong>$150/month</strong>. No infrastructure to manage. Results in seconds.',
        'Redshift': '🏢 <strong>Data warehouse:</strong> 10TB of sales data, complex BI queries. 2-node cluster. Cost: <strong>$360/month</strong>. 10x faster than traditional databases.',
        'EMR': '🏢 <strong>Big data processing:</strong> Process 100TB of data monthly with Spark. 10-node cluster runs 8 hours/day. Cost: <strong>$1,500/month</strong>.',
        'Glue': '🏢 <strong>ETL pipeline:</strong> Transform 500GB daily from S3 to Redshift. 20 DPUs for 2 hours. Cost: <strong>$264/month</strong>. Serverless and automatic.',
        'SageMaker': '🏢 <strong>ML model:</strong> Train fraud detection model on 1TB data. 10 hours on ml.p3.2xlarge. Cost: <strong>$30</strong>. Deploy for inference at $36/month.',
        'Rekognition': '🏢 <strong>Photo app:</strong> Detect faces in 100K user photos/month. Cost: <strong>$100/month</strong>. Auto-tag photos with objects and scenes.',
        'Comprehend': '🏢 <strong>Customer feedback:</strong> Analyze sentiment of 1M reviews/month. Cost: <strong>$100/month</strong>. Extract key phrases and entities.',
        'Bedrock': '🏢 <strong>AI chatbot:</strong> Process 10M tokens/month with Claude. Cost: <strong>$80/month</strong>. Build conversational AI without training models.',
        'CloudWatch': '🏢 <strong>Monitoring:</strong> Track 100 metrics, 50GB logs/month. Cost: <strong>$55/month</strong>. Alarms notify on-call team via SNS.',
        'X-Ray': '🏢 <strong>Microservices debugging:</strong> Trace 5M requests/month across 10 services. Cost: <strong>$25/month</strong>. Find bottlenecks in minutes.',
        'CloudTrail': '🏢 <strong>Audit compliance:</strong> Log all API calls for 100 users. 10M events/month. Cost: <strong>$10/month</strong>. Required for SOC 2 compliance.',
        'Config': '🏢 <strong>Compliance tracking:</strong> Monitor 500 resources for compliance. 20 rules. Cost: <strong>$41.50/month</strong>. Auto-remediate violations.',
        'EKS': '🏢 <strong>Enterprise microservices:</strong> 50 services across 10-node cluster. Auto-scales from 10 to 50 nodes during peak. Perfect for K8s expertise.',
        'App Runner': '🏢 <strong>Startup web app:</strong> Deploy Node.js app from GitHub in 5 minutes. Auto-scales from 1 to 10 instances. Perfect for simple deployments.',
        'Neptune': '🏢 <strong>Social network:</strong> 10M users, 100M relationships. Query "friends of friends" in milliseconds. Perfect for connected data.',
        'FSx': '🏢 <strong>Media company:</strong> 10TB FSx Lustre for video rendering. 1GB/s throughput. Processes 4K videos 10x faster than EFS.',
        'AppSync': '🏢 <strong>Chat application:</strong> 100K users, 10M messages/month. Real-time updates to all clients. Perfect for collaborative apps.',
        'Step Functions': '🏢 <strong>E-commerce order:</strong> Orchestrate payment, inventory, shipping, email. Retry failed steps automatically. Perfect for complex workflows.',
        'CodePipeline': '🏢 <strong>Microservices deployment:</strong> 20 pipelines for 20 services. Auto-deploy to dev/staging/prod on git push. Perfect for AWS-native CI/CD.',
        'CodeBuild': '🏢 <strong>Node.js app:</strong> Build, test, create Docker image in 5 minutes. 200 builds/month = $5. Perfect for automated builds.',
        'CodeDeploy': '🏢 <strong>Production deployment:</strong> Blue/green deploy to 50 EC2 instances. Zero downtime. Automatic rollback on errors.',
        'ECR': '🏢 <strong>Microservices:</strong> Store 50 Docker images (20GB total). Automated vulnerability scanning. Perfect for ECS/EKS deployments.',
        'Global Accelerator': '🏢 <strong>Global gaming:</strong> Players worldwide connect to nearest edge. 60% lower latency. Static IPs for whitelisting.',
        'Transit Gateway': '🏢 <strong>Enterprise network:</strong> Connect 50 VPCs and 5 on-prem datacenters. Centralized routing. Perfect for complex topologies.',
        'EventBridge Scheduler': '🏢 <strong>Data pipeline:</strong> Schedule 1000 ETL jobs daily at different times. Timezone-aware. Perfect for automation.',
        'AppFlow': '🏢 <strong>Sales analytics:</strong> Sync Salesforce to S3 hourly. 10GB/day. Transform and load to Redshift. No code needed.',
        'MemoryDB': '🏢 <strong>Gaming platform:</strong> Store player data with microsecond latency. 1M concurrent users. Durable unlike ElastiCache.',
        'Timestream': '🏢 <strong>IoT platform:</strong> 10K sensors sending data every second. 1TB/month ingested. Query patterns across time ranges.',
        'QLDB': '🏢 <strong>Supply chain:</strong> Track 1M product movements/month. Immutable audit trail. Verify authenticity cryptographically.',
        'Backup': '🏢 <strong>Enterprise:</strong> Backup 100 EC2 instances, 50 RDS databases daily. Centralized policies. Compliance-ready.',
        'Storage Gateway': '🏢 <strong>Hybrid setup:</strong> On-prem apps write to local gateway. Data syncs to S3. 10TB migrated over 6 months.',
        'IoT Core': '🏢 <strong>Smart factory:</strong> 10K sensors sending data every minute. Rules route to Lambda/Kinesis. Perfect for industrial IoT.',
        'Greengrass': '🏢 <strong>Autonomous vehicles:</strong> Process camera data locally with ML. Works offline. Sync to cloud when connected.',
        'Lambda@Edge': '🏢 <strong>Global SaaS:</strong> Customize content by region at edge. A/B testing. Auth checks. 50ms latency worldwide.',
        'CloudFront Functions': '🏢 <strong>CDN optimization:</strong> Rewrite URLs, add security headers, normalize cache keys. 100M requests = $10/month.',
        'Cost Explorer': '🏢 <strong>Cost optimization:</strong> Identify $5K/month in unused resources. Forecast next quarter spending. Save 30% annually.',
        'Organizations': '🏢 <strong>Enterprise:</strong> Manage 100 AWS accounts. Consolidated billing saves 15%. SCPs enforce security policies.',
        'Service Catalog': '🏢 <strong>Enterprise IT:</strong> 500 developers self-provision from 50 approved products. Governance enforced. Reduce IT tickets by 80%.'
    };
    return examples[serviceName] || 'Real-world usage varies by application requirements and scale.';
}

function getWhenToChoose(serviceName) {
    const guidance = {
        'Lambda': 'Choose Lambda when traffic is variable/unpredictable, you want zero infrastructure management, tasks complete in <15 min, or you\'re building serverless.',
        'EC2': 'Choose EC2 when you need 24/7 uptime, require specific OS/software, need GPU for ML, or want full infrastructure control.',
        'ECS': 'Choose ECS when you have containerized apps, need microservices orchestration, want easier scaling than raw EC2, or already use Docker.',
        'Fargate': 'Choose Fargate when you want containers without managing servers, have batch/scheduled workloads, or need simpler scaling than ECS on EC2.',
        'Elastic Beanstalk': 'Choose Beanstalk when you want quick deployment, need PaaS experience, want auto-scaling without complexity, or are new to AWS.',
        'RDS': 'Choose RDS when you need ACID transactions, complex SQL queries, relational data integrity, or migrating existing SQL databases.',
        'DynamoDB': 'Choose DynamoDB when you need massive scale, single-digit ms latency, serverless database, or simple key-value access patterns.',
        'Aurora': 'Choose Aurora when you need high-performance MySQL/PostgreSQL, global database, or 5x better performance than standard RDS.',
        'ElastiCache': 'Choose ElastiCache when you need sub-ms latency, want to reduce database load, need session storage, or building real-time apps.',
        'DocumentDB': 'Choose DocumentDB when migrating from MongoDB, need managed document database, or working with JSON-heavy applications.',
        'S3': 'Choose S3 when you need unlimited object storage, static file hosting, data lakes, backups, or serving media files.',
        'EBS': 'Choose EBS when you need block storage for EC2, running databases on EC2, or require low-latency persistent storage.',
        'EFS': 'Choose EFS when you need shared file system across multiple EC2 instances, NFS compatibility, or concurrent file access.',
        'Glacier': 'Choose Glacier when archiving data for long-term (years), compliance requirements, or rarely accessed data where retrieval time is acceptable.',
        'API Gateway': 'Choose API Gateway when building serverless APIs, need built-in throttling/caching/auth, or have low-medium traffic (<1M requests/day).',
        'ALB': 'Choose ALB when you have high traffic (>1M requests/day), need advanced routing, running EC2/ECS workloads, or want cost-effective load balancing.',
        'CloudFront': 'Choose CloudFront when you need global content delivery, want to reduce latency worldwide, serving static/dynamic content, or need DDoS protection.',
        'SQS': 'Choose SQS when decoupling microservices, need reliable message queuing, handling async tasks, or buffering between components.',
        'SNS': 'Choose SNS when you need pub/sub messaging, fan-out to multiple subscribers, mobile push notifications, or real-time alerts.',
        'EventBridge': 'Choose EventBridge when building event-driven architectures, integrating SaaS apps, need complex event routing, or scheduled events.',
        'Kinesis': 'Choose Kinesis when processing real-time streaming data, need ordered records, building real-time analytics, or handling IoT data.',
        'IAM': 'Choose IAM when managing AWS access control, need fine-grained permissions, implementing least privilege, or managing service roles.',
        'Cognito': 'Choose Cognito when you need user authentication for mobile/web apps, want social login, need user directories, or building B2C apps.',
        'Secrets Manager': 'Choose Secrets Manager when you need automatic secret rotation, managing database credentials, compliance requirements, or centralized secret management.',
        'WAF': 'Choose WAF when protecting web apps from attacks, need DDoS protection, blocking malicious traffic, or compliance requirements (PCI-DSS).',
        'VPC': 'Choose VPC when you need network isolation, security boundaries, hybrid cloud connectivity, or multi-tier application architecture.',
        'Route 53': 'Choose Route 53 when managing DNS, need health checks and failover, traffic routing policies, or global load balancing.',
        'Direct Connect': 'Choose Direct Connect when you need consistent network performance, transferring large data volumes, hybrid cloud, or compliance requires private connection.',
        'Athena': 'Choose Athena when querying S3 data ad-hoc, need serverless analytics, analyzing logs, or building data lakes without infrastructure.',
        'Redshift': 'Choose Redshift when you need data warehousing, complex BI queries, petabyte-scale analytics, or migrating from traditional data warehouses.',
        'EMR': 'Choose EMR when processing big data with Hadoop/Spark, need flexible frameworks, batch processing, or machine learning on large datasets.',
        'Glue': 'Choose Glue when you need serverless ETL, data cataloging, schema discovery, or preparing data for analytics without managing infrastructure.',
        'SageMaker': 'Choose SageMaker when training custom ML models, need complete ML platform, deploying models at scale, or building MLOps pipelines.',
        'Rekognition': 'Choose Rekognition when you need image/video analysis, face detection, content moderation, or object recognition without training models.',
        'Comprehend': 'Choose Comprehend when analyzing text sentiment, extracting entities, language detection, or NLP without training custom models.',
        'Bedrock': 'Choose Bedrock when building generative AI apps, need foundation models, creating chatbots, or content generation without training models.',
        'CloudWatch': 'Choose CloudWatch when monitoring AWS resources, need centralized logging, setting up alarms, or building operational dashboards.',
        'X-Ray': 'Choose X-Ray when debugging distributed applications, need distributed tracing, analyzing microservices performance, or finding bottlenecks.',
        'CloudTrail': 'Choose CloudTrail when you need audit logging, compliance requirements, security analysis, or tracking all API calls for governance.',
        'Config': 'Choose Config when tracking resource configurations, compliance monitoring, change management, or automated remediation of violations.',
        'EKS': 'Choose EKS when you need standard Kubernetes, have K8s expertise, want multi-cloud portability, or running complex microservices at scale.',
        'App Runner': 'Choose App Runner when you want simplest container deployment, deploying from source code, need auto-scaling, or building web apps/APIs.',
        'Neptune': 'Choose Neptune when you need graph database, analyzing relationships, building recommendation engines, or fraud detection with connected data.',
        'FSx': 'Choose FSx when you need Windows file shares, HPC workloads, high-performance file system, or Lustre for ML/media processing.',
        'AppSync': 'Choose AppSync when you need GraphQL API, real-time subscriptions, offline sync, or building mobile/web apps with live data.',
        'Step Functions': 'Choose Step Functions when you need workflow orchestration, coordinating multiple services, error handling/retries, or complex business logic.',
        'CodePipeline': 'Choose CodePipeline when you need AWS-native CI/CD, automated deployments, integrating with CodeBuild/CodeDeploy, or simple pipeline setup.',
        'CodeBuild': 'Choose CodeBuild when you need managed build service, Docker image builds, no build server management, or AWS-integrated CI/CD.',
        'CodeDeploy': 'Choose CodeDeploy when you need automated deployments, blue/green strategy, rolling updates, or zero-downtime deployments on AWS.',
        'ECR': 'Choose ECR when you need Docker registry on AWS, using ECS/EKS, want image scanning, or building CI/CD pipelines with containers.',
        'Global Accelerator': 'Choose Global Accelerator when you need global performance, static IPs, automatic failover, or building gaming/IoT applications.',
        'Transit Gateway': 'Choose Transit Gateway when you have many VPCs, need centralized routing, building hub-and-spoke, or complex network architecture.',
        'EventBridge Scheduler': 'Choose EventBridge Scheduler when you need scheduled tasks, replacing cron jobs, time-based automation, or flexible scheduling patterns.',
        'AppFlow': 'Choose AppFlow when you need SaaS integration, no-code data transfer, Salesforce/Slack sync, or simple ETL workflows.',
        'MemoryDB': 'Choose MemoryDB when you need Redis as primary database (not cache), require durability, need multi-AZ, or building real-time apps.',
        'Timestream': 'Choose Timestream when you have time-series data, IoT applications, DevOps metrics, or need time-based analytics.',
        'QLDB': 'Choose QLDB when you need immutable ledger, audit trails, regulatory compliance, or cryptographically verifiable history.',
        'Backup': 'Choose Backup when you need centralized backup management, compliance requirements, cross-service backups, or disaster recovery planning.',
        'Storage Gateway': 'Choose Storage Gateway when you need hybrid cloud storage, migrating on-prem to cloud, backup to S3, or gradual cloud migration.',
        'IoT Core': 'Choose IoT Core when you need IoT device connectivity, managing thousands of devices, telemetry collection, or building smart home/industrial IoT.',
        'Greengrass': 'Choose Greengrass when you need edge computing, local ML inference, offline IoT capability, or low-latency processing at edge.',
        'Lambda@Edge': 'Choose Lambda@Edge when you need edge computing, content customization, low latency globally, or CloudFront integration.',
        'CloudFront Functions': 'Choose CloudFront Functions when you need simple edge logic, URL rewrites, header manipulation, or very high scale at low cost.',
        'Cost Explorer': 'Choose Cost Explorer when you need cost analysis, budget tracking, spending forecasts, or identifying cost optimization opportunities.',
        'Organizations': 'Choose Organizations when you have multiple AWS accounts, need consolidated billing, enforcing policies, or enterprise governance.',
        'Service Catalog': 'Choose Service Catalog when you need self-service IT, approved products catalog, governance enforcement, or standardized deployments.'
    };
    return guidance[serviceName] || 'Consider your specific requirements, budget, and technical expertise when choosing.';
}

function generateRecommendation() {
    // Simple recommendation logic based on common scenarios
    let winner = null;
    let reason = '';

    if (selectedService1.name === 'Lambda' && selectedService2.name === 'EC2') {
        winner = 'Lambda';
        reason = 'Lambda is better for variable workloads with its pay-per-execution model and zero infrastructure management. Choose EC2 only if you need long-running processes or specific hardware control.';
    } else if (selectedService1.name === 'EC2' && selectedService2.name === 'Lambda') {
        winner = 'Lambda';
        reason = 'Lambda is better for variable workloads with its pay-per-execution model and zero infrastructure management. Choose EC2 only if you need long-running processes or specific hardware control.';
    } else if (selectedService1.name === 'DynamoDB' && selectedService2.name === 'RDS') {
        winner = 'DynamoDB';
        reason = 'DynamoDB excels at scale with automatic scaling and low latency. Choose RDS only if you need complex queries, transactions, or existing SQL applications.';
    } else if (selectedService1.name === 'RDS' && selectedService2.name === 'DynamoDB') {
        winner = 'DynamoDB';
        reason = 'DynamoDB excels at scale with automatic scaling and low latency. Choose RDS only if you need complex queries, transactions, or existing SQL applications.';
    } else if (selectedService1.name === 'S3' && (selectedService2.name === 'EBS' || selectedService2.name === 'EFS')) {
        winner = 'S3';
        reason = 'S3 offers the best cost and scalability for object storage. Choose EBS for block storage with EC2, or EFS for shared file systems.';
    } else if ((selectedService1.name === 'EBS' || selectedService1.name === 'EFS') && selectedService2.name === 'S3') {
        winner = 'S3';
        reason = 'S3 offers the best cost and scalability for object storage. Choose EBS for block storage with EC2, or EFS for shared file systems.';
    } else if (selectedService1.name === 'API Gateway' && selectedService2.name === 'ALB') {
        winner = 'API Gateway';
        reason = 'API Gateway is ideal for serverless architectures and low to medium traffic. Choose ALB for high-traffic applications with EC2/ECS.';
    } else if (selectedService1.name === 'ALB' && selectedService2.name === 'API Gateway') {
        winner = 'API Gateway';
        reason = 'API Gateway is ideal for serverless architectures and low to medium traffic. Choose ALB for high-traffic applications with EC2/ECS.';
    } else {
        // Default recommendation
        winner = selectedService1.name;
        reason = 'Both services have their strengths. Your choice depends on your specific requirements, budget, and architecture goals.';
    }

    const winnerService = winner === selectedService1.name ? selectedService1 : selectedService2;

    return `
        <div class="comparison-row">
            <div class="comparison-card" style="grid-column: 1 / -1; text-align: center;">
                <div class="metric-item">
                    <span class="metric-label">🏆 Recommendation</span>
                    <div style="margin: 1.5rem 0;">
                        <div class="winner-badge">
                            <span>${winnerService.icon}</span>
                            <span>${winner} is recommended for most use cases</span>
                        </div>
                    </div>
                    <p class="metric-value" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem;">
                        ${reason}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        compute: 'Compute',
        database: 'Database',
        storage: 'Storage',
        api: 'API & Load Balancing',
        messaging: 'Messaging & Events',
        security: 'Security & Identity',
        networking: 'Networking',
        analytics: 'Analytics & Big Data',
        ml: 'Machine Learning & AI',
        monitoring: 'Monitoring & Management',
        devops: 'DevOps & CI/CD',
        iot: 'IoT & Edge Computing',
        governance: 'Cost & Governance'
    };
    return names[category] || category;
}

function resetComparison() {
    selectedService1 = null;
    selectedService2 = null;
    selectedCategory1 = null;
    selectedCategory2 = null;
    
    category1Select.value = '';
    category2Select.value = '';
    
    serviceCards1.innerHTML = '<p class="placeholder-text">Select a category first</p>';
    serviceCards2.innerHTML = '<p class="placeholder-text">Select a category first</p>';
    
    resultsSection.style.display = 'none';
    
    updateCompareButton();
    
    selectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Console message
console.log('%c⚖️ InfraJudge Service Comparison', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cCompare AWS services side-by-side', 'font-size: 14px; color: #8b5cf6;');
