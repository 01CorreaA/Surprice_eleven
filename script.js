const container = document.getElementById("container");
const progress = document.querySelector(".progress");
const bgOverlay = document.getElementById("bgOverlay");
const overlay = document.getElementById("overlay");
const blogPost = document.getElementById("blogPost");
const blogContent = document.getElementById("blogContent");

let duration = 20000;
let start = Date.now();

let interval = setInterval(() => {
    let elapsed = Date.now() - start;
    let percent = (elapsed / duration) * 100;
    progress.style.width = percent + "%";

    if (percent >= 100) {
        clearInterval(interval);
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 1.5s";

        setTimeout(() => {
            bgOverlay.style.opacity = "1";
        }, 1000);

        setTimeout(() => {
            overlay.style.display = "none";
            blogPost.style.opacity = "1";
            blogPost.classList.add("active");
            iniciarTextoProgresivo();
        }, 1500);
    }
}, 50);

const texts = ["Eres maravilloso", "Amor de mi vida", "Te amo", "My love", "Me encantas"];
const photos = ["numero2.png", "numero3.png", "numero1.png"];

function randomPosition() {
    const mode = Math.random();
    if (mode < 0.7) {
        return {
            left: (Math.random() * 50 + 25) + "vw",
            top: (Math.random() * 50 + 25) + "vh"
        };
    }
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
        case 0: return { left: "0vw", top: Math.random() * 100 + "vh" };
        case 1: return { left: "100vw", top: Math.random() * 100 + "vh" };
        case 2: return { left: Math.random() * 100 + "vw", top: "0vh" };
        case 3: return { left: Math.random() * 100 + "vw", top: "100vh" };
    }
}

function randomDirection(stronger = false) {
    const range = stronger ? 800 : 500;
    return { x: (Math.random() - 0.5) * range, y: (Math.random() - 0.5) * range };
}

function createText() {
    const el = document.createElement("div");
    el.className = "text";
    el.innerText = texts[Math.floor(Math.random() * texts.length)];
    const pos = randomPosition();
    el.style.left = pos.left;
    el.style.top = pos.top;
    const dir = randomDirection(Math.random() < 0.3);
    el.style.setProperty("--x", dir.x + "px");
    el.style.setProperty("--y", dir.y + "px");
    el.style.transform += ` rotate(${Math.random() * 60 - 30}deg)`;
    el.style.animationDuration = (Math.random() * 8 + 6) + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), 14000);
}

function createPhoto() {
    const img = document.createElement("img");
    img.className = "photo";
    img.src = photos[Math.floor(Math.random() * photos.length)];
    const pos = randomPosition();
    img.style.left = pos.left;
    img.style.top = pos.top;
    const dir = randomDirection(true);
    img.style.setProperty("--x", dir.x + "px");
    img.style.setProperty("--y", dir.y + "px");
    img.style.animationDuration = (Math.random() * 10 + 10) + "s";
    container.appendChild(img);
    setTimeout(() => img.remove(), 20000);
}

setInterval(createText, 400);
setInterval(createPhoto, 2000);

const paragraphs = [
    "✨ <strong>¡Hola mi amor!</strong> ✨",
    "Hoy es un día muy especial... no cualquier día, porque estamos cumpliendo <span class='highlight'>1 año y 11 meses juntos</span>. 💖",
    "En mayo llegaremos a los 2 años, y estoy muy alegría. Cada día a tu lado es un regalo.",
    "Sabes que te amo con cada fibra de mi ser, y por eso he estado preparando algo con mucho cariño... ",
    "<span class='heart-emoji'>❤️</span> He estado trabajando en un <strong>dibujo especial para ti</strong>. No es del todo perfecto, pero espero te guste. ❤️"
];

let currentIndex = 0;
let galleryAdded = false;

function iniciarTextoProgresivo() {
    blogContent.innerHTML = "";
    currentIndex = 0;
    galleryAdded = false;

    function showNextParagraph() {
        if (currentIndex < paragraphs.length) {
            const p = document.createElement("div");
            p.className = "reveal-text";
            p.innerHTML = paragraphs[currentIndex];
            blogContent.appendChild(p);
            setTimeout(() => p.classList.add("visible"), 50);
            currentIndex++;
            setTimeout(showNextParagraph, 1200);
        } else if (!galleryAdded) {
            galleryAdded = true;
            setTimeout(() => agregarMensajeFinalYRegalo(), 800);
        }
    }
    showNextParagraph();
}

function agregarMensajeFinalYRegalo() {
    const finalMsg = document.createElement("div");
    finalMsg.className = "reveal-text";
    finalMsg.innerHTML = "Y este dibujo lo hice a lapiz. Es el segundo q hago pq el primero lo q queria a color y no salio tan bien. Espero que te guste muchísimo";
    blogContent.appendChild(finalMsg);
    setTimeout(() => finalMsg.classList.add("visible"), 100);

    setTimeout(() => {
        const giftWrapper = document.getElementById("giftWrapper");
        giftWrapper.style.display = "block";
        giftWrapper.style.opacity = "0";
        giftWrapper.style.transition = "opacity 1s";
        setTimeout(() => giftWrapper.style.opacity = "1", 50);
        iniciarRegalo();
    }, 1000);
}

function iniciarRegalo() {
    const giftBox = document.getElementById("giftBox");
    const giftHint = document.getElementById("giftHint");
    let isOpen = false;

    function toggleRegalo() {
        if (isOpen) {
            giftBox.classList.remove("open");
            isOpen = false;
            if (giftHint) giftHint.innerHTML = "🎁 Toca el regalo 🎁";
        } else {
            isOpen = true;
            giftBox.classList.add("open");
            crearConfeti();
            if (giftHint) giftHint.innerHTML = "Te amo mucho mi gatito ❤️";
            if (navigator.vibrate) navigator.vibrate(100);
        }
    }

    giftBox.addEventListener("click", toggleRegalo);
    if (giftHint) giftHint.addEventListener("click", toggleRegalo);
}

function crearConfeti() {
    for (let i = 0; i < 80; i++) {
        const confeti = document.createElement("div");
        confeti.style.position = "fixed";
        confeti.style.width = Math.random() * 10 + 4 + "px";
        confeti.style.height = Math.random() * 10 + 4 + "px";
        confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 65%)`;
        confeti.style.left = Math.random() * 100 + "vw";
        confeti.style.top = "-20px";
        confeti.style.zIndex = "200";
        confeti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0%";
        confeti.style.pointerEvents = "none";
        document.body.appendChild(confeti);

        const duration = Math.random() * 2.5 + 2;
        const endX = (Math.random() - 0.5) * 250;
        confeti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${endX}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], { duration: duration * 1000, easing: "cubic-bezier(0.2, 0.9, 0.4, 1)" });
        setTimeout(() => confeti.remove(), duration * 1000);
    }
}