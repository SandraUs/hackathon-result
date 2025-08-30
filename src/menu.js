import { Menu } from "./core/menu";

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);

    // Показываем меню по правому клику
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.open(event.clientX, event.clientY);
    });

    // Закрываем меню по Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }
}
