let workDuration = 20 * 60; // 20 минут в секундах
let relaxDuration = 5 * 60; // 5 минут в секундах
let workInterval, relaxInterval;
let isRunning = false; // Флаг для отслеживания процесса

// Добавляем аудио для сигнала
const beep = new Audio('beep.mp3');

// Получаем элементы таймеров и кнопок
const workTimer = document.getElementById('par-work');
const relaxTimer = document.getElementById('par-relax');
const startBtn = document.getElementById('start-btn');

// Функция для обновления отображения таймера
function updateTimer(element, seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    element.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

// Функция для отсчёта времени
function countdown(duration, element, callback, isWork) {
    let timeLeft = duration;
    const interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer(element, timeLeft);
        } else {
            clearInterval(interval);
            beep.play(); // Проигрываем звуковой сигнал, когда таймер заканчивается
            callback(); // Вызов следующего действия
        }
    }, 1000);
    return interval; // Возвращаем интервал для возможности его остановки
}

// Функция для запуска цикла работы и отдыха
function startWorkCycle() {
    if (!isRunning) return; // Проверка на то, что процесс ещё активен
    document.querySelector('.work').classList.add('active'); // Меняем фон для работы
    workInterval = countdown(workDuration, workTimer, () => {
        document.querySelector('.work').classList.remove('active'); // Убираем фон после работы
        startRelaxCycle();
    }, true);
}

function startRelaxCycle() {
    if (!isRunning) return; // Проверка на то, что процесс ещё активен
    document.querySelector('.relax').classList.add('active'); // Меняем фон для отдыха
    relaxInterval = countdown(relaxDuration, relaxTimer, () => {
        document.querySelector('.relax').classList.remove('active'); // Убираем фон после отдыха
        startWorkCycle();
    }, false);
}

// Функция для запуска процесса
function startCycle() {
    if (isRunning) return; // Если таймер уже запущен, ничего не делаем
    isRunning = true;

    // Запускаем цикл с работы
    startWorkCycle();
}

// Обработчик события для кнопки "Начать"
startBtn.addEventListener('click', startCycle);

// Инициализация таймеров при загрузке страницы
updateTimer(workTimer, workDuration);
updateTimer(relaxTimer, relaxDuration);