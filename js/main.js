/*----- constants -----*/
const selections = {
    null: '',
    1: 'X',
    '-1': 'O'
};
const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('#board > section');
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
    squares.forEach(function(square, idx) {
       square.textContent = selections[board[idx]];
    });

    let msg = '';
    if (winner === null) {
        turn === 1 ? msg = `PLAYER ${selections[1]}'S TURN` : msg = `PLAYER ${selections['-1']}'S TURN`;
    } else if (winner === 'T') {
        msg = "IT'S A TIE!";
    } else {
        winner === 1 ? msg = `PLAYER ${selections[1]} WINS!` : msg = `PLAYER ${selections['-1']} WINS!`;
    }
    titleEl.textContent = msg;
}

function squareClick(e) {
    let idx = e.target.id;
    if (board[idx] !== null || winner !== null) return;
    board[idx] = turn;
    turn *= -1;

    winCondition.forEach(function(condition) {
        let total = Math.abs(board[condition[0]] + board[condition[1]] + board[condition[2]]);
        if (total === 3) winner = board[condition[0]];
        if (!board.includes(null)) winner = 'T';
    });

    render();
}