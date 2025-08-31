
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


export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector)

    document.addEventListener('contextmenu', event => {
      event.preventDefault()
      this.open(event.pageX, event.pageY)
    })
  }

  open(x, y) {
    if (this.items.length === 0) return

    this.el.innerHTML = ''
    this.items.forEach(module => {
      this.el.innerHTML += module.toHTML()
    })

    this.el.style.left = `${x}px`
    this.el.style.top = `${y}px`
    this.el.style.display = 'block'

    // добавляем обработчики для каждого li
    this.el.querySelectorAll('.menu-item').forEach(li => {
      li.addEventListener('click', () => {
        const module = this.items.find(m => m.type === li.dataset.type)
        if (module) module.trigger()
        this.close()
      })
    })
  }

  close() {
    this.el.style.display = 'none'
  }

  add(module) {
    this.items.push(module)
  }
  }

export default class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);
        this.modules = [];
    }

    open(x, y) {
        if(this.modules.length === 0) {
            return
        }

        this.el.innerHTML = '';

        this.modules.forEach(module => {
            this.el.insertAdjacentHTML('beforeend', module.toHTML());
        })

        this.el.style.top = y + 'px';
        this.el.style.left = x + 'px';
        this.el.classList.add('open');

        this.el.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;
                const mod = this.modules.find(m => m.type === type);
                if(mod) {
                    mod.trigger();
                }
                this.close();
            })
        })
    }
    
    close() {
        this.el.classList.remove('open');
    }

    add(module) {
        this.modules.push(module);
    }
}

