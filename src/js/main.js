// src/scripts/main.js
// Подключение глобальных стилей
import '../styles/style.scss';

// Импорт модулей
import { initSliders } from './mobileSlider.js';
import { initDropdowns } from './dropdowns.js';
import { initCalendar } from './calendar.js';
import { initCardInteractions } from './cards.js';
import { initFancybox } from './fancybox.js';
import { initMobileMenu } from './mobileMenu.js';


// Дополнительно: подключение русского языка (по желанию)
import { Russian } from "flatpickr/dist/l10n/ru.js";

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
   initSliders();
   initDropdowns();
   initCalendar();
   initCardInteractions();
   initFancybox();
   initMobileMenu();
});

