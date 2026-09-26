//<script>
const prods = [
    { n: "Set x3 Ollas Antiadherente Premium", p: 45900, old: 62000, cat: "cocina", tag: "-25%", img: "https://images.unsplash.com/photo-1585837070223-33fcfdd39cd2?w=500" },
    { n: "Tuppers Herméticos x10 + Etiquetas", p: 18900, old: 25000, cat: "org", tag: "TOP", img: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=500" },
    { n: "Luces LED Guirnalda 10mts Cálida", p: 22500, cat: "deco", tag: "NEW", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500" },
    { n: "Organizador Cajón Expandible Bambú", p: 14900, cat: "org", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
    { n: "Set Cuchillos Chef Profesional", p: 32900, old: 45000, cat: "cocina", tag: "-30%", img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500" },
    { n: "Espejo Baño LED Touch Antifog", p: 68900, cat: "baño", tag: "PRO", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500" },
    { n: "Alfombra Soft Piel 120x80", p: 27500, cat: "deco", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500" },
    { n: "Dispenser Jabón Automático", p: 16900, cat: "baño", img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500" },
    { n: "Rack Plegable Cocina 3 Niveles", p: 38900, cat: "cocina", tag: "MÁS VENDIDO", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500" },
    { n: "Canastos Yute x3 Nórdico", p: 24500, cat: "org", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500" },
    { n: "Set Velas Soja Aromáticas", p: 12900, cat: "deco", img: "https://images.unsplash.com/photo-1602874801026-e3fbd7ca08ca?w=500" },
    { n: "Porta Cepillos Bambú Minimal", p: 8900, cat: "baño", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500" }
];
let cart = [], catActual = 'todo';
function render(lista) {
    document.getElementById('grid').innerHTML = lista.map((pr, i) => `
<div class="card">
<div class="img"><img src="${pr.img}" loading="lazy">${pr.tag ? `<span class=tag>${pr.tag}</span>` : ''}</div>
<div class="info"><h3>${pr.n}</h3><div class="price">$${pr.p.toLocaleString('es-AR')}${pr.old ? `<s>$${pr.old.toLocaleString('es-AR')}</s>` : ''}</div>
<button class="btn-add" id="b${i}" onclick="add(${i})">+ AGREGAR</button></div>
</div>`).join('');
}
render(prods);
function add(i) {
    let ex = cart.find(c => c.i === i); if (!ex) cart.push({ i, q: 1 }); else ex.q++;
    let b = document.getElementById('b' + i); b.textContent = '✓ AGREGADO'; b.classList.add('added');
    setTimeout(() => { b.textContent = '+ AGREGAR'; b.classList.remove('added') }, 900);
    actualizar();
}
function actualizar() {
    let cant = cart.reduce((a, c) => a + c.q, 0);
    let total = cart.reduce((a, c) => a + prods[c.i].p * c.q, 0);
    document.getElementById('count').textContent = cant;
    document.getElementById('totalItems').textContent = cant;
    document.getElementById('totalPrice').textContent = '$' + total.toLocaleString('es-AR');
    document.getElementById('bar').style.display = cant ? 'flex' : 'none';
    let msg = `Hola BAZAR.HOGAR 2026! Quiero pedir:%0A` + cart.map(c => `• ${prods[c.i].n} x${c.q} - $${prods[c.i].p}`).join('%0A') + `%0A%0ATotal: $${total}%0AEnvío a Longchamps`;
    document.getElementById('wa').href = `https://wa.me/5491136277226?text=${msg}`;
}
function filtrarCat(c, el) {
    catActual = c; document.querySelectorAll('.cats div').forEach(d => d.classList.remove('active')); el.classList.add('active'); filtrar();
}
function filtrar() {
    let q = document.getElementById('q').value.toLowerCase();
    let f = prods.filter(p => (catActual === 'todo' || p.cat === catActual) && p.n.toLowerCase().includes(q));
    render(f);
}
//</script>