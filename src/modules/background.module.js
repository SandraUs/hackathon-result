export class BackgroundModule extends Module {}
import {Module} from '../core/module'
import {getRandomColor} from "@/utils";

export class BackgroundModule extends Module {// type: background, text: Поменять цвет
  trigger() {
    document.body.style.backgroundImage = getRandomColor();
  }
}
