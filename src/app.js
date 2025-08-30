import "./styles.css";
import { ContextMenu } from "./menu";
import { Module } from "./core/module";
import { RandomSoundModule } from "./modules/random-sound";

// Простые тестовые модули
class TestModule1 extends Module {
  constructor() {
    super("test1", "Module 1");
  }

  trigger() {
    alert("Сработал Module 1!");
    console.log("Module 1 активирован");
  }
}

class TestModule2 extends Module {
  constructor() {
    super("test2", "Module 2");
  }

  trigger() {
    alert("Сработал Module 2!");
    console.log("Module 2 активирован");
  }
}

const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new TestModule1());
contextMenu.add(new TestModule2());
contextMenu.add(new RandomSoundModule());
