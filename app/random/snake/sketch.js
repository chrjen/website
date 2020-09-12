
let board = new Board(30, 30);
let snake = new Snake(board);

let timer;

function setup() {
    createCanvas(400, 400);
    timer = setInterval(() => {
        tick();
    }, 100);
}

function tick() {
    snake.tick();
}

function draw() {
    background(220);
    
    board.draw();
}

function keyPressed() {
    snake.keyPressed();
}