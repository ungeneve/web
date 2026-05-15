// تغيير شفافية النافبار عند التمرير
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
    } else {
        nav.style.padding = '15px 0';
    }
});

console.log("United Geneve Site Loaded Successfully");

function executeLogin(event) {
    event.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const errBox = document.getElementById('loginError');

    // تحديد بيانات دخول صارمة للمحاكاة
    if(user === "admin" && pass === "123") {
        errBox.classList.add('hidden');
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.remove('hidden');
        document.getElementById('userDisplay').innerText = user;
    } else {
        // إظهار رسالة الخطأ إذا كانت البيانات غير مطابقة
        errBox.classList.remove('hidden');
    }
}
