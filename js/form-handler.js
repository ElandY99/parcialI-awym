/*
 CONTROLADOR DEL FORMULARIO Y ESTADOS DEL DOM
 Manejo de eventos submit, input/change, actualización dinámica del DOM,
 estados de la aplicación y renderizado del resumen de inscripción.
 */

import { validateAllFields, validateFullName, validateEmail, validateAge, validateModality, validateInterest, validateComments } from './form-validation.js';
import { saveInscription, getAvailableSlots, getTotalSlots } from './storage.js';

// Diccionario de nombres legibles para las opciones de áreas de interés.
const INTEREST_LABELS = {
    'programacion': 'Programación de Videojuegos (GDScript)',
    'diseno': 'Diseño de Niveles y Mecánicas',
    'arte': 'Arte y Animación Pixel Art 2D',
    'audio': 'Música y Efectos de Sonido Chiptune',
    'ia': 'Inteligencia Artificial para Juegos y Asistencia',
    'general': 'Interés General / Iniciación'
};

// Arrancar todos los eventos y comportamientos del formulario de inscripción.
export function initFormHandler() {
    const form = document.getElementById('inscription-form');
    const summaryContainer = document.getElementById('summary-container');
    const alertBox = document.getElementById('form-alert');
    const alertText = document.getElementById('form-alert-text');
    const commentsInput = document.getElementById('comments');
    const charCounter = document.getElementById('char-counter');
    const modalityInputs = document.querySelectorAll('input[name="modality"]');
    const modalityHint = document.getElementById('modality-hint');
    const slotsElement = document.getElementById('available-slots-count');

    if (!form) return;

    // Actualiza el contador inicial de cupos
    updateSlotsDisplay(slotsElement);

    // Eventos input y change
    // Contador dinámico de caracteres en el campo de comentarios (evento input)
    if (commentsInput && charCounter) {
        commentsInput.addEventListener('input', () => {
            const currentLength = commentsInput.value.length;
            charCounter.textContent = `${currentLength} / 500 caracteres`;
            if (currentLength > 450) {
                charCounter.style.color = 'var(--color-error)';
            } else {
                charCounter.style.color = 'var(--color-text-muted)';
            }
        });
    }

    // Información dinámica según modalidad seleccionada (evento change)
    modalityInputs.forEach((radio) => {
        radio.addEventListener('change', () => {
            if (!modalityHint) return;
            if (radio.value === 'presencial') {
                modalityHint.innerHTML = '📍 <strong>Sede Central UGD:</strong> Aula de Cómputos 3 (Posadas, Misiones). Requiere asistir con equipo propio o utilizar PC de la sala.';
                modalityHint.classList.add('is-visible');
            } else if (radio.value === 'virtual') {
                modalityHint.innerHTML = '🌐 <strong>Modalidad Virtual:</strong> Transmisión interactiva sincrónica vía Google Meet + Servidor de Discord para soporte en vivo.';
                modalityHint.classList.add('is-visible');
            }
            // Limpia error si existía
            clearFieldError('modality');
        });
    });

    // Limpieza y validación en tiempo real al tipear en campos (evento input)
    setupRealtimeValidation(form);

    // Control del envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Devolver valores del formulario
        const formData = {
            fullname: form.fullname ? form.fullname.value.trim() : '',
            email: form.email ? form.email.value.trim() : '',
            age: form.age ? form.age.value.trim() : '',
            modality: getSelectedRadioValue('modality'),
            interest: form.interest ? form.interest.value : '',
            comments: form.comments ? form.comments.value.trim() : ''
        };

        // Validación completa
        const validation = validateAllFields(formData);

        if (!validation.isValid) {
            // Estado con errores / Datos incompletos
            handleFormErrors(validation.errors, alertBox, alertText);
            return;
        }

        // Estado oquei
        // Oculta alertas de error previas si las hubiera
        if (alertBox) alertBox.classList.remove('is-visible');
        clearAllFieldErrors();

        // Guarda la inscripción en localStorage
        const saveSuccess = saveInscription(formData);
        if (!saveSuccess) {
            alert('Ocurrió un error al guardar tu inscripción. Por favor intenta nuevamente.');
            return;
        }

        // Actualiza el indicador visual de cupos disponibles
        updateSlotsDisplay(slotsElement);

        // Ocultar el formulario y mostrar la ficha de resumen generada por DOM
        form.style.display = 'none';
        renderInscriptionSummary(formData, summaryContainer, () => {
            // Al presionar "Registrar otra persona" retorno al Estado Inicial
            resetFormToInitialState(form, summaryContainer, alertBox, charCounter, modalityHint);
            updateSlotsDisplay(slotsElement);
        });

        // Desplazar la vista al mensaje de confirmación
        summaryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Devuelve el valor del radio button seleccionado dentro de un grupo
function getSelectedRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : '';
}

// Configura la validación en tiempo real en los campos individuales.
function setupRealtimeValidation(form) {
    // Nombre
    if (form.fullname) {
        form.fullname.addEventListener('input', () => {
            const error = validateFullName(form.fullname.value);
            if (!error) clearFieldError('fullname');
        });
    }

    // Email
    if (form.email) {
        form.email.addEventListener('input', () => {
            const error = validateEmail(form.email.value);
            if (!error) clearFieldError('email');
        });
    }

    // Edad
    if (form.age) {
        form.age.addEventListener('input', () => {
            const error = validateAge(form.age.value);
            if (!error) clearFieldError('age');
        });
    }

    // Área de Interés
    if (form.interest) {
        form.interest.addEventListener('change', () => {
            const error = validateInterest(form.interest.value);
            if (!error) clearFieldError('interest');
        });
    }
}

