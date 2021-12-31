let r = 360; // Radius
let n = 7; // Number of points 
let g = 3; // Points to skip
let rr = (g / n) * r;
let rrr = 0.8 * rr;
let a = 0;
let da = 0.1;

let primaryPts = [];
let secondaryPts = [];

function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    calcPoints();

    drawGraph();
    drawCircles();
    boundingCircle();
    drawPrimaryPolygons();
    drawSecondaryPolygons();
    drawPoints();

    a += da / 7;
}

function calcPoints() {
    primaryPts = [];
    secondaryPts =  [];

    for (let i = 0; i < n-g; i++) {

        let v1 = createVector(r - rr, 0);
        v1.rotate(i * TAU / (n-g));
        let v2 = createVector(rrr, 0);

        
        v1.rotate(-a);
        stroke(220, 180, 0);
        strokeWeight(2);
        primaryPts.push({
            x: v1.x,
            y: v1.y,
        });
        
        stroke(255, 0, 0);
        strokeWeight(10);
        
        v2.rotate((r / rr - 1) * a);
        for (let j = 0; j < g; j++) {
            v3 = v1.copy().add(v2);
            secondaryPts.push({
                x: v3.x,
                y: v3.y,
            });
            v2.rotate(TAU / g);
        }
    }
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
    stroke(255, 200, 0);
    strokeWeight(3);
    for (p of primaryPts) {
        circle(p.x, p.y, 2*rr);
    }
}

function drawPoints() {
    stroke(255, 0, 0);
    strokeWeight(10);
    for (p of secondaryPts) {
        point(p.x, p.y);
    }
}

function drawPrimaryPolygons() {
    stroke(0, 100, 255);
    strokeWeight(2);
    for (let i = 0; i < n-g; i++) {
        beginShape();
        for (let j = 0; j < g+1; j++) {
            const p = secondaryPts[i * g + j%g];
            vertex(p.x, p.y);
        }
        endShape();
    }
}

function drawSecondaryPolygons() {
    stroke(0, 200, 255);
    strokeWeight(2);
    for (let i = 0; i < g; i++) {
        beginShape();
        for (let j = 0; j < n-g+1; j++) {
            const p = secondaryPts[(j*g + i)%secondaryPts.length];
            vertex(p.x, p.y);
        }
        endShape();
    }
}

