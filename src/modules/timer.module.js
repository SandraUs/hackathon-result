import { Module } from "../core/module";

export class TimerModule extends Module {
    constructor() {
        super('timer', 'Таймер отсчета');
    }

    trigger() {
        //Создание окна таймера
        const timerWindow = document.createElement('div');
        timerWindow.className = 'timer-window';
        
        //Создание кнопки закрытия
        const buttonCloseTimer = document.createElement('button');
        buttonCloseTimer.className = 'button__close-timer';
        buttonCloseTimer.textContent = 'х';
        
        //Создание контейнера для остатка времени
        const timeRemainingContainer = document.createElement('div');
        timeRemainingContainer.className = 'time__remaining-container';

        //Часы
        const hoursRemaining = document.createElement('div');
        hoursRemaining.className = 'circle';
        hoursRemaining.id = 'hours';
        hoursRemaining.textContent = '00 Ч';
        //Минуты
        const minutesRemaining = document.createElement('div');
        minutesRemaining.className = 'circle';
        minutesRemaining.id = 'hours';
        minutesRemaining.textContent = '00 М';
        //Секунды
        const secondsRemaining = document.createElement('div');
        secondsRemaining.className = 'circle';
        secondsRemaining.id = 'seconds';
        secondsRemaining.textContent = '00 С';
        
        //Создание контейнера для кнопок старт, пауза и инпута
        const timerControlsContainer = document.createElement('div');
        timerControlsContainer.className = 'timer__controls-container';

        //Создание инпута
        const inputOfTimer = document.createElement('input');
        inputOfTimer.className = 'input-timer';
        inputOfTimer.type = 'text';
        inputOfTimer.placeholder = '00:00:00';
        inputOfTimer.value = '00:05:00';

        //Создание кнопки старт
        const startButton = document.createElement('button');
        startButton.className = 'start-button button';
        startButton.textContent = 'Старт';
        //Создание кнопки стоп
        const stopButton = document.createElement('button');
        stopButton.className = 'stop-button button';
        stopButton.textContent = 'Стоп';

        timerWindow.append(buttonCloseTimer, timeRemainingContainer, timerControlsContainer);
        timeRemainingContainer.append(hoursRemaining, minutesRemaining, secondsRemaining);
        timerControlsContainer.append(inputOfTimer, startButton, stopButton);
        
        document.body.append(timerWindow);

        let interval = null;
        let totalSeconds = 0;

        //Функция для обновления отображения
        function updateDisplay(seconds) {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            hoursRemaining.textContent = String(hrs).padStart(2, '0') + ' Ч';
            minutesRemaining.textContent = String(mins).padStart(2, '0') + ' М';
            secondsRemaining.textContent = String(secs).padStart(2, '0') + ' С';
        }

        //Старт
        startButton.addEventListener('click', () => {
            if (interval) {
                clearInterval(interval);
            }
            const parts = inputOfTimer.value.split(':').map(Number);
            totalSeconds = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
        
            updateDisplay(totalSeconds);
        
            interval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateDisplay(totalSeconds);
                }
            }, 1000);
        });

        //Стоп и сброс к 00
        stopButton.addEventListener('click', () => {
            if(interval) {
                clearInterval(interval);
            }

            totalSeconds = 0;
            hoursRemaining.textContent = '00 Ч';
            minutesRemaining.textContent = '00 М';
            secondsRemaining.textContent = '00 С';
        });

        //Закрытие таймера
        buttonCloseTimer.addEventListener('click', () => { 
                timerWindow.remove();
        });
    }
}