const G = {
    _r: 180,
    _n: 7,
    _g: 3,
    a: 0,
    da: 0.1,
    colours: [],

    get r() {
        const w = window.innerWidth / 2 * 0.8;
        const h = window.innerHeight / 2 * 0.8;
        return w < h ? w : h;
    },

    set n(value) {
        value = Math.round(value * 100) / 100;
        this._n = value;
        sliderN.value(value);
        inputN.value(value);
        updateUrlParams();
    },

    get n() {
        return this._n;
    },

    set g(value) {
        value = Math.round(value * 100) / 100;
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

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let primaryPts = [];
let secondaryPts = [];

let sliderN;
let sliderG;

let nSegments = 1000;



function setup() {
    div = createDiv("Hello");

    if (isMobile) {
        createCanvas(windowWidth, windowHeight, WEBGL);
    } else {
        createCanvas(windowWidth, windowHeight);
    }

    G.colours = [
        color(50, 200, 50),
        color(40, 175, 200),
        color(185, 40, 200),
        color(160, 200, 40),
        color(200, 80, 40),
        color(245, 105, 105),
        color(105, 244, 105),
        color(55, 80, 220),
        color(234, 30, 190),
    ];

    sliderN = createSlider(-12, 12, G.n, 0.25);
    inputN = createInput(String(G.n), 'number');
    createDiv("n").
        position(10, 10).
        style('text-align', 'right').
        style('width', '40px');
    sliderN.position(60, 10);
    sliderN.size(150);
    inputN.position(220, 10);
    inputN.size(60);

    sliderG = createSlider(-12, 12, G.g, 1);
    inputG = createInput(String(G.g), 'number');
    createDiv("g").
        position(10, 40).
        style('text-align', 'right').
        style('width', '40px');
    sliderG.position(60, 40);
    sliderG.size(150);
    inputG.position(220, 40);
    inputG.size(60);

    let updateG = function () { G.g = Number(this.value()); }
    let updateN = function () { G.n = Number(this.value()); }

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // if (keyIsPressed) {
    //     G.n = Math.ceil((G.n + 0.01)*100) / 100;
    // }

    push();

    background(255);
    if (!isMobile) {
        translate(width / 2, height / 2);
    }

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
    text(`{${G.n}/${G.g}}`, windowWidth - 60, 60);

    G.a += G.da / 7;
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
        for (let j = 0; j < Math.abs(G.g); j++) {
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
    const period = Math.abs(swm(G.n) * TAU * swm(G.g) * G.g);
    let count = gcd(G.n, G.g);
    const da = period / nSegments * count;

    noFill();
    strokeWeight(3);
    for (let i = 0; i < count; i++) {

        stroke(G.colours[i % G.colours.length]);
        beginShape();
        let v1 = createVector(G.r - G.rr, 0);
        let v2 = createVector(G.rrr, 0);
        v1.rotate(i * TAU / G.ng);
        for (let a = 0; a <= period; a += da) {
            v1.rotate(-da);
            v2.rotate((G.r / G.rr - 1) * da);
            let v3 = v1.copy().add(v2);
            vertex(v3.x, v3.y);
        }
        endShape();
    }
}

function drawCircles() {
    noFill();
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

    noFill();
    stroke(0, 100, 255);
    strokeWeight(2);
    let gg = Math.abs(Math.ceil(G.g));
    for (let i = 0; i < G.ng; i++) {
        beginShape();
        for (let j = 0; j < gg + 1; j++) {
            const p = secondaryPts[i * gg + j % gg];
            if (p) {
                vertex(p.x, p.y);
            }
        }
        endShape();
    }
}

function drawSecondaryPolygons() {
    if (secondaryPts.length == 0) {
        return;
    }

    noFill();
    stroke(0, 200, 255);
    strokeWeight(2);
    let gg = Math.abs(Math.ceil(G.g));
    for (let i = 0; i < gg; i++) {
        beginShape();
        for (let j = 0; j < G.ng + 1; j++) {
            const p = secondaryPts[(j * gg + i) % secondaryPts.length];
            if (p) {
                vertex(p.x, p.y);
            }
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
    return Math.abs(_gcd(A.numerator * B.denominator, B.numerator * A.denominator));
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

