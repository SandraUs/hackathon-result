// src/modules/random-sound.js
import { Module } from "../core/module";

export class RandomSoundModule extends Module {
  constructor() {
    super("random-sound", "🎵 Звуки");
  }

  trigger() {
    this.showPanel();
  }

  showPanel() {
    const oldPanel = document.querySelector(".sound-panel");
    if (oldPanel) {
      oldPanel.remove();
    }

    const panel = document.createElement("div");
    panel.className = "sound-panel";

    panel.innerHTML = `
      <h3>Звуковая панель</h3>
      <button class="close-btn">×</button>
      
      <h4>Ноты</h4>
      <button class="note-btn" data-freq="261">До</button>
      <button class="note-btn" data-freq="293">Ре</button>
      <button class="note-btn" data-freq="329">Ми</button>
      <button class="note-btn" data-freq="349">Фа</button>
      <button class="note-btn" data-freq="392">Соль</button>
      <button class="note-btn" data-freq="440">Ля</button>
      <button class="note-btn" data-freq="494">Си</button>
      
      <h4>Эффекты</h4>
        <button class="effect-btn">Писк</button>
        <button class="effect-btn">Монета</button>
        <button class="effect-btn">Ошибка</button>
        <button class="effect-btn">Успех</button>
        <button class="effect-btn">Лазер</button>

    `;

    document.body.appendChild(panel);
    this.setupButtons(panel);
  }

  setupButtons(panel) {
    // Кнопка закрытия
    const closeBtn = panel.querySelector(".close-btn");
    closeBtn.onclick = () => {
      panel.remove();
    };

    // Кнопки нот
    const noteButtons = panel.querySelectorAll(".note-btn");
    noteButtons.forEach((button) => {
      button.onclick = () => {
        const frequency = button.getAttribute("data-freq");
        this.playNote(frequency);

        button.style.backgroundColor = "#4CAF50";
        setTimeout(() => {
          button.style.backgroundColor = "#2196F3";
        }, 200);
      };
    });

    // Кнопки эффектов
    const effectButtons = panel.querySelectorAll(".effect-btn");
    effectButtons.forEach((button) => {
      button.onclick = () => {
        const effectName = button.textContent;
        this.playEffect(effectName);

        button.style.backgroundColor = "#FF9800";
        setTimeout(() => {
          button.style.backgroundColor = "#9C27B0";
        }, 200);
      };
    });

    // Закрытие при клике вне панели
    setTimeout(() => {
      document.onclick = (event) => {
        if (!panel.contains(event.target)) {
          panel.remove();
          document.onclick = null;
        }
      };
    }, 100);
  }

  // Создание звука определенной частоты
  playNote(frequency) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();

    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    volume.gain.setValueAtTime(0.1, audioContext.currentTime);
    volume.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  // Создание звуковых эффектов
  playEffect(effectName) {
    if (effectName === "Писк") {
      this.playNote(800);
      setTimeout(() => this.playNote(800), 150);
      setTimeout(() => this.playNote(800), 300);
    }

    if (effectName === "Монета") {
      this.playNote(523);
      setTimeout(() => this.playNote(659), 100);
    }

    if (effectName === "Ошибка") {
      this.playNote(300);
      setTimeout(() => this.playNote(200), 150);
    }

    if (effectName === "Успех") {
      this.playNote(523);
      setTimeout(() => this.playNote(659), 150);
      setTimeout(() => this.playNote(784), 300);
    }

    if (effectName === "Лазер") {
      let freq = 1200;
      const step = setInterval(() => {
        this.playNote(freq);
        freq -= 100;
        if (freq < 200) clearInterval(step);
      }, 50);
    }
  }
}
