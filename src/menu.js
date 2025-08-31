import {Menu} from './core/menu'

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
