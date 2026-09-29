/* MÓDULO DE NAVEGACIÓN Y MENÚ RETRO
Manejo de desplazamiento suave, menú hamburguesa móvil y resaltado
automático de sección activa según el scroll del usuario. */

// Inicializa la navegación, eventos de scroll y menú móvil.
export function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.header__nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Control del menú hamburguesa en celular
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Cierra el menú al hacer clic en un enlace de navegación
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.textContent = '☰';
                }
            });
        });

        // Cierra el menú si se hace clic fuera del encabezado
        document.addEventListener('click', (event) => {
            if (!event.target.closest('#header') && mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    }

    // Desplazamiento suave para todos los enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Resaltado de sección activa mediante Intersection Observer (esto está muy bueno y no lo conocía...)
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    updateActiveNavLink(navLinks, currentId);
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));
    }
}

// Actualiza la clase 'active' en el enlace de navegación correspondiente.
function updateActiveNavLink(navLinks, activeId) {
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
