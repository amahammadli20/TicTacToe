const statusDisplay = document.querySelector('.game--status');

// We will use gameActive to pause the game in case of an end scenario
let gameActive = true;
let currentPlayer = "X";
let gameState = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

//mesajlar
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//oyuncu statusu - kimin novbesidir
statusDisplay.innerHTML = currentPlayerTurn();

// novbe deyismek funksiyasi
function handlePlayerChange() {
    // eger indiki oyuncu X-dirsa onu O-ya deyis
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // kimin novbesidir statusunu update ele
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellPlayed(clickedCell, index1, index2) {
    if(currentPlayer === "X"){
        gameState[index1][index2] = 1;
    }else{
        gameState[index1][index2] = 2; 
    }
    console.log(gameState)

    clickedCell.innerHTML = currentPlayer;

    // novbe deyismek funksiyasi 
    handlePlayerChange();
}

// qalib varsa, winning mesaji + gameActive olmur ve davam eleme
function thereIsWinner(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;

}

function handleResultValidation() {
  
    //diaqonaldaki ededleri gotururuk
    let a = gameState[0][0]; 
    let b = gameState[1][1]; 
    let c = gameState[2][2];
    let roundWon=false;

    if(a!==0){
     let row1 = gameState[0];
     if(((a===row1[1])&&(a===row1[2]))||((a===gameState[1][0])&&(a===gameState[2][0]))||((a===b)&&(a===c))){
         console.log("beraberlik alindi");
         roundWon=true;
        thereIsWinner()
     }
    }

    if(b!==0){
        let row2= gameState[1];
        if(((b===row2[0])&&(b===row2[2]))||((b===gameState[0][1])&&(b===gameState[2][1]))||((b===gameState[0][2])&&(b===gameState[2][0]))){
            roundWon=true;
            thereIsWinner()
          
         }
    }
    
   if(c!==0){
        let row3= gameState[2];
        if(((c===row3[0])&&(c===row3[1]))||((c===gameState[0][2])&&(c===gameState[1][2]))){
            roundWon=true;
            thereIsWinner()
         }
    }
 
    // eger bura kimi gelibse ve artiq hec bir bos xana qlamayibsa, draw olsun
    if(!roundWon){
        let roundDraw = !(gameState[0].includes(0)||gameState[1].includes(0)||gameState[2].includes(0));

        //update: draw mesahi + gameActive olmur ve davam eleme
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
    }
}

function handleCellClick(e) {
    //click olunmus cell-in deyerini gotururuk (butun div elementini)
    const clickedCell = e.target;

    //click olinmus cell-in index-i
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index').split(",");
    const index1=parseInt(clickedCellIndex[0]);
    const index2=parseInt(clickedCellIndex[1]);
   

    //eger gamestate-de hemin index bos deyilse ve ya game active deyilse davam eleme, dayan
    if (gameState[index1][index2] !== 0 || !gameActive) {
        return;
    }

    //yuxarda aldigimiz xananin deyeri ve indexini handleCellPlayed-e otururuk
    handleCellPlayed(clickedCell, index1,index2);

    //update-lerimizi edirik
    handleResultValidation(); 
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = [[0,0,0],[0,0,0],[0,0,0]];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);