// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    const expanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', expanded);
    
    // Change hamburger to X when open
    const svg = menuToggle.querySelector('svg');
    if (expanded) {
      svg.innerHTML = '<path d="M18 6L6 18M6 6l12 12"/>';
    } else {
      svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"/>';
    }
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const svg = menuToggle.querySelector('svg');
      svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"/>';
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const svg = menuToggle.querySelector('svg');
      svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"/>';
    }
  });
});

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // Show success message
  const button = event.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  
  button.textContent = 'Sending...';
  button.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    alert('Thanks for your interest! We will contact you within 24 hours.');
    event.target.reset();
    button.textContent = originalText;
    button.disabled = false;
  }, 1500);
}

// Add styles for select dropdown
const selectStyles = `
  select {
    width: 100%;
    padding: 16px 20px;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    background: #fff url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY0NzQ4YiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+') no-repeat right 20px center;
    background-size: 12px;
    font-size: 15px;
    color: #071129;
    font-family: inherit;
    appearance: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  
  select:focus {
    outline: none;
    border-color: var(--primary-right);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }
  
  select option {
    padding: 10px;
    color: #071129;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = selectStyles;
document.head.appendChild(styleSheet);
