/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


/*========== sticky navbar ==========*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


/*========== remove menu icon navbar when click navbar link (scroll) ==========*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};


/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


/*========== scroll reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.video-wrapper, .video-description', { origin: 'bottom', delay: 300 });

// Contact form handling
const contactForm = document.querySelector('#contact-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.querySelector('.close-modal');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    // Add input validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Show success modal
                successModal.classList.add('show');
                contactForm.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            } else {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error:', error);
            showNotification('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error classes
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}'></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });
}

// Close modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// Scroll to top functionality
const scrollTopBtn = document.querySelector('.footer-iconTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top
scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Footer link smooth scrolling
const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*========== Read More functionality for services ==========*/
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceBox = this.closest('.services-box');
            const serviceDetails = serviceBox.querySelector('.service-details');
            const servicePreview = serviceBox.querySelector('.service-preview');
            
            if (serviceDetails.style.display === 'none' || serviceDetails.style.display === '') {
                // Show details
                serviceDetails.style.display = 'block';
                servicePreview.style.display = 'none';
                this.textContent = 'Read Less';
                this.classList.add('expanded');
                
                // Smooth scroll animation
                serviceDetails.style.opacity = '0';
                serviceDetails.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    serviceDetails.style.transition = 'all 0.3s ease';
                    serviceDetails.style.opacity = '1';
                    serviceDetails.style.transform = 'translateY(0)';
                }, 10);
                
            } else {
                // Hide details
                serviceDetails.style.transition = 'all 0.3s ease';
                serviceDetails.style.opacity = '0';
                serviceDetails.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    serviceDetails.style.display = 'none';
                    servicePreview.style.display = 'block';
                    this.textContent = 'Read More';
                    this.classList.remove('expanded');
                }, 300);
            }
        });
    });
});