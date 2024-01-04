const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#status");

let input = document.querySelector("#inp");
let submit = document.querySelector("#submit");
let plr = document.querySelector("#player")
//winning conditions
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


let value;

//player choosing part

function xoro(){
  value = input.value;

  if (value == 'x' || value == 'o'){
    plr.textContent = `player is ${value}`
  }
  else{
    alert('choose between x or o')
  }
  
  if (value != ""){
    input.disabled = true;
    submit.disabled = true;
    submit.style.backgroundColor = "gray"
  }

}

submit.addEventListener('click', xoro)

//game part 

let option = ["", "", "", "", "", "", "", "", ""];
let player = {value: ""};
let running = false;


//initializing part

initialize()

function initialize() {
  cells.forEach((cell) => cell.addEventListener("click", cellclicked));
  running = true;
}

function cellclicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (option[cellIndex] != "" || !running) {
    return;
  }

  updatecell(this, cellIndex, value); // pass the value parameter
  if (!checkwinner()) {
    computerMove(value); // pass the value parameter
  }
  // changeplayer(); // remove this line
}

function updatecell(cell, index, value) { // accept the value parameter
  // player.value = value; // remove this line
  option[index] = value;
  cell.textContent = value;
}


function checkwinner() {
  let roundwon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundwon = true;
      break;
    }
  }

  if (roundwon) {
    statustext.textContent = `Player ${value} wins!`;
    running = false;
    return true;
  }

  return false;
}

function computerMove(value) { // accept the value parameter
  const emptyCells = [];
  for (let i = 0; i < option.length; i++) {
    if (option[i] === "") {
      emptyCells.push(i);
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerIndex = emptyCells[randomIndex];

    setTimeout(() => {
      const computerCell = cells[computerIndex];
      const computerValue = (value == "x") ? "o" : "x"; // use the opposite symbol of the player
      updatecell(computerCell, computerIndex, computerValue); // pass the computerValue parameter
      checkwinner();
    }, 500); // Delay for a smoother experience
  }
}


