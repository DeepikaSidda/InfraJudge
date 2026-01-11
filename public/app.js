// InfraJudge - Frontend Application
// Version: 2.0 - With Service Ratings Enhancement

console.log('🎯 InfraJudge v2.0 - Ratings Enhancement Loaded!');

const API_URL = 'https://6gbunv2rtg.execute-api.us-east-1.amazonaws.com/prod';

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

// DOM Elements
const form = document.getElementById('architectureForm');
const formContainer = document.getElementById('formContainer');
const loadingContainer = document.getElementById('loadingContainer');
const resultsContainer = document.getElementById('resultsContainer');
const resultsContent = document.getElementById('resultsContent');
const newRecommendationBtn = document.getElementById('newRecommendation');

// Initialize ice cubes on page load
document.addEventListener('DOMContentLoaded', () => {
    initIceCubes();
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        appType: formData.get('appType'),
        budget: formData.get('budget'),
        expectedUsers: formData.get('expectedUsers'),
        traffic: formData.get('traffic'),
        securityLevel: formData.get('securityLevel'),
        workloadType: formData.get('workloadType'),
        projectDescription: formData.get('projectDescription') || ''
    };

    // Show loading state
    showLoading();

    try {
        // Call API
        const response = await fetch(`${API_URL}/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Simulate minimum loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (result.error) {
            showError(result.message, result.details);
        } else {
            showResults(result);
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to connect to the server. Make sure the API is running on port 3000.', {
            error: error.message,
            hint: 'Run: ts-node server.ts'
        });
    }
});

// New recommendation button
newRecommendationBtn.addEventListener('click', () => {
    resetForm();
});

function showLoading() {
    formContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    loadingContainer.style.display = 'block';
}

function showResults(data) {
    loadingContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    // Build results HTML
    const html = `
        <!-- Context Summary -->
        <div class="result-card" style="animation-delay: 0.1s;">
            <h3>📋 Your Requirements</h3>
            <p>${data.userContextSummary}</p>
        </div>

        <!-- Final Architecture -->
        <div class="result-card" style="animation-delay: 0.2s;">
            <h3>🏗️ Recommended Architecture</h3>
            <div class="architecture-badge">
                ${data.finalArchitecture.split('\n')[0].replace('**', '').replace('**', '')}
            </div>
            
            <!-- Architecture Diagram -->
            <div style="margin: 2rem 0;">
                <h4 style="color: var(--secondary); margin-bottom: 1rem; font-size: 1.2rem;">📐 Architecture Diagram</h4>
                ${generateArchitectureDiagram(data)}
            </div>
            
            <p>${extractContent(data.finalArchitecture, 'Why This Combination?')}</p>
            <h4 style="color: var(--secondary); margin-top: 1.5rem; margin-bottom: 0.5rem;">How It Works Together</h4>
            <p>${extractContent(data.finalArchitecture, 'How It Works Together')}</p>
        </div>

        <!-- Cost Summary -->
        <div class="result-card" style="animation-delay: 0.3s;">
            <h3>💰 Cost & Trade-Offs</h3>
            <div style="margin-bottom: 1.5rem;">
                <span class="cost-badge cost-${data.costTradeoffSummary.estimatedCostLevel.toLowerCase()}">
                    ${data.costTradeoffSummary.estimatedCostLevel} Cost
                </span>
            </div>
            
            <h4 style="color: var(--success); margin-bottom: 0.75rem;">✓ What You Gain</h4>
            <ul class="gains-list">
                ${data.costTradeoffSummary.gains.map(gain => `<li>${gain}</li>`).join('')}
            </ul>

            <h4 style="color: var(--danger); margin-top: 1.5rem; margin-bottom: 0.75rem;">⚠ What You Sacrifice</h4>
            <ul class="sacrifices-list">
                ${data.costTradeoffSummary.sacrifices.map(sacrifice => `<li>${sacrifice}</li>`).join('')}
            </ul>
        </div>

        <!-- Decision Analysis with Ratings -->
        <div class="result-card" style="animation-delay: 0.4s;">
            <h3>🎯 Decision Analysis & Service Ratings</h3>
            ${formatDecisionAnalysisWithRatings(data.decisionAnalysis)}
        </div>

        <!-- ENHANCED: Detailed Service Comparisons with All Alternatives -->
        <div class="result-card" style="animation-delay: 0.5s;">
            <h3>📊 Detailed Service Comparisons</h3>
            <p style="color: var(--light); margin-bottom: 2rem;">Compare all AWS service options to understand why each was recommended or not selected.</p>
            
            ${formatEnhancedComparisonSection('Compute', data.comparisonTables.compute, data.decisionAnalysis)}
            ${formatEnhancedComparisonSection('Database', data.comparisonTables.database, data.decisionAnalysis)}
            ${formatEnhancedComparisonSection('Storage', data.comparisonTables.storage, data.decisionAnalysis)}
            ${formatEnhancedComparisonSection('API/Load Balancing', data.comparisonTables.apiLoadBalancing, data.decisionAnalysis)}
        </div>
    `;

    resultsContent.innerHTML = html;
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showError(message, details) {
    loadingContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    const html = `
        <div class="result-card" style="border-color: var(--danger);">
            <h3 style="color: var(--danger);">❌ Error</h3>
            <p style="color: var(--danger); font-weight: 600;">${message}</p>
            ${details ? `
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                    <pre style="color: var(--light); font-size: 0.9rem; overflow-x: auto;">${JSON.stringify(details, null, 2)}</pre>
                </div>
            ` : ''}
            <button onclick="resetForm()" style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: var(--primary); border: none; border-radius: 8px; color: white; cursor: pointer; font-weight: 600;">
                Try Again
            </button>
        </div>
    `;
    
    resultsContent.innerHTML = html;
}

function resetForm() {
    form.reset();
    formContainer.style.display = 'block';
    loadingContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    
    // Scroll to form
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function extractContent(text, section) {
    const lines = text.split('\n');
    let capturing = false;
    let content = [];
    
    for (const line of lines) {
        if (line.includes(section)) {
            capturing = true;
            continue;
        }
        if (capturing && line.trim() && !line.startsWith('#')) {
            content.push(line.trim());
        }
        if (capturing && line.startsWith('###') && !line.includes(section)) {
            break;
        }
    }
    
    return content.join(' ') || text;
}

function generateArchitectureDiagram(data) {
    // Extract service names from decision analysis
    const services = extractServicesFromDecisions(data.decisionAnalysis);
    
    // Get service icons
    const icons = {
        'Lambda': 'λ',
        'EC2': '🖥️',
        'ECS': '🐳',
        'DynamoDB': '⚡',
        'RDS': '🗄️',
        'S3': '🪣',
        'EBS': '💾',
        'EFS': '📁',
        'API Gateway': '🚪',
        'ALB': '⚖️'
    };
    
    // Get service colors
    const colors = {
        'Lambda': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'EC2': 'linear-gradient(135deg, #3b82f6, #2563eb)',
        'ECS': 'linear-gradient(135deg, #06b6d4, #0891b2)',
        'DynamoDB': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        'RDS': 'linear-gradient(135deg, #6366f1, #4f46e5)',
        'S3': 'linear-gradient(135deg, #10b981, #059669)',
        'EBS': 'linear-gradient(135deg, #ec4899, #db2777)',
        'EFS': 'linear-gradient(135deg, #f97316, #ea580c)',
        'API Gateway': 'linear-gradient(135deg, #14b8a6, #0d9488)',
        'ALB': 'linear-gradient(135deg, #a855f7, #9333ea)'
    };
    
    return `
        <div class="architecture-diagram-container" style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; padding: 2rem; border: 2px solid rgba(99, 102, 241, 0.2);">
            <!-- User/Client Layer -->
            <div class="diagram-layer" style="text-align: center; margin-bottom: 2rem;">
                <div class="diagram-node" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #64748b, #475569); border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">👤</div>
                    <div style="font-weight: 700; color: white;">User / Client</div>
                </div>
            </div>
            
            <!-- Arrow Down -->
            <div style="text-align: center; margin: 1rem 0;">
                <div style="font-size: 2rem; color: var(--primary); animation: bounce 2s ease-in-out infinite;">↓</div>
            </div>
            
            <!-- API/Load Balancing Layer -->
            <div class="diagram-layer" style="text-align: center; margin-bottom: 2rem;">
                <div class="diagram-node" style="display: inline-block; padding: 1.5rem 2.5rem; background: ${colors[services.apiLoadBalancing] || colors['API Gateway']}; border-radius: 12px; box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4); animation: pulse 3s ease-in-out infinite;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${icons[services.apiLoadBalancing] || '🚪'}</div>
                    <div style="font-weight: 700; color: white; font-size: 1.1rem;">${services.apiLoadBalancing || 'API Gateway'}</div>
                    <div style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8); margin-top: 0.25rem;">API Layer</div>
                </div>
            </div>
            
            <!-- Arrow Down -->
            <div style="text-align: center; margin: 1rem 0;">
                <div style="font-size: 2rem; color: var(--primary); animation: bounce 2s ease-in-out infinite; animation-delay: 0.3s;">↓</div>
            </div>
            
            <!-- Compute Layer -->
            <div class="diagram-layer" style="text-align: center; margin-bottom: 2rem;">
                <div class="diagram-node" style="display: inline-block; padding: 1.5rem 2.5rem; background: ${colors[services.compute] || colors['Lambda']}; border-radius: 12px; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4); animation: pulse 3s ease-in-out infinite; animation-delay: 0.5s;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${icons[services.compute] || 'λ'}</div>
                    <div style="font-weight: 700; color: white; font-size: 1.1rem;">${services.compute || 'Lambda'}</div>
                    <div style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8); margin-top: 0.25rem;">Compute Layer</div>
                </div>
            </div>
            
            <!-- Arrow Down (splits to Database and Storage) -->
            <div style="text-align: center; margin: 1rem 0;">
                <div style="display: flex; justify-content: center; align-items: center; gap: 2rem;">
                    <div style="font-size: 2rem; color: var(--primary); animation: bounce 2s ease-in-out infinite; animation-delay: 0.6s;">↙</div>
                    <div style="font-size: 2rem; color: var(--primary); animation: bounce 2s ease-in-out infinite; animation-delay: 0.9s;">↘</div>
                </div>
            </div>
            
            <!-- Database and Storage Layer -->
            <div class="diagram-layer" style="display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; margin-bottom: 1rem;">
                <!-- Database -->
                <div class="diagram-node" style="padding: 1.5rem 2rem; background: ${colors[services.database] || colors['DynamoDB']}; border-radius: 12px; box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4); animation: pulse 3s ease-in-out infinite; animation-delay: 1s; min-width: 200px; text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${icons[services.database] || '⚡'}</div>
                    <div style="font-weight: 700; color: white; font-size: 1.1rem;">${services.database || 'DynamoDB'}</div>
                    <div style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8); margin-top: 0.25rem;">Database Layer</div>
                </div>
                
                <!-- Storage -->
                <div class="diagram-node" style="padding: 1.5rem 2rem; background: ${colors[services.storage] || colors['S3']}; border-radius: 12px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4); animation: pulse 3s ease-in-out infinite; animation-delay: 1.3s; min-width: 200px; text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${icons[services.storage] || '🪣'}</div>
                    <div style="font-weight: 700; color: white; font-size: 1.1rem;">${services.storage || 'S3'}</div>
                    <div style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8); margin-top: 0.25rem;">Storage Layer</div>
                </div>
            </div>
            
            <!-- Legend -->
            <div style="margin-top: 2rem; padding: 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--primary);">
                <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.5rem;">📊 Data Flow</div>
                <div style="font-size: 0.9rem; color: var(--light); line-height: 1.6;">
                    User requests flow through <strong style="color: white;">${services.apiLoadBalancing}</strong> → 
                    Processed by <strong style="color: white;">${services.compute}</strong> → 
                    Data stored in <strong style="color: white;">${services.database}</strong> → 
                    Files stored in <strong style="color: white;">${services.storage}</strong>
                </div>
            </div>
        </div>
    `;
}

function extractServicesFromDecisions(decisionAnalysis) {
    const services = {
        compute: '',
        database: '',
        storage: '',
        apiLoadBalancing: ''
    };
    
    // Parse the decision analysis to extract service names
    const sections = decisionAnalysis.split('###').filter(s => s.trim());
    
    sections.forEach(section => {
        const title = section.trim().split('\n')[0];
        if (title.includes('Compute:')) {
            services.compute = title.split(':')[1].trim();
        } else if (title.includes('Database:')) {
            services.database = title.split(':')[1].trim();
        } else if (title.includes('Storage:')) {
            services.storage = title.split(':')[1].trim();
        } else if (title.includes('API/Load Balancing:')) {
            services.apiLoadBalancing = title.split(':')[1].trim();
        }
    });
    
    return services;
}

function extractContent(text, section) {
    const lines = text.split('\n');
    let capturing = false;
    let content = [];
    
    for (const line of lines) {
        if (line.includes(section)) {
            capturing = true;
            continue;
        }
        if (capturing && line.trim() && !line.startsWith('#')) {
            content.push(line.trim());
        }
        if (capturing && line.startsWith('###') && !line.includes(section)) {
            break;
        }
    }
    
    return content.join(' ') || text;
}

function formatDecisionAnalysisWithRatings(analysis) {
    const sections = analysis.split('###').filter(s => s.trim());
    
    return sections.map((section, index) => {
        const lines = section.trim().split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n');
        
        // Extract service name from title (e.g., "Compute: Lambda" -> "Lambda")
        const serviceName = title.includes(':') ? title.split(':')[1].trim() : '';
        
        // Get ratings for this service
        const ratings = getServiceRatings(serviceName, title);
        
        return `
            <div style="margin-bottom: 2.5rem; padding: 2rem; background: rgba(99, 102, 241, 0.05); border-radius: 16px; border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <h4 style="color: var(--primary); font-size: 1.3rem; margin: 0;">${title}</h4>
                    <div class="winner-badge" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, var(--success), #059669); border-radius: 8px; font-size: 0.9rem;">
                        <span>🏆</span>
                        <span>Recommended</span>
                    </div>
                </div>
                
                <!-- Service Ratings -->
                <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border-radius: 12px;">
                    <h5 style="color: var(--secondary); margin-bottom: 1rem; font-size: 1.1rem;">⭐ Service Ratings</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${ratings.map(rating => `
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: var(--light); font-size: 0.9rem;">${rating.label}</span>
                                    <span style="color: var(--white); font-weight: 700;">${rating.score}/5</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                                    <div style="width: ${rating.score * 20}%; height: 100%; background: linear-gradient(90deg, ${rating.color}, ${rating.colorEnd}); border-radius: 4px; transition: width 0.5s ease;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid var(--primary);">
                        <strong style="color: var(--white);">Overall Score: ${calculateOverallScore(ratings)}/5</strong>
                        <span style="color: var(--light); margin-left: 1rem;">${getScoreLabel(calculateOverallScore(ratings))}</span>
                    </div>
                </div>
                
                <!-- Why This Service -->
                <div style="color: var(--light); line-height: 1.8; margin-bottom: 1.5rem;">
                    ${content.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--white);">$1</strong>')
                             .replace(/- /g, '<br>• ')
                             .replace(/\n/g, '<br>')}
                </div>
                
                <!-- Alternative Services Comparison -->
                ${formatAlternativesComparison(title, serviceName)}
            </div>
        `;
    }).join('');
}

