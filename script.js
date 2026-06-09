// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light-theme' : 'dark-theme');
document.body.className = savedTheme;
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
    updateThemeIcon('dark-theme');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
    updateThemeIcon('light-theme');
  }
});

function updateThemeIcon(theme) {
  if (theme === 'light-theme') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

// Mobile Menu Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active-mobile');
  const icon = mobileNavToggle.querySelector('i');
  if (navLinksContainer.classList.contains('active-mobile')) {
    icon.className = 'fa-solid fa-xmark';
    // Style nav links container on mobile
    navLinksContainer.style.display = 'flex';
    navLinksContainer.style.flexDirection = 'column';
    navLinksContainer.style.position = 'absolute';
    navLinksContainer.style.top = '85px';
    navLinksContainer.style.left = '0';
    navLinksContainer.style.width = '100%';
    navLinksContainer.style.background = 'var(--bg-color)';
    navLinksContainer.style.padding = '2rem';
    navLinksContainer.style.borderBottom = '1px solid var(--border-color)';
    navLinksContainer.style.zIndex = '99';
  } else {
    icon.className = 'fa-solid fa-bars';
    navLinksContainer.removeAttribute('style');
  }
});

// Close mobile menu on nav link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinksContainer.classList.contains('active-mobile')) {
      navLinksContainer.classList.remove('active-mobile');
      mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
      navLinksContainer.removeAttribute('style');
    }
  });
});

// Scrollspy logic (highlight nav links based on section in view)
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 160)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Typewriter Effect
const typewriterSpan = document.querySelector('.typewriter');
if (typewriterSpan) {
  const words = JSON.parse(typewriterSpan.getAttribute('data-words'));
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75;
    } else {
      typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      delay = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 600; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  // Start typewriter effect after page load
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
  });
}

// Global mouse tracker for particles and custom cursor
const mouse = {
  x: null,
  y: null,
  targetX: null,
  targetY: null,
  radius: 120
};

window.addEventListener('mousemove', (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
});

// Smooth cursor follow mechanism (Lerp)
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

function updateCursor() {
  if (mouse.targetX !== null && cursor && cursorDot) {
    // Lerp outer cursor
    cursorX += (mouse.targetX - cursorX) * 0.12;
    cursorY += (mouse.targetY - cursorY) * 0.12;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Lerp inner dot (slightly faster)
    dotX += (mouse.targetX - dotX) * 0.3;
    dotY += (mouse.targetY - dotY) * 0.3;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    // Assign mouse current coordinates to mouse object for particles
    mouse.x = dotX;
    mouse.y = dotY;
  }
  requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// Add custom hover events for cursor expanding
const interactiveElements = document.querySelectorAll('a, button, .social-icon, .filter-btn, .skill-item, .stat-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// 3D Card Tilt Effect
const tiltElements = document.querySelectorAll('.tilt-target');
tiltElements.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation degree (max 8 degrees)
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// Particle System with mouse repulsion physics
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 55;

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 1.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.6 + 0.15;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

    // Mouse repulsion logic
    if (mouse.x !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxForce = (mouse.radius - distance) / mouse.radius;
        let force = maxForce * 3.5; // repelling strength

        this.x -= forceDirectionX * force;
        this.y -= forceDirectionY * force;
      }
    }
  }
  draw() {
    const isDark = !document.body.classList.contains('light-theme');
    ctx.fillStyle = isDark ? `rgba(139, 92, 246, ${this.opacity})` : `rgba(59, 130, 246, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Project Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Scroll Reveal Effect using Intersection Observer
const revealElements = document.querySelectorAll('.scroll-reveal');
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));
