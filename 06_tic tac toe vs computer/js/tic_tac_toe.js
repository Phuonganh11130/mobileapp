"use strict";
let flag = "jerry-flag";

let counter = 9;

const squares = document.getElementsByClassName("square");

const squaresArray = Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLine(squaresArray, ["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray, ["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray, ["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray, ["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray, ["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray, ["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray, ["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src ="img/jerry.jpg" width=61px height=61px></p><p class ="text">Jerry Attack!(your turn)</p>';
const msgtxt2 = '<p class="image"><img src ="img/tom.jpg" width=61px height=61px></p><p class ="text">Tom Attack!(computer turn)</p>';
const msgtxt3 = '<p class="image"><img src ="img/jerry.jpg" width=61px height=61px></p><p class ="text animate__animated animate__lightSpeedInRight">Jerry Win!!</p>';
const msgtxt4 = '<p class="image"><img src ="img/tom.jpg" width=61px height=61px></p><p class ="text animate__animated animate__lightSpeedInLeft">Tom Win!!</p>';
//const msgtxt5 = '<p class="image"><img src ="img/jerry.jpg" width=61px height=61px><img src ="img/tom.jpg" width=61px height=61px></p><p class ="text animate__bounceIn">Draw!!</p>';
const msgtxt5 = '<p class="image"><img src ="img/tomjerry.jpg" width=122px height=61px></p><p class ="text animate__bounceIn">Draw!!</p>';
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/jerrywin_sound.mp3","sound/tomwin_sound.mp3","sound/draw_sound.mp3"];
window.addEventListener("DOMContentLoaded",
    function() {
        setMessage("jerry-turn");
        squaresArray.forEach(function (square) {
            square.classList.add("js-clickable");
        });
    },false
);


squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        let gameOverFlg = isSelect(square);
        if(gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function() {
                    tomTurn();
                },
                "2000"
            );
        }
    });
});
function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

function isSelect(selectSquare) {
    let gameOverFlg ="0";
    if(flag === "jerry-flag"){
        let music = new Audio(gameSound[0]);
        music.currenTime = 0;
        music.play();

        selectSquare.classList.add("js-jerry-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
       
       if(isWinner("jerry")) {
           setMessage("jerry-win");
           gameOver("jerry");
           return gameOverFlg = "1";
       }
       setMessage("tom-turn");
       flag = "tom-flag";
    } else {
        let music = new Audio(gameSound[1]);
        music.currenTime = 0;
        music.play();

        selectSquare.classList.add("js-tom-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
       
       if(isWinner("tom")) {
           setMessage("tom-win");
           gameOver("tom");
           return gameOverFlg = "1";
       }
       setMessage("jerry-turn"); 
       flag = "jerry-flag";
    }
    counter--;

    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}

function isWinner(symbol) {
    const result = lineArray.some(function (line){
        const subResult = line.every(function (square){
            if (symbol === "jerry") {
                return square.classList.contains("js-jerry-checked");
            }
            if (symbol === "tom") {
                return square.classList.contains("js-tom-checked");
            }
        });
        if (subResult) { winningLine = line }
        return subResult;
    });
    return result;
}

function setMessage(id) {
    switch (id){
        case "jerry-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "tom-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "jerry-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;   
            break;
        case "tom-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;  
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;    
            break;   
        default: 
            document.getElementById("msgtext").innerHTML = msgtxt1;  
    }
}

function gameOver(status){
    let w_sound;
    switch (status) {
        case "jerry":
            w_sound = gameSound[2];
            break;
        case "tom":
            w_sound = gameSound[3];
            break;  
        case "draw":
            w_sound = gameSound[4];
            break;          
    }
    let music = new Audio(w_sound);
    music.currenTime = 0;
    music.play();
    /*squaresArray.forEach(function (square) {
        square.classList.add("js-unclickable");
    });*/
    squaresBox.classList.add("js-unclickable");

    newgamebtn_display.classList.remove("js-hidden");
    if(status === "jerry") {
        if(winningLine){
            winningLine.forEach(function (square) {
                square.classList.add("js-jerry_hightLight");
            })
        }
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed: 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    } else if (status ==="tom") {
        if(winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-tom_hightLight");
            })
        }
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed: 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    }
}

newgamebtn.addEventListener("click" , () => {
    flag = "jerry-flag";
    counter = 9;
    winningLine = "";
    squaresArray.forEach(function (square) {
        square.classList.remove("js-jerry-checked");
        square.classList.remove("js-tom-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-jerry_hightLight");
        square.classList.remove("js-tom_hightLight");
        square.classList.add("js-clickable");
    })
    squaresBox.classList.remove("js-unclickable");
    setMessage("jerry-turn");
    newgamebtn_display.classList.add("js-hidden");
    $(document).snowfall("clear");
});

function tomTurn() {
    let tomTurnEnd = "0";
    let gameOverFlg = "0";

    while(tomTurnEnd === "0") {
        tomTurnEnd = isReach("tom");
        if(tomTurnEnd === "1") {
            gameOverFlg = "1";
            break;
        }
        tomTurnEnd = isReach("jerry");
        if(tomTurnEnd === "1") {
            break;
        }
    
        const tomSquare = squaresArray.filter(function(square) {
            return square.classList.contains("js-clickable");       
        });
        

        let n = Math.floor(Math.random()*tomSquare.length); 
        gameOverFlg = isSelect(tomSquare[n]);
        break;
    }
    if(gameOverFlg === "0") {
        squaresBox.classList.remove("js-unclickable");
    }
}

function isReach(status) {
    let tomTurnEnd = "0";

    lineArray.some(function (line) {
        let tomCheckCnt = 0;
        let jerryCheckCnt = 0;

        line.forEach(function (square) {
            
            if (square.classList.contains("js-tom-checked")){
            tomCheckCnt++;
            }  
            if ( square.classList.contains("js-jerry-checked")){
            jerryCheckCnt++;
            }
        });
        if(status === "tom" && tomCheckCnt === 2 && jerryCheckCnt === 0) {
            tomTurnEnd ="1";
        }
        if(status === "jerry" && tomCheckCnt === 0 && jerryCheckCnt === 2) {
            tomTurnEnd ="1";
        }
        if(tomTurnEnd === "1") {
            line.some(function(square){
                if(square.classList.contains("js-clickable")){
                     isSelect(square);
                
                     return true;
                } 
                
            });
            return true; 
        }
         
    });
    return tomTurnEnd;
}
