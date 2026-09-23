// export function initDropdowns() {
//    const dropdowns = document.querySelectorAll('.js-dropdown-wrap');

//    dropdowns.forEach(wrap => {
//       const input = wrap.querySelector('.input');
//       const list = wrap.querySelector('.custom-datalist');
//       const items = Array.from(wrap.querySelectorAll('.custom-datalist li'));
//       let currentIdx = -1; // Индекс текущего подсвеченного элемента
//       let isClicking = false; // Флаг для предотвращения конфликта focus/click

//       // 1. Функция закрытия всех ОСТАЛЬНЫХ дропдаунов на странице
//       const closeOthers = () => {
//          dropdowns.forEach(otherWrap => {
//             if (otherWrap !== wrap) {
//                const otherInput = otherWrap.querySelector('.input');
//                const otherList = otherWrap.querySelector('.custom-datalist');
//                otherWrap.classList.remove('is-open');
//                if (otherInput) otherInput.setAttribute('aria-expanded', 'false');
//                if (otherList) otherList.hidden = true;
//             }
//          });
//       };

//       // 2. Функция изменения состояния текущего дропдауна (CSS + ARIA)
//       const toggleState = (isOpen) => {
//          if (isOpen) {
//             closeOthers(); // Закрываем чужие перед открытием своего
//             wrap.classList.add('is-open');
//             if (input) input.setAttribute('aria-expanded', 'true');
//             if (list) list.hidden = false;
//          } else {
//             wrap.classList.remove('is-open');
//             if (input) input.setAttribute('aria-expanded', 'false');
//             if (list) list.hidden = true;
//             currentIdx = -1; // Сбрасываем индекс подсветки
//             items.forEach(item => item.classList.remove('is-active'));
//          }
//       };

//       // 3. Функция подсветки элементов при навигации стрелками
//       const highlightOption = (index) => {
//          items.forEach(item => item.classList.remove('is-active'));

//          if (index >= 0 && index < items.length) {
//             items[index].classList.add('is-active');
//             items[index].scrollIntoView({ block: 'nearest' }); // Прокрутка к элементу, если есть скроллбары

//             // Передаем ID активного элемента скринридерам для доступности
//             if (items[index].id && input) {
//                input.setAttribute('aria-activedescendant', items[index].id);
//             }
//          } else if (input) {
//             input.removeAttribute('aria-activedescendant');
//          }
//       };

//       // === ТРИГГЕРЫ НА ОТКРЫТИЕ И ЗАКРЫТИЕ ===

//       if (input) {
//          // Отслеживаем нажатие мыши, чтобы фокус понимал, откуда он пришел
//          input.addEventListener('mousedown', () => {
//             isClicking = true;
//          });

//          // Открытие при переходе по TAB (Фокус с клавиатуры)
//          input.addEventListener('focus', () => {
//             if (!isClicking) {
//                toggleState(true);
//             }
//             isClicking = false; // Сбрасываем флаг
//          });

//          // Переключение состояния (открытие/закрытие) при клике мыши по самому инпуту
//          input.addEventListener('click', (e) => {
//             e.stopPropagation(); // Чтобы клик не всплывал на контейнер wrap
//             isClicking = false; // Сбрасываем флаг

//             const isOpen = wrap.classList.contains('is-open');
//             toggleState(!isOpen); // Если открыт — закроет, если закрыт — откроет
//          });

//          // Открытие при вводе текста пользователем
//          input.addEventListener('input', () => {
//             toggleState(true);
//          });
//       }

//       // Клик по контейнеру (например, по стрелочке-иконке справа)
//       wrap.addEventListener('click', (event) => {
//          if (event.target.tagName === 'LI') return;
//          const currentlyOpen = wrap.classList.contains('is-open');
//          toggleState(!currentlyOpen);
//       });

//       // === ВЫБОР ЭЛЕМЕНТА МЫШЬЮ ===
//       items.forEach((item) => {
//          item.addEventListener('click', (e) => {
//             e.stopPropagation(); // Чтобы клик не вызывал повторное открытие через wrap
//             if (input) {
//                input.value = item.textContent.trim();
//             }
//             toggleState(false);
//          });
//       });

//       // === НАВИГАЦИЯ С КЛАВИАТУРЫ (Фокус на input) ===
//       if (input) {
//          input.addEventListener('keydown', (event) => {
//             const isOpen = wrap.classList.contains('is-open');

//             if (event.key === 'ArrowDown') {
//                event.preventDefault(); // Отменяем скролл всей страницы браузера

//                if (!isOpen) {
//                   toggleState(true);
//                }

