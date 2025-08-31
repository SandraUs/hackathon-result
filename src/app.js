import './styles.css'
import { ContextMenu } from './menu.js'
import { ShapeModule } from './modules/shape.module.js'

const menu = new ContextMenu('#menu')

menu.add(new ShapeModule())

