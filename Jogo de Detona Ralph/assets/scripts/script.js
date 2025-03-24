const STATE = {
    views: {
        squares: document.querySelectorAll(".square"),
        enyme: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time_left"),
        score: document.querySelector("#score")
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },

    actions: {
        timerId: null,
        countDownTimeId: setInterval(countDowm, 1000),
    }
};

function countDowm() {
    STATE.values.currentTime--;
    STATE.views.timeLeft.textContent = STATE.values.currentTime;

    if (STATE.values.currentTime <= 0) {
        clearInterval(STATE.actions.countDownTimeId);
        clearInterval(STATE.actions.TimeId);
        alert("GAME OVER! O seu resultado foi " + `${STATE.values.result}`)
    }
}

function playSound(audioName) {
    let audio = new Audio(`./assets/sounds/${audioName}.m4a`);

    audio.volume = 0.2;
    audio.play();
    
}

function randomSquare() {
    let randomNumber = Math.floor(Math.random() * 16);
    let randomSquare = STATE.views.squares[randomNumber];

    STATE.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    randomSquare.classList.add("enemy");
    STATE.values.hitPosition = randomSquare.id;
};

function moveEnemy() {
    STATE.values.timerId = setInterval(randomSquare, STATE.values.gameVelocity);
}

function addListinerHitBox() {
    STATE.views.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === STATE.values.hitPosition) {
                STATE.values.result++;
                STATE.views.score.textContent = STATE.values.result;
                STATE.values.hitPosition = null;
                playSound("hit");
            };
        });
    });
};

function initialize() {
    moveEnemy();
    addListinerHitBox()
};

initialize();