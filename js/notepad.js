const ventana = document.getElementById("notepadWindow");
const barra = document.getElementById("barra");

document.getElementById("openNotepad").addEventListener("click", () => {
    ventana.style.display = "block";
});

document.getElementById("closeNotepad").addEventListener("click", () => {
    ventana.style.display = "none";
});

let offsetX, offsetY, moviendo = false;

barra.addEventListener("mousedown", (e) => {
    moviendo = true;
    offsetX = e.clientX - ventana.offsetLeft;
    offsetY = e.clientY - ventana.offsetTop;
    barra.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (moviendo) {
        ventana.style.left = `${e.clientX - offsetX}px`;
        ventana.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    moviendo = false;
    barra.style.cursor = "grab";
});
