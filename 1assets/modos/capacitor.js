const data = [
    { id: 1, t: "Cerámico de Disco", img: "./1assets/camara/capacitor/capacitor ceramico de disco.webp", car: ["Dieléctrico: Cerámico, baja capacidad (pF-nF)", "Estable, bajo costo, no polarizado", "Alta frecuencia, bajo ESR"], app: ["Filtrado de ruido en circuitos HF", "Desacoplo en placas electrónicas"] },
    { id: 2, t: "Película WIMA (Poliéster) Rojo", img: "./1assets/camara/capacitor/capacitor pelicula wima (poliester-rojo).webp", car: ["Dieléctrico: Poliéster/MKS, película plástica", "Alta estabilidad, baja pérdida", "No polarizado, buena tolerancia"], app: ["Filtros de audio y crossover", "Temporizadores y circuitos analógicos"] },
    { id: 3, t: "Electrolítico de Aluminio Negro Cilíndrico", img: "./1assets/camara/capacitor/capacitor electrico de aluminio negro cilindrico.webp", car: ["Dieléctrico: Óxido de aluminio, polarizado", "Alta capacitancia (µF-mF)", "Mayor tamaño, sensible a polaridad"], app: ["Filtrado de fuente de alimentación DC", "Suavizado de rectificación"] },
    { id: 4, t: "Tantalio Amarillo", img: "./1assets/camara/capacitor/capacitor Tantalio Amarillo.jpeg", car: ["Dieléctrico: Tantalio, polarizado", "Alta capacitancia en tamaño reducido", "Baja ESR, estable"], app: ["Circuitos SMD y portátiles", "Reguladores de voltaje"] },
    { id: 5, t: "Mica Plateada/Mica Marrón", img: "./1assets/camara/capacitor/capacitor Mica Plateada Mica Marrón.webp", car: ["Dieléctrico: Mica, muy estable", "Preciso, baja pérdida, alta tensión", "No polarizado, alta confiabilidad"], app: ["Circuitos RF y resonantes RF", "Equipos de radio y osciladores"] },
    { id: 6, t: "Variable Trimmer (Ajustable)", img: "./1assets/camara/capacitor/capacitor Variable Trimmer (Ajustable).jpg", car: ["Capacitancia ajustable con tornillo", "Bajo valor pF, ajustable manualmente", "Compacto para calibración"], app: ["Calibración de circuitos sintonizados", "Radios AM/FM y antenas"] },
    { id: 7, t: "Supercapacitor Azul Cilíndrico", img: "./1assets/camara/capacitor/capacitor Supercapacitor Azul Cilíndrico.jpg", car: ["Muy alta capacitancia (Faradios)", "Baja tensión, alta densidad de energía", "Carga/descarga rápida"], app: ["Respaldo de energía y memoria RTC", "Sistemas de almacenamiento temporal"] },
    { id: 8, t: "Polímero Sólido de Aluminio", img: "./1assets/camara/capacitor/capacitor Polímero Sólido de Aluminio.png", car: ["Dieléctrico: Polímero sólido, polarizado", "Bajo ESR, larga vida útil", "Estable a alta temperatura"], app: ["Placas madre y electrónica PC", "Reguladores DC-DC switching"] },
    { id: 9, t: "Papel Vintage", img: "./1assets/camara/capacitor/capacitor Papel Vintage.jpg", car: ["Dieléctrico: Papel encerado, histórico", "Baja capacitancia, no polarizado", "Diseño antiguo, mayor tamaño"], app: ["Equipos vintage y radios antiguas", "Restauración de electrónica clásica"] },
];
const grid = document.getElementById('grid');
function render() {
    grid.innerHTML = '';
    data.forEach(d => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `<div class='card-head'><div class='num'>${d.id}</div><h3>${d.t}</h3></div><div class='cap-row'><div class='cap-img'><img src='${d.img}' alt='${d.t}'></div><ul class='feats'><li><b>Características:</b></li>${d.car.map(c => `<li>${c}</li>`).join('')}</ul></div><div class='apps-box'><div class='t'>>> Aplicaciones:</div><p>${d.app.map(a => `• ${a}`).join('<br>')}</p></div>`;
        grid.appendChild(el);
    });
}
render(); 
