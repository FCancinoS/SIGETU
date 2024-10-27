// Recuperar solicitudes y el índice de turno desde localStorage
function loadRequests() {
    const storedRequests = localStorage.getItem('requests');
    return storedRequests ? JSON.parse(storedRequests) : [];
}

function loadCurrentIndex() {
    return parseInt(localStorage.getItem('currentRequestIndex')) || -1;
}

let requests = loadRequests();
let currentRequestIndex = loadCurrentIndex();

// Mostrar turno actual
function updateTurnDisplay() {
    requests = loadRequests(); // Recargar solicitudes
    currentRequestIndex = loadCurrentIndex(); // Recargar índice

    if (currentRequestIndex >= 0 && currentRequestIndex < requests.length) {
        document.getElementById('turnDisplay').innerText = `Turno Actual: ${requests[currentRequestIndex].name} ${requests[currentRequestIndex].surname}`;
        document.getElementById('statusDisplay').innerText = `Estado: ${requests[currentRequestIndex].status}`;
        document.getElementById('timeElapsedDisplay').innerText = `Tiempo entre turnos: ${requests[currentRequestIndex].timeElapsed} segundos`;
    } else {
        document.getElementById('turnDisplay').innerText = 'Turno Actual: Ninguno';
        document.getElementById('statusDisplay').innerText = '';
        document.getElementById('timeElapsedDisplay').innerText = '';
    }
}

// Actualizar visualización al cargar la página
window.onload = function() {
    updateTurnDisplay();
    setInterval(updateTurnDisplay, 1000); // Actualiza cada segundo
};
