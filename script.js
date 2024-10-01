const timerWork = 20;
const timerRelax = 5;
let workDuration = timerWork * 60;
let relaxDuration = timerRelax * 60;
let workInterval, relaxInterval;

// Добавляем аудио для сигнала
const beep = new Audio('beep.mp3');

// Получаем элементы таймеров и кнопок
const workTimer = document.querySelector("#par-work");
const relaxTimer = document.querySelector("#par-relax");
const startBtn = document.querySelector("#start-btn");

function calculateTime(element, seconds) {
    let minutes = Math.floor(seconds / 60);
    let sec = seconds % 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    element.textContent = `${minutes}:${sec}`;
}


function countdown(duration, element, callback) {
    let timer = duration;
    const interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            calculateTime(element, timer);
        } else {
            clearInterval(interval);
            beep.play(); // Проигрываем звуковой сигнал, когда таймер заканчивается
            callback(); // Вызов следующего действия
        }
    }, 1000);
    return interval; // Возвращаем интервал для возможности его остановки
}

function startWorkCycle() {
    document.querySelector('.work').classList.add('active'); // Меняем фон для работы
    workInterval = countdown(workDuration, workTimer, () => {
        document.querySelector('.work').classList.remove('active'); // Убираем фон после работы
        startRelaxCycle();
    });
}

function startRelaxCycle() {
    document.querySelector('.relax').classList.add('active'); // Меняем фон для отдыха
    relaxInterval = countdown(relaxDuration, relaxTimer, () => {
        document.querySelector('.relax').classList.remove('active'); // Убираем фон после отдыха
        startWorkCycle();
    });
}

function startCycle() {
    // Запускаем цикл с работы, если еще не работает
    startWorkCycle();
}

// Обработчик события для кнопки "Начать"
startBtn.addEventListener('click', startCycle);