// AWS Cloud Referee - Landing Page JavaScript

// AWS Services with Official Icon URLs
// Using official AWS Architecture Icons
const awsServices = [
    { 
        name: 'Lambda', 
        iconUrl: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
        // Using placeholder - will be replaced with actual AWS icon URLs
        color: '#FF9900'
    },
    { 
        name: 'EC2', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Compute/EC2.svg',
        color: '#FF9900'
    },
    { 
        name: 'S3', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg',
        color: '#569A31'
    },
    { 
        name: 'DynamoDB', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg',
        color: '#4053D6'
    },
    { 
        name: 'RDS', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Database/RDS.svg',
        color: '#527FFF'
    },
    { 
        name: 'API Gateway', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg',
        color: '#FF4F8B'
    },
    { 
        name: 'CloudFront', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/CloudFront.svg',
        color: '#8C4FFF'
    },
    { 
        name: 'ECS', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Containers/Elastic-Container-Service.svg',
        color: '#FF9900'
    },
    { 
        name: 'VPC', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Virtual-Private-Cloud.svg',
        color: '#8C4FFF'
    },
    { 
        name: 'CloudWatch', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg',
        color: '#FF4F8B'
    },
    { 
        name: 'IAM', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Identity-and-Access-Management.svg',
        color: '#DD344C'
    },
    { 
        name: 'Route 53', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Route-53.svg',
        color: '#8C4FFF'
    },
    { 
        name: 'ELB', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Elastic-Load-Balancing.svg',
        color: '#8C4FFF'
    },
    { 
        name: 'SNS', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Notification-Service.svg',
        color: '#FF4F8B'
    },
    { 
        name: 'SQS', 
        iconUrl: 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Queue-Service.svg',
        color: '#FF4F8B'
    },
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

// Smooth scroll to architectures section
function scrollToArchitectures() {
    const section = document.getElementById('architectures');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    // Initialize falling ice cubes
    initIceCubes();
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add parallax effect to gradient orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.gradient-orb');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add hover effect to architecture cards
    const archCards = document.querySelectorAll('.architecture-card');
    archCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effect to service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateY(-8px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Console welcome message
    console.log('%c🚀 InfraJudge - Landing Page', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cWelcome to the AI-Powered Architecture Advisor!', 'font-size: 14px; color: #8b5cf6;');
    console.log('%c❄️ Falling Ice Cubes with AWS Services Active!', 'font-size: 12px; color: #10b981;');
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // You can use this to show a progress bar if you want
    // document.getElementById('progress-bar').style.width = scrollPercent + '%';
});
