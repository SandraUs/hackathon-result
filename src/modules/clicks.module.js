import {Module} from '../core/module'

export class ClicksModule extends Module {
constructor() {
    this.duration = 3000
    this.countClick = 0
    this.tracking = false
    this.clickHandlerBind = this.trackClick.bind(this)
    this.container = null
  }
  //Считаем только клик левой кнопкой мыши
  trackClick(event) {
    if(event.button !== 0) return
      this.countClick++
  }

  trigger() {
    this.removeResultsPanel(); 
    this.renderStartPanel();   
  }

  //Стартовая кнопка
  renderStartPanel() {
    const statContainer = document.createElement('div')
    statContainer.className = 'container-start'

    const text = document.createElement('p')
    text.innerHTML = 'Нажмите "Старт", чтобы начать отсчёт кликов <br> ( за 3 секунды )'

    const startBtn = document.createElement('button')
    startBtn.className = 'button-start'
    startBtn.textContent = 'Старт'
    startBtn.addEventListener('click', () => {
      statContainer.remove()
      this.startTracking()
    })
    statContainer.append(text, startBtn)
    document.body.append(statContainer)
  }

  //Запуск отсчета кликов
  startTracking() {
    this.countClick = 0
    this.tracking = true

    //Пропускаем клик на кнопку старт
    setTimeout(() => {
      document.addEventListener('click', this.clickHandlerBind)
    }, 0)

    setTimeout(() => {
      this.stopTracking()
    }, this.duration)
  }


  //Остановка отсчета
  stopTracking() {
    this.tracking = false
    document.removeEventListener('click', this.clickHandlerBind)
    this.showResultsPanel()
  }

  //Вывод изображения за количество кликов
  getAnImageAfterClick() {
    const numberOfClicks = this.countClick
    const images = [
      {img: 'Images_Click_Module/0.jpg', min: 0, max: 0},
      {img: 'Images_Click_Module/1-5.jpg', min: 1, max: 5},
      {img: 'Images_Click_Module/6-10.jpg', min: 6, max: 10},
      {img: 'Images_Click_Module/11-15.jpg', min: 11, max: 15},
      {img: 'Images_Click_Module/16-20.jpg', min: 16, max: 20},
      {img: 'Images_Click_Module/21.jpg', min: 21, max: 10000},
    ]

    const findImage = images.find((result) => {
      return numberOfClicks >= result.min && numberOfClicks <= result.max
    })

    return findImage.img 
  }

  //Создание панеи результатов
  renderResultsPanel() {
    const container = document.createElement('div')
    container.className = 'container-result'


    const textResult = document.createElement('span')
    textResult.className = 'text-result'
    textResult.textContent = `Итого кликов: ${this.countClick}`


    const img = document.createElement('img')
    img.className = 'image-after-click'
    img.src = this.getAnImageAfterClick()


    const closeBtn = document.createElement('button')
    closeBtn.className = 'button-results-panel'
    closeBtn.textContent = 'Закрыть'
    closeBtn.addEventListener('click', () => {
      this.removeResultsPanel()
    })

    container.append(textResult, img, closeBtn)
    return container
  }

  //Вывод панели результатов
  showResultsPanel() {
    this.container = this.renderResultsPanel()
    document.body.append(this.container)
  }

  //Удаление панели результатов
  removeResultsPanel() {
    if(this.container) {
      this.container.remove()
      this.container = null
    }
  }
}
