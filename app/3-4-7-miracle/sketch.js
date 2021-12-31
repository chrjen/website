let r = 360; // Radius
let n = 7; // Number of points 
let g = 3; // Points to skip
let rr = (g / n) * r;
let rrr = 0.8 * rr;
let a = 0;
let da = 0.1;

function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(255);
    translate(width / 2, height / 2);


    boundingCircle();
    drawGraph();
    drawCircles();

    a += da / 7;
}

function boundingCircle() {
    noFill();
    stroke(0, 0, 0);
    strokeWeight(3);
    circle(0, 0, 2 * r);
}

function drawGraph() {
    noFill();
    stroke(50, 200, 50);
    strokeWeight(3);
    beginShape();
    let v1 = createVector(r - rr, 0);
    let v2 = createVector(rrr, 0);
    for (let a = 0; a < TAU * g; a += da) {
        v1.rotate(-da);
        v2.rotate((r / rr - 1) * da);
        let v3 = v1.copy().add(v2);
        vertex(v3.x, v3.y);
    }
    endShape();
}

function drawCircles() {
    for (let i = 0; i < n-g; i++) {

        let v1 = createVector(r - rr, 0);
        v1.rotate(i * TAU / (n-g));
        let v2 = createVector(rrr, 0);

        
        v1.rotate(-a);
        stroke(220, 180, 0);
        strokeWeight(2);
        circle(v1.x, v1.y, 2 * rr);
        
        stroke(255, 0, 0);
        strokeWeight(10);
        
        v2.rotate((r / rr - 1) * a);
        for (let j = 0; j < g; j++) {
            v3 = v1.copy().add(v2);
            point(v3.x, v3.y);
            v2.rotate(TAU / g);
        }
    }
}
