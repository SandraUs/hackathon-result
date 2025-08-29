import {Menu} from './core/menu';

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