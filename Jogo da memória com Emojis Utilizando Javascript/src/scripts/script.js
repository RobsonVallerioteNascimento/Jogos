const EMOJS = ["🐵","🐵","🐶","🐶","🦁","🦁","🐯","🐯","🦝","🦝","🐮","🐮","🐷","🐷","🐻","🐻","🐰","🐰","🐸","🐸"];

//,"🐭","🐭"];

let openCards = [];
let randomEmojs = EMOJS.sort(() => {
    ordem = (Math.random() > 0.5 ? 2 : -1);
    return ordem;
});

for (let index = 0; index < EMOJS.length; index++) {

    let box = document.createElement("div");
    //box.className = "itemGame";
    box.classList.add("itemGame");
    box.innerHTML = randomEmojs[index];
    box.onclick = handleClick;;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
   if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
   }

   if(openCards.length == 2) {
        setTimeout(checkMatch, 500);

   }
}

function checkMatch() {

    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        playSound("hit");
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if ( document.querySelectorAll(".boxMatch").length === EMOJS.length) {
        alert("Você venceu !");
    } 
}

function playSound(audioName) {
    
    let audio = new Audio(`././assets/sounds/${audioName}.m4a`);

    audio.volume = 0.2;
    audio.play();
}

