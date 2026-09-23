// src/scripts/cards.js
export function initCardInteractions() {
   const cardFooters = document.querySelectorAll('.destination__card-footer');
   cardFooters.forEach(footer => {
      footer.addEventListener('click', () => {
         footer.classList.toggle('destination__card-footer--active');
      });
   });

   const cardButtons = document.querySelectorAll('.destination__card-btn');
   cardButtons.forEach(button => {
      button.addEventListener('click', event => {
         event.stopPropagation();
      });
   });
}