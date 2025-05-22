/**
 * Универсальный скрипт для переключения темы на всех страницах
 * Этот скрипт гарантирует единообразную работу переключения темы
 * на всех страницах платформы
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Инициализация унифицированного переключателя темы');
    
    // Получаем элемент переключателя темы
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = document.getElementById('theme-icon');
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Применяем сохраненную тему
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку в соответствии с текущей темой
    updateThemeIcon(savedTheme);
    
    // Добавляем обработчик события для переключения темы
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            // Получаем текущую тему
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            // Определяем новую тему
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Применяем новую тему
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Сохраняем тему в localStorage
            localStorage.setItem('theme', newTheme);
            
            // Обновляем иконку
            updateThemeIcon(newTheme);
            
            // Отображаем уведомление о смене темы
            showThemeChangeNotification(newTheme);
            
            console.log('🎨 Тема изменена на:', newTheme);
        });
    } else {
        console.warn('⚠️ Элемент переключателя темы не найден на странице');
    }
    
    // Функция для обновления иконки в соответствии с темой
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Функция для отображения уведомления о смене темы
    function showThemeChangeNotification(theme) {
        // Получаем язык пользователя
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const lang = userData.language || 'kk';
        
        // Определяем текст уведомления в зависимости от языка и темы
        let message;
        if (lang === 'kk') {
            message = theme === 'dark' ? 'Қараңғы тақырып қосылды' : 'Жарық тақырып қосылды';
        } else {
            message = theme === 'dark' ? 'Включена темная тема' : 'Включена светлая тема';
        }
        
        // Создаем элемент уведомления
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'theme-notification';
        notificationDiv.textContent = message;
        notificationDiv.style.position = 'fixed';
        notificationDiv.style.top = '10px';
        notificationDiv.style.right = '10px';
        notificationDiv.style.backgroundColor = theme === 'dark' ? '#333' : '#f0f0f0';
        notificationDiv.style.color = theme === 'dark' ? '#fff' : '#333';
        notificationDiv.style.padding = '10px 15px';
        notificationDiv.style.borderRadius = '4px';
        notificationDiv.style.zIndex = '9999';
        notificationDiv.style.boxShadow = theme === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)';
        document.body.appendChild(notificationDiv);
        
        // Удаляем уведомление через 2 секунды
        setTimeout(() => {
            notificationDiv.style.opacity = '0';
            notificationDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(notificationDiv)) {
                    document.body.removeChild(notificationDiv);
                }
            }, 500);
        }, 2000);
    }
});
