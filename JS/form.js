// Recuperar solicitudes y el índice de turno desde localStorage
function loadRequests() {
    const storedRequests = localStorage.getItem('requests');
    return storedRequests ? JSON.parse(storedRequests) : [];
}

function loadCurrentIndex() {
    return parseInt(localStorage.getItem('currentRequestIndex')) || -1;
}

function saveRequests() {
    localStorage.setItem('requests', JSON.stringify(requests));
}

function saveCurrentIndex() {
    localStorage.setItem('currentRequestIndex', currentRequestIndex);
}

// Inicializar requests
let requests = loadRequests();
let currentRequestIndex = loadCurrentIndex();
let lastTurnTime = 0;

// Agregar solicitud
document.getElementById('addRequestButton').onclick = function() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const requestType = document.getElementById('requestType').value;
    const requestDescription = document.getElementById('request').value;

    if (name && surname && requestType && requestDescription) {
        const request = {
            name,
            surname,
            requestType,
            requestDescription,
            status: 'Pendiente',
            time: new Date().toLocaleString(),
            timeElapsed: '0'
        };
        requests.push(request);
        saveRequests(); // Llamar aquí para guardar la solicitud
        alert(`Solicitud Agregada: ${name} ${surname}`);

        // Limpiar campos del formulario
        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('requestType').value = '';
        document.getElementById('request').value = '';
    }
};

// Control de turnos
document.getElementById('nextTurnButton').onclick = function() {
    if (currentRequestIndex < requests.length - 1) {
        if (currentRequestIndex >= 0) {
            const timeElapsed = Math.floor((Date.now() - lastTurnTime) / 1000);
            requests[currentRequestIndex].timeElapsed = timeElapsed;
            saveRequests(); // Guardar cambios
        }
        
        currentRequestIndex++;
        lastTurnTime = Date.now();
        saveCurrentIndex(); // Guardar índice actual
        alert(`Turno Siguiente: ${requests[currentRequestIndex].name} ${requests[currentRequestIndex].surname}`);
    }
};

document.getElementById('previousTurnButton').onclick = function() {
    if (currentRequestIndex > 0) {
        currentRequestIndex--;
        saveCurrentIndex(); // Guardar índice actual
        alert(`Turno Anterior: ${requests[currentRequestIndex].name} ${requests[currentRequestIndex].surname}`);
    }
};
