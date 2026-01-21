// Architecture Generator - Frontend
console.log('🏗️ Architecture Generator Loaded');

const form = document.getElementById('architectureForm');
const formSection = document.getElementById('formSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');
const newArchitectureBtn = document.getElementById('newArchitectureBtn');

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Collect functional requirements
    const functionalChecked = Array.from(document.querySelectorAll('input[name="functional"]:checked'))
        .map(cb => cb.value);
    const functionalCustom = formData.get('functionalRequirementsCustom');
    const functionalRequirements = [
        ...functionalChecked,
        ...(functionalCustom ? [functionalCustom] : [])
    ].join(', ');
    
    // Collect non-functional requirements
    const nonFunctionalChecked = Array.from(document.querySelectorAll('input[name="nonFunctional"]:checked'))
        .map(cb => cb.value);
    const nonFunctionalCustom = formData.get('nonFunctionalRequirementsCustom');
    const nonFunctionalRequirements = [
        ...nonFunctionalChecked,
        ...(nonFunctionalCustom ? [nonFunctionalCustom] : [])
    ].join(', ');
    
    const data = {
        projectIdea: formData.get('projectIdea'),
        functionalRequirements: functionalRequirements,
        nonFunctionalRequirements: nonFunctionalRequirements,
        expectedUsers: formData.get('expectedUsers'),
        budget: formData.get('budget')
    };

    showLoading();
    
    console.log('Submitting architecture request:', data);
    
    try {
        // API endpoint for architecture generation
        const API_URL = 'https://9yas6oz7zh.execute-api.us-east-1.amazonaws.com/prod/generate-architecture';
        
        console.log('Calling API:', API_URL);
        console.log('Request data:', data);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Result received:', result);
        
        // Validate result has required fields
        if (!result.overview && !result.workflow && !result.services) {
            console.error('Invalid result structure:', result);
            throw new Error('Invalid response from API');
        }
        
        showResults(result);
    } catch (error) {
        console.error('Error:', error);
        console.error('Error details:', error.message, error.stack);
        showError(error.message || 'Failed to generate architecture. Please try again.');
    }
});

// New architecture button
newArchitectureBtn.addEventListener('click', () => {
    form.reset();
    formSection.style.display = 'block';
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showLoading() {
    formSection.style.display = 'none';
    loadingSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Animate loading steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        }, index * 2000);
    });
}

function showResults(data) {
    formSection.style.display = 'none';
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    resultsContent.innerHTML = renderResults(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showError(message) {
    formSection.style.display = 'none';
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    resultsContent.innerHTML = `
        <div class="result-card" style="border-color: var(--danger);">
            <h3 style="color: var(--danger);">❌ Error</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary); border: none; border-radius: 8px; color: white; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

function renderResults(data) {
    return `
        <div class="result-card">
            <h3>📋 Architecture Overview</h3>
            <div class="content">${formatContent(data.overview || 'Architecture overview will appear here')}</div>
        </div>
        
        <div class="result-card">
            <h3>🔄 Workflow Architecture Flow</h3>
            <div class="content">${formatContent(data.workflow || 'Workflow details will appear here')}</div>
        </div>
        
        <div class="result-card">
            <h3>☁️ AWS Services Used</h3>
            <div class="content">${formatContent(data.services || 'Service list will appear here')}</div>
        </div>
        
        <div class="result-card">
            <h3>💡 Detailed Service Justification</h3>
            <div class="content">${formatContent(data.justification || 'Service justifications will appear here')}</div>
        </div>
        
        <div class="result-card">
            <h3>⚖️ Comparison Table</h3>
            <div class="content">${formatContent(data.comparison || 'Service comparisons will appear here')}</div>
        </div>
        
        <div class="result-card">
            <h3>📊 Scalability, Security & Cost Notes</h3>
            <div class="content">${formatContent(data.notes || 'Additional notes will appear here')}</div>
        </div>
    `;
}

function formatContent(text) {
    if (!text) return '';
    
    // First, remove any standalone ## or ### that aren't part of headers
    text = text.replace(/^##\s*$/gm, '');
    text = text.replace(/^###\s*$/gm, '');
    text = text.replace(/^####\s*$/gm, '');
    
    // Convert markdown headers FIRST (before tables) - must be at start of line
    text = text.replace(/^####\s+(.+?)$/gm, '<h5>$1</h5>');
    text = text.replace(/^###\s+(.+?)$/gm, '<h4>$1</h4>');
    text = text.replace(/^##\s+(.+?)$/gm, '<h3>$1</h3>');
    text = text.replace(/^#\s+(.+?)$/gm, '<h2>$1</h2>');
    
    // Convert markdown tables to HTML
    text = convertMarkdownTables(text);
    
    // Convert bold text (**text**)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points - handle various formats
    text = text.replace(/^[\-\*►▸•]\s+(.+)$/gm, '<li>$1</li>');
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul tags
    text = text.replace(/(<li>.*?<\/li>\n?)+/gs, match => `<ul>${match}</ul>`);
    
    // Convert line breaks to paragraphs
    const lines = text.split('\n\n');
    text = lines.map(para => {
        const trimmed = para.trim();
        if (trimmed && !trimmed.includes('<table') && !trimmed.includes('<h') && !trimmed.includes('<ul>') && !trimmed.includes('<li>')) {
            return `<p>${trimmed}</p>`;
        }
        return trimmed;
    }).filter(p => p).join('\n');
    
    return text;
}

function convertMarkdownTables(text) {
    // Find all markdown tables
    const tableRegex = /\|(.+)\|[\r\n]+\|[-:\s|]+\|[\r\n]+((?:\|.+\|[\r\n]*)+)/g;
    
    return text.replace(tableRegex, (match, headerRow, bodyRows) => {
        // Parse header
        const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);
        
        // Parse body rows
        const rows = bodyRows.trim().split('\n').map(row => {
            return row.split('|').map(cell => cell.trim()).filter(cell => cell);
        });
        
        // Build HTML table
        let html = '<table class="comparison-table">';
        
        // Header
        html += '<thead><tr>';
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead>';
        
        // Body
        html += '<tbody>';
        rows.forEach(row => {
            html += '<tr>';
            row.forEach((cell, index) => {
                // Check if cell contains checkmark or X
                if (cell === '✓' || cell.toLowerCase() === 'yes') {
                    html += `<td class="selected">✓</td>`;
                } else if (cell === '✗' || cell.toLowerCase() === 'no') {
                    html += `<td class="not-selected">✗</td>`;
                } else {
                    html += `<td>${cell}</td>`;
                }
            });
            html += '</tr>';
        });
        html += '</tbody>';
        
        html += '</table>';
        return html;
    });
}


// AWS Services with Icons for Falling Ice Cubes
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

// Create falling ice cube
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initIceCubes();
    console.log('❄️ Falling AWS Service Ice Cubes Initialized!');
});
