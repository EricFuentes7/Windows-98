let openWindows = []; // Declaración global

class BouncingWindow {
    constructor(element) {
        this.element = element;
        this.maxSpeed = 16;
        this.initialSpeed = 6;
        this.reboteIntenso = 1.1;

        this.x = Math.random() * (window.innerWidth - this.element.offsetWidth);
        this.y = Math.random() * (window.innerHeight - this.element.offsetHeight - 53);

        const angle = Math.random() * 2 * Math.PI;
        this.velocityX = Math.cos(angle) * this.initialSpeed;
        this.velocityY = Math.sin(angle) * this.initialSpeed;

        this.animating = true;
        this.update();
    }

    update() {
        if (!this.animating) return;

        this.velocityX *= 1.001;
        this.velocityY *= 1.001;

        // Limitar velocidad
        if (Math.abs(this.velocityX) > this.maxSpeed) {
            this.velocityX = this.maxSpeed * Math.sign(this.velocityX);
        }
        if (Math.abs(this.velocityY) > this.maxSpeed) {
            this.velocityY = this.maxSpeed * Math.sign(this.velocityY);
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        const ranuraHeight = window.innerHeight - 37;
        const elementWidth = this.element.offsetWidth;
        const elementHeight = this.element.offsetHeight;

        // Rebotes ajustados
        if (this.x < 0) {
            this.velocityX = Math.abs(this.velocityX) * this.reboteIntenso;
            this.x = 0;
        }
        if (this.x + elementWidth > window.innerWidth - 1) {  // Rebote derecho mejorado
            this.velocityX = -Math.abs(this.velocityX) * this.reboteIntenso;
            this.x = window.innerWidth - elementWidth - 1;
        }

        if (this.y < 0) {
            this.velocityY = Math.abs(this.velocityY) * this.reboteIntenso;
            this.y = 0;
        }
        if (this.y + elementHeight > ranuraHeight) {
            this.velocityY = -Math.abs(this.velocityY) * this.reboteIntenso;
            this.y = ranuraHeight - elementHeight;
        }

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

    // Audio
    const audio = new Audio('/audio/you-are-an-idiot.mp3');
    audio.loop = true;
    audio.play().catch(error => console.error('Audio error:', error));

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
    closeBtn.innerHTML = '<img src="/images/close-icon.png">';
    closeBtnContainer.appendChild(closeBtn);

    barra.append(titleContainer, closeBtnContainer);

    // Contenido
    const content = document.createElement('div');
    content.className = 'contenido';
    const gif = document.createElement('img');
    gif.src = '/images/meme/you_are_an_idiot.gif';
    gif.style.width = '277px';
    content.appendChild(gif);

    // Ensamblar
    windowDiv.append(barra, content);
    document.body.appendChild(windowDiv);

    // Sistema de rebote
    const bouncingWindow = new BouncingWindow(windowDiv);

    // Registrar ventana
    const windowData = {
        element: windowDiv,
        bouncingWindow: bouncingWindow,
        audio: audio
    };
    openWindows.push(windowData);

    // Verificar si se supera el límite de ventanas
    if (openWindows.length >= MAX_WINDOWS_FOR_CRASH) {
        triggerBSOD(); // Activar BSOD automáticamente
    }

    // Control de cierre
    closeBtn.addEventListener('click', () => {
        bouncingWindow.stop();
        audio.pause();
        windowDiv.remove();
        openWindows = openWindows.filter(w => w !== windowData);
    });

    // Arrastre
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    barra.addEventListener('mousedown', (e) => {
        isDragging = true;
        bouncingWindow.animating = false;
        dragOffset = {
            x: e.clientX - windowDiv.offsetLeft,
            y: e.clientY - windowDiv.offsetTop
        };
        barra.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            bouncingWindow.x = e.clientX - dragOffset.x;
            bouncingWindow.y = e.clientY - dragOffset.y;
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

    // Propagación de ventanas
    gif.addEventListener('click', () => {
        createIdiotWindow();
        audio.play().catch(() => {});
    });
}

// Inicializador
document.getElementById('troyano').addEventListener('click', (e) => {
    e.preventDefault();
    for (let i = 0; i < 3; i++) createIdiotWindow();
});