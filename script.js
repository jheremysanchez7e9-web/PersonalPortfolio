// --- DICCIONARIO DE IDIOMAS ---
const dict = {
    es: {
        roles: ["> ESTUDIANTE CIBERSEGURIDAD", "> ADMIN. SISTEMAS", "> SEGURIDAD DE REDES"],
        heroT: "System & Network Administrator",
        heroD: "Estudiante de ASIR especializado en ciberseguridad, configuración de redes y administración de sistemas.",
        btnW: "Ver Proyectos", btnC: "Contactar",
        abT: "Sobre mi perfil",
        abP1: "Soy estudiante de primer año de ASIR en el Institut Tecnològic de Barcelona, con un fuerte enfoque en ciberseguridad y redes.",
        abP2: "Desarrollo experiencia práctica mediante laboratorios virtuales y Linux. Mi objetivo es la ciberseguridad defensiva.",
        btnCV: "Descargar CV",
        p1T: "Calculadora Energética", p1D: "Aplicación interactiva para calcular ahorro eléctrico.",
        p2T: "Infraestructura Debian", p2D: "Servicios DNS, Apache y DHCP en Linux Server.",
        pOpen: "Abrir Proyecto", pLocal: "Proyecto Local",
        cT: "Contacto Directo", fName: "Nombre completo", fMsg: "¿En qué puedo ayudarte?", btnS: "Enviar vía Email",
        nH: "INICIO", nA: "SOBRE MÍ", nP: "PROYECTOS", nC: "CONTACTO"
    },
    en: {
        roles: ["> CYBERSECURITY STUDENT", "> SYSTEMS ADMIN", "> NETWORK SECURITY"],
        heroT: "System & Network Administrator",
        heroD: "ASIR student specialized in cybersecurity, network configuration, and systems administration.",
        btnW: "View Projects", btnC: "Contact Me",
        abT: "About me",
        abP1: "First-year Network Systems Administration student at ITB with a focus on security.",
        abP2: "Developing hands-on experience through virtual labs and Linux. Goal: defensive cybersecurity.",
        btnCV: "Download CV",
        p1T: "Energy Calculator", p1D: "Interactive app to calculate energy savings.",
        p2T: "Debian Infrastructure", p2D: "DNS, Apache and DHCP services on Linux.",
        pOpen: "Open Project", pLocal: "Local Project",
        cT: "Direct Contact", fName: "Full Name", fMsg: "How can I help you?", btnS: "Send via Email",
        nH: "HOME", nA: "ABOUT ME", nP: "PROJECTS", nC: "CONTACT"
    }
    // (Puedes añadir ca, fr, de aquí siguiendo el mismo patrón)
};

// --- MOTOR DE PARTÍCULAS (ANTIGRAVEDAD) ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        // Movimiento flotante
        this.x += this.vx;
        this.y += this.vy;

        // Efecto Loop (Bordes)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Interactividad: Repulsión suave
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// --- LÓGICA DE NAVEGACIÓN Y MULTI-IDIOMA ---
function changeLang() {
    const l = document.getElementById('lang-select').value;
    const d = dict[l] || dict['es'];
    document.getElementById('l-hero-title').innerText = d.heroT;
    document.getElementById('l-hero-desc').innerText = d.heroD;
    document.getElementById('l-btn-work').innerText = d.btnW;
    document.getElementById('l-btn-contact').innerText = d.btnC;
    document.getElementById('l-ab-title').innerText = d.abT;
    document.getElementById('l-ab-p1').innerText = d.abP1;
    document.getElementById('l-ab-p2').innerText = d.abP2;
    document.getElementById('l-btn-cv').innerText = d.btnCV;
    document.getElementById('l-p1-title').innerText = d.p1T;
    document.getElementById('l-p1-desc').innerText = d.p1D;
    document.getElementById('l-p2-title').innerText = d.p2T;
    document.getElementById('l-p2-desc').innerText = d.p2D;
    document.getElementById('l-p-open').innerText = d.pOpen;
    document.getElementById('l-p-local').innerText = d.pLocal;
    document.getElementById('l-c-title').innerText = d.cT;
    document.getElementById('f-name').placeholder = d.fName;
    document.getElementById('f-msg').placeholder = d.fMsg;
    document.getElementById('l-btn-send').innerText = d.btnS;
    document.getElementById('n-h').innerText = d.nH;
    document.getElementById('n-a').innerText = d.nA;
    document.getElementById('n-p').innerText = d.nP;
    document.getElementById('n-c').innerText = d.nC;
    startTypewriter(d.roles);
}

let twTime;
function startTypewriter(roles) {
    const el = document.getElementById('typewriter');
    clearTimeout(twTime);
    let rIdx = 0, cIdx = 0, isDel = false;
    function tick() {
        const current = roles[rIdx];
        el.innerText = current.substring(0, cIdx + (isDel ? -1 : 1));
        cIdx += isDel ? -1 : 1;
        let speed = isDel ? 50 : 120;
        if(!isDel && cIdx === current.length) { speed = 2000; isDel = true; }
        else if(isDel && cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; speed = 500; }
        twTime = setTimeout(tick, speed);
    }
    tick();
}

function showView(id) {
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(id + '-view').style.display = 'flex';
    document.getElementById('n-' + id.charAt(0)).classList.add('active');
}

// --- LÓGICA MAILTO ACTUALIZADA Y FUNCIONAL ---
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('f-name').value;
    const msg = document.getElementById('f-msg').value;
    const email = "jheremysebastian17@gmail.com";
    const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
    const body = encodeURIComponent(`Hola Jheremy,\n\nMi nombre es ${name}.\n\nMensaje:\n${msg}`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

function toggleTheme() {
    const htmlEl = document.documentElement;
    const newTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.querySelector('#theme-toggle i').className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Inicio
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
changeLang();
showView('home');
