import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";

export function initCalendar() {
   const dateInput = document.getElementById("DateCamp");
   const inputBtn = document.querySelector(".header__camp-date-wrap .input-btn");

   // Проверяем, есть ли элемент на странице (чтобы не было ошибок на других страницах)
   if (!dateInput) return;

   // Инициализируем flatpickr в режиме диапазона
   const fp = flatpickr(dateInput, {
      mode: "range",
      dateFormat: "d.m.Y",
      locale: Russian,
      allowInput: true,
      minDate: "today",
      showMonths: 2,
      // Исключаем кнопку из закрытия: клики по ней Flatpickr больше не будет считать "кликом вовне"
      ignoredFocusElements: [inputBtn] 
   });

   // Открытие и закрытие календаря при клике на иконку
   if (inputBtn) {
      inputBtn.addEventListener("click", (e) => {
         e.stopPropagation(); // Останавливаем всплытие, чтобы документ не закрывал календарь
         fp.toggle();         // Переключаем состояние: открывает, если закрыт; закрывает, если открыт
      });
   }
}



