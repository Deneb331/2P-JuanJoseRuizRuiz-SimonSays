//Wait for the DOM to finish loading before running the game
//Get the button elements and add listeners to them
document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                startGame(5);
            } else if(this.getAttribute("data-type") === "score-button") {
                sendScore();
            } else {
                if(gameStarted) {
                    if(this.getAttribute("data-type") === "control-green") {
                        iluminateColorGreen(true);
                    } else if(this.getAttribute("data-type") === "control-red") {
                        iluminateColorRed(true);
                    } else if(this.getAttribute("data-type") === "control-yellow") {
                        iluminateColorYellow(true);
                    } else if(this.getAttribute("data-type") === "control-blue") {
                        iluminateColorBlue(true);
                    } else {
                        alert("You received a wrong data type.")
                    }
                } else {
                    console.log("Game didn't start")
                }
            }
        })
    }
});

let playerList = [];
let gameList = [];
let gameStarted = false;

function startGame(colorLimit){
    let colorList = [];
    let colorNum = colorLimit;
    for (let index = 0; index < colorNum; index++) {
        let random = Math.floor(Math.random() * (3 + 1));
        colorList.push(random);
    }

    let timer = 3000;

    for (let index = 0; index < colorList.length; index++) {
        if(colorList[index] === 0) {
            setTimeout(iluminateColorGreen(false), timer);
            console.log(colorList[index] + " Green");
            timer += 3000;
        } else if(colorList[index] === 1) {
            setTimeout(iluminateColorRed(false), timer);
            console.log(colorList[index] + " Red");
            timer += 3000;
        } else if(colorList[index] === 2) {
            setTimeout(iluminateColorYellow(false), timer);
            console.log(colorList[index] + " Yellow");
            timer += 3000;
        } else if(colorList[index] === 3) {
            setTimeout(iluminateColorBlue(false), timer);
            console.log(colorList[index] + " Blue");
            timer += 3000;
        }
    }
    gameList = colorList;
    gameStarted = true;
}

function iluminateColorGreen(playerPressed){
    document.getElementById("btn--green").style.background = "url('../images/GreenSelected.png')";
    setTimeout(backToNormal("btn--green", "url('../images/GreenSelected.png')"), 3);
    if(playerPressed) {
        playerList.push(0);
        checkPlayerList();
    }
}

function iluminateColorRed(playerPressed){
    document.getElementById("btn--red").style.background = "url('../images/RedSelected.png')";
    setTimeout(backToNormal("btn--red", "url('../images/RedSelected.png')"), 3);
    if(playerPressed) {
        playerList.push(1);
        checkPlayerList();
    }
}

function iluminateColorYellow(playerPressed){
    document.getElementById("btn--yellow").style.background = "url('../images/YellowSelected.png')";
    setTimeout(backToNormal("btn--yellow", "url('../images/YellowSelected.png')"), 3);
    if(playerPressed) {
        playerList.push(2);
        checkPlayerList();
    }
}

function iluminateColorBlue(playerPressed){
    document.getElementById("btn--blue").style.background = "url('../images/BlueSelected.png')";
    setTimeout(backToNormal("btn--blue", "url('../images/BlueSelected.png')"), 3);
    if(playerPressed) {
        playerList.push(3);
        checkPlayerList();
    }
}

function backToNormal(buttonType, buttonImage) {
    document.getElementById(buttonType).style.background = buttonImage;
}

function checkPlayerList() {
    if(playerList.length === gameList.length){
        if(playerList === gameList){
            alert("Good job");
            playerList = [];
            gameList = [];
            incrementScore();
            gameStarted = false;
        } else {
            alert("Try again");
            playerList = [];
            gameList = [];
            incrementWrongScore();
            gameStarted = false;
        } 
    } else {
        console.log(playerList.length)
    }
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;
}

function incrementWrongScore() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function sendScore() {
    let params = {
        "to_name" : document.getElementById("full-name").innerHTML,
        "email" : document.getElementById("player-email").innerHTML,
        "message" : "You had " + document.getElementById("correct").innerHTML + "correct answers and " + document.getElementById("incorrect").innerHTML + "wrong answers."
    }

    emailjs.send("service_20gl1ow","template_m97fktr", params).then(function(res){
        alert("Your score has been sended.")
    });

    document.getElementById("full-name").innerHTML = "";
    document.getElementById("player-email").innerHTML = "";
}