export class Menu {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.modules = [];

    // Закрытие меню при клике вне его
    document.body.addEventListener("click", (event) => {
      if (event.target.offsetParent !== this.el) {
        this.close();
      }
    });

    // Обработка кликов по элементам меню
    this.el.addEventListener("click", (event) => {
      const menuItem = event.target.closest(".menu-item");
      if (menuItem) {
        const moduleType = menuItem.dataset.type;
        const module = this.modules.find((m) => m.type === moduleType);
        if (module) {
          module.trigger();
          this.close();
        }
      }
    });
  }

  open(x, y) {
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
    this.el.classList.add("open");
  }

  close() {
    this.el.classList.remove("open");
  }

  add(module) {
    this.modules.push(module);
    this.render();
  }

  render() {
    this.el.innerHTML = this.modules.map((module) => module.toHTML()).join("");
  }
}