// Despliega los errores visuales en cada campo correspondiente y activa el banner general.
function handleFormErrors(errors, alertBox, alertText) {
    // Limpia errores previos
    clearAllFieldErrors();

    // Muestra errores específicos en cada campo
    for (const [fieldName, message] of Object.entries(errors)) {
        const group = document.getElementById(`group-${fieldName}`);
        const errorMsgEl = document.getElementById(`error-${fieldName}`);

        if (group) group.classList.add('has-error');
        if (errorMsgEl) errorMsgEl.textContent = message;
    }

    // Muestra el banner superior de alerta (Estado de datos incompletos / con errores)
    if (alertBox && alertText) {
        const errorCount = Object.keys(errors).length;
        alertText.textContent = `CHE! El formulario tiene ${errorCount} campo(s) que hay que rellenar bien. No es muy dificil...`;
        alertBox.classList.add('is-visible');
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Foco en el primer campo erróneo
    const firstErrorKey = Object.keys(errors)[0];
    const firstInput = document.getElementById(firstErrorKey);
    if (firstInput) {
        firstInput.focus();
    }
}

// Limpia el error de un campo individual.
function clearFieldError(fieldName) {
    const group = document.getElementById(`group-${fieldName}`);
    const errorMsgEl = document.getElementById(`error-${fieldName}`);
    if (group) group.classList.remove('has-error');
    if (errorMsgEl) errorMsgEl.textContent = '';
}

// Limpia los errores de todos los campos.
function clearAllFieldErrors() {
    const errorGroups = document.querySelectorAll('.form-group.has-error');
    errorGroups.forEach((group) => group.classList.remove('has-error'));

    const errorMsgs = document.querySelectorAll('.form-error-msg');
    errorMsgs.forEach((msg) => msg.textContent = '');
}

// Construye el resumen de inscripción en el DOM.
function renderInscriptionSummary(data, container, onResetCallback) {
    if (!container) return;

    // Limpia contenido previo
    container.innerHTML = '';

    // Creación de la estructura del resumen
    const summaryCard = document.createElement('div');
    summaryCard.className = 'panel panel--gold summary-wrapper';

    // Banner de confirmación
    const banner = document.createElement('div');
    banner.className = 'summary-banner';
    banner.innerHTML = `
        <h3 class="summary-banner__title">★ ¡INSCRIPCIÓN REGISTRADA CON ÉXITO! ★</h3>
        <p class="summary-banner__subtitle">Tu lugar en el taller se reservó correctamente, no faltes.</p>
    `;

    // Tarjeta con detalle de los datos ingresados
    const details = document.createElement('div');
    details.className = 'summary-card';

    const modalityText = data.modality === 'presencial' ? 'Presencial (Sede UGD)' : 'Virtual (Discord + Meet)';
    const interestText = INTEREST_LABELS[data.interest] || data.interest;
    const commentsText = data.comments ? data.comments : '<em>Sin comentarios adicionales</em>';
    const currentDate = new Date().toLocaleString('es-AR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    details.innerHTML = `
        <div class="summary-row">
            <span class="summary-row__label">Actividad:</span>
            <span class="summary-row__value">Taller Godot Engine + IA</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Nombre del Inscripto:</span>
            <span class="summary-row__value">${escapeHtml(data.fullname)}</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Correo Electrónico:</span>
            <span class="summary-row__value">${escapeHtml(data.email)}</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Edad:</span>
            <span class="summary-row__value">${escapeHtml(data.age)} años</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Modalidad:</span>
            <span class="summary-row__value">${modalityText}</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Área de Interés:</span>
            <span class="summary-row__value">${interestText}</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Comentarios:</span>
            <span class="summary-row__value">${commentsText}</span>
        </div>
        <div class="summary-row">
            <span class="summary-row__label">Fecha de Registro:</span>
            <span class="summary-row__value">${currentDate}</span>
        </div>
    `;

    // Botón para volver al formulario y registrar a otra persona
    const actions = document.createElement('div');
    actions.className = 'summary-actions';

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn--restart';
    resetBtn.innerHTML = '► Registrar a otra persona';
    resetBtn.addEventListener('click', onResetCallback);

    actions.appendChild(resetBtn);

    // Ensamblaje final dentro del contenedor
    summaryCard.appendChild(banner);
    summaryCard.appendChild(details);
    summaryCard.appendChild(actions);

    container.appendChild(summaryCard);
    container.classList.add('is-visible');
}

// Restablece el formulario a su Estado Inicial.
function resetFormToInitialState(form, summaryContainer, alertBox, charCounter, modalityHint) {
    // Resetea valores del formulario nativo
    form.reset();

    // Restablece visibilidad
    form.style.display = 'flex';
    if (summaryContainer) {
        summaryContainer.classList.remove('is-visible');
        summaryContainer.innerHTML = '';
    }

    // Oculta alertas y errores
    if (alertBox) alertBox.classList.remove('is-visible');
    clearAllFieldErrors();

    // Restablece contador de caracteres
    if (charCounter) {
        charCounter.textContent = '0 / 500 caracteres';
        charCounter.style.color = 'var(--color-text-muted)';
    }

    // Oculta indicación de modalidad
    if (modalityHint) {
        modalityHint.classList.remove('is-visible');
        modalityHint.innerHTML = '';
    }

    // Scroll de vuelta al inicio del formulario
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Actualiza el contador visual de cupos disponibles en el elemento del DOM.
function updateSlotsDisplay(element) {
    if (!element) return;
    const available = getAvailableSlots();
    const total = getTotalSlots();
    element.textContent = `${available} de ${total}`;

    // Cambia el color del badge si quedan pocos cupos
    if (available <= 5) {
        element.style.color = 'var(--color-error)';
    } else {
        element.style.color = 'var(--color-text-gold)';
    }
}

// Prevenir inyecciones HTML en el resumen dinámico.
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
