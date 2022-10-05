//Wait for the DOM to finish loading before running the game
//Get the button elements and add listeners to them
let currentColorIndex = 0 ;
let sequenceLength = 5;
document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                startGame(sequenceLength);
            } else if(this.getAttribute("data-type") === "score-button") {
                sendScore();
            } else {
                if(gameStarted) {
                    if(this.getAttribute("data-type") === "control-green") {
                        iluminateColor("green", true);
                    } else if(this.getAttribute("data-type") === "control-red") {
                        iluminateColor("red", true);
                    } else if(this.getAttribute("data-type") === "control-yellow") {
                        iluminateColor("yellow", true);
                    } else if(this.getAttribute("data-type") === "control-blue") {
                        iluminateColor("blue", true);
                    } else {
                        alert("You received a wrong data type.");
                    }
                } else {
                    console.log("Game didn't start");
                }
            }
        });
    }
});

let playerList = [];        //List of the buttons pressed by the player.
let gameList = [];          //List of the random buttons the player has to press in order.
let gameStarted = false;    //Boolean used to check when the player can press the buttons.

/**
 * Iluminates the color passed with a numeric index.
 */
function playColor(index) {
    if(index == 0){
        iluminateColor('green', false);
    }
    if(index == 1){
       iluminateColor('red', false)
    }
    
    if(index == 2){
        iluminateColor('yellow', false);
    }
    
    if(index == 3){
        iluminateColor('blue', false);
    }
}

/**
 * When the start button is pressed, it generates a random sequence and initiates the button animation.
 */
function startGame(colorLimit){
    let colorList = [];
    let colorNum = colorLimit;
    let intervalTime = 1500;
    for (let index = 0; index < colorNum; index++) {
        let random = Math.floor(Math.random() * (3 + 1));
        colorList.push(random);
    }
    const playInterval = setInterval(function(){
        if (currentColorIndex < colorList.length){
            playColor(colorList[currentColorIndex]);
            currentColorIndex = currentColorIndex + 1;
        }
        else{
            clearInterval(playInterval);
            currentColorIndex = 0;
        }
    }, intervalTime);

    gameList = colorList;

    setTimeout(function() {
        gameStarted = true;
    }, intervalTime * colorNum + 600);
}

/**
 * Iluminates the button passed
 */
function iluminateColor(color, playerPressed){
    const colorId = `btn--${color}`;
    const colorClass = `${color}-active`;
    document.getElementById(colorId).classList.add(colorClass);
    
    setTimeout(function(){
        switchOffColor(color)
    }, 500);
    
    if(playerPressed) {
        if(color == "green") {
            playerList.push(0);
            checkPlayerList();
        } else if(color == "red") {
            playerList.push(1);
            checkPlayerList();
        } else if(color == "yellow") {
            playerList.push(2);
            checkPlayerList();
        } else if(color == "blue") {
            playerList.push(3);
            checkPlayerList();
        }
    }
}

/**
 * Switch off the button passed.
 */
function switchOffColor(color){
    const colorId = `btn--${color}`;
    const colorClass = `${color}-active`;
    document.getElementById(colorId).classList.remove(colorClass);
}

/**
 * Checks if the game has finished and if the player introduced the correct sequence.
 */
function checkPlayerList() {
    if(playerList.length === gameList.length){
        const equal = (playerList, gameList) => JSON.stringify(playerList) === JSON.stringify(gameList);
        if(equal(playerList, gameList)){
            alert("Good job");
            playerList = [];
            gameList = [];
            incrementScore();
            gameStarted = false;
        } else {
            alert(playerList + gameList + "Try again");
            playerList = [];
            gameList = [];
            incrementWrongScore();
            gameStarted = false;
        } 
    } else {
        console.log(playerList.length);
    }
}

/**
 * Increments the score in case the player gets the correct sequence.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;
}

/**
 * Increments the wrong score in case the player gets the wrong sequence.
 */
function incrementWrongScore() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Sends the score to the player's email specified in the form.
 */
function sendScore() {
    let params = {
        "to_name" : document.getElementById("full-name").innerHTML,
        "email" : document.getElementById("player-email").innerHTML,
        "message" : "You had " + document.getElementById("correct").innerHTML + "correct answers and " + document.getElementById("incorrect").innerHTML + "wrong answers."
    };

    emailjs.send("service_20gl1ow","template_m97fktr", params).then(function(res){
        alert("Your score has been sended.");
    });

    document.getElementById("full-name").innerHTML = "";
    document.getElementById("player-email").innerHTML = "";
}