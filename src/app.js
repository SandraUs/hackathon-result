import { ContextMenu } from './menu.js'
import { ShapeModule } from './modules/shape.module.js'

const menu = new ContextMenu('#menu')

menu.add(new ShapeModule())
import './styles.css';
import './modules/css/timer.css';
import ContextMenu from './menu';
import { TimerModule } from './modules/timer.module';

const menu = new ContextMenu('#menu');
menu.add(new TimerModule());

document.addEventListener('contextmenu', event => {
    event.preventDefault();
    menu.open(event.clientX, event.clientY)
})

document.addEventListener('click', () => {
    menu.close();
})

import './styles.css'
import './modules/css/Click_Module.css'
