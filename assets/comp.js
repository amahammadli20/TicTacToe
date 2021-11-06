const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

var takenCells = [];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellPlayed(clickedCell, index1, index2) {
    gameState[index1][index2] = 1;

    clickedCell.innerHTML = currentPlayer;
    handlePlayerChange();
}


function handleCellPlayedByComp(compClickedCell, ind1, ind2) {
    gameState[ind1][ind2] = 2;
    // console.log(ind1, ind2, '= 2'); 

    compClickedCell.text(`${currentPlayer}`);
    console.log(compClickedCell);
    handlePlayerChange();
}


function thereIsWinner(){
    // currentPlayer = currentPlayer === "X" ? "O" : "X";
    if(currentPlayer === "O"){
        statusDisplay.innerHTML = 'Player X has won!'
    }else if(currentPlayer === "X"){
        statusDisplay.innerHTML = 'Player O has won!'
    }
    gameActive = false;
    return;
}

function handleResultValidation() {
    let a = gameState[0][0]; 
    let b = gameState[1][1]; 
    let c = gameState[2][2];
    let roundWon=false;
    if(a!==0){
     let row1 = gameState[0];
     if(((gameState[0][0]===gameState[0][1])&&(gameState[0][0]===gameState[0][2]))||
     ((gameState[0][0]===gameState[1][0])&&(gameState[0][0]===gameState[2][0]))||
     ((a===b)&&(a===c))){
         console.log("beraberlik alindi");
         roundWon=true;
        thereIsWinner();
     }
    }

    if(b!==0){
        let row2= gameState[1];
        if(((gameState[1][0]===gameState[1][1])&&(gameState[1][1]===gameState[1][2]))||
        ((gameState[1][1]===gameState[0][1])&&(gameState[1][1]===gameState[2][1]))||
        ((gameState[1][1]===gameState[0][2])&&(gameState[1][1]===gameState[2][0]))){
            roundWon=true;
            thereIsWinner()
          
         }
    }
   if(c!==0){
        let row3= gameState[2];
        if(((gameState[2][0]===gameState[2][2])&&(gameState[2][2]===gameState[2][1]))||
        ((gameState[2][2]===gameState[0][2])&&(gameState[2][2]===gameState[1][2]))){
            roundWon=true;
            thereIsWinner()
         }
    }
 
    if(!roundWon){
        let roundDraw = !(gameState[0].includes(0)||gameState[1].includes(0)||gameState[2].includes(0));

        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
    }
}

function handleCompClick(index1, index2){
    console.log(index1, index2);
    const compClickedCell = $('[data-cell-index="'+index1+','+index2+'"]');

    console.log('compClickedCell: ', compClickedCell);

    if (gameState[index1][index2] !== 0 || !gameActive) {
        return;
    }

    handleCellPlayedByComp(compClickedCell, index1,index2);
}

function handleCellClick(e) {
    //click olunmus cell-in deyerini gotururuk (butun div elementini)
    const clickedCell = e.target;

    //click olinmus cell-in index-i
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index').split(",");
    const index1=parseInt(clickedCellIndex[0]);
    const index2=parseInt(clickedCellIndex[1]);

    var playerCellIndexes = index1 + '' + index2;
    console.log('Player Cell Indexes: ', playerCellIndexes);
    takenCells.push(playerCellIndexes);
   

    //eger gamestate-de hemin index bos deyilse ve ya game active deyilse davam eleme, dayan
    if (gameState[index1][index2] !== 0 || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, index1,index2);

    handleResultValidation();
    
    var possibleValues = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];

    let difference = possibleValues.filter(x => !takenCells.includes(x));

    possibleValues = difference;
    console.log('New possible values: ', possibleValues);

    var randomIndex = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    // console.log('Random index generated: ', randomIndex1, randomIndex2); 

    takenCells.push(randomIndex);
    
    var digits = randomIndex.split('');
    var realDigits = digits.map(Number);

    var validIndex1 = realDigits[0]
    var validIndex2 = realDigits[1]
    console.log(validIndex1, validIndex2);

    setTimeout(() => {
        handleCompClick(validIndex1,validIndex2);
        console.log("Compare generated random choice");

        handleResultValidation();
    }, 1000);
    console.log('taken cells: ', takenCells)
}

function handleRestartGame() {
    possibleValues = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
    takenCells = [];
    gameActive = true;
    currentPlayer = "X";
    gameState = [
        [0,0,0],
        [0,0,0],
        [0,0,0]];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

