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
 * UNGDR - United Geneve for Disaster Response
 * نظام إدارة الموارد البشرية والمتطوعين - الإصدار 2.0
 */

// 1. قاعدة بيانات المستخدمين المعتمدة (Simulation)
const AUTH_DB = [
    { user: "arwa", pass: "123", role: "أروى أبوقادوس", access: "full" },
    { user: "hr", pass: "456", role: "مدير شؤون الموظفين", access: "hr" },
    { user: "v", pass: "ab12", role: "منسق المتطوعين", access: "volunteers" }
];

// 2. إدارة عملية تسجيل الدخول (Login Logic)
function validateAccess(event) {
    event.preventDefault(); // منع تحديث الصفحة 
    
    const userField = document.getElementById('userInput');
    const passField = document.getElementById('passInput');
    const errorMsg = document.getElementById('errorMessage');
    const loginCard = document.getElementById('loginSection');
    const dashboard = document.getElementById('dashboardSection');

    // البحث عن المطابقة في "قاعدة البيانات"
    const account = AUTH_DB.find(u => u.user === userField.value && u.pass === passField.value);

    if (account) {
        // في حال النجاح: انتقال بصري سلس
        errorMsg.classList.add('hidden');
        loginCard.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        // تخصيص رسالة الترحيب
        document.getElementById('userDisplay').innerText = `${account.role}: ${account.user}`;
        
        console.log(`تم تسجيل دخول ${account.role} بنجاح.`);
    } else {
        // في حال الفشل: إظهار رسالة الخطأ وتنبيه بصري بالأحمر القاني 
        errorMsg.classList.remove('hidden');
        passField.value = ""; // مسح كلمة المرور للأمان
        passField.classList.add('border-deepRed');
    }
}

// 3. نظام التنقل بين التبويبات الإدارية (Tab Switcher)
function switchTab(tabId) {
    // إخفاء كافة المحتويات
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.add('hidden'));

    // إلغاء تفعيل كافة الأزرار بصرياً
    const allButtons = document.querySelectorAll('nav button');
    allButtons.forEach(btn => btn.classList.remove('tab-active', 'border-deepRed', 'text-navyDark'));
    allButtons.forEach(btn => btn.classList.add('text-gray-500', 'border-transparent'));

    // إظهار التبويب المطلوب وتفعيله
    const targetTab = document.getElementById(tabId);
    const targetBtn = document.getElementById('btn-' + tabId);
    
    targetTab.classList.remove('hidden');
    targetBtn.classList.add('tab-active', 'border-deepRed', 'text-navyDark');
    targetBtn.classList.remove('text-gray-500', 'border-transparent');
}

// 4. معالجة طلبات المتقدمين (Applicants Management)
let pendingCount = 2; // عداد تجريبي

function resolveApplicant(rowId, isAccepted) {
    const row = document.getElementById(rowId);
    const badge = document.getElementById('badgeCount');

    if (isAccepted) {
        alert("إجراء إداري: تم قبول الطلب ونقله إلى قاعدة بيانات الموظفين.");
    } else {
        alert("إجراء إداري: تم رفض الطلب وأرشفته.");
    }

    // حذف الصف بتأثير بصري
    row.style.opacity = '0';
    setTimeout(() => {
        row.remove();
        pendingCount--;
        
        // تحديث شارة الإشعارات (Badge)
        if (pendingCount > 0) {
            badge.innerText = pendingCount;
        } else {
            badge.style.display = 'none';
        }
    }, 300);
}

// 5. إضافة موظف جديد إلى قاعدة البيانات (HR Database Injection)
function addEmployee(event) {
    event.preventDefault();
    
    const name = document.getElementById('empName').value;
    const role = document.getElementById('empRole').value;
    const dept = document.getElementById('empDept').value;
    const tableBody = document.getElementById('employeeTableBody');

    // إنشاء رقم وظيفي عشوائي يحاكي النظام الرسمي [cite: 7]
    const randomID = Math.floor(1000 + Math.random() * 9000);

    const newRow = `
        <tr class="bg-blue-50 border-b border-gray-100 transition-all duration-500">
            <td class="p-3 font-mono text-gray-400">#EMP-2026-${randomID}</td>
            <td class="p-3 font-bold text-navyDark">${name}</td>
            <td class="p-3">${role}</td>
            <td class="p-3">${dept}</td>
        </tr>
    `;

    // إدراج الموظف في أعلى الجدول
    tableBody.insertAdjacentHTML('afterbegin', newRow);

    // إعادة تصفير النموذج
    event.target.reset();
}

// 6. تسجيل الخروج الآمن
function executeLogout() {
    if (confirm("هل أنت متأكد من تسجيل الخروج من منظومة UNGDR؟")) {
        location.reload(); // إعادة تحميل الصفحة للعودة لحالة الأمان الأولى
    }
}
