let DB = JSON.parse(localStorage.getItem('domec_db') || '{"clientes":[],"trabajos":[],"stock":[{"n":"Placas Electricas","s":4},{"n":"Bisagras y Base Rodamientos","s":8},{"n":"Termostato Electrico","s":5},{"n":"Burlete Horno","s":3},{"n":"Modulo Selector","s":2},{"n":"Electrodos Cortos","s":7},{"n":"Cables Tomas","s":4}]}');
const save = () => localStorage.setItem('domec_db', JSON.stringify(DB));

document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
    t.classList.add('active'); document.getElementById(t.dataset.tab).classList.add('active');
}));

const tbody = document.getElementById('tbodyC');
function renderC() {
    const q = document.getElementById('searchC').value.toLowerCase();
    tbody.innerHTML = '';
    DB.clientes.filter(c => JSON.stringify(c).toLowerCase().includes(q)).forEach((c, i) => {
        tbody.innerHTML += `<tr><td>${c.nombre}</td><td>${c.tel}</td><td>${c.equipo}</td><td>${c.falla}</td><td><span class="badge ${c.estado === 'Pendiente' ? 'b-pend' : c.estado === 'En proceso' ? 'b-prog' : 'b-ok'}">${c.estado}</span></td><td>${c.fecha}</td><td><button onclick="delC(${i})">🗑️</button> <button onclick="waC('${c.tel}','${c.nombre}')">W</button></td></tr>`;
    });
}
document.getElementById('searchC').addEventListener('input', renderC);

const modal = document.getElementById('modal');
let editing = null;
document.getElementById('addCliente').addEventListener('click', () => {
    editing = null;
    document.getElementById('modalTitle').innerText = 'Nuevo Cliente 🗄️';
    document.getElementById('modalBody').innerHTML = `
      <input id="m_nombre" placeholder="Nombre cliente">
      <input id="m_tel" placeholder="WhatsApp 11..." value="11">
      <select id="m_equipo"><option>Cocina Electrica Domec</option><option>Cocina Gas Domec</option><option>Anafe Electrico Domec</option><option>Anafe Gas Domec</option><option>Anafe Vitroceramico Domec</option><option>Horno Electrico Domec</option><option>Horno Gas</option><option>Campana Domec</option><option>Estractor Domec</option></select>
      <textarea id="m_falla" placeholder="Falla que reporta"></textarea>
      <select id="m_estado"><option>Pendiente</option><option>En proceso</option><option>Terminado</option></select>`;
    modal.classList.add('open');
});
document.getElementById('cancel').addEventListener('click', () => modal.classList.remove('open'));
document.getElementById('save').addEventListener('click', () => {
    if (document.getElementById('m_nombre')) {
        const c = { nombre: m_nombre.value, tel: m_tel.value, equipo: m_equipo.value, falla: m_falla.value, estado: m_estado.value, fecha: new Date().toLocaleDateString() };
        if (c.nombre && c.tel) { DB.clientes.unshift(c); save(); renderC(); modal.classList.remove('open'); }
    }
});
window.delC = (i) => { DB.clientes.splice(i, 1); save(); renderC(); }
window.waC = (tel, nombre) => { window.open(`https://wa.me/549${tel.replace(/\D/g, '')}?text=Hola%20${nombre}%20soy%20Agustin%20Morel%20Service%20Domec%20🗄️`, '_blank'); }

function renderT() {
    document.getElementById('gridT').innerHTML = DB.trabajos.map((t, i) => `<div class="card"><b>${t.titulo}</b><p style="color:#666;font-size:13px;margin:8px 0">${t.desc}</p><small>${t.fecha}</small> <button onclick="delT(${i})">🗑️</button></div>`).join('') || '<p style="color:#999">No hay trabajos aún</p>';
}
document.getElementById('addTrab').addEventListener('click', () => {
    const tit = prompt('Titulo trabajo:'); if (!tit) return;
    const desc = prompt('Descripción:'); DB.trabajos.unshift({ titulo: tit, desc, fecha: new Date().toLocaleDateString() }); save(); renderT();
});
window.delT = (i) => { DB.trabajos.splice(i, 1); save(); renderT(); }

function renderS() { document.getElementById('stockG').innerHTML = DB.stock.map(s => `<div class="stock"><h4>${s.n}</h4><div style="font-size:28px;font-weight:900;margin:8px 0">${s.s}</div><small>unidades</small></div>`).join(''); }

renderC(); renderT(); renderS();
console.log('%c SISTEMA 🗄️ AGUSTIN MOREL ACTIVO ', 'background:#111;color:#FFDE00;padding:10px;font-weight:900');