document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let opacity = 0;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 粒子类定义
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // 初始随机分布在屏幕
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = -(0.3 + Math.random() * 0.8);
            this.size = 1 + Math.random() * 2.5;
            this.alpha = 0.1 + Math.random() * 0.5;
            this.maxLife = 200 + Math.random() * 300;
            this.life = 0;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life++;

            // 浮力微调扰动
            this.vx += (Math.random() - 0.5) * 0.05;

            if (this.y < -10 || this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(229, 107, 63, ${this.alpha * (1 - this.life / this.maxLife)})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});

function toggleLanguage() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/zh/')) {
        window.location.href = currentUrl.replace('/zh/', '/en/');
    } else if (currentUrl.includes('/en/')) {
        window.location.href = currentUrl.replace('/en/', '/zh/');
    } else {
        // index
        const currentLang = document.documentElement.lang || 'zh';
        if (currentLang === 'zh') {
            window.location.href = './en/index.html';
        } else {
            window.location.href = '../zh/index.html';
        }
    }
}
