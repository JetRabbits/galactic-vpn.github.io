document.addEventListener('DOMContentLoaded', () => {
    // Internationalization (i18n)
    const translations = {
        en: {
            nav_features: "Features",
            nav_pricing: "Pricing",
            nav_contact: "Contact",
            cta_get_started: "Get Started",
            hero_title: "Explore the Internet <br><span class=\"gradient-text\">Without Limits</span>",
            hero_subtitle: "The fastest, most secure VPN in the galaxy. Protect your data with military-grade encryption while traveling at light speed.",
            hero_cta: "Launch Mission",
            hero_learn_more: "Learn More",
            features_title: "Galactic Features",
            feature_speed_title: "Light Speed",
            feature_speed_desc: "Experience blazing fast connection speeds optimized for streaming and gaming anywhere in the universe.",
            feature_security_title: "Star-Grade Security",
            feature_security_desc: "Your data is locked behind an event horizon of encryption. No one can see what you do.",
            feature_global_title: "Universal Access",
            feature_global_desc: "Connect to servers across the globe. Bypass geo-restrictions like a wormhole.",
            pricing_title: "Choose Your Vessel",
            plan_monthly: "Monthly",
            plan_yearly: "Yearly",
            plan_lifetime: "Lifetime",
            plan_feature_1: "Unlimited Bandwidth",
            plan_feature_2: "5 Devices",
            plan_feature_3: "24/7 Support",
            plan_feature_4: "Dedicated IP",
            plan_select: "Select Plan",
            plan_best_value: "Best Value"
        },
        ru: {
            nav_features: "Возможности",
            nav_pricing: "Цены",
            nav_contact: "Контакты",
            cta_get_started: "Начать",
            hero_title: "Интернет <br><span class=\"gradient-text\">Без Границ</span>",
            hero_subtitle: "Самый быстрый и безопасный VPN в галактике. Защитите свои данные шифрованием военного уровня на световой скорости.",
            hero_cta: "Запустить Миссию",
            hero_learn_more: "Узнать Больше",
            features_title: "Галактические Возможности",
            feature_speed_title: "Световая Скорость",
            feature_speed_desc: "Испытайте молниеносную скорость соединения, оптимизированную для стрииминга и игр в любой точке вселенной.",
            feature_security_title: "Звездная Безопасность",
            feature_security_desc: "Ваши данные скрыты за горизонтом событий шифрования. Никто не увидит, что вы делаете.",
            feature_global_title: "Вселенский Доступ",
            feature_global_desc: "Подключайтесь к серверам по всему миру. Обходите гео-блокировки как кротовую нору.",
            pricing_title: "Выберите Ваш Корабль",
            plan_monthly: "Месячный",
            plan_yearly: "Годовой",
            plan_lifetime: "Пожизненный",
            plan_feature_1: "Безлимитный Трафик",
            plan_feature_2: "5 Устройств",
            plan_feature_3: "Поддержка 24/7",
            plan_feature_4: "Выделенный IP",
            plan_select: "Выбрать План",
            plan_best_value: "Лучший Выбор"
        }
    };

    const userLang = navigator.language || navigator.userLanguage;
    let currentLang = userLang && userLang.toLowerCase().includes('ru') ? 'ru' : 'en';
    const langToggleBtn = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    function updateContent() {
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                // If the translation contains HTML (like <br>), use innerHTML, otherwise textContent
                if (translations[currentLang][key].includes('<')) {
                    el.innerHTML = translations[currentLang][key];
                } else {
                    el.textContent = translations[currentLang][key];
                }
            }
        });
        langToggleBtn.textContent = currentLang === 'en' ? 'RU' : 'EN';
    }

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ru' : 'en';
        updateContent();
    });

    // Initial content update based on detected language
    updateContent();

    // Simple scroll animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Update Copyright Year from External Time API
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
            .then(response => response.json())
            .then(data => {
                const dateTime = new Date(data.datetime);
                yearSpan.textContent = dateTime.getFullYear();
            })
            .catch(error => {
                console.warn('Time API request failed, using system time:', error);
                yearSpan.textContent = new Date().getFullYear();
            });
    }
});
