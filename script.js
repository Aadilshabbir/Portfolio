// Modern Portfolio JavaScript - 2025
document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  // Initialize AOS Animation Library
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });

  // Navbar Scroll Effect
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation Toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Close mobile nav when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        document.body.classList.remove('mobile-nav-active');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize Project Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          if (filterValue === '*') {
            item.style.display = 'block';
          } else {
            if (item.classList.contains(filterValue.substring(1))) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
  }

  // Form submission handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      let isValid = true;
      const formElements = contactForm.elements;
      
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== 'submit' && formElements[i].hasAttribute('required')) {
          if (!formElements[i].value.trim()) {
            isValid = false;
            formElements[i].classList.add('is-invalid');
          } else {
            formElements[i].classList.remove('is-invalid');
          }
        }
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        const formData = new FormData(contactForm);
        let formValues = {};
        
        formData.forEach((value, key) => {
          formValues[key] = value;
        });
        
        console.log('Form submitted with values:', formValues);
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you would create this element)
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Your message has been sent successfully!';
        
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }

  // Skill bars animation
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const skillBars = document.querySelectorAll('.skill-percentage');
    const options = {
      threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, options);
    
    skillObserver.observe(skillSection);
  }
  
  // Update active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', function() {
      let current = '';
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Handle modals
  const modalLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
  modalLinks.forEach(link => {
    link.addEventListener('click', function() {
      const targetModal = document.querySelector(this.getAttribute('data-bs-target'));
      if (targetModal) {
        const modal = new bootstrap.Modal(targetModal);
        modal.show();
      }
    });
  });
});
