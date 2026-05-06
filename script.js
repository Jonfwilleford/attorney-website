window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled')
    }
});

const navToggle = document.querySelector('.nav-toggle');
const navlinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navlinks.classList.toggle('nav-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navlinks.classList.remove('nav-open');
    });
});
