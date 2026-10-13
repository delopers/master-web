const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});
const track = document.getElementById('track');
const slides = [...track.children];
const dotsWrap = document.getElementById('dots');
let index = 0;

slides.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
});
const dots = [...dotsWrap.children];

function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}
document.getElementById('prev').addEventListener('click', () => go(index - 1));
document.getElementById('next').addEventListener('click', () => go(index + 1));

let auto = setInterval(() => go(index + 1), 4000);
track.addEventListener('mouseenter', () => clearInterval(auto));
track.addEventListener('mouseleave', () => auto = setInterval(() => go(index + 1), 4000));

let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(index + (diff > 0 ? 1 : -1));
});

console.log('%c AGUSTIN MOREL - SERVICE DOMEC 🔧 ', 'background:#E30613;color:#fff;padding:10px;font-size:16px;font-weight:900;border-radius:8px');