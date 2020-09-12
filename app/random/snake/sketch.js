
let board = new Board(30, 30);
let snake = new Snake(board);

let timer;

let isGameOver = false;

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

function gameOver() {
    clearInterval(timer);
    noLoop();
    redraw();
    isGameOver = true;
}

function draw() {
    background(220);
    
    board.draw();

    if (isGameOver) {
        noStroke();
        fill(200, 0, 0);
        
        textSize(32);
        textAlign(CENTER);
        text("GAME OVER", width / 2, height / 2);
    }
}

function keyPressed() {
    snake.keyPressed();
}