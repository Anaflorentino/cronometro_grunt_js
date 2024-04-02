document.addEventListener('DOMContentLoaded', function() {
    // Puxando as informações do HTML
    const minutesEl = document.querySelector('#minutes');
    const secondsEl = document.querySelector('#seconds');
    const millisecondsEl = document.querySelector('#milliseconds');
    const startBtn = document.querySelector('#startBtn');
    const pauseBtn = document.querySelector('#pauseBtn');
    const resumeBtn = document.querySelector('#resumeBtn');
    const resetBtn = document.querySelector('#resetBtn');

    // Declarando as variáveis do cronômetro
    let interval;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let isPaused = false;

    // Adicionando event listeners aos botões
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resumeBtn.addEventListener("click", resumeTimer);
    resetBtn.addEventListener("click", resetTimer);

    // Definindo a função startTimer
    function startTimer() {
        if (!interval) {
            interval = setInterval(() => {
                milliseconds += 10;

                if (milliseconds === 1000) {
                    seconds++;
                    milliseconds = 0;
                }

                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }

                minutesEl.textContent = padTime(minutes);
                secondsEl.textContent = padTime(seconds);
                millisecondsEl.textContent = padTime(milliseconds);
            }, 10);

            // Oculta o botão de iniciar e mostra o botão de pausar
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    }

    // Definindo a função pauseTimer
    function pauseTimer() {
        clearInterval(interval);
        interval = null;
        isPaused = true;
        
        // Oculta o botão de pausar e mostra o botão de retomar
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'inline-block';
    }

    // Definindo a função resumeTimer
    function resumeTimer() {
        if (isPaused) {
            isPaused = false;
            startTimer();
            
            // Oculta o botão de retomar e mostra o botão de pausar
            resumeBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    }

    // Definindo a função resetTimer
    function resetTimer() {
        clearInterval(interval);
        interval = null;
        isPaused = false;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        millisecondsEl.textContent = "000";
        
        // Mostra o botão de iniciar e oculta os botões de pausar e retomar
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'none';
    }

    // Função auxiliar para adicionar zero à esquerda, se necessário
    function padTime(time) {
        return time < 10 ? '0' + time : time;
    }
});
