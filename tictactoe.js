const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById('status');

//buttonz
const x = document.getElementById("x");
const o = document.getElementById("o");

let cellA;
let cellB;
let cellC;

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//game part 

let player;
let computer;
let xobuttons = document.querySelectorAll("button");

x.addEventListener('click', start);
o.addEventListener('click', start);


function start(){
  player = this.value;
  
  for (let btn of xobuttons){ //to disbale the buttons after selection player
    btn.disabled = true;
    btn.style.backgroundColor = 'gray';
    btn.style.cursor = 'default';
    btn.style.transform = 'translateY(0px)'
  }

  //main game part 

  let options = ["", "", "", "", "", "", "", "", ""]
  let gameRunning = false;
  
  initialize()
  
  //to initialize the game
  function initialize(){
    cells.forEach((cell) => cell.addEventListener('click', cellClicked));
    gameRunning = true;
  }
  
  //to check if the cells were clicked
  function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !gameRunning){
      return;
    }
    updateCell(this, cellIndex, player);
    if(!checkWinorTie()){
      computerMove()
    }
    checkWinorTie()
  }

  //to update cells after click 
  function updateCell(cell, index, playerinput){
    options[index] = playerinput;
    cell.textContent = playerinput;

    if (playerinput === 'x'){
      cell.style.color = '#09A093'
    }else if (playerinput == 'o'){
      cell.style.color = '#AA123F'
    }
  }

  //to check for win or tie 
  function checkWinorTie(){
    let roundWon = false;
    let isTie = false;
    
    for (let i = 0; i < winConditions.length; i++){ //loops through all the cells
      const condition = winConditions[i];
      cellA = options[condition[0]];
      cellB = options[condition[1]];
      cellC = options[condition[2]];

      if (cellA == ""|| cellB == "" || cellC == ""){ //checks if any of the cell is blanked or not
        continue;
      }

      if (cellA == cellB && cellB == cellC){ //checks if the 3 cells math to each other to declare win
        roundWon = true;
        break;
      }
    }
    
    if (roundWon){ // when won either by the human or the computer
      statusText.textContent = `${cellA} : wins`;
      gameRunning = false;
      return true;
    }

    if(options.every((cell) => cell !== "")){ // checks if the game was a tie
      isTie = true;
    }

    if(isTie){ // declares tie
      statusText.textContent = 'It was a tie';
      gameRunning = false;
      return true;
    }
    return false;
  }

  //computer or AI to play with the human player
  function computerMove(){
    computer = (player === 'x') ? 'o' : 'x'; // chooses the oposite of the human
    
    const emptycells = []; // declares an empty array
    
    for (let i = 0; i < options.length; i++){ //loops through options variable
      if (options[i] === ""){ //checks if any index of options variable is blank or not. if blank it pushesh the i
        emptycells.push(i);
      }
    }

    if(emptycells.length > 0){
      const randomIndex = Math.floor(Math.random() * emptycells.length);
      const computerIndex = emptycells[randomIndex];

      setTimeout(() =>{
        const computerCell = cells[computerIndex];
        updateCell(computerCell, computerIndex, computer);
        checkWinorTie()
      }, 500)
    }
  } 
}
