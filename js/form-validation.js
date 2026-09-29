/* MÓDULO DE VALIDACIONES
Funciones puras y reglas de validación para los campos del formulario. */

// Valida el nombre y apellido.
export function validateFullName(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) {
        return 'El nombre y apellido son obligatorios.';
    }
    if (trimmed.length < 3) {
        return 'El nombre debe contener al menos 3 caracteres.';
    }
    // Permite letras (con tildes, diéresis y ñ) y espacios
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!nameRegex.test(trimmed)) {
        return 'El nombre solo puede contener letras y espacios.';
    }
    return null;
}

// Valida el correo electrónico.
export function validateEmail(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) {
        return 'El correo electrónico es obligatorio.';
    }
    // Expresión regular estándar para formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) {
        return 'Por favor ingresá un formato de correo electrónico válido (ej: usuario@dominio.com).';
    }
    return null;
}

// Valida la edad.
export function validateAge(value) {
    const str = String(value || '').trim();
    if (!str) {
        return 'La edad es obligatoria.';
    }
    const ageNum = Number(str);
    if (!Number.isInteger(ageNum) || isNaN(ageNum)) {
        return 'La edad debe ser un número entero válido.';
    }
    if (ageNum < 14) {
        return 'Debes tener al menos 14 años para participar en el taller.';
    }
    if (ageNum > 99) {
        return 'Por favor ingresá una edad válida (menor a 100 años).';
    }
    return null;
}

// Valida la modalidad de participación.
export function validateModality(value) {
    if (!value || (value !== 'presencial' && value !== 'virtual')) {
        return 'Debes seleccionar una modalidad de participación (Presencial o Virtual).';
    }
    return null;
}

// Valida el área de interés.
export function validateInterest(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) {
        return 'Debes seleccionar un área de interés principal.';
    }
    return null;
}

// Valida los comentarios adicionales.
export function validateComments(value) {
    if (value && value.length > 500) {
        return 'Los comentarios no pueden superar los 500 caracteres.';
    }
    return null;
}

// Valida todos los campos del formulario en conjunto.
export function validateAllFields(data) {
    const errors = {};

    const nameError = validateFullName(data.fullname);
    if (nameError) errors.fullname = nameError;

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const ageError = validateAge(data.age);
    if (ageError) errors.age = ageError;

    const modalityError = validateModality(data.modality);
    if (modalityError) errors.modality = modalityError;

    const interestError = validateInterest(data.interest);
    if (interestError) errors.interest = interestError;

    const commentsError = validateComments(data.comments);
    if (commentsError) errors.comments = commentsError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
