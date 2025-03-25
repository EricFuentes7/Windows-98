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

        this.velocityX = Math.min(Math.abs(this.velocityX), this.maxSpeed) * Math.sign(this.velocityX);
        this.velocityY = Math.min(Math.abs(this.velocityY), this.maxSpeed) * Math.sign(this.velocityY);

        this.x += this.velocityX;
        this.y += this.velocityY;

        const ranuraHeight = window.innerHeight - 53;

        if (this.x < 0 || this.x + this.element.offsetWidth > window.innerWidth) {
            this.velocityX *= -this.reboteIntenso;
        }
        if (this.y < 0 || this.y + this.element.offsetHeight > ranuraHeight) {
            this.velocityY *= -this.reboteIntenso;
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        requestAnimationFrame(() => this.update());
    }

    stop() {
        this.animating = false;
    }
}
