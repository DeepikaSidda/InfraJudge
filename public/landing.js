// AWS Cloud Referee - Landing Page JavaScript

// AWS Services - Using text labels instead of external icons for faster loading
const awsServices = [
    { name: 'λ', fullName: 'Lambda', color: '#FF9900' },
    { name: 'EC2', fullName: 'EC2', color: '#FF9900' },
    { name: 'S3', fullName: 'S3', color: '#569A31' },
    { name: 'DDB', fullName: 'DynamoDB', color: '#4053D6' },
    { name: 'RDS', fullName: 'RDS', color: '#527FFF' },
    { name: 'API', fullName: 'API Gateway', color: '#FF4F8B' },
    { name: 'CF', fullName: 'CloudFront', color: '#8C4FFF' },
    { name: 'ECS', fullName: 'ECS', color: '#FF9900' },
];

// Create falling ice cubes with text labels (no external images)
function createIceCube() {
    const container = document.getElementById('iceCubesContainer');
    if (!container) return;

    const iceCube = document.createElement('div');
    iceCube.className = 'ice-cube';
    
    const service = awsServices[Math.floor(Math.random() * awsServices.length)];
    
    // Use text label instead of external image
    const label = document.createElement('div');
    label.className = 'ice-cube-label';
    label.textContent = service.name;
    label.style.color = service.color;
    label.title = service.fullName;
    
    iceCube.appendChild(label);
    
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

// Initialize ice cubes - reduced initial count for faster load
function initIceCubes() {
    // Create smaller initial batch of ice cubes
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createIceCube();
        }, i * 500);
    }
    
    // Continuously create new ice cubes
    setInterval(() => {
        createIceCube();
    }, 3000); // New ice cube every 3 seconds (reduced frequency)
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
