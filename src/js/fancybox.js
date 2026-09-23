// src/scripts/fancybox.js
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function initFancybox() {
   Fancybox.bind("[data-fancybox]", {
      Hash: false,
   });
}