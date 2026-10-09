const waBtn = document.getElementById('float-wa');
const numero = '5491167291677';

float - wa.addEventListener('click', () => {
    const msg = encodeURIComponent('Hola Agustin Quiero Coordinar una visita');
    window.open(`https://wa.me/${numero}?text=${msg}`, '_blank');
    waBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.95)' }, { transform: 'scale(1)' }], { duration: 200 });
});

document.querySelectorAll('.f').forEach(el => {
    el.addEventListener('click', () => {
        el.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(.88)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
            { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)' }
        );
        if (navigator.vibrate) navigator.vibrate(50);
    });
});