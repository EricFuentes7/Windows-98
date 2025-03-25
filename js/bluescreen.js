let bsodVisible = false;
let cursorInterval;
const MAX_WINDOWS_FOR_CRASH = 50; // Cambia este valor según lo que necesites

function triggerBSOD() {
    if (bsodVisible) return;
    bsodVisible = true;
    
    // Detener todas las ventanas y audios
    openWindows.forEach(windowData => {
        windowData.bouncingWindow.stop();
        windowData.audio.pause();
        windowData.element.remove();
    });
    openWindows = []; // Limpiar el array de ventanas
    
    // Mostrar pantalla azul
    const blueScreen = document.getElementById('blueScreen');
    blueScreen.style.display = 'flex'; // Mostrar el BSOD
    
    // Efecto de cursor parpadeante solo en el último <p>
    const cursor = blueScreen.querySelector('span');
    let showCursor = true;
    cursorInterval = setInterval(() => {
        showCursor = !showCursor;
        cursor.textContent = `Press any key to continue ${showCursor ? '_' : ' '}`;
    }, 500);

    // Reiniciar con cualquier tecla
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress() {
    if (bsodVisible) {
        clearInterval(cursorInterval);
        location.reload();
    }
}

// Evento de teclado para BSOD
document.addEventListener('keydown', function(e) {
    if (bsodVisible) handleKeyPress();
});