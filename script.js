// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in-up class to elements
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .achievement-item, .contact-method'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

// Typing effect for hero title
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = this.txt;
        
        let typeSpeed = 200;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        new TypeWriter(mainTitle, ['ENGINEER', 'DEVELOPER', 'INNOVATOR'], 2000);
    }
});

// Tunnel scrolling effect with performance optimization
let ticking = false;

function updateTunnelEffect() {
    const scrolled = window.pageYOffset;
    const scrollPercent = scrolled / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Tunnel lines animation
    const tunnelLines = document.querySelector('.tunnel-lines');
    if (tunnelLines) {
        const rotationX = scrollPercent * 720; // Increased rotation for more dramatic effect
        const translateZ = scrolled * 0.8;
        tunnelLines.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) translateZ(${translateZ}px)`;
    }
    
    // Tunnel rings animation
    const tunnelRings = document.querySelectorAll('.tunnel-ring');
    tunnelRings.forEach((ring, index) => {
        const speed = (index + 1) * 0.15;
        const rotation = scrolled * speed;
        const scale = 1 + (scrollPercent * 0.8);
        const translateZ = -100 * (index + 1) + (scrolled * 0.3);
        ring.style.transform = `translateZ(${translateZ}px) rotate(${rotation}deg) scale(${scale})`;
    });
    
    // Tunnel glow animation
    const tunnelGlow = document.querySelector('.tunnel-glow');
    if (tunnelGlow) {
        const glowScale = 1 + (scrollPercent * 0.5);
        const glowRotation = scrolled * 0.1;
        tunnelGlow.style.transform = `translate(-50%, -50%) scale(${glowScale}) rotate(${glowRotation}deg)`;
    }
    
    // 3D sections movement
    const sections = document.querySelectorAll('.section-3d');
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const sectionProgress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);
        
        if (sectionProgress >= 0 && sectionProgress <= 1) {
            const translateZ = (sectionProgress - 0.5) * 300;
            const rotateY = (sectionProgress - 0.5) * 8;
            const scale = 0.9 + (sectionProgress * 0.2);
            section.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        }
    });
    
    // Original parallax effect for geometric lines
    const rate = scrolled * -0.5;
    const leftLines = document.querySelector('.line-group.left');
    const rightLines = document.querySelector('.line-group.right');
    
    if (leftLines && rightLines) {
        leftLines.style.transform = `translateY(${rate}px) rotate(-12deg)`;
        rightLines.style.transform = `translateY(${rate}px) rotate(12deg)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateTunnelEffect);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalHTML;
        submitButton.disabled = false;
    }, 1500);
});

// Resume download function
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/Shameer_Resume.pdf'; // Place your PDF in assets folder
    link.download = 'Shameer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Resume downloaded successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-primary)' : 
                    type === 'error' ? 'var(--accent-pink)' : 'var(--accent-secondary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add interactive effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Initialize particles effect (optional enhancement)
function createParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.appendChild(canvas);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(31, 111, 235, 0.1)';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize tunnel effect
function initTunnelEffect() {
    const tunnelContainer = document.querySelector('.tunnel-container');
    if (tunnelContainer) {
        // Initial call to set up the tunnel effect
        updateTunnelEffect();
        
        // Add mouse movement effect for extra interactivity
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            const tunnelLines = document.querySelector('.tunnel-lines');
            if (tunnelLines) {
                const currentTransform = tunnelLines.style.transform;
                tunnelLines.style.transform = currentTransform + ` rotateY(${mouseX * 2}deg) rotateX(${mouseY * 2}deg)`;
            }
        });
    }
}

// Initialize particles on load (optional)
// window.addEventListener('load', createParticles);

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initTunnelEffect();
});