//                currentIdx = currentIdx + 1;
//                if (currentIdx >= items.length) {
//                   currentIdx = 0; // Возвращаемся в начало списка
//                }
//                highlightOption(currentIdx);
//             }

//             if (event.key === 'ArrowUp') {
//                event.preventDefault();

//                if (!isOpen) {
//                   toggleState(true);
//                }

//                currentIdx = currentIdx - 1;
//                if (currentIdx < 0) {
//                   currentIdx = items.length - 1; // Переходим в конец списка
//                }
//                highlightOption(currentIdx);
//             }

//             if (event.key === 'Enter') {
//                if (isOpen && currentIdx >= 0) {
//                   event.preventDefault(); // Запрещаем отправку формы по Enter
//                   input.value = items[currentIdx].textContent.trim();
//                   toggleState(false);
//                }
//             }

//             if (event.key === 'Escape') {
//                if (isOpen) {
//                   event.preventDefault();
//                   toggleState(false);
//                }
//             }

//             if (event.key === 'Tab') {
//                // Фиксируем выбранный элемент, если список открыт и закрываем его
//                if (isOpen && currentIdx >= 0) {
//                   input.value = items[currentIdx].textContent.trim();
//                }
//                toggleState(false);
//             }
//          });
//       }

//       // === ВАЛИДАЦИЯ УЧАСТНИКОВ ===
//       if (input && input.id === 'Participants') {
//          input.addEventListener('input', (e) => {
//             e.target.value = e.target.value.replace(/[^0-9]/g, '');
//          });
//       }
//    });

//    // === КЛИК ВНЕ ДРОПДАУНА (ЗАКРЫТИЕ ВСЕХ СПИСКОВ) ===
//    document.addEventListener('click', (event) => {
//       dropdowns.forEach(wrap => {
//          if (!wrap.contains(event.target)) {
//             const input = wrap.querySelector('.input');
//             const list = wrap.querySelector('.custom-datalist');

//             wrap.classList.remove('is-open');
//             if (input) input.setAttribute('aria-expanded', 'false');
//             if (list) list.hidden = true;
//          }
//       });
//    });
// }

