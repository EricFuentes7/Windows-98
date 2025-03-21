class BouncingWindow {
    constructor(element) {
        this.element = element;
        this.maxSpeed = 16; // Velocidad máxima permitida
        this.initialSpeed = 6; // Velocidad inicial
        this.reboteIntenso = 1.1; // Multiplicador de rebote

        // Posición inicial aleatoria dentro de la pantalla visible
        this.x = Math.random() * (window.innerWidth - this.element.offsetWidth);
        this.y = Math.random() * (window.innerHeight - this.element.offsetHeight - 53); // Ajuste para la ranura

        // Dirección inicial aleatoria (ángulo random)
        const angle = Math.random() * 2 * Math.PI; // Ángulo en radianes (0 a 2π)
        this.velocityX = Math.cos(angle) * this.initialSpeed;
        this.velocityY = Math.sin(angle) * this.initialSpeed;

        this.animating = true;
        this.update();
    }

    update() {
        if (!this.animating) return;

        // Aplicamos aceleración constante pero limitada
        this.velocityX *= 1.001;
        this.velocityY *= 1.001;

        // Limitar velocidad máxima
        if (Math.abs(this.velocityX) > this.maxSpeed) {
            this.velocityX = this.maxSpeed * Math.sign(this.velocityX);
        }
        if (Math.abs(this.velocityY) > this.maxSpeed) {
            this.velocityY = this.maxSpeed * Math.sign(this.velocityY);
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Límites de la ranura (height: calc(100% - 53px))
        const ranuraHeight = window.innerHeight - 53;
        const elementWidth = this.element.offsetWidth;
        const elementHeight = this.element.offsetHeight;

        // Rebote en bordes horizontales
        if (this.x < 0) {
            this.velocityX = Math.abs(this.velocityX) * this.reboteIntenso;
            this.x = 0; // Asegurarse de que no se salga
        }
        if (this.x + elementWidth > window.innerWidth) {
            this.velocityX = -Math.abs(this.velocityX) * this.reboteIntenso;
            this.x = window.innerWidth - elementWidth; // Asegurarse de que no se salga
        }

        // Rebote en bordes verticales (limitado por la ranura)
        if (this.y < 0) {
            this.velocityY = Math.abs(this.velocityY) * this.reboteIntenso;
            this.y = 0; // Asegurarse de que no se salga
        }
        if (this.y + elementHeight > ranuraHeight) {
            this.velocityY = -Math.abs(this.velocityY) * this.reboteIntenso;
            this.y = ranuraHeight - elementHeight; // Asegurarse de que no se salga
        }

        // Aplicar posición
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        requestAnimationFrame(() => this.update());
    }

    stop() {
        this.animating = false;
    }
}

function createIdiotWindow() {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'ventana2';
    windowDiv.style.position = 'absolute';

    // Barra de título
    const barra = document.createElement('div');
    barra.className = 'barra';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'a_column';

    const icon = document.createElement('img');
    icon.className = 'logo_notepad';
    icon.src = '/images/html-0.png';

    const title = document.createElement('div');
    title.textContent = 'YOU ARE AN IDIOT';

    titleContainer.append(icon, title);

    // Botón cerrar
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.className = 'iconos_entrada';

    const closeBtn = document.createElement('button');
    const closeIcon = document.createElement('img');
    closeIcon.src = '/images/close-icon.png';
    closeBtn.appendChild(closeIcon);

    closeBtnContainer.appendChild(closeBtn);

    // Ensamblar barra
    barra.append(titleContainer, closeBtnContainer);

    // Contenido
    const content = document.createElement('div');
    content.className = 'contenido';
    const gif = document.createElement('img');
    gif.src = '/images/meme/you_are_an_idiot.gif';
    gif.style.width = '277px';
    content.appendChild(gif);

    // Ensamblar ventana
    windowDiv.append(barra, document.createElement('div'), content);
    document.body.appendChild(windowDiv);

    // Crear instancia de rebote
    const bouncingWindow = new BouncingWindow(windowDiv);

    // Funcionalidad de cerrar
    closeBtn.addEventListener('click', () => {
        bouncingWindow.stop();
        windowDiv.remove();
    });

    // Funcionalidad de arrastre
    let isDragging = false;
    let dragStartX, dragStartY;

    barra.addEventListener('mousedown', (e) => {
        isDragging = true;
        bouncingWindow.animating = false;
        dragStartX = e.clientX - windowDiv.offsetLeft;
        dragStartY = e.clientY - windowDiv.offsetTop;
        barra.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            bouncingWindow.x = e.clientX - dragStartX;
            bouncingWindow.y = e.clientY - dragStartY;
            windowDiv.style.left = `${bouncingWindow.x}px`;
            windowDiv.style.top = `${bouncingWindow.y}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            bouncingWindow.animating = true;
            bouncingWindow.update();
            barra.style.cursor = 'grab';
        }
    });

    // Crear nueva ventana al hacer clic en el GIF
    gif.addEventListener('click', () => {
        createIdiotWindow();
    });
}

document.getElementById('troyano').addEventListener('click', function(e) {
    e.preventDefault();
    // Crear 3 ventanas iniciales para mejor efecto
    createIdiotWindow();
    createIdiotWindow();
    createIdiotWindow();
});