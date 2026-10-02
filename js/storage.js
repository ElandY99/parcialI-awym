/* MÓDULO DE ALMACENAMIENTO (localStorage)
Gestión de persistencia local para las inscripciones al taller. */

const STORAGE_KEY = 'inscripciones_godot_v1';
const TOTAL_SLOTS = 30;

// Obtiene todas las inscripciones almacenadas en localStorage.
export function getInscriptions() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return [];
    }
}

// Guarda una nueva inscripción en localStorage.
// Retorna true si se guardó correctamente, 'full' si no hay cupos, o false ante un error.
export function saveInscription(inscription) {
    try {
        const inscriptions = getInscriptions();

        // Validación: no permitir más de TOTAL_SLOTS (30) registros
        if (inscriptions.length >= TOTAL_SLOTS) {
            return 'full';
        }

        const newRecord = {
            id: 'INS-' + Date.now().toString(36).toUpperCase(),
            ...inscription,
            timestamp: new Date().toISOString()
        };
        inscriptions.push(newRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inscriptions));
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}

// Calcula los cupos disponibles en base al total y las inscripciones actuales.
export function getAvailableSlots() {
    const inscriptions = getInscriptions();
    const remaining = TOTAL_SLOTS - inscriptions.length;
    return remaining > 0 ? remaining : 0;
}

// Retorna el número total de cupos configurados.
export function getTotalSlots() {
    return TOTAL_SLOTS;
}
