
let board = new Board(30, 30);
let snake = new Snake(board);

let timer;

function setup() {
    board.spawnApple();
    createCanvas(300, 300);
    board.tileSize = width / board.width;
    timer = setInterval(() => {
        tick();
    }, 100);
}

let ticks = 0;
function tick() {
    snake.tick();
    ticks++;
}

function draw() {
    background(220);
    
    board.draw();
}

function keyPressed() {
    snake.keyPressed();
}