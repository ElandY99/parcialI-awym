/* EFECTOS DE INTERFAZ Y MICROINTERACCIONES
Efecto máquina de escribir (typewriter), aparición progresiva de secciones
y atmósfera de videojuego clásico. */

// Inicializa efectos visuales y microinteracciones de la página.
export function initUiEffects() {
    initTypewriterEffect();
    initScrollReveal();
}

// Efecto de máquina de escribir
function initTypewriterEffect() {
    const typewriterElement = document.getElementById('hero-typewriter');
    if (!typewriterElement) return;

    const fullText = typewriterElement.getAttribute('data-text') || typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.visibility = 'visible';

    let charIndex = 0;
    const speed = 40; // milisegundos por letra

    function typeCharacter() {
        if (charIndex < fullText.length) {
            typewriterElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, speed);
        }
    }

    // Retardo inicial antes de empezar a escribir
    setTimeout(typeCharacter, 300);
}

// Aparición suave de paneles y tarjetas al desplazarse hacia ellos.
function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const revealItems = document.querySelectorAll('.panel, .info-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });
}
