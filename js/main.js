/*----- constants -----*/
const players = {
    null: '',
    1: 'X',
    '-1': 'O'
};
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const squareEls = document.querySelectorAll('#board > section');
const titleEl = document.querySelector('h1');
const resetBtn = document.getElementById('reset');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', squareClick);
resetBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    board = [null, null, null, null, 
        null, null, null, null, null];
    turn = 1;
    winner = null;

    render();
}

function render() {
    squareEls.forEach(function(square, idx) {
       square.textContent = players[board[idx]];
    });

    let msg = '';
    if (winner === null) msg = `PLAYER ${players[turn]}'S TURN`;
    else if (winner === 'T') msg = "IT'S A TIE!";
    else msg = `PLAYER ${players[winner]} WINS!`;
    titleEl.textContent = msg;
}

function squareClick(evt) {
    let idx = evt.target.dataset.idx;
    if (board[idx] !== null || winner !== null) return;
    board[idx] = turn;
    turn *= -1;

    checkWinner();
    render();
}

function checkWinner () {
    let total = 0;
    winCombos.forEach(function(combo) {
        total = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]);
        if (total === 3) winner = board[combo[0]];
        if (!board.includes(null) && winner === null) winner = 'T';
    });
}