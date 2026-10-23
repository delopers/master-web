function enviar() {
    let cat = document.getElementById('cat').value;
    let nom = document.getElementById('nombre').value;
    let tel = document.getElementById('tel').value;
    if (!nom) { alert("Poné tu nombre ATR"); return }
    let msg = `Hola! Quiero inscribirme a Prueba de Riendas:%0A%0ACategoría: ${cat}%0ANombre: ${nom}%0AWhatsApp: ${tel}`;
    window.open("https://wa.me/543804243439?text=" + msg, "_blank");
}