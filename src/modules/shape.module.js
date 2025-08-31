import {Module} from '../core/module'

export class ShapeModule extends Module {
  constructor() {
    super('shape', 'Случайная фигура') // type и text
  }

  trigger() {
    const shape = document.createElement('div')
    const size = Math.floor(Math.random() * 100 + 30) // 30–130px
    shape.style.width = `${size}px`
    shape.style.height = `${size}px`
    shape.style.position = 'absolute'
    shape.style.left = `${Math.random() * (window.innerWidth - size)}px`
    shape.style.top = `${Math.random() * (window.innerHeight - size)}px`
    shape.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`
    shape.style.borderRadius = Math.random() < 0.5 ? '50%' : '0' // круг или квадрат
    document.body.appendChild(shape)

    setTimeout(() => shape.remove(), 5000)
  }
}