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

        //Сообщение "Время вышло!"
        const timeUpMessage = document.createElement('div');
        timeUpMessage.className = 'time-up-message';
        timeUpMessage.textContent = 'Время вышло!';

        timerWindow.append(buttonCloseTimer, timeRemainingContainer, timerControlsContainer);
        timeRemainingContainer.append(hoursRemaining, minutesRemaining, secondsRemaining, timeUpMessage);
        timerControlsContainer.append(inputOfTimer, startButton, stopButton);
        
        document.body.append(timerWindow);

        let interval = null;
        let totalSeconds = 0;

        //Валидация для инпута
        inputOfTimer.addEventListener('input', () => {
            let valueOfInput = inputOfTimer.value.replace(/[^0-9]/g,'').slice(0,6);
        
            let hh = valueOfInput.slice(0,2);
            let mm = valueOfInput.slice(2,4);
            let ss = valueOfInput.slice(4,6);
        
            if (hh && parseInt(hh) > 23) hh = '23';
            if (mm && parseInt(mm) > 59) mm = '59';
            if (ss && parseInt(ss) > 59) ss = '59';
        
            let display = '';
            if(hh) display += hh;
            if(mm) display += (display ? ':' : '') + mm;
            if(ss) display += (display ? ':' : '') + ss;
        
            inputOfTimer.value = display;
        });
        
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
            timeUpMessage.style.display = 'none';
            hoursRemaining.style.display = 'block';
            minutesRemaining.style.display = 'block';
            secondsRemaining.style.display = 'block';

            const parts = inputOfTimer.value.split(':').map(Number);
            totalSeconds = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
        
            updateDisplay(totalSeconds);
        
            interval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateDisplay(totalSeconds);
                } else {
                    clearInterval(interval);
                    
                    hoursRemaining.style.display = 'none';
                    minutesRemaining.style.display = 'none';
                    secondsRemaining.style.display = 'none';
                    timeUpMessage.style.display = 'block';

                    setTimeout(() => {
                        timerWindow.remove();
                    }, 3000);
                }
            }, 1000);
        });

        //Стоп и сброс к 00
        stopButton.addEventListener('click', () => {
            if(interval) {
                clearInterval(interval);
            }

            totalSeconds = 0;

            timeUpMessage.style.display = 'none';
            hoursRemaining.style.display = 'block';
            minutesRemaining.style.display = 'block';
            secondsRemaining.style.display = 'block';

            hoursRemaining.textContent = '00 Ч';
            minutesRemaining.textContent = '00 М';
            secondsRemaining.textContent = '00 С';
            timeUpMessage.style.display = 'none';
        });

        //Закрытие таймера
        buttonCloseTimer.addEventListener('click', () => { 
                timerWindow.remove();
        });
    }
}