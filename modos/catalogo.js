const prods = [
  {
    n: "Set x3 Ollas Antiadherente Premium",
    p: 45900,
    old: 62000,
    cat: "cocina",
    tag: "-25%",
    img: "./camara/catalogo/ollas antiadherente premiun.jpg"
  },

  {
    n: "Tuppers Herméticos x10 + Etiquetas",
    p: 18900,
    old: 25000,
    cat: "org",
    tag: "TOP",
    img: "./camara/catalogo/tuppers hermeticos.jpg"
  },

  {
    n: "Luces LED Guirnalda 10mts Cálida",
    p: 22500,
    cat: "deco",
    tag: "NEW",
    img: "./camara/catalogo/luces led guirnalda.jpg"
  },

  {
    n: "Organizador Cajón Expandible Bambú",
    p: 14900,
    cat: "org",
    img: "./camara/catalogo/organizador cubiertos.jpg"
  },

  {
    n: "Set Cuchillos Chef Profesional",
    p: 32900,
    old: 45000,
    cat: "cocina",
    tag: "-30%",
    img: "./camara/catalogo/cuchillos chef profecional.jpg"
  },

  {
    n: "Espejo Baño LED Touch Antifog",
    p: 68900,
    cat: "baño",
    tag: "PRO",
    img: "./camara/catalogo/espejo baño led.jpg"
  },

  {
    n: "Alfombra Soft Piel 120x80",
    p: 27500,
    cat: "deco",
    img: "./camara/catalogo/alfombra soft piel.jpg"
  },

  {
    n: "Dispenser Jabón Automático",
    p: 16900,
    cat: "baño",
    img: "./camara/catalogo/dispenser jabon automatico.jpg"
  },

  {
    n: "Rack Plegable Cocina 3 Niveles",
    p: 38900,
    cat: "cocina",
    tag: "MÁS VENDIDO",
    img: "./camara/catalogo/rack plegable con niveles.jpg"
  },

  {
    n: "Canastos Yute x3 Nórdico",
    p: 24500,
    cat: "org",
    img: "./camara/catalogo/canastos yute nordico.jpg"
  },

  {
    n: "Set Velas Soja Aromáticas",
    p: 12900,
    cat: "deco",
    img: "./camara/catalogo/set velas aromaticas.jpg"
  },

  {
    n: "Porta Cepillos Bambú Minimal",
    p: 8900,
    cat: "baño",
    img: "./camara/catalogo/porta cepillos.jpg"
  },

  {
    n: "Araña Multi Lampara",
    p: 45900,
    old: 84000,
    cat: "ilum",
    tag: "-25%",
    img: "./camara/catalogo/araña multi lamparas.jpg"
  },
  
  {
    n: "Cafetera y Pava Electrica Combo",
    p: 18900,
    old: 25000,
    cat: "cocina",
    tag: "TOP",
    img: "./camara/catalogo/cafetera y pava electrica.jpeg"
  },

  {
    n: "Cuadro Minimalista Fotografico",
    p: 22500,
    cat: "deco",
    tag: "NEW",
    img: "./camara/catalogo/cuadro minimalista.jpeg"
  },

  {
    n: "Dispenser Electrico De Agua",
    p: 14900,
    cat: "cocina",
    tag: "Top",
    img: "./camara/catalogo/dispenser electrico.jpeg"
  },

  {
    n: "Estante De Pared Pino",
    p: 32900,
    old: 45000,
    cat: "cocina",
    tag: "-30%",
    img: "./camara/catalogo/estante de pared pino.jpeg"
  },

  {
    n: "jarron Lake Coleccion Antigua",
    p: 68900,
    cat: "baño",
    tag: "PRO",
    img: "./camara/catalogo/jarron lake.jpeg"
  },

  {
    n: "Led Placa Con Adherente Multi-Uso",
    p: 27500,
    cat: "deco",
    img: "./camara/catalogo/led placa.jpg"
  },

  {
    n: "Ordenador De Plato Marca (Link)",
    p: 16900,
    cat: "baño",
    img: "./camara/catalogo/ordenador de plato.jpeg"
  },

  {
    n: "Porta Bombillo Mesa De Luz",
    p: 38900,
    cat: "deco",
    tag: "MÁS VENDIDO",
    img: "./camara/catalogo/porta bombillo.jpg"
  },

  {
    n: "Salero y Azucarero Pino",
    p: 24500,
    cat: "org",
    img: "./camara/catalogo/salero y azucarero combo.jpeg"
  },

  {
    n: "Termo Cafetero Marca JPEG",
    p: 12900,
    cat: "deco",
    img: "./camara/catalogo/termo cafetero.jpeg"
  },

  {
    n: "Ventilador Paleta Bambú",
    p: 8900,
    cat: "baño",
    img: "./camara/catalogo/ventilador paletas bambú.jpg"
  }
];

let cart = [], catActual = 'todo';
function render(lista) {
  document.getElementById('grid').innerHTML = lista.map((pr, i) => `
<div class="card">
<div style="width:auto; height:auto;" class="img">
<img src="${pr.img}" loading="lazy">${pr.tag ? `<span class=tag>${pr.tag}</span>` : ''}</div>
<div class="info">
<h3>${pr.n}</h3>
<div style="color:blue;" class="price">$${pr.p.toLocaleString('es-AR')}${pr.old ? `<s style="font-size:13px; border:3px solid red; font-weight: 900;">$${pr.old.toLocaleString('es-AR')}</s>` : ''}</div>
<button class="btn-add" id="b${i}" onclick="add(${i})">+ AGREGAR</button>
</div>
</div>`).join('');
}

render(prods);
function add(i) {
  let ex = cart.find(c => c.i === i);
  if (!ex) cart.push({ i, q: 1 });
  else ex.q++;
  let b = document.getElementById('b' + i);
  b.textContent = '✓ AGREGADO';
  b.classList.add('added');
  setTimeout(() => {
    b.textContent = '+ AGREGAR';
    b.classList.remove('added')
  }, 900);
  actualizar();
}

function actualizar() {
  let cant = cart.reduce((a, c) => a + c.q, 0);
  let total = cart.reduce((a, c) => a + prods[c.i].p * c.q, 0);
  document.getElementById('count').textContent = cant;
  document.getElementById('totalItems').textContent = cant;
  document.getElementById('totalPrice').textContent = '$' + total.toLocaleString('es-AR');
  document.getElementById('bar').style.display = cant ? 'flex' : 'none';
  let msg = `Hola Bazar Hogar Quiero pedir:%0A` + cart.map(c => `• ${prods[c.i].n} x${c.q} - $${prods[c.i].p}`).join('%0A') + `%0A%0ATotal: $${total}%0AEnvío a Longchamps`;
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
