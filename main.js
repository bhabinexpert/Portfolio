// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form handler (demo only)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! (Demo only, no backend)');
    contactForm.reset();
  });
}

// Section entrance animation using IntersectionObserver
const sections = document.querySelectorAll('.fullscreen-section');
const options = {
  threshold: 0.3
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-section');
      // Animate icon
      const icon = entry.target.querySelector('.section-icon i');
      if (icon) {
        icon.classList.add('icon-bounce');
        setTimeout(() => icon.classList.remove('icon-bounce'), 1200);
      }
    } else {
      entry.target.classList.remove('active-section');
    }
  });
}, options);
sections.forEach(section => {
  observer.observe(section);
});

// Icon bounce animation (CSS class)
// .icon-bounce { animation: bounce 1.2s; }
// @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }

// Image Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageUploadInput = document.getElementById('image-upload-input');
    const imageUrlInput = document.getElementById('image-url-input');
    const profileImage = document.getElementById('profile-image');

    // Handle file upload
    imageUploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle URL input
    imageUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const url = this.value.trim();
            if (url) {
                // Create a new image to test if the URL is valid
                const img = new Image();
                img.onload = function() {
                    profileImage.src = url;
                    imageUrlInput.value = '';
                };
                img.onerror = function() {
                    alert('Invalid image URL. Please try again.');
                };
                img.src = url;
            }
        }
    });
});

// Education Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

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

// Education form save handlers
function handleEduSave(formId, displayId) {
    const form = document.getElementById(formId);
    const display = document.getElementById(displayId);
    if (!form || !display) return;
    form.querySelector('[type="button"]').addEventListener('click', function() {
        const institution = form.querySelector('input[name$="institution"]').value;
        const year = form.querySelector('input[name$="year"]').value;
        const description = form.querySelector('textarea').value;
        if (institution && year && description) {
            display.innerHTML = `<h4>${institution}</h4><div class='year'>${year}</div><div class='description'>${description}</div>`;
            display.style.display = 'block';
            form.style.display = 'none';
        }
    });
}
handleEduSave('diploma-form', 'diploma-display');
handleEduSave('secondary-form', 'secondary-display'); 