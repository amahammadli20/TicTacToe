let gameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let winningConditions = [
    [gameState[0][0], gameState[0][1], gameState[0][2]],
    [gameState[1][0], gameState[1][1], gameState[1][2]],
    [gameState[2][0], gameState[2][1], gameState[2][2]],

    [gameState[0][0], gameState[1][0], gameState[2][0]],
    [gameState[0][1], gameState[1][1], gameState[2][1]],
    [gameState[0][2], gameState[1][2], gameState[2][2]],

    [gameState[0][0], gameState[1][1], gameState[2][2]],
    [gameState[0][2], gameState[1][2], gameState[2][0]]
]

