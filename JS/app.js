let requests = [];
let currentRequestIndex = -1;
let lastTurnTime = 0;
let turnNumber = 0;
let timeElapsed = 0;

document.getElementById('openFormButton').onclick = function() {
    window.open('form.html', '_blank');
};

document.getElementById('openTurnDisplayButton').onclick = function() {
    window.open('turnDisplay.html', '_blank');
};

document.getElementById('downloadCSVButton').onclick = function() {
    saveToCSV();
};

function saveToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        requests.map(e => `${e.name},${e.surname},${e.requestType},${e.requestDescription},${e.status},${e.time},${e.timeElapsed}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "turnos.csv");
    document.body.appendChild(link); 

    link.click();
    document.body.removeChild(link);
}
