// 1. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.padding = '0.8rem 0';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.padding = '1.25rem 0';
        nav.style.background = 'rgba(255, 255, 255, 0.7)';
    }
});

// 2. Statistics Counter Animation
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = 200; 
        const inc = target / speed;

        if (count < target) {
            stat.innerText = Math.ceil(count + inc);
            setTimeout(animateStats, 1);
        } else {
            stat.innerText = target;
        }
    });
};

// Trigger counter when visible
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) animateStats();
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats'));
