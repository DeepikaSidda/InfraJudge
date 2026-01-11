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
    { name: 'VPC', iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Virtual-Private-Cloud.svg', color: '#8C4FFF' },
    { name: 'CloudWatch', iconUrl: 'https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg', color: '#FF4F8B' },
    { name: 'IAM', iconUrl: 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Identity-and-Access-Management.svg', color: '#DD344C' },
    { name: 'Route 53', iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Route-53.svg', color: '#8C4FFF' },
    { name: 'ELB', iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Elastic-Load-Balancing.svg', color: '#8C4FFF' },
    { name: 'SNS', iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Notification-Service.svg', color: '#FF4F8B' },
    { name: 'SQS', iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Queue-Service.svg', color: '#FF4F8B' },
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

        <!-- Recommendation -->
        ${generateRecommendation()}
    `;

    comparisonGrid.innerHTML = html;
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
        api: 'API & Load Balancing'
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
