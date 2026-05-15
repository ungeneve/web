// تغيير شفافية النافبار عند التمرير
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
    } else {
        nav.style.padding = '15px 0';
    }
});

/**
 * UNGDR Unified Dashboard Engine v2.0
 * التحقق من الهوية وإدارة الأقسام الإدارية والمالية
 */

// 1. قاعدة بيانات المستخدمين المعتمدة (قاعدة بيانات ثابتة للعرض)
const USERS_DB = {
    "arwa": { pass: "123", role: "إدارة النظام", access: "full" },
    "abd": { pass: "456", role: "منسق ميداني", access: "field" },
    "hatem": { pass: "789", role: "المسؤول المالي", access: "finance" }
};

// 2. دالة معالجة الدخول (Login Logic)
function handleLogin(event) {
    event.preventDefault();
    
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value;
    const errorBox = document.getElementById('loginError');

    // التحقق من المطابقة [cite: 19]
    if (USERS_DB[u] && USERS_DB[u].pass === p) {
        errorBox.classList.add('hidden');
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.remove('hidden');
        
        // عرض اسم المستخدم ودوره الوظيفي في الهيدر
        document.getElementById('userGreeting').innerText = `مرحباً، ${u} (${USERS_DB[u].role})`;
        
        // تهيئة القسم الافتراضي (إدارة المتطوعين)
        showTab('volunteers');
    } else {
        // إظهار تنبيه باللون الأحمر القاني حسب الهوية [cite: 10]
        errorBox.classList.remove('hidden');
        errorBox.innerText = "بيانات الدخول غير صحيحة، يرجى التحقق.";
    }
}

// 3. نظام التنقل الديناميكي بين الأقسام (Tab Manager)
function showTab(tabId) {
    // إخفاء جميع الأقسام [cite: 20]
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // إعادة ضبط مظهر أزرار القائمة
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('tab-active', 'text-navyDark');
        btn.classList.add('text-gray-500');
    });

    // إظهار القسم المطلوب وتفعيل الزر الخاص به [cite: 18, 19]
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    const activeBtn = document.getElementById('btn-' + tabId);
    activeBtn.classList.add('tab-active', 'text-navyDark');
    activeBtn.classList.remove('text-gray-500');
}

// 4. إدارة المتطوعين وطلبات الانتظار
function processApplication(applicantId, status) {
    const statusMsg = status === 'approve' ? 'تم قبول المتطوع بنجاح' : 'تم رفض الطلب وأرشفته';
    alert(`إجراء UNGDR: ${statusMsg}`);
    
    // محاكاة حذف الصف من القائمة بعد الإجراء
    const element = document.getElementById(applicantId);
    if (element) element.remove();
}

// 5. محاكاة التقارير والبيانات المالية 
const financeData = {
    totalBudget: 500000,
    expenses: [
        { item: "معدات إغاثة ميدانية", cost: 15000 },
        { item: "رواتب الكادر الأساسي", cost: 45000 }
    ]
};

console.log("نظام UNGDR جاهز للعمل المكتبي.");
