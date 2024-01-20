//html parts
const gameBoard = document.querySelector("#snakeBoard");
const ctx = gameBoard.getContext("2d");

const scorerecord = document.querySelector("#score");
const restart_btn = document.querySelector("#restart");
const clrd_btns = document.querySelectorAll("#clrs") 
const start_btn = document.querySelector(".start-game");
let popUp = document.querySelector("#popUp");
let myScore = document.querySelector(".yourScore");

const clr_ccyan = document.querySelector(".clr-cyan");
const clr_yelloww = document.querySelector(".clr-yellow");
const clr_redish = document.querySelector(".clr-purple");

//game part 
//board functionalities and game options

const unitSize = 25;
const boardWidth = gameBoard.width;
const boardHeight = gameBoard.height;
const boardColor = "#0d0d0d";
const foodColor = " #581845";
let foodX;
let foodY;
let gameRunning = false;
let score = 0;
let idkcolor = 'green'
//snake part
let xVelocity = unitSize;
let yVelocity = 0;
let snakeBody = [
  {x : unitSize, y : 0},
  {x : 0, y : 0}
]

let snakeColor = 'green';

clr_ccyan.addEventListener('click', function() {
  idk(clr_ccyan);
  disablebuttons();
});

clr_redish.addEventListener('click', function() {
  idk(clr_redish);
  disablebuttons();
});

clr_yelloww.addEventListener('click', function() {
  idk(clr_yelloww);
  disablebuttons();
});


function idk(clr_values){
  snakeColor = clr_values.value;
}


function disablebuttons(){
  clrd_btns.forEach((btn) => {
    btn.disabled = true;
    btn.style.backgroundColor = 'gray';
    btn.style.transform = "translateY(0px)";
    btn.style.border = '2px solid #474747';
    btn.style.cursor = 'default';
  })
}


start_btn.addEventListener('click', maingame)

function maingame(){
  if(snakeColor == "#0b7d73" || snakeColor == "green" || snakeColor == "#862a3a"){
    snakeColor = 'green'; 
  }
  else{
    snakeColor;
  }
  
  window.addEventListener('keydown', changeDirection)
  restart_btn.addEventListener('click', resetGame)


  disablestarButton();
  gameStart(); 

  function disablestarButton(){
    start_btn.disabled = true;
    start_btn.style.backgroundColor = 'gray';
    start_btn.style.boxShadow = 'none';
    start_btn.style.cursor = 'default';
    clrd_btns.forEach((btn) => {
    btn.disabled = true;
    btn.style.backgroundColor = 'gray';
    btn.style.transform = "translateY(0px)";
    btn.style.border = '2px solid #474747';
    btn.style.cursor = 'default';
  })

  }
  
  function gameStart(){
    gameRunning = true;
    createFood();
    drawFood();
    nextTick()
  }

  function nextTick(){
    if(gameRunning){
      setTimeout(() => {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        bordergoing()
        checkGameOver();
        nextTick();
      },90)       
    }
    else{
      displayGameOver();
    }
  }
  
  function clearBoard(){
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, boardWidth, boardHeight);
  }

  function createFood(){
    function randomFood(min, max){
      const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
      return randNum;
    }
    foodX = randomFood(0, boardWidth - unitSize);
    foodY = randomFood(0, boardHeight - unitSize);
  }

  function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY, unitSize, unitSize);
  }

  function moveSnake(){
    const head = {
      x : snakeBody[0].x + xVelocity,
      y: snakeBody[0].y + yVelocity
    }

    snakeBody.unshift(head);
    if(snakeBody[0].x == foodX && snakeBody[0].y == foodY){
      score += 1;
      scorerecord.textContent =score;
      createFood();
    }
    else {
      snakeBody.pop();
    }
  }

  function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeColor;
    snakeBody.forEach(snakeBodyPart =>{
      ctx.fillRect(snakeBodyPart.x, snakeBodyPart.y, unitSize, unitSize)
      ctx.strokeRect(snakeBodyPart.x, snakeBodyPart.y, unitSize, unitSize)
    });
  }

  function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83; 

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
      case(keyPressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
      case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
      case(keyPressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
      case(keyPressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
    }
  }
  function bordergoing(){
    if(snakeBody[0].x >= boardWidth){
      snakeBody[0].x = 0;
    }
    else if(snakeBody[0].x < 0){
      snakeBody[0].x = boardWidth - unitSize;
    }

    if(snakeBody[0].y >= boardHeight){
      snakeBody[0].y = 0;
    }
    else if(snakeBody[0].y < 0){
      snakeBody[0].y = boardHeight - unitSize;
    }
  }

  function checkGameOver(){
    for(let i = 1; i < snakeBody.length; i += 1){
      if(snakeBody[i].x == snakeBody[0].x && snakeBody[i].y == snakeBody[0].y){
        gameRunning = false;
      }
    }
  }

  function displayGameOver(){
    gameBoard.style.filter = "blur(5px)";
    popUp.classList.add("open-popUp")
    myScore.textContent = `Your score was ${score}`;
    scorerecord.style.filter = "blur(5px)";
  }

  function resetGame(){
    score = 0;
    scorerecord.textContent = 0;
    scorerecord.style.filter = "blur(0px)"
    xVelocity = unitSize;
    yVelocity = 0;
    snakeBody = [
      {x : unitSize, y: 0},
      {x : 0, y : 0}
    ]
    gameBoard.style.filter = "blur(0px)";
    popUp.classList.remove("open-popUp")
    gameStart();
  }
}
