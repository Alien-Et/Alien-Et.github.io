document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initScrollAnimations();
  initCounterAnimation();
  initParticles();
  initMobileMenu();
  initBackToTop();
  initNewsFilter();
  initSmoothScroll();
  initParallax();
  initTypingEffect();
  initTableOfContents();
  initLanguageSwitcher();
});

function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('.animate-on-scroll').forEach(element => {
    const delay = element.dataset.delay || 0;
    
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay / 1000,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      }
    );
  });
  
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      }
    );
  });
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: rgba(0, 102, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
}

function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });
  
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');
  
  if (!filterBtns.length || !newsCards.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      newsCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.backgroundPositionY = `${scrolled * speed}px`;
    });
  });
}

function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.disconnect();
      }
    });
    
    observer.observe(element);
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  document.body.appendChild(cursor);
  
  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    
    requestAnimationFrame(animateRing);
  }
  
  animateRing();
  
  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
}

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  const bar = progressBar.querySelector('.scroll-progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    bar.style.width = scrollPercent + '%';
  });
}

function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initRippleEffect();
  initLazyLoad();
});

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-cta .btn', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.floating-card', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.3');
}

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.remove(), 500);
  }
});

function initTableOfContents() {
  const tocWidget = document.querySelector('.toc-widget');
  const tocContent = document.querySelector('.toc-content');
  const articleContent = document.querySelector('.article-content');
  
  if (!tocWidget || !tocContent || !articleContent) return;
  
  const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const tocLinks = tocContent.querySelectorAll('a');
  
  if (!headings.length || !tocLinks.length) return;
  
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }
  });
  
  tocLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      const targetId = href.replace('#', '');
      const targetHeading = document.getElementById(targetId);
      
      if (targetHeading) {
        const headerOffset = 100;
        const elementPosition = targetHeading.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        tocLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
  };
  
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  headings.forEach(heading => {
    headingObserver.observe(heading);
  });
  
  let lastScrollTop = 0;
  const sidebar = tocWidget;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const articleRect = articleContent.getBoundingClientRect();
    const sidebarHeight = sidebar.offsetHeight;
    
    if (articleRect.top < 150 && articleRect.bottom > sidebarHeight + 200) {
      sidebar.style.position = 'sticky';
      sidebar.style.top = '100px';
    }
    
    lastScrollTop = scrollTop;
  });
}

function initLanguageSwitcher() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  
  if (!langBtn || !langDropdown) return;
  
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
    langBtn.classList.toggle('active');
  });
  
  document.addEventListener('click', function(e) {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.remove('show');
      langBtn.classList.remove('active');
    }
  });
  
  const langOptions = langDropdown.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      const lang = this.dataset.lang;
      localStorage.setItem('preferred-language', lang);
    });
  });
  
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang) {
    const currentPath = window.location.pathname;
    const currentLang = document.documentElement.lang || 'zh-CN';
    
    if (savedLang !== currentLang && !currentPath.startsWith('/' + savedLang)) {
      let targetPath;
      if (savedLang === 'zh-CN') {
        targetPath = currentPath.replace(/^\/(zh-TW|en|ja)/, '') || '/';
      } else {
        if (currentPath.startsWith('/zh-TW/') || currentPath.startsWith('/en/') || currentPath.startsWith('/ja/')) {
          targetPath = currentPath.replace(/^\/(zh-TW|en|ja)/, '/' + savedLang);
        } else {
          targetPath = '/' + savedLang + currentPath;
        }
      }
      
      if (targetPath !== currentPath) {
        window.location.href = targetPath;
      }
    }
  }
}
