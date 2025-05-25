const STATE = {
    score: {
        playScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },

    cardsSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type")
    },

    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },

    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards")
    },

    actions: {
        button: document.getElementById("next-duel")
    }
};

/*const PLAYERS = {
    player1: "playerCards",
}*/
const PLAYERSIDES = {
    player1: "player-cards",
    computer: "computer-cards"
}

const PATHIMAGES ="./src/assets/icons/"
const CARDDATA = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${PATHIMAGES}dragon.png`,
        winOF: [1],
        loseOF: [2]
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${PATHIMAGES}magician.png`,
        winOF: [2],
        loseOF: [0]
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${PATHIMAGES}exodia.png`,
        winOF: [0],
        loseOF: [1]
    }
];

async function getRandowCardId(){
    const RANDOMINDEX = Math.floor(Math.random() * CARDDATA.length);
    return CARDDATA[RANDOMINDEX].id;
}

async function createCardImage(IDCARD, fieldSide){
    const CARDIMAGE = document.createElement("img");
    CARDIMAGE.setAttribute("height", "100px");
    CARDIMAGE.setAttribute("src", "./src/assets/icons/card-back.png");
    CARDIMAGE.setAttribute("data-id", IDCARD);
    CARDIMAGE.classList.add("card");

    if (fieldSide === PLAYERSIDES.player1 ) {
        
        CARDIMAGE.addEventListener("mouseover", () => {
        drawSelectCard(IDCARD);
        });

        CARDIMAGE.addEventListener("click", () => {
            setCardsField(CARDIMAGE.getAttribute("data-id"));
        });

    }

    return CARDIMAGE;
}

async function setCardsField(cardId){
    await removeAllCardsImages();

    let computerCardId = await getRandowCardId();
    
    await showHiddenCardFieldsImages(true);

    await hiddenCardDetails();

   await drawCardsInField(cardId, computerCardId);
    
    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}


async function drawCardsInField(cardId, computerCardId) {
    
    STATE.fieldCards.player.src = CARDDATA[cardId].img; 
    STATE.fieldCards.computer.src = CARDDATA[computerCardId].img;
}

async function showHiddenCardFieldsImages(value){

    if (value === true) {
        STATE.fieldCards.player.style.display = "block";
        STATE.fieldCards.computer.style.display = "block";
    } 
    
    if (value === false) {
        STATE.fieldCards.player.style.display = "none"
        STATE.fieldCards.computer.style.display = "none"
    }

}


async function hiddenCardDetails() {
    STATE.cardsSprites.avatar.src = "";
    STATE.cardsSprites.name.innerText = "";
    STATE.cardsSprites.type.innerText = "";
}

async function drawButton(text){
    STATE.actions.button.innerText = text.toUpperCase();
    STATE.actions.button.style.display = "block";

}

async function updateScore(){
    STATE.score.scoreBox.innerText = `Win: ${STATE.score.playScore} | Lose: ${STATE.score.computerScore}`
    
}

async function checkDuelResults(playerCardId, computerCardId){

    let duelResults = "Draw";
    let playerCard = CARDDATA[playerCardId];

    if (playerCard.winOF.includes(computerCardId)) {
        duelResults = "Win";
        STATE.score.playScore++;
    }

    if (playerCard.loseOF.includes(computerCardId)) {
        duelResults = "Lose";
        STATE.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults;

}

async function removeAllCardsImages(){

    let {computerBox, player1Box} = STATE.playerSides;

    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

}

async function drawSelectCard(index){
    STATE.cardsSprites.avatar.src = CARDDATA[index].img;
    STATE.cardsSprites.name.innerText = CARDDATA[index].name;
    STATE.cardsSprites.type.innerText = "Attribute: " + CARDDATA[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for (let index = 0; index < cardNumbers; index++) {
        const RANDOWIDCARD = await getRandowCardId();
        const CARDIMAGE = await createCardImage(RANDOWIDCARD, fieldSide); 

        document.getElementById(fieldSide).appendChild(CARDIMAGE)
        
    };
}

async function resetDuel(){
    STATE.cardsSprites.avatar.src = "";
    STATE.actions.button.style.display = "none";

    STATE.fieldCards.player.style.display = "none";
    STATE.fieldCards.computer.style.display = "none";

    //

    STATE.cardsSprites.name.innerText = "Selecione";
    STATE.cardsSprites.type.innerText = "uma carta";

    init();

}

async function playAudio(status){
    const AUDIO = new Audio(`./src/assets/audios/${status}.wav`);

    try {  
        AUDIO.play();
    } catch {
        
    }

}

function init(){

    showHiddenCardFieldsImages(false);

    drawCards(5, PLAYERSIDES.player1);
    drawCards(5, PLAYERSIDES.computer);

    const BGM = document.getElementById("bg-music");
    BGM.play();
}

init();