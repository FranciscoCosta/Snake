const gameBoard = document.getElementById("game-board");
const ctx = gameBoard.getContext("2d");
const scoreTxt = document.getElementById("score");
const btnReset = document.getElementById("reset");
const gameWith = gameBoard.width;
const gameHeight = gameBoard.height;
console.log(scoreTxt);

const bordC = "rgba(46, 229, 157)";

const boardBg = "black";
const snakeColor = "#2ee59d";
const snakeBorder = bordC;
const foodColor = "red";
const unisteSize = 25;
let running = false;
let xVel = unisteSize;
let yVel = 0;

let foodX;
let foodY;

window.score = 0;
let snake = [
  { x: unisteSize * 4, y: 0 },
  { x: unisteSize * 3, y: 0 },
  { x: unisteSize * 2, y: 0 },
  { x: unisteSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
btnReset.addEventListener("click", resestGame);

gameStart();
moveSnake();

function gameStart() {
  running = true;
  scoreTxt.textCpntent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  }
  else{
    displayGameOver();
  }
}
function clearBoard() {
    ctx.fillStyle = boardBg;
    ctx.fillRect(0,0, gameWith, gameHeight)
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unisteSize) * unisteSize;
    return randNum;
  }
  foodX = randomFood(0, gameWith - unisteSize);
  foodY = randomFood(0, gameWith - unisteSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unisteSize, unisteSize);
}

function moveSnake() {
    const head = {x: snake[0].x + xVel,
                y: snake[0].y + yVel};

    snake.unshift(head);
    if(snake[0].x === foodX && snake[0].y === foodY){
        window.score =window.score+1
        scoreTxt.innerText = window.score;
        createFood();

    }else{
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unisteSize ,unisteSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unisteSize ,unisteSize)
    })
}
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const left = 37;
    const right = 39;
    const down = 40;
    const up = 38;

    const goingUP = (yVel ==-unisteSize);
    const goingDown = (yVel == unisteSize);
    const goingRight = (xVel ==unisteSize);
    const goingLeft = (xVel ==-unisteSize);

    switch(true){
        case(keyPressed == left && !goingRight):
            xVel = -unisteSize;
            yVel= 0;
            break;
            case(keyPressed == right && !goingLeft):
            xVel = unisteSize;
            yVel= 0;
            break;
            case(keyPressed == up && !goingDown):
            xVel = 0;
            yVel= - unisteSize;
            break;
            case(keyPressed == down && !goingUP):
            xVel = 0;
            yVel= unisteSize;
            break;                    
    }
}
function checkGameOver() {
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
            case(snake[0].x >= gameWith):
            running = false;
            break;
            case(snake[0].y < 0):
            running = false;
            break;
            case(snake[0].y >= gameHeight):
            running = false;
            break;
        }
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false;
        }

    }
    
}
function displayGameOver() {
    ctx.font = "50px Poppins"
    ctx.fillStyle = "White";
    ctx.Align = "center"
    ctx.fillText("Game Over", gameWith/ 3.5, gameHeight/2);
    running = false;
}
function resestGame() {
    window.score = 0;
    scoreTxt.innerText = window.score;
    xVel = unisteSize;
    yVel = 0;
    snake = [
        { x: unisteSize * 4, y: 0 },
        { x: unisteSize * 3, y: 0 },
        { x: unisteSize * 2, y: 0 },
        { x: unisteSize, y: 0 },
        { x: 0, y: 0 },
      ];
      gameStart();
}


var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.code] = true;
        switch(e.code){
            case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            case "Space": e.preventDefault(); break;
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.code] = false;
    },
false);