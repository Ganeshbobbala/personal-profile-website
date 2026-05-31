/* ==========================================================================
   Ganesh Bobbala - Personal Profile Website Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Dark Mode Toggler
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  };

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Toggle button event listener
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileItems = document.querySelectorAll('.mobile-item');

  const toggleMobileNav = () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    // Lock scroll when menu is active
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleMobileNav);

  mobileItems.forEach(item => {
    item.addEventListener('click', () => {
      // Close nav when item clicked
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close mobile nav when window is resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // 2. Active Section Navigation Link Spy (ScrollSpy)
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // 3. Scroll Reveal Animation (Intersection Observer)
  // Apply fade-in class to sections on load
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.classList.add('fade-in-up');
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Stop observing once animate is complete
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    if (section.id !== 'home') {
      revealObserver.observe(section);
    }
  });

  // 4. Contact Form Submission (AJAX Fetch API)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = submitBtn.querySelector('span');
  const spinner = submitBtn.querySelector('.spinner');
  const formAlert = document.getElementById('formAlert');

  const showAlert = (message, type) => {
    formAlert.textContent = message;
    formAlert.className = `alert-box ${type}`; // resets standard classes
    formAlert.classList.remove('hidden');
  };

  const hideAlert = () => {
    formAlert.classList.add('hidden');
    formAlert.textContent = '';
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    // Collect data
    const formData = {
      access_key: "f68f56d8-f04c-484b-b05b-098118c61c45", // Replace with your Web3Forms Access Key!
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Client-side validations
    if (!formData.name || !formData.email || !formData.message) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }

    // Set Loading State
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending Message...';
    spinner.classList.remove('hidden');

    try {
      // Connect to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        showAlert('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } else {
        showAlert(responseData.message || 'Something went wrong. Please check your inputs.', 'error');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      showAlert('Could not connect to the email service. Please try again.', 'error');
    } finally {
      // Reset Loading State
      submitBtn.disabled = false;
      submitBtnText.textContent = 'Send Message';
      spinner.classList.add('hidden');
    }
  });
});
