import {Module} from '../core/module';

export class BackgroundDefaultModule extends Module{// type: background-default, text: Стандартный цвет
  trigger() {
    const defaultColorBackground = '#fff';
    document.body.style.background = defaultColorBackground;
  }
}
