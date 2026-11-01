// EFECTO CARD
document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mousemove', e => {
        let r = c.getBoundingClientRect();
        c.style.transform = `perspective(800px) rotateY(${(e.clientX - r.left - 150) / 15}deg)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
});

// FILTRO AT
document.querySelectorAll('.cat-btn').forEach(b => {
    b.onclick = () => {
        document.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        let f = b.dataset.filter;
        document.querySelectorAll('.card').forEach(c => {
            c.style.display = (f == 'all' || c.dataset.cat == f) ? 'block' : 'none';
        });
    }
});

// CARRUSEL AT
let x = 0; setInterval(() => { x = (x + 1) % 3; document.getElementById('track').style.transform = `translateX(-${x * 360}px)` }, 3000);

function enviarAT() {
    let e = document.getElementById('email').value;
    if (!e.includes('@')) { document.getElementById('msg').innerText = '⚠️ por favor ingresa un mail'; return }
    document.getElementById('msg').innerText = '💌 LISTO MAIL, 10% OFF ENVIADO - REVISÁ SPAM';
    document.getElementById('email').value = '';
}
setInterval(() => {
    let d = new Date();
    document.getElementById('hora').innerText = `LONGCHAMPS ${d.toLocaleTimeString()} // ONLINE 🟢`;
}, 1000);

// Efecto magnet en botones
document.querySelectorAll('.footer-at a').forEach(a => {
    a.addEventListener('mousemove', (e) => {
        let r = a.getBoundingClientRect();
        a.style.transform = `translate(${(e.clientX - r.left - 20) / 5}px, ${(e.clientY - r.top - 10) / 5}px)`;
    });
    a.addEventListener('mouseleave', () => a.style.transform = '');
});
