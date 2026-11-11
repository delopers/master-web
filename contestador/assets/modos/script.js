let servicioActual = "";
let pedidos = [];
let hablando = false;

function hora(){
  const d = new Date();
  document.getElementById('clock').textContent = d.toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
}
setInterval(hora,1000); hora();

function hablar(texto){
  // Voz real del navegador
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'es-AR'; 
    // es-AR, it-IT, en-EN, pt-PT,
    // fr-FR, ja-JA, ko-KO, zh-ZH,
    // ru-RU, de-DE, id-ID, pl-PL, 
    u.rate = 1.02;
    u.pitch = 1;
    u.volume = 1;
    // Busca voz en español si hay
    const voces = window.speechSynthesis.getVoices();
    const vozEs = voces.find(v=>v.lang.includes('ar')); 
    // ar-argentina, // it-italiano, // en-englis, // po-portugues,
    // fr-frances, // ja-japones, // ko-koreano, // zh-chino,
    // ru-ruso, // de-aleman, // id-indonesia, // pl-polonia, 
    if(vozEs) u.voice = vozEs;
    window.speechSynthesis.speak(u);
  }
  addMsg(texto,'bot');
}

function addMsg(texto, tipo){
  const t = document.getElementById('transcript');
  const div = document.createElement('div');
  div.className = 'msg '+tipo;
  div.innerHTML = texto + `<small>${tipo==='bot'?'Asistente':'Cliente'} • ahora</small>`;
  t.appendChild(div);
  t.scrollTop = t.scrollHeight;
}

function atender(){
  const nombres = ['Llamada entrante...'];
  const n = nombres[Math.floor(Math.random()*nombres.length)];
  document.getElementById('callerName').textContent = n;
  document.getElementById('callStatus').textContent = 'Atendiendo automáticamente...';
  document.getElementById('btnAtender').style.display='none';
  document.getElementById('btnCortar').style.display='block';
  hablar('Selecciona una opción para comenzar un chat');
}

function cortar(){
  hablar('Perfecto, ya dejé registrado tu pedido. En breve te llama el técnico de Bajjo Cero Refrigeración. Gracias por llamar, que tengas un buen día.');
  document.getElementById('callStatus').textContent = 'Llamada finalizada - En espera...';
  document.getElementById('btnAtender').style.display='block';
  document.getElementById('btnCortar').style.display='none';
  document.getElementById('callerName').textContent = 'En espera de llamadas...';
  setTimeout(()=>{ document.getElementById('formDatos').style.display='none'; },2000);
}

function elegir(tipo){
  servicioActual = tipo;
  let respuesta = "";
  let precio = "";
  if(tipo==='reparacion'){
    respuesta = "Perfecto, reparación. ¿El aire no enfría, no arranca, o hace ruido? La visita técnica con diagnóstico sale 25.000 pesos, que se descuenta si lo reparás con nosotros. Decime tu nombre y barrio para agendarte.";
    precio = "Visita + Diagnóstico: $25.000";
  }
  if(tipo==='instalacion'){
    respuesta = "Genial, instalación de split. La instalación básica de hasta 3000 frigorías sale 120.000 pesos, incluye ménsulas, cañería hasta 3 metros y puesta en marcha. ¿De cuántas frigorías es tu equipo?";
    precio = "Instalación base: $120.000";
  }
  if(tipo==='mantenimiento'){
    respuesta = "Mantenimiento completo: limpieza de filtros, turbina, unidad exterior, control de gas y consumo. Sale 45.000 pesos y lo dejamos como nuevo. ¿Querés agendarlo para esta semana?";
    precio = "Mantenimiento: $45.000";
  }
  if(tipo==='presupuesto'){
    respuesta = "Te paso precios aproximados: Reparación desde 35.000, Instalación desde 120.000, Mantenimiento 45.000, Carga de gas desde 65.000. El precio final se confirma en el lugar. ¿Querés que te agende una visita?";
    precio = "Presupuesto orientativo";
  }
  hablar(respuesta);
  document.getElementById('formDatos').style.display='block';
  // Guarda precio para mostrar después
  document.getElementById('formDatos').dataset.precio = precio;
}

function guardarPedido(){
  const nombre = document.getElementById('nombre').value || 'Sin nombre';
  const barrio = document.getElementById('barrio').value || 'Sin barrio';
  const telefono = document.getElementById('telefono').value || 'sin numero';
  const equipo = document.getElementById('equipo').value;
  const precio = document.getElementById('formDatos').dataset.precio || '';
  const pedido = `🧊 ${servicioActual.toUpperCase()} - ${nombre} - ${barrio} - ${equipo} - ${precio}`;
  pedidos.push(pedido);
  addMsg(`Soy ${nombre} de ${barrio}, necesito ${servicioActual} para ${equipo}`,'user');
  hablar(`Listo ${nombre}, ya te agendé para ${servicioActual} en ${barrio}. Te vamos a llamar para confirmar el horario. Gracias por elegir Bajo Cero Refrigeración.`);
  const lista = document.getElementById('listaPedidos');
  lista.style.display='block';
  lista.innerHTML = `<b>📋 PEDIDOS GUARDADOS (${pedidos.length})</b><br>` + pedidos.join('<br><br>');
  document.getElementById('formDatos').style.display='none';
}

// Reconocimiento de voz
function escuchar(){
  if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
    alert('Tu navegador no soporta micrófono. Usá Chrome en Android/PC y tocá los botones.');
    return;
  }
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Rec();
  rec.lang = 'es-AR';
  rec.interimResults = false;
  hablar('Hola Te escucho Soy Evelyn Mailen tu asistente virtual elige una opción o háblame');
  addMsg('🎤 Escuchando... hablá ahora','bot');
  rec.onresult = (e)=>{
    const texto = e.results[0][0].transcript.toLowerCase();
    addMsg(texto,'user');
    if(texto.includes('no enfr') || texto.includes('no anda') || texto.includes('repar')) elegir('reparacion');
    else if(texto.includes('instal') || texto.includes('colocar') || texto.includes('nuevo')) elegir('instalacion');
    else if(texto.includes('limpieza') || texto.includes('manten') || texto.includes('service')) elegir('mantenimiento');
    else if(texto.includes('precio') || texto.includes('cuanto') || texto.includes('presupuesto')) elegir('presupuesto');
    else hablar('No te entendí bien, ¿necesitás reparación, instalación o mantenimiento? Tocá una opción.');
  };
  rec.start();
}

// Auto-atender a los 3 segundos cuando se abre (para demo)
setTimeout(()=>{ if(document.getElementById('btnAtender').style.display!=='none') atender(); }, 3000);
