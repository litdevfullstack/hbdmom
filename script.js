// Mensajes para cada foto (personalízalos!)
const messages = [
    "Mamá, gracias por cada 'estoy aquí' que nunca falló. Eres mi paz en medio del caos. 🕊️💗",
    "Tu sacrificio y amor incondicional hacen de ti una superheroína sin capa. 🦸‍♀️✨",
    "Cada día a tu lado es un regalo. ¡Gracias por ser mi mejor amiga! 🌹💖"
];

// Contador de días (ajústalo con la fecha de nacimiento de tu mamá)
function calculateDays() {
    // Cambia esta fecha por la fecha de nacimiento de tu mamá (Año, Mes-1, Día)
    const momBirthDate = new Date(1983, 3, 10); // Ejemplo: 1 de enero de 1970
    const today = new Date();
    const diffTime = Math.abs(today - momBirthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Animación del contador
    const counter = document.getElementById('daysCounter');
    let current = 0;
    const increment = Math.ceil(diffDays / 100);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= diffDays) {
            current = diffDays;
            clearInterval(timer);
        }
        counter.textContent = current.toLocaleString() + " días";
    }, 20);
}

// Mostrar mensaje al hacer clic en foto
function showMessage(index) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('dynamicMessage');
    
    // Efecto de transición
    messageBox.style.transform = "scale(0.95)";
    messageBox.style.opacity = "0.5";
    
    setTimeout(() => {
        messageText.textContent = messages[index];
        messageBox.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        messageText.style.color = "white";
        messageText.style.fontSize = "1.4rem";
        messageBox.style.transform = "scale(1)";
        messageBox.style.opacity = "1";
    }, 300);
}

// Sorpresa especial
function triggerSurprise() {
    const surprise = document.getElementById('surpriseContent');
    surprise.classList.remove('hidden');
    
    // Efecto confeti
    createConfetti();
    
    // Reproducir sonido si está permitido
    playBirthdaySound();
}

// Sistema de confeti
function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ffd700'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 0.2 - 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.y += p.speed;
            p.angle += p.spin;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
            
            if (p.y > canvas.height) {
                particles[i].y = -20;
                particles[i].x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Detener después de 10 segundos
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 10000);
}

// Crear corazones flotantes
function createHearts() {
    const container = document.getElementById('hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 800);
}

// Simulación de música (Las Mañanitas)
let isPlaying = false;
function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    
    if (!isPlaying) {
        // Aquí puedes agregar un audio real
         const audio = new Audio('/audios/hbd.mp3');
         audio.play();
        
        btn.textContent = '⏸️ Pausar Música';
        btn.style.background = '#ffd700';
        btn.style.color = '#333';
        isPlaying = true;
        
        // Efecto visual de ondas sonoras
        createSoundWaves();
    } else {
        btn.textContent = '🎵 Reproducir "Las Mañanitas"';
        btn.style.background = 'rgba(255,255,255,0.2)';
        btn.style.color = 'white';
        isPlaying = false;
    }
}

function createSoundWaves() {
    if (!isPlaying) return;
    
    const bars = document.createElement('div');
    bars.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 5px;
        z-index: 100;
    `;
    
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 10px;
            height: 30px;
            background: #ffd700;
            border-radius: 5px;
            animation: wave 0.5s ease-in-out infinite;
            animation-delay: ${i * 0.1}s;
        `;
        bars.appendChild(bar);
    }
    
    document.body.appendChild(bars);
    
    // Agregar animación CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(2); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => bars.remove(), 5000);
}

// Sonido de cumpleaños (simulado con Web Audio API)
function playBirthdaySound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        // Crear oscilador para tono de feliz cumpleaños
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 523.25; // Nota C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 1);
    } catch (e) {
        console.log('Audio no soportado');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    calculateDays();
    createHearts();
    
    // Efecto de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Responsive canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
