// script.js - Código completo con límites de pantalla

// Ocultar ventanas al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("notepadWindow").style.display = "none";
    document.getElementById("folderWindow").style.display = "none";
});

// Elementos de las ventanas
const notepadWindow = document.getElementById("notepadWindow");
const folderWindow = document.getElementById("folderWindow");

// Barras de título
const notepadBarra = notepadWindow.querySelector('.barra');
const folderBarra = folderWindow.querySelector('.barra');

let currentDraggedWindow = null;
let offsetX, offsetY;
document.querySelectorAll('.item p').forEach(function(paragraph) {
    const text = paragraph.innerText.trim();
    const wordCount = text.split(' ').length;

    // Si tiene más de una palabra, aplicamos el estilo para que se dividan
    if (wordCount > 1) {
        paragraph.classList.add('long-word');
    }
});

// Funciones para abrir/cerrar
document.getElementById("openNotepad").addEventListener("click", () => {
    notepadWindow.style.display = "block";
});



// Funciones para abrir/cerrar
document.getElementById("openNotepad").addEventListener("click", () => {
    notepadWindow.style.display = "block";
});

document.getElementById("closeNotepad").addEventListener("click", () => {
    notepadWindow.style.display = "none";
});

document.getElementById("openFolder").addEventListener("click", () => {
    folderWindow.style.display = "block";
});

document.getElementById("closeFolder").addEventListener("click", () => {
    folderWindow.style.display = "none";
});

// Función para limitar posición
function limitPosition(windowElement, x, y) {
    const maxX = window.innerWidth - windowElement.offsetWidth;
    const maxY = window.innerHeight - windowElement.offsetHeight - 37; // <- Añadido -53 como en BouncingWindow
    
    // Asegurarse de que no se salga por los bordes
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    return {x, y};
}

// Configuración de arrastre
function setupDrag(barraElement, windowElement) {
    barraElement.addEventListener("mousedown", (e) => {
        currentDraggedWindow = windowElement;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        barraElement.style.cursor = "grabbing";
    });
}

setupDrag(notepadBarra, notepadWindow);
setupDrag(folderBarra, folderWindow);

// Evento de movimiento del ratón
document.addEventListener("mousemove", (e) => {
    if (currentDraggedWindow) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        
        // Aplicar límites
        const limitedPos = limitPosition(currentDraggedWindow, newX, newY);
        
        currentDraggedWindow.style.left = `${limitedPos.x}px`;
        currentDraggedWindow.style.top = `${limitedPos.y}px`;
    }
});

document.addEventListener("mouseup", () => {
    currentDraggedWindow = null;
    notepadBarra.style.cursor = "grab";
    folderBarra.style.cursor = "grab";
});