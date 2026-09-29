import { initNavigation } from './navigation.js';
import { initFormHandler } from './form-handler.js';
import { initUiEffects } from './ui-effects.js';

// Espera a que el DOM esté cargado para inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa navegación, menú móvil y observador de secciones
    initNavigation();

    // Inicializa controlador del formulario, validaciones, eventos y localStorage
    initFormHandler();

    // Inicializa efectos visuales y microinteracciones
    initUiEffects();
});