function getServiceRatings(serviceName, layerTitle) {
    // Define ratings for each service based on common criteria
    const ratings = {
        'Lambda': [
            { label: '💰 Cost Efficiency', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 5, color: '#8b5cf6', colorEnd: '#7c3aed' },
            { label: '⚡ Performance', score: 4, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '🛠️ Flexibility', score: 3, color: '#ef4444', colorEnd: '#dc2626' }
        ],
        'EC2': [
            { label: '💰 Cost Efficiency', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '📈 Scalability', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 2, color: '#ef4444', colorEnd: '#dc2626' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 5, color: '#10b981', colorEnd: '#059669' }
        ],
        'ECS': [
            { label: '💰 Cost Efficiency', score: 4, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
        ],
        'DynamoDB': [
            { label: '💰 Cost Efficiency', score: 4, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 5, color: '#8b5cf6', colorEnd: '#7c3aed' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 3, color: '#f59e0b', colorEnd: '#d97706' }
        ],
        'RDS': [
            { label: '💰 Cost Efficiency', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '📈 Scalability', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '🔧 Ease of Use', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 5, color: '#10b981', colorEnd: '#059669' }
        ],
        'S3': [
            { label: '💰 Cost Efficiency', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 5, color: '#8b5cf6', colorEnd: '#7c3aed' },
            { label: '⚡ Performance', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
        ],
        'EBS': [
            { label: '💰 Cost Efficiency', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '📈 Scalability', score: 2, color: '#ef4444', colorEnd: '#dc2626' },
            { label: '🔧 Ease of Use', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 3, color: '#f59e0b', colorEnd: '#d97706' }
        ],
        'EFS': [
            { label: '💰 Cost Efficiency', score: 3, color: '#f59e0b', colorEnd: '#d97706' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 5, color: '#8b5cf6', colorEnd: '#7c3aed' },
            { label: '⚡ Performance', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
        ],
        'API Gateway': [
            { label: '💰 Cost Efficiency', score: 4, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 5, color: '#8b5cf6', colorEnd: '#7c3aed' },
            { label: '⚡ Performance', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
        ],
        'ALB': [
            { label: '💰 Cost Efficiency', score: 4, color: '#10b981', colorEnd: '#059669' },
            { label: '📈 Scalability', score: 5, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '🔧 Ease of Use', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
            { label: '⚡ Performance', score: 5, color: '#10b981', colorEnd: '#059669' },
            { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
        ]
    };
    
    return ratings[serviceName] || [
        { label: '💰 Cost Efficiency', score: 4, color: '#10b981', colorEnd: '#059669' },
        { label: '📈 Scalability', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
        { label: '🔧 Ease of Use', score: 4, color: '#8b5cf6', colorEnd: '#7c3aed' },
        { label: '⚡ Performance', score: 4, color: '#6366f1', colorEnd: '#4f46e5' },
        { label: '🛠️ Flexibility', score: 4, color: '#6366f1', colorEnd: '#4f46e5' }
    ];
}

function calculateOverallScore(ratings) {
    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    return (sum / ratings.length).toFixed(1);
}

function getScoreLabel(score) {
    if (score >= 4.5) return '🌟 Excellent Choice';
    if (score >= 4.0) return '✨ Great Option';
    if (score >= 3.5) return '👍 Good Fit';
    if (score >= 3.0) return '⚖️ Balanced Choice';
    return '🤔 Consider Alternatives';
}

function formatAlternativesComparison(layerTitle, recommendedService) {
    // Define alternatives for each layer
    const alternatives = {
        'Compute': {
            'Lambda': ['EC2', 'ECS'],
            'EC2': ['Lambda', 'ECS'],
            'ECS': ['Lambda', 'EC2']
        },
        'Database': {
            'DynamoDB': ['RDS'],
            'RDS': ['DynamoDB']
        },
        'Storage': {
            'S3': ['EBS', 'EFS'],
            'EBS': ['S3', 'EFS'],
            'EFS': ['S3', 'EBS']
        },
        'API/Load Balancing': {
            'API Gateway': ['ALB'],
            'ALB': ['API Gateway']
        }
    };
    
    // Get layer name from title
    const layerName = layerTitle.split(':')[0].trim();
    const alts = alternatives[layerName]?.[recommendedService] || [];
    
    if (alts.length === 0) return '';
    
    return `
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <h5 style="color: var(--secondary); margin-bottom: 1rem; font-size: 1.1rem;">📊 Comparison with Alternatives</h5>
            <div style="display: grid; gap: 1rem;">
                ${alts.map(alt => {
                    const altRatings = getServiceRatings(alt, layerTitle);
                    const recRatings = getServiceRatings(recommendedService, layerTitle);
                    return `
                        <div style="padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                <strong style="color: var(--white); font-size: 1rem;">${recommendedService} vs ${alt}</strong>
                                <span style="padding: 0.25rem 0.75rem; background: rgba(99, 102, 241, 0.2); border-radius: 6px; font-size: 0.85rem; color: var(--primary);">
                                    ${calculateOverallScore(recRatings)} vs ${calculateOverallScore(altRatings)}
                                </span>
                            </div>
                            <div style="font-size: 0.9rem; color: var(--light); line-height: 1.6;">
                                ${getComparisonReason(recommendedService, alt, layerName)}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function getComparisonReason(recommended, alternative, layer) {
    const reasons = {
        'Lambda-EC2': '✅ Lambda wins on cost efficiency (5/5 vs 3/5) and ease of use (5/5 vs 2/5). Choose EC2 only if you need long-running processes or specific hardware control.',
        'Lambda-ECS': '✅ Lambda is simpler with better cost efficiency for variable workloads. ECS is better for containerized microservices needing orchestration.',
        'EC2-Lambda': '✅ EC2 provides full control (5/5 flexibility) and consistent performance. Lambda is better for event-driven workloads with variable traffic.',
        'EC2-ECS': '✅ EC2 offers maximum control but requires more management. ECS provides better resource efficiency through containers.',
        'ECS-Lambda': '✅ ECS excels at container orchestration (5/5 scalability) and microservices. Lambda is simpler for serverless event-driven apps.',
        'ECS-EC2': '✅ ECS provides better resource utilization and faster deployments. EC2 offers more control but higher maintenance overhead.',
        'DynamoDB-RDS': '✅ DynamoDB dominates in scalability (5/5 vs 3/5) and ease of use (5/5 vs 4/5). RDS is better for complex queries and transactions.',
        'RDS-DynamoDB': '✅ RDS excels at complex queries and ACID transactions (5/5 flexibility). DynamoDB is better for simple access patterns at massive scale.',
        'S3-EBS': '✅ S3 wins on cost (5/5 vs 3/5) and scalability (5/5 vs 2/5). EBS is better for low-latency block storage with EC2.',
        'S3-EFS': '✅ S3 is more cost-effective and scalable. EFS is better when you need shared file system access across multiple instances.',
        'EBS-S3': '✅ EBS provides superior performance (5/5) for databases and block storage. S3 is better for object storage and backups.',
        'EBS-EFS': '✅ EBS offers better performance for single-instance workloads. EFS enables shared access across multiple instances.',
        'EFS-S3': '✅ EFS provides NFS file system interface for shared access. S3 is more cost-effective for object storage.',
        'EFS-EBS': '✅ EFS enables multi-instance shared access (5/5 scalability). EBS is faster but limited to single EC2 instance.',
        'API Gateway-ALB': '✅ API Gateway is better for serverless (5/5 ease of use) and low-medium traffic. ALB is more cost-effective at high scale.',
        'ALB-API Gateway': '✅ ALB provides better performance (5/5) and cost-effectiveness at high traffic volumes. API Gateway is better for serverless architectures.'
    };
    
    const key = `${recommended}-${alternative}`;
    return reasons[key] || `${recommended} is recommended based on your specific requirements and use case.`;
}

function formatDecisionAnalysis(analysis) {
    const sections = analysis.split('###').filter(s => s.trim());
    
    return sections.map(section => {
        const lines = section.trim().split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n');
        
        return `
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(99, 102, 241, 0.05); border-radius: 12px; border-left: 4px solid var(--primary);">
                <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.2rem;">${title}</h4>
                <div style="color: var(--light); line-height: 1.8;">
                    ${content.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--white);">$1</strong>')
                             .replace(/- /g, '<br>• ')
                             .replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }).join('');
}

function formatComparisonTable(title, tableMarkdown) {
    // Parse markdown table
    const lines = tableMarkdown.split('\n').filter(line => line.trim() && !line.includes('---'));
    
    if (lines.length < 2) return '';
    
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(1).map(line => 
        line.split('|').map(cell => cell.trim()).filter(cell => cell)
    );
    
    return `
        <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--secondary); margin-bottom: 1rem;">${title}</h4>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            ${headers.map(h => `<th style="padding: 0.75rem; text-align: left; background: rgba(99, 102, 241, 0.1); border-bottom: 2px solid var(--primary); color: var(--primary); font-weight: 600;">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                                ${row.map((cell, i) => `
                                    <td style="padding: 0.75rem; color: ${i === 0 ? 'var(--white)' : 'var(--light)'}; ${i === 0 ? 'font-weight: 600;' : ''}">
                                        ${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                                    </td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// NEW: Enhanced comparison section showing ALL services with detailed analysis
function formatEnhancedComparisonSection(layerName, tableMarkdown, decisionAnalysis) {
    // Parse the markdown table to extract all services
    const lines = tableMarkdown.split('\n').filter(line => line.trim() && !line.includes('---') && !line.includes('##'));
    
    if (lines.length < 2) return '';
    
    // Extract service data from table
    const services = lines.slice(1).map(line => {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length < 5) return null;
        
        return {
            name: cells[0].replace(/\*\*/g, ''),
            cost: cells[1],
            scalability: cells[2],
            maintenance: cells[3],
            bestFor: cells[4]
        };
    }).filter(s => s !== null);
    
    // Find recommended service from decision analysis
    const recommendedService = extractRecommendedService(layerName, decisionAnalysis);
    
    return `
        <div style="margin-bottom: 3rem; padding: 2rem; background: rgba(99, 102, 241, 0.03); border-radius: 16px; border: 2px solid rgba(99, 102, 241, 0.2);">
            <h4 style="color: var(--primary); font-size: 1.4rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                <span>${getLayerIcon(layerName)}</span>
                <span>${layerName} Services Comparison</span>
            </h4>
            
            <!-- Service Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${services.map(service => formatServiceCard(service, service.name === recommendedService, layerName)).join('')}
            </div>
            
            <!-- Detailed Comparison Table -->
            <div style="margin-top: 2rem;">
                <h5 style="color: var(--secondary); margin-bottom: 1rem; font-size: 1.1rem;">📋 Side-by-Side Comparison</h5>
                ${formatDetailedComparisonTable(services, recommendedService)}
            </div>
        </div>
    `;
}

function formatServiceCard(service, isRecommended, layerName) {
    const ratings = getServiceRatings(service.name, layerName);
    const overallScore = calculateOverallScore(ratings);
    
    return `
        <div style="
            background: ${isRecommended ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))' : 'rgba(30, 41, 59, 0.6)'};
            border: 2px solid ${isRecommended ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
            border-radius: 16px;
            padding: 1.5rem;
            position: relative;
            transition: all 0.3s ease;
            ${isRecommended ? 'box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);' : ''}
        " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 12px 40px rgba(99, 102, 241, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='${isRecommended ? '0 8px 32px rgba(99, 102, 241, 0.3)' : '0'}';">
            
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h5 style="color: var(--white); font-size: 1.3rem; margin: 0;">${service.name}</h5>
                ${isRecommended ? `
                    <span style="
                        background: linear-gradient(135deg, var(--success), #059669);
                        color: white;
                        padding: 0.35rem 0.75rem;
                        border-radius: 8px;
                        font-size: 0.75rem;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 0.35rem;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                    ">
                        <span>🏆</span>
                        <span>RECOMMENDED</span>
                    </span>
                ` : ''}
            </div>
            
            <!-- Overall Score -->
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--light); font-size: 0.9rem;">Overall Score</span>
                    <span style="color: var(--white); font-size: 1.5rem; font-weight: 700;">${overallScore}/5</span>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.85rem; color: ${getScoreColor(overallScore)};">
                    ${getScoreLabel(overallScore)}
                </div>
            </div>
            
            <!-- Ratings -->
            <div style="margin-bottom: 1.5rem;">
                <h6 style="color: var(--secondary); font-size: 0.9rem; margin-bottom: 0.75rem;">⭐ Ratings</h6>
                ${ratings.map(rating => `
                    <div style="margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span style="color: var(--light); font-size: 0.85rem;">${rating.label}</span>
                            <span style="color: var(--white); font-weight: 600; font-size: 0.85rem;">${rating.score}/5</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${rating.score * 20}%; height: 100%; background: linear-gradient(90deg, ${rating.color}, ${rating.colorEnd}); border-radius: 3px; transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Best For -->
            <div style="padding: 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--primary);">
                <div style="color: var(--primary); font-weight: 600; font-size: 0.85rem; margin-bottom: 0.5rem;">✓ Best For:</div>
                <div style="color: var(--light); font-size: 0.9rem; line-height: 1.6;">${service.bestFor}</div>
            </div>
        </div>
    `;
}

function formatDetailedComparisonTable(services, recommendedService) {
    return `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; background: rgba(15, 23, 42, 0.6); border-radius: 12px; overflow: hidden;">
                <thead>
                    <tr style="background: rgba(99, 102, 241, 0.15);">
                        <th style="padding: 1rem; text-align: left; color: var(--primary); font-weight: 700; border-bottom: 2px solid var(--primary);">Service</th>
                        <th style="padding: 1rem; text-align: left; color: var(--primary); font-weight: 700; border-bottom: 2px solid var(--primary);">Cost</th>
                        <th style="padding: 1rem; text-align: left; color: var(--primary); font-weight: 700; border-bottom: 2px solid var(--primary);">Scalability</th>
                        <th style="padding: 1rem; text-align: left; color: var(--primary); font-weight: 700; border-bottom: 2px solid var(--primary);">Maintenance</th>
                    </tr>
                </thead>
                <tbody>
                    ${services.map(service => `
                        <tr style="
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            ${service.name === recommendedService ? 'background: rgba(99, 102, 241, 0.1);' : ''}
                        ">
                            <td style="padding: 1rem; color: var(--white); font-weight: 600;">
                                ${service.name}
                                ${service.name === recommendedService ? '<span style="margin-left: 0.5rem; color: var(--success);">🏆</span>' : ''}
                            </td>
                            <td style="padding: 1rem; color: var(--light); font-size: 0.9rem;">${service.cost}</td>
                            <td style="padding: 1rem; color: var(--light); font-size: 0.9rem;">${service.scalability}</td>
                            <td style="padding: 1rem; color: var(--light); font-size: 0.9rem;">${service.maintenance}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function extractRecommendedService(layerName, decisionAnalysis) {
    const sections = decisionAnalysis.split('###').filter(s => s.trim());
    
    for (const section of sections) {
        const lines = section.trim().split('\n');
        const title = lines[0].trim();
        
        if (title.includes(layerName)) {
            const match = title.match(/:\s*(.+)$/);
            if (match) {
                return match[1].trim();
            }
        }
    }
    
    return '';
}

function getLayerIcon(layerName) {
    const icons = {
        'Compute': '⚡',
        'Database': '🗄️',
        'Storage': '💾',
        'API/Load Balancing': '🌐'
    };
    return icons[layerName] || '📦';
}

function getScoreColor(score) {
    const numScore = parseFloat(score);
    if (numScore >= 4.5) return 'var(--success)';
    if (numScore >= 4.0) return '#10b981';
    if (numScore >= 3.5) return '#f59e0b';
    if (numScore >= 3.0) return '#f59e0b';
    return '#ef4444';
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add input animations
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Console welcome message
console.log('%c🚀 InfraJudge', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cAI-Powered Architecture Recommendations', 'font-size: 14px; color: #8b5cf6;');
console.log('%cMake sure the API server is running: ts-node server.ts', 'font-size: 12px; color: #64748b;');
