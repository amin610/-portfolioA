import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// تسجيل مكتبة ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // تأكيد ثبات ووضوح جميع بطاقات المشاريع والمهارات فوراً لمنع أي اختفاء
    gsap.set('.project-card, .analytics-card, .skill-category, .about-card', { opacity: 1, y: 0 });

    // 1. أنيميشن القسم الرئيسي (Hero Section) عند التحميل
    const heroTimeline = gsap.timeline();

    heroTimeline.from('.pill-tag', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    })
    .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-banner-card', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6');

    // 2. عداد الإحصائيات المتحرك عند الوصول إليه بالتمرير
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        gsap.to(stat, {
            scrollTrigger: { 
                trigger: stat, 
                start: 'top 85%' 
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 0.1 },
            onUpdate: function () {
                if (target === 6.5) {
                    stat.innerHTML = `$${parseFloat(stat.innerText).toFixed(1)}M+`;
                } else {
                    stat.innerHTML = `${Math.ceil(stat.innerText)}%`;
                }
            }
        });
    });

    // 3. نظام تبديل اللغات (English / Arabic) بسلاسة كاملة
    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = 'en';

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        langToggleBtn.textContent = currentLang === 'en' ? 'العربية / AR' : 'English / EN';

        const translatableElements = document.querySelectorAll('[data-en]');
        translatableElements.forEach(el => {
            if (currentLang === 'ar' && el.getAttribute('data-ar')) {
                el.textContent = el.getAttribute('data-ar');
            } else if (currentLang === 'en' && el.getAttribute('data-en')) {
                el.textContent = el.getAttribute('data-en');
            }
        });
    });

});
// ==========================================
// نظام تبديل اللغات (English / Arabic)
// ==========================================
const langToggleBtn = document.getElementById('langToggle');

if (langToggleBtn) {
    let currentLang = 'en';

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        
        // تغيير اتجاه ولغة الصفحة
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        
        // تغيير نص الزر نفسه
        langToggleBtn.textContent = currentLang === 'en' ? 'العربية / AR' : 'English / EN';

        // ترجمة جميع العناصر التي تحمل سمات data-en و data-ar
        const translatableElements = document.querySelectorAll('[data-en]');
        translatableElements.forEach(el => {
            if (currentLang === 'ar' && el.getAttribute('data-ar')) {
                el.textContent = el.getAttribute('data-ar');
            } else if (currentLang === 'en' && el.getAttribute('data-en')) {
                el.textContent = el.getAttribute('data-en');
            }
        });
    });
}