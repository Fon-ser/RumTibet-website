export function initMobileMenu() {
   const openBtn = document.querySelector('[data-action="open-mobile-menu"]');
   const mobileOverlay = document.getElementById('mobileOverlay'); // <dialog class="mobile-overlay" id="mobileOverlay">

   const isDialog = !!mobileOverlay && typeof mobileOverlay.showModal === 'function';

   function openMobileMenu() {
      if (isDialog) {
         // Используем стандартный API dialog
         mobileOverlay.showModal();
         if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
         return;
      }

      // fallback, если диалог не поддерживается
      if (mobileOverlay) {
         const isOpen = mobileOverlay.classList.toggle('is-open');
         mobileOverlay.style.display = isOpen ? 'block' : 'none';
         mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
         if (openBtn) openBtn.setAttribute('aria-expanded', String(isOpen));
         if (isOpen) {
            const focusable = mobileOverlay.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) focusable.focus();
         }
      }
   }

   function closeMobileMenu() {
      if (isDialog) {
         // Закрыть диалог через API
         mobileOverlay.close();
         // aria-expanded будет сброшен в обработчике события 'close'
         return;
      }

      // fallback закрытие
      if (mobileOverlay) {
         mobileOverlay.classList.remove('is-open');
         mobileOverlay.style.display = 'none';
         mobileOverlay.setAttribute('aria-hidden', 'true');
         if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
         if (openBtn) openBtn.focus();
      }
   }

   if (openBtn) {
      openBtn.addEventListener('click', openMobileMenu);
   }

   // Кнопка внутри overlay для закрытия (если есть)
   const closeBtn = mobileOverlay ? mobileOverlay.querySelector('[data-action="close-mobile-menu"]') : null;
   if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
   }

   // Обработчик закрытия диалога (ESC, clicking Backdrop и т.д.)
   if (mobileOverlay && isDialog) {
      mobileOverlay.addEventListener('close', () => {
         if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
         // вернуть фокус на кнопку открытия
         if (openBtn) openBtn.focus();
      });
   }

   // Обработчик Esc для fallback, если нет диалога
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileOverlay) {
         const isOpenFallback = mobileOverlay.classList.contains('is-open') || mobileOverlay.style.display === 'block';
         if (isOpenFallback) closeMobileMenu();
      }
   });

   window.addEventListener('mobileOverlay:close', closeMobileMenu);
}