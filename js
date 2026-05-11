document.getElementById('cta-btn').addEventListener('click', function() {
    alert('Loading latest mission reports from the United Geneve database...');
    console.log('User requested mission updates.');
});

// Simple scroll effect for navigation
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 5%';
    } else {
        header.style.padding = '1rem 5%';
    }
});
