// src/scripts/mobileSlider.js
import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export function createMobileSlider({ containerSelector, wrapperSelector, slidesSelector, mediaQuery, swiperOptions }) {
   let swiperInstance = null;
   const query = window.matchMedia(mediaQuery);

   function toggleSlider() {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const wrapper = container.querySelector(wrapperSelector);
      const slides = container.querySelectorAll(slidesSelector);
      if (!wrapper) return;

      if (query.matches) {
         // Включаем на мобильных
         container.classList.add('swiper');
         wrapper.classList.add('swiper-wrapper');
         slides.forEach(slide => slide.classList.add('swiper-slide'));

         if (!swiperInstance) {
            // ВАЖНО: передаем сам DOM-элемент container, а не строку!
            // Также подмешиваем Autoplay в модули, чтобы настройки autoplay управлялись
            swiperInstance = new Swiper(container, {
               ...swiperOptions,
               modules: [Autoplay, ...(swiperOptions.modules || [])]
            });
         }
      } else {
         // Выключаем на десктопе
         if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
         }
         container.classList.remove('swiper');
         wrapper.classList.remove('swiper-wrapper');
         slides.forEach(slide => slide.classList.remove('swiper-slide'));

         // Полностью сбрасываем инлайн-стили, которые Swiper оставляет на слайдах
         slides.forEach(slide => slide.removeAttribute('style'));
         wrapper.removeAttribute('style');
      }
   }

   // Инициализация при старте
   toggleSlider();

   // Отслеживание смены брейкпоинта
   query.addEventListener('change', toggleSlider);
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ НАШИХ СЛАЙДЕРОВ
// ==========================================
export function initSliders() {
   // 1. Блог (до 768px)
   createMobileSlider({
      containerSelector: '.js-blog-slider',
      wrapperSelector: '.js-blog-wrapper',
      slidesSelector: '.js-blog-slide',
      mediaQuery: '(max-width: 768px)',
      swiperOptions: {
         slidesPerView: 'auto',
         spaceBetween: 24,
         grabCursor: true,
         loop: false,
         speed: 800,
         autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
         },
      }
   });

   // 2. Направления (до 1024px)
   createMobileSlider({
      containerSelector: '.js-destination-slider',
      wrapperSelector: '.js-destination-wrapper',
      slidesSelector: '.js-destination-slide',
      mediaQuery: '(max-width: 768px)', // можно изменить на нужный брейк
      swiperOptions: {
         slidesPerView: 'auto',
         spaceBetween: 20,
         loop: false,
         grabCursor: true,
         speed: 800,
         autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
         },
      }
   });

   // 3. Галерея (до 768px)
   createMobileSlider({
      containerSelector: '.js-gallery-slider',
      wrapperSelector: '.js-gallery-wrapper',
      slidesSelector: '.js-gallery-slide',
      mediaQuery: '(max-width: 768px)',
      swiperOptions: {
         slidesPerView: 'auto',
         spaceBetween: 20,
         loop: false,
         grabCursor: true,
         speed: 800,
         autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
         },
      }
   });
}