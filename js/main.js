/**
 * BTH EDUCATION GROUP - LANGUAGE INSTITUTE
 * Main JavaScript File
 */

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Update ARIA attribute
      const isExpanded = mainNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || 
        (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just '#'
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mainNav = document.querySelector('.main-nav');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = new FormData(form);
      
      // Remove previous error messages
      form.querySelectorAll('.error-message').forEach(el => el.remove());
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      
      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
          isValid = false;
        }
      });
      
      // Validate email fields
      form.querySelectorAll('input[type="email"]').forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
          showFieldError(field, 'Please enter a valid email address');
          isValid = false;
        }
      });
      
      // Validate phone fields
      form.querySelectorAll('input[type="tel"]').forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
          showFieldError(field, 'Please enter a valid phone number');
          isValid = false;
        }
      });
      
      if (isValid) {
        // Show success message
        showFormSuccess(form);
        
        // In production, submit to backend
        // For now, just log the data
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Reset form after short delay
        setTimeout(() => {
          form.reset();
        }, 2000);
      }
    });
  });
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--color-error)';
  errorDiv.style.fontSize = 'var(--font-size-sm)';
  errorDiv.style.marginTop = 'var(--space-2)';
  
  field.parentElement.appendChild(errorDiv);
}

function showFormSuccess(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = 'Thank you! Your submission has been received.';
  successDiv.style.backgroundColor = 'var(--color-success)';
  successDiv.style.color = 'white';
  successDiv.style.padding = 'var(--space-4)';
  successDiv.style.borderRadius = 'var(--border-radius-md)';
  successDiv.style.marginTop = 'var(--space-4)';
  successDiv.style.textAlign = 'center';
  
  form.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// ANIMATION ON SCROLL
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .form-input.error,
  .form-textarea.error,
  .form-select.error {
    border-color: var(--color-error);
  }
`;
document.head.appendChild(animationStyles);

// ============================================
// DROPDOWN MENU FOR MOBILE
// ============================================
function initMobileDropdowns() {
  const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');
  
  dropdownToggles.forEach(toggle => {
    // Only apply on mobile
    if (window.innerWidth <= 768) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        const dropdown = parent.querySelector('.dropdown-menu');
        
        // Toggle dropdown
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    }
  });
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PROGRAM FINDER TOOL (Interactive Helper)
// ============================================
function initProgramFinder() {
  const finder = document.querySelector('#program-finder');
  if (!finder) return;
  
  const questions = finder.querySelectorAll('.finder-question');
  const result = finder.querySelector('#finder-result');
  
  finder.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
      // Simple logic to recommend programs based on selections
      const formData = new FormData(finder);
      const answers = Object.fromEntries(formData);
      
      let recommendation = '';
      
      if (answers.goal === 'literacy') {
        recommendation = 'English Language Literacy Programs';
      } else if (answers.goal === 'work' && answers.sector === 'trade') {
        recommendation = 'Vocational & Trade English';
      } else if (answers.goal === 'work' && answers.level === 'executive') {
        recommendation = 'Executive & CEO English Program';
      } else if (answers.goal === 'certification') {
        recommendation = 'Certification & International Career English';
      } else if (answers.goal === 'business') {
        recommendation = 'Corporate & Professional English';
      } else if (answers.language === 'german') {
        recommendation = 'German Language Program';
      }
      
      if (recommendation && result) {
        result.innerHTML = `
          <div class="recommendation">
            <h3>Recommended Program:</h3>
            <p><strong>${recommendation}</strong></p>
            <a href="/programs/" class="btn btn-primary">Learn More</a>
          </div>
        `;
        result.style.display = 'block';
      }
    }
  });
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveNav();
  initSmoothScroll();
  initFormValidation();
  initScrollToTop();
  initScrollAnimations();
  initMobileDropdowns();
  initLazyLoading();
  initProgramFinder();
  
  console.log('BTH Language Institute website initialized');
});

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize mobile-specific features
    initMobileDropdowns();
  }, 250);
});
