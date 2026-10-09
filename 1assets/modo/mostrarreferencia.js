const hero = document.querySelector('.hero h1');
const heroP = document.querySelector('.hero p');

document.querySelectorAll('div a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('div a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    const texto = link.textContent.trim();

    if (texto.includes('Referencia')) {
      document.querySelector('.hero').style.filter = 'hue-rotate(90deg)';
      hero.innerText = 'Garantia y Confianza que Acompañan nuestro servicios';
      heroP.innerText = 'Reparación especializada en todo tipo de cocinas y anafes: Ariston, Domec, Drean, Escorial, Florencia, Mabe y Whirlpool. Más de 10 años de experiencia.';
    }
  });
});