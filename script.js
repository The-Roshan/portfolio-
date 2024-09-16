// script.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bubbleCanvas');
    const ctx = canvas.getContext('2d');
    let bubbles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createBubbles() {
        bubbles = [];
        for (let i = 0; i < 200; i++) {
            bubbles.push(new Bubble());
        }
    }

    function Bubble() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 20 + 5;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.update = function() {
            this.y -= this.speed;
            if (this.y < -this.radius) {
                this.y = canvas.height + this.radius;
            }
            this.x += Math.sin(this.angle);
            if (this.x > canvas.width + this.radius) {
                this.x = -this.radius;
            }
            if (this.x < -this.radius) {
                this.x = canvas.width + this.radius;
            }
        };
        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            ctx.closePath();
        };
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].update();
            bubbles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createBubbles();
    animate();
});
