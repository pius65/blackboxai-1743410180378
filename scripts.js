// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Mobile menu toggle (included here in case header loads after DOMContentLoaded)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'mobile-menu-button') {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
        }
    });

    // Back to top button functionality
    window.addEventListener('scroll', function() {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        }
    });

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Contact form validation (duplicated here in case contact.html loads after DOMContentLoaded)
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validate name
            const name = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!name.value.trim()) {
                nameError.classList.remove('hidden');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
            }

            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.classList.remove('hidden');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
            }

            // Validate message
            const message = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (!message.value.trim()) {
                messageError.classList.remove('hidden');
                isValid = false;
            } else {
                messageError.classList.add('hidden');
            }

            if (isValid) {
                // Form submission logic would go here
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            }
        });
    }
}

// Run setupContactForm when DOM is loaded and also after dynamic content loads
document.addEventListener('DOMContentLoaded', setupContactForm);
document.addEventListener('load', setupContactForm);