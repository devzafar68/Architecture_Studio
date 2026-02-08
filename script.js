/**
 * ARCHILINE - Vanilla JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // Header Scroll Effect
  // ============================================
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ============================================
  // Smooth Scrolling for Navigation Links
  // ============================================
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Scroll Indicator
  // ============================================
  const scrollIndicator = document.getElementById('scrollIndicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ============================================
  // Scroll Animations (Intersection Observer)
  // ============================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '-100px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay if specified via style attribute
        const delay = entry.target.style.animationDelay || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        
        // Unobserve after animation (one-time animation)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ============================================
  // Service Card Line Drawing Animation
  // ============================================
  const serviceCards = document.querySelectorAll('.service-card');

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  serviceCards.forEach(card => serviceObserver.observe(card));

  // ============================================
  // Form Handling (Visual Only)
  // ============================================
  const heroForm = document.getElementById('heroForm');
  const ctaForm = document.getElementById('ctaForm');

  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Visual feedback
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      submitBtn.textContent = 'Thank You!';
      submitBtn.style.backgroundColor = '#4CAF50';
      
      // Reset form
      e.target.reset();
      
      // Reset button after delay
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
      }, 2000);
    }, 1000);
  }

  if (heroForm) {
    heroForm.addEventListener('submit', handleFormSubmit);
  }

  if (ctaForm) {
    ctaForm.addEventListener('submit', handleFormSubmit);
  }

  // ============================================
  // Image Lazy Loading (Native + Fallback)
  // ============================================
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for older browsers
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // Parallax Effect on Hero Image
  // ============================================
  const heroImage = document.querySelector('.hero-img');
  
  if (heroImage && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
    }, { passive: true });
  }

  // ============================================
  // Project Card Hover Effect Enhancement
  // ============================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
    });
  });

  // ============================================
  // Keyboard Navigation
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // ============================================
  // Reduced Motion Support
  // ============================================
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.animate-fade-up, .animate-slide-in, .animate-on-scroll').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ============================================
  // Console Welcome Message
  // ============================================
  console.log('%c ARCHILINE ', 'background: #2C2C2C; color: #C9B99A; font-size: 20px; font-weight: bold; padding: 10px 20px;');
  console.log('%c Modern Architecture for Contemporary Living ', 'color: #666; font-size: 12px;');
});
