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
    navLinksContainer.style.top = '80px';
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
    if (pageYOffset >= (sectionTop - 150)) {
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
      delay = 1500; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  // Start typewriter effect after page load
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
  });
}
