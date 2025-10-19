/**
 * Gaxa Tech Interactive Website
 * Main JavaScript File
 */

// ===================================
// Configuration & Constants
// ===================================
const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    COUNTER_DURATION: 2000,
    CAROUSEL_AUTO_PLAY: 5000,
    MAGNETIC_STRENGTH: 0.3,
    TILT_MAX: 15
};

// ===================================
// Utility Functions
// ===================================
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    // Map range
    mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// ===================================
// Custom Cursor
// ===================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        
        if (!this.cursor) return;
        
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        // Only show on desktop
        if (window.matchMedia('(hover: none)').matches) {
            this.cursor.style.display = 'none';
            return;
        }

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Magnetic elements
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });

        this.animate();
    }

    animate() {
        // Smooth cursor movement
        this.pos.x = utils.lerp(this.pos.x, this.mouse.x, 0.15);
        this.pos.y = utils.lerp(this.pos.y, this.mouse.y, 0.15);

        this.dot.style.left = `${this.pos.x}px`;
        this.dot.style.top = `${this.pos.y}px`;
        this.outline.style.left = `${this.mouse.x}px`;
        this.outline.style.top = `${this.mouse.y}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Loading Screen
// ===================================
class LoadingScreen {
    constructor() {
        this.loader = document.getElementById('loader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
    }
}

// ===================================
// Navigation
// ===================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', utils.throttle(() => {
            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 100));

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offset = 80;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// ===================================
// Hero Canvas Animation
// ===================================
class HeroCanvas {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', utils.debounce(() => this.resize(), 250));
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.min(Math.floor(this.canvas.width * this.canvas.height / 15000), 100);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw and update particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Magnetic Elements
// ===================================
class MagneticElements {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic');
        this.init();
    }

    init() {
        // Only on desktop
        if (window.matchMedia('(hover: none)').matches) return;

        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.handleMouseMove(e, el));
            el.addEventListener('mouseleave', () => this.handleMouseLeave(el));
        });
    }

    handleMouseMove(e, el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = CONFIG.MAGNETIC_STRENGTH;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }

    handleMouseLeave(el) {
        el.style.transform = 'translate(0, 0)';
    }
}

// ===================================
// 3D Tilt Effect
// ===================================
class TiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt]');
        this.init();
    }

    init() {
        // Only on desktop
        if (window.matchMedia('(hover: none)').matches) return;

        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.handleMouseMove(e, el));
            el.addEventListener('mouseleave', () => this.handleMouseLeave(el));
        });
    }

    handleMouseMove(e, el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * CONFIG.TILT_MAX;
        const rotateY = (centerX - x) / centerX * CONFIG.TILT_MAX;
        
        // Apply transform while preserving border-radius
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.borderRadius = '20px'; // Ensure border-radius is preserved
    }

    handleMouseLeave(el) {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        el.style.borderRadius = '20px'; // Ensure border-radius is preserved
    }
}

// ===================================
// Animated Counter
// ===================================
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = CONFIG.COUNTER_DURATION;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===================================
// Testimonials Carousel
// ===================================
class TestimonialsCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonialsCarousel');
        if (!this.carousel) return;
        
        this.track = this.carousel.querySelector('.testimonials-track');
        this.slides = Array.from(this.carousel.querySelectorAll('.testimonial-card'));
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) {
            console.warn('No testimonial slides found');
            return;
        }
        
        console.log(`Found ${this.slides.length} testimonial slides`);
        
        // Create dots
        this.createDots();
        
        // Show first slide
        this.showSlide(0);
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                this.prev();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                this.next();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Auto play
        this.startAutoPlay();
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    showSlide(index) {
        console.log(`Showing slide ${index}`);
        
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        console.log(`Moving from slide ${this.currentIndex} to slide ${nextIndex}`);
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        console.log(`Moving from slide ${this.currentIndex} to slide ${prevIndex}`);
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), CONFIG.CAROUSEL_AUTO_PLAY);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// ===================================
// FAQ Accordion
// ===================================
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggle(item));
        });
    }

    toggle(item) {
        const isActive = item.classList.contains('active');
        
        // Option 1: Close all others (accordion behavior)
        this.items.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    }
}

// ===================================
// Scroll to Top Button
// ===================================
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollTop');
        if (!this.button) return;
        
        this.progressCircle = this.button.querySelector('.progress-ring-circle');
        this.circumference = 2 * Math.PI * 28; // radius = 28
        
        this.init();
    }

    init() {
        // Set up progress circle
        if (this.progressCircle) {
            this.progressCircle.style.strokeDasharray = this.circumference;
            this.progressCircle.style.strokeDashoffset = this.circumference;
        }
        
        // Show/hide button on scroll
        window.addEventListener('scroll', utils.throttle(() => {
            this.updateButton();
        }, 100));
        
        // Click to scroll top
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    updateButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Show button after scrolling down
        if (scrollTop > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
        
        // Update progress circle
        if (this.progressCircle) {
            const offset = this.circumference - (scrollPercent * this.circumference);
            this.progressCircle.style.strokeDashoffset = offset;
        }
    }
}

// ===================================
// Scroll Animations (AOS Alternative)
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.elements.forEach(el => {
            // Add delay if specified
            const delay = el.getAttribute('data-aos-delay');
            if (delay) {
                el.style.transitionDelay = `${delay}ms`;
            }
            
            observer.observe(el);
        });
    }
}

// ===================================
// Parallax Effects
// ===================================
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', utils.throttle(() => {
            this.update();
        }, 16));
    }

    update() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled - el.offsetTop) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// ===================================
// Text Reveal Animation (GSAP)
// ===================================
class TextReveal {
    constructor() {
        this.elements = document.querySelectorAll('.text-reveal');
        this.init();
    }

    init() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded');
            return;
        }

        this.elements.forEach(el => {
            // Split text into characters
            const text = el.textContent;
            el.textContent = '';
            
            const chars = text.split('').map(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                el.appendChild(span);
                return span;
            });

            // Animate on scroll
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
}

// ===================================
// Floating Cards Animation
// ===================================
class FloatingCards {
    constructor() {
        this.cards = document.querySelectorAll('[data-float]');
        this.init();
    }

    init() {
        this.cards.forEach((card, index) => {
            const delay = card.getAttribute('data-float-delay') || 0;
            
            // Set animation delay
            card.style.animationDelay = `${delay}s`;
            
            // Random subtle movement on mouse move
            document.addEventListener('mousemove', utils.throttle((e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                
                card.style.transform = `translate(${x * (index + 1) * 0.1}px, ${y * (index + 1) * 0.1}px)`;
            }, 50));
        });
    }
}

// ===================================
// Theme Toggle
// ===================================
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle button icon
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                this.themeToggle.classList.add('dark-mode');
            } else {
                icon.className = 'fas fa-moon';
                this.themeToggle.classList.remove('dark-mode');
            }
        }
    }
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new LoadingScreen();
    new CustomCursor();
    new Navigation();
    new ThemeToggle();
    new HeroCanvas();
    new MagneticElements();
    new TiltEffect();
    new AnimatedCounter();
    new TestimonialsCarousel();
    new FAQAccordion();
    new ScrollToTop();
    new ScrollAnimations();
    new ParallaxEffects();
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        new TextReveal();
        
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }
    
    new FloatingCards();
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('%c🚀 Gaxa Tech Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
});

// ===================================
// Performance Monitoring (Optional)
// ===================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page Load Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}

