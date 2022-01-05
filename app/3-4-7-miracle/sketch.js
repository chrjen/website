const G = {
    r: 40,
    _n: 7,
    _g: 3,
    a: 0,
    da: 0.1,
    colours: [],

    set n(value) {
        this._n = value;
        sliderN.value(value);
        inputN.value(value);
        updateUrlParams();
    },
    
    get n() {
        return this._n;
    },
    
    set g(value) {
        this._g = value;
        sliderG.value(value);
        inputG.value(value);
        updateUrlParams();
    },

    get g() {
        return this._g;
    },

    get ng() {
        let ng = this.n - this.g;
        return ng < 0 ? -ng : ng;
    },

    get rr() {
        return (this.g / this.n) * this.r;
    },

    get rrr() {
        return 0.8 * this.rr;
    },
}

let primaryPts = [];
let secondaryPts = [];

let sliderN;
let sliderG;


function setup() {
    createCanvas(800, 800);

    G.colours = [
        color(50, 200, 50),
        color(40, 175, 200),
        color(185, 40, 200),
        color(160, 200, 40),
        color(200, 80, 40),
    ];

    sliderN = createSlider(-12, 12, G.n, 0.1);
    inputN = createInput(String(G.n), 'number');
    sliderN.position(10, 10);
    sliderN.size(120);
    inputN.position(140, 10);
    inputN.size(60);
    
    sliderG = createSlider(-12, 12, G.g, 1);
    inputG = createInput(String(G.g), 'number');
    sliderG.position(10, 40);
    sliderG.size(120);
    inputG.position(140, 40);
    inputG.size(60);

    let updateG = function() { G.g = Number(this.value()); }
    let updateN = function() { G.n = Number(this.value()); }

    sliderG.input(updateG.bind(sliderG));
    inputG.elt.onblur = updateG.bind(inputG);
    inputG.elt.onchange = updateG.bind(inputG);

    sliderN.input(updateN.bind(sliderN));
    inputN.elt.onblur = updateN.bind(inputN);
    inputN.elt.onchange = updateN.bind(inputN);

    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('n')) {
        G.n = Number(params.get('n'));
    }
    if (params.get('g')) {
        G.g = Number(params.get('g'));
    }
}

function draw() {
    push();
    
    background(255);
    translate(width / 2, height / 2);

    calcPoints();

    drawGraph();
    drawCircles();
    boundingCircle();
    drawPrimaryPolygons();
    drawSecondaryPolygons();
    drawPoints();

    pop();

    textSize(48);
    textAlign(RIGHT);
    text(`{${G.n}/${G.g}}`, 700, 60);

    G.a += G.da / 7;

    // noLoop();
}

function updateUrlParams() {
    const params = new URLSearchParams();
    params.set('n', G.n);
    params.set('g', G.g);
    window.history.replaceState({}, '', "?" + params.toString());
}

function calcPoints() {
    primaryPts = [];
    secondaryPts = [];

    for (let i = 0; i < G.ng; i++) {

        let v1 = createVector(G.r - G.rr, 0);
        v1.rotate(i * TAU / (G.ng));
        let v2 = createVector(G.rrr, 0);


        v1.rotate(-G.a);
        stroke(220, 180, 0);
        strokeWeight(2);
        primaryPts.push({
            x: v1.x,
            y: v1.y,
        });

        stroke(255, 0, 0);
        strokeWeight(10);

        v2.rotate((G.r / G.rr - 1) * G.a);
        for (let j = 0; j < G.g; j++) {
            v3 = v1.copy().add(v2);
            secondaryPts.push({
                x: v3.x,
                y: v3.y,
            });
            v2.rotate(TAU / G.g);
        }
    }
}

function boundingCircle() {
    noFill();
    stroke(0, 0, 0);
    strokeWeight(3);
    circle(0, 0, 2 * G.r);
}

function drawGraph() {
    const period = swm(G.n) * TAU * G.g;
    let count = gcd(G.n, G.g);

    noFill();
    strokeWeight(3);
    for (let i = 0; i < count; i++) {

        stroke(G.colours[i % G.colours.length]);
        beginShape();
        let v1 = createVector(G.r - G.rr, 0);
        let v2 = createVector(G.rrr, 0);
        v1.rotate(i * TAU / G.ng);
        for (let a = 0; a < period; a += G.da) {
            v1.rotate(-G.da);
            v2.rotate((G.r / G.rr - 1) * G.da);
            let v3 = v1.copy().add(v2);
            vertex(v3.x, v3.y);
        }
        endShape();
    }
}

function drawCircles() {
    stroke(255, 200, 0);
    strokeWeight(3);
    for (p of primaryPts) {
        circle(p.x, p.y, 2 * G.rr);
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
    if (primaryPts.length == 0) {
        return;
    }

    stroke(0, 100, 255);
    strokeWeight(2);
    for (let i = 0; i < G.ng; i++) {
        beginShape();
        for (let j = 0; j < G.g + 1; j++) {
            const p = secondaryPts[i * G.g + j % G.g];
            vertex(p.x, p.y);
        }
        endShape();
    }
}

function drawSecondaryPolygons() {
    if (secondaryPts.length == 0) {
        return;
    }

    stroke(0, 200, 255);
    strokeWeight(2);
    for (let i = 0; i < G.g; i++) {
        beginShape();
        for (let j = 0; j < G.ng + 1; j++) {
            const p = secondaryPts[(j * G.g + i) % secondaryPts.length];
            vertex(p.x, p.y);
        }
        endShape();
    }
}

function gcd(a, b) {
    function _gcd(a, b) {
        return !b ? a : _gcd(b, a % b);
    }

    const A = new Fraction(a);
    const B = new Fraction(b);
    return _gcd(A.numerator * B.denominator, B.numerator * A.denominator);
}

// Smallest whole number multiple.
// Returns the smallest whole number that when
// multiplied with n still produces a whole number.
function swm(n) {
    let c = 1;
    while (c * n % 1 != 0) {
        c *= 10;
    }
    return c / gcd(n * c, c);
}

