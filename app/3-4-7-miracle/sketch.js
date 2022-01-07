const G = {
    _r: 180,
    _n: 7,
    _g: 3,
    a: 0,
    da: 0.1,
    colours: [],

    rf: 0.8,
    rrf: 0.8,

    nSegments: 6000,

    get r() {
        const w = window.innerWidth / 2 * this.rf;
        const h = window.innerHeight / 2 * this.rf;
        return w < h ? w : h;
    },

    set n(value) {
        value = Math.round(value * 100) / 100;
        this._n = value;
        inputN.value = value;
        updateUrlParams();
    },

    get n() {
        return this._n;
    },

    set g(value) {
        value = Math.round(value * 100) / 100;
        this._g = value;
        inputG.value = value;
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
        return this.rr * this.rrf;
    },
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let primaryPts = [];
let secondaryPts = [];

let inputN;
let inputG;
let inputSize;
let inputRadius;
let inputSpeed;
let inputResolution;

let checkBorder;
let checkCircles;
let checkPrimaryPolygon;
let checkSecondaryPolygon;
let checkPoints;
let checkPath;
let checkDark;


function setup() {
    // div = createDiv("Hello");

    if (isMobile) {
        G.nSegments = 1000;
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

    inputN = new SliderInput("n", -12, 12, G.n, 0.25);
    inputN.onchange = function (value) { G.n = Number(value); };

    inputG = new SliderInput("g", -12, 12, G.g, 0.25);
    inputG.onchange = function (value) { G.g = Number(value); };

    inputSize = new SliderInput("size", 0, 1, G.rf, 0.01);
    inputSize.onchange = function (value) { G.rf = Number(value); };

    inputRadius = new SliderInput("radius", 0, 1, G.rrf, 0.01);
    inputRadius.onchange = function (value) { G.rrf = Number(value); };

    inputSpeed = new SliderInput("speed", 0, 1, G.da, 0.01);
    inputSpeed.onchange = function (value) { G.da = Number(value); };

    inputResolution = new SliderInput("res", 100, 15000, G.nSegments, 100);
    inputResolution.onchange = function (value) { G.nSegments = Number(value); };

    checkBorder = createCheckbox("border", true);
    checkBorder.position(60, SliderInput.yoffset);

    checkCircles = createCheckbox("circles", true);
    checkCircles.position(180, SliderInput.yoffset);
    checkPrimaryPolygon = createCheckbox("primary poly", true);
    checkPrimaryPolygon.position(60, SliderInput.yoffset + 20);
    checkSecondaryPolygon = createCheckbox("secondary poly", true);
    checkSecondaryPolygon.position(180, SliderInput.yoffset + 20);
    checkPoints = createCheckbox("points", true);
    checkPoints.position(60, SliderInput.yoffset + 40);
    checkPath = createCheckbox("path", true);
    checkPath.position(180, SliderInput.yoffset + 40);
    checkDark = createCheckbox("dark", false);
    checkDark.position(60, SliderInput.yoffset + 75);
    checkDark.changed(function () {
        if (this.checked()) {
            select('body').class('dark');
        } else {
            select('body').class('');
        }
    });

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
    push();

    if (checkDark.checked()) {
        background(0, 20, 40);
    } else {
        background(255);
    }
    if (!isMobile) {
        translate(width / 2, height / 2);
    }

    if (G.g === 0) {
        textSize(62);
        textAlign(CENTER);
        text("g == 0", 0, 0);
        return;
    }

    calcPoints();

    if (checkPath.checked()) {
        drawGraph();
    }
    if (checkCircles.checked()) {
        drawCircles();
    }
    if (checkBorder.checked()) {
        boundingCircle();
    }
    if (checkPrimaryPolygon.checked()) {
        drawPrimaryPolygons();
    }
    if (checkSecondaryPolygon.checked()) {
        drawSecondaryPolygons();
    }
    if (checkPoints.checked()) {
        drawPoints();
    }

    pop();

    if (checkDark.checked()) {
        fill(255);
    } else {
        fill(0);
    }
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
    if (checkDark.checked()) {
        stroke(255);
    } else {
        stroke(0);
    }
    strokeWeight(2);
    circle(0, 0, 2 * G.r);
}

function drawGraph() {
    const period = Math.abs(swm(G.n) * TAU * swm(G.g) * G.g);
    let count = gcd(G.n, G.g);
    const da = period / G.nSegments * count;

    noFill();
    strokeWeight(2);
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
    strokeWeight(2);
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