export function initDropdowns() {
  const dropdowns = document.querySelectorAll('.js-dropdown-wrap');
  const OPEN_UP_CLASS = 'is-open--up';

  // Сброс позиции списка
  function resetPosition(list) {
    if (!list) return;
    list.style.position = '';
    list.style.top = '';
    list.style.bottom = '';
    list.style.left = '';
    list.style.width = '';
    list.style.zIndex = '';
    list.style.display = '';
  }

  // Приведение позиции к нужной и возврат к дефолту
  function adjustPosition(wrap, input, list) {
    if (!wrap || !input || !list) return;

    // Ensure we can measure height
    list.style.display = 'flex';
    // Пробное измерение текущей высоты (если она ещё не рассчитана, задаём запасной)
    let listHeight = list.offsetHeight;
    if (listHeight <= 0) listHeight = 210; // запас по умолчанию

    const rect = input.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const inputHeight = input.offsetHeight;
    const inputLeft = input.offsetLeft;
    const inputWidth = input.offsetWidth;

    // Позиционирование внутри обёртки
    // Обязательно сделаем обёртку относительной, чтобы абсолютное позиционирование работало
    const wrapStylePos = getComputedStyle(wrap).position;
    if (wrapStylePos === '' || wrapStylePos === 'static') {
      wrap.style.position = 'relative';
    }

    // Сначала считаем открытие вниз (по умолчанию)
    list.style.position = 'absolute';
    list.style.left = inputLeft + 'px';
    list.style.width = inputWidth + 'px';
    list.style.top = (inputHeight) + 'px';
    list.style.bottom = '';
    wrap.classList.remove(OPEN_UP_CLASS);

    // Если места снизу недостаточно, пробуем открыть вверх
    if (spaceBelow < listHeight && spaceAbove >= listHeight) {
      // Открыть вверх: позиционируем относительно верхней грани input
      list.style.top = (-listHeight) + 'px';
      list.style.bottom = '';
      wrap.classList.add(OPEN_UP_CLASS);
    }

    // Если всё равно нет места, оставляем вниз (fallback)
    // (у нас уже установлен downward в начале)
  }

  // Основной обработчик для каждого дропдауна
  dropdowns.forEach(wrap => {
    const input = wrap.querySelector('.input');
    const list = wrap.querySelector('.custom-datalist');
    const items = Array.from(wrap.querySelectorAll('.custom-datalist li'));
    let currentIdx = -1;
    let isClicking = false;

    // Закрытие всех остальных дропдаунов
    const closeOthers = () => {
      dropdowns.forEach(otherWrap => {
        if (otherWrap !== wrap) {
          const otherInput = otherWrap.querySelector('.input');
          const otherList = otherWrap.querySelector('.custom-datalist');
          otherWrap.classList.remove('is-open');
          if (otherInput) otherInput.setAttribute('aria-expanded', 'false');
          if (otherList) otherList.hidden = true;
          resetPosition(otherList);
        }
      });
    };

    // Смена состояния дропдауна
    const toggleState = (open) => {
      if (open) {
        closeOthers();
        wrap.classList.add('is-open');
        if (input) input.setAttribute('aria-expanded', 'true');
        if (list) {
          list.hidden = false;
          adjustPosition(wrap, input, list);
        }
      } else {
        wrap.classList.remove('is-open');
        if (input) input.setAttribute('aria-expanded', 'false');
        if (list) {
          list.hidden = true;
          resetPosition(list);
        }
        currentIdx = -1;
        items.forEach(i => i.classList.remove('is-active'));
      }
    };

    const highlightOption = (idx) => {
      items.forEach(i => i.classList.remove('is-active'));
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add('is-active');
        items[idx].scrollIntoView({ block: 'nearest' });
        if (input && items[idx].id) input.setAttribute('aria-activedescendant', items[idx].id);
      } else if (input) {
        input.removeAttribute('aria-activedescendant');
      }
    };

    // Инициализация обработчиков
    if (input) {
      input.addEventListener('mousedown', () => {
        isClicking = true;
      });

      input.addEventListener('focus', () => {
        if (!isClicking) toggleState(true);
        isClicking = false;
        adjustPosition(wrap, input, list);
      });

      input.addEventListener('click', (e) => {
        e.stopPropagation();
        isClicking = false;
        const isOpen = wrap.classList.contains('is-open');
        toggleState(!isOpen);
        if (!isOpen) adjustPosition(wrap, input, list);
      });

      input.addEventListener('input', () => {
        toggleState(true);
        adjustPosition(wrap, input, list);
      });
    }

    // Клик по контейнеру
    wrap.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') return;
      const currentlyOpen = wrap.classList.contains('is-open');
      toggleState(!currentlyOpen);
      if (!currentlyOpen) adjustPosition(wrap, input, list);
    });

    // Выбор элемента мышью
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (input) input.value = item.textContent.trim();
        toggleState(false);
      });
    });

    // Навигация клавиатурой
    if (input) {
      input.addEventListener('keydown', (event) => {
        const isOpen = wrap.classList.contains('is-open');

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (!isOpen) toggleState(true);
          currentIdx = currentIdx + 1;
          if (currentIdx >= items.length) currentIdx = 0;
          highlightOption(currentIdx);
          adjustPosition(wrap, input, list);
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (!isOpen) toggleState(true);
          currentIdx = currentIdx - 1;
          if (currentIdx < 0) currentIdx = items.length - 1;
          highlightOption(currentIdx);
          adjustPosition(wrap, input, list);
        }

        if (event.key === 'Enter') {
          if (isOpen && currentIdx >= 0) {
            event.preventDefault();
            input.value = items[currentIdx].textContent.trim();
            toggleState(false);
            resetPosition(list);
          }
        }

        if (event.key === 'Escape') {
          if (isOpen) {
            event.preventDefault();
            toggleState(false);
            resetPosition(list);
          }
        }

        if (event.key === 'Tab') {
          if (isOpen && currentIdx >= 0) {
            input.value = items[currentIdx].textContent.trim();
          }
          toggleState(false);
          resetPosition(list);
        }
      });
    }

    // Валидация УЧАСТНИКОВ (как и было)
    if (input && input.id === 'Participants') {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
    }

    // Глобальные клики: закрыть открытые
    document.addEventListener('click', (event) => {
      dropdowns.forEach(wrapEl => {
        if (!wrapEl.contains(event.target)) {
          const inp = wrapEl.querySelector('.input');
          const lst = wrapEl.querySelector('.custom-datalist');
          wrapEl.classList.remove('is-open');
          if (inp) inp.setAttribute('aria-expanded', 'false');
          if (lst) {
            lst.hidden = true;
            resetPosition(lst);
          }
        }
      });
    });

    // Обновление позиций при изменении окна/скролле
    const onGlobalChange = () => {
      if (wrap.classList.contains('is-open')) {
        adjustPosition(wrap, input, list);
      }
    };
    window.addEventListener('resize', onGlobalChange);
    window.addEventListener('scroll', onGlobalChange);
  });
}
