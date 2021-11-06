const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = "X";
let gameState = [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0']
]

//mesajlar
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//oyuncu statusu - kimin novbesidir
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    // horizontal xett uzre
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical xett uzre
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // dioqnallar uzre
    [0, 4, 8],
    [2, 4, 6]
];

// function handleClick(clickedCellEvent){
//     const clickedCell = clickedCellEvent.target;

//     const clickedCellIndex = clickedCell.getAttribute('data-cell-index');
//     console.log('Clicked cell index: ', clickedCellIndex);
// }


$(".cell").click(function() {
    checkResults();

    console.log($(this).attr("data-cell-index"));

    var cellIndex = $(this).attr("data-cell-index");

    var clickedItemText = $("[data-cell-index=0]").text();

    if(cellIndex == '0'){
        gameState[0][0] = currentPlayer;
        console.log('Current player: ', currentPlayer);
        $("[data-cell-index=0]").text(currentPlayer);
    }else if(cellIndex == '1'){
        gameState[0][1] = currentPlayer;
        console.log('Current player: ', currentPlayer);
        $("[data-cell-index=1]").text(currentPlayer);
    }else if(cellIndex == '2'){
        $("[data-cell-index=2]").text(currentPlayer);
        gameState[0][2] = currentPlayer;
    }else if(cellIndex == '3'){
        $("[data-cell-index=3]").text(currentPlayer);
        gameState[1][0] = currentPlayer;
    }else if(cellIndex == '4'){
        $("[data-cell-index=4]").text(currentPlayer);
        gameState[1][2] = currentPlayer;
    }else if(cellIndex == '5'){
        $("[data-cell-index=5]").text(currentPlayer);
        gameState[1][3] = currentPlayer;
    }else if(cellIndex == '6'){
        $("[data-cell-index=6]").text(currentPlayer);
        gameState[2][0] = currentPlayer;
    }else if(cellIndex == '7'){
        $("[data-cell-index=7]").text(currentPlayer);
        gameState[2][1] = currentPlayer;
    }else if(cellIndex == '8'){
        $("[data-cell-index=8]").text(currentPlayer);
        gameState[2][2] = currentPlayer;
    }

    handlePlayerChange();
  });


// novbe deyismek funksiyasi
function handlePlayerChange() {
    // eger indiki oyuncu X-dirsa onu O-ya deyis
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // kimin novbesidir statusunu update ele
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkResults(){
    for(var i = 0; i < winningConditions.length; i++){
        var eachWinningArr = winningConditions[i];
        for(var j = 0; j < eachWinningArr.length; j++){
            if(eachWinningArr[j] == 'X' && eachWinningArr[j+1] == 'X' && eachWinningArr[j+2] == 'X'){
                winningMessage();
            }else if(eachWinningArr[j] == 'O' && eachWinningArr[j+1] == 'O' && eachWinningArr[j+2] == 'O'){
                winningMessage();
            } 
        }
    }
}

$(".game--restart").click(function(){
    handleRestartGame();
})

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}



document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);