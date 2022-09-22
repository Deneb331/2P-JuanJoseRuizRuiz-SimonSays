//Wait for the DOM to finish loading before running the game
//Get the button elements and add listeners to them
document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                StartGame(5);
            } else {
                if(this.getAttribute("data-type") === "control-green") {
                    let controlAttribute = this.getAttribute("data-type");
                    IluminateColorGreen();
                } else if(this.getAttribute("data-type") === "control-red") {
                    let controlAttribute = this.getAttribute("data-type");
                    IluminateColor(controlAttribute);
                } else if(this.getAttribute("data-type") === "control-yellow") {
                    let controlAttribute = this.getAttribute("data-type");
                    IluminateColor(controlAttribute);
                } else if(this.getAttribute("data-type") === "control-blue") {
                    let controlAttribute = this.getAttribute("data-type");
                    IluminateColor(controlAttribute);
                } else {
                    alert("You received a wrong data type.")
                }
            }
        })
    }
});

function StartGame(colorLimit){
    let colorList = [];
    let colorNum = colorLimit;
    for (let index = 0; index < colorNum; index++) {
        let random = Math.floor(Math.random() * (3 + 1));
        colorList.push(random);
    }
    alert(colorList);
}

function IluminateColorGreen(){
    document.getElementById("btn--green").style.background = "url(GreenSelected.png)";
    setTimeout(backToNormal("btn--green", "url(GreenSelected.png)"), 3);
}

function IluminateColorBlue(){
    document.getElementById("btn--blue").style.background = "url(BlueSelected.png)";
    setTimeout(backToNormal("btn--blue", "url(BlueSelected.png)"), 3);
}

function IluminateColorRed(){
    document.getElementById("btn--red").style.background = "url(RedSelected.png)";
    setTimeout(backToNormal("btn--red", "url(RedSelected.png)"), 3);
}

function IluminateColorYellow(){
    document.getElementById("btn--yellow").style.background = "url(YellowSelected.png)";
    setTimeout(backToNormal("btn--yellow", "url(YellowSelected.png)"), 3);
}

function backToNormal(buttonType, buttonImage) {
    document.getElementById(buttonType).style.background = buttonImage;
}