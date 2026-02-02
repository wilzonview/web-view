// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const navLinkElements = navLinks.querySelectorAll('a');

const setNavTabState = (isOpen) => {
    navLinkElements.forEach(link => {
        link.tabIndex = isOpen ? 0 : -1;
    });
};

const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    navLinks.setAttribute('aria-hidden', !isOpen);
    setNavTabState(isOpen);

    if (isOpen && navLinkElements.length) {
        navLinkElements[0].focus();
    } else {
        menuToggle.focus();
    }
};

// Close menu on Escape
const closeMenu = () => {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    setNavTabState(false);
};

menuToggle.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Disable tabbing into nav links until menu is opened
setNavTabState(false);
navLinks.setAttribute('aria-hidden', 'true');

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const navLinksArray = document.querySelectorAll('.nav-link');
const sectionTargets = Array.from(navLinksArray)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

window.addEventListener('scroll', () => {
    let current = '';
    sectionTargets.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll animation observer
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formStatus = document.getElementById('formStatus');
    const submitButton = contactForm.querySelector('.submit-button');
    const formEndpoint = contactForm.getAttribute('action');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!formEndpoint) {
            return;
        }

        formStatus.textContent = 'Enviando mensaje...';
        formStatus.classList.remove('success', 'error');
        submitButton.disabled = true;

        try {
            const response = await fetch(formEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                formStatus.textContent = 'Mensaje enviado. Te contactaré en menos de 24 horas.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            formStatus.textContent = 'Ocurrió un problema al enviar el formulario. Inténtalo de nuevo o usa los datos de contacto.';
            formStatus.classList.add('error');
        } finally {
            submitButton.disabled = false;
        }
    });
}

// Smooth scroll for all anchor links
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
