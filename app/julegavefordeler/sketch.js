let names = [
    "Alice",
    "Bob",
    "Charlotte",
    "Davis",
    "Eli",
    "Frank",
    "George",
    "Hendricks",
    "Ivy"
];

function preload() {
    default_tex = loadImage("assets/default_tex.png");
    
    cylinder_shader = loadShader("assets/cylinder.vert", "assets/cylinder.frag");

    font_girassol = loadFont("assets/fonts/Girassol/Girassol-Regular.ttf");
    font_spirax = loadFont("assets/fonts/Spirax/Spirax-Regular.ttf");
}

let font_size = 16;
let wheel_tex;
let wheel_tex_w = 64;
let wheel_tex_h = 128;

let colours_tex;
let colours = [
    [0xff, 0xff, 0xff, 0xff], // #ffffff
    [0x30, 0xa0, 0x65, 0xff], // #30a065
    [0xc0, 0x34, 0x15, 0xff], // #c03415
    [0xdb, 0xb1, 0x3b, 0xff], // #dbb13b
];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    wheel_tex = createGraphics(wheel_tex_w, wheel_tex_h);

    textFont(font_girassol);
    textAlign(CENTER, CENTER);
    textSize(font_size);
    perspective(PI / 4.0, width / height, 0.01, 5000);

    colours_tex = createImage(256, 1);
    colours_tex.loadPixels();
    for (let i = 0; i < colours.length; i++) {
        colours_tex.pixels[i] = colours[i];
    }
    colours_tex.updatePixels();

    colours_tex.glMinFilter = NEAREST

    // Create the wheel background texture.
    wheel_tex.stroke(255);
    wheel_tex.background(255);
    wheel_tex.noStroke();
    for (let i = 0; i < names.length; i++) {
        wheel_tex.fill(colours[i % 3 + 1]);
        wheel_tex.rect(
            0,
            wheel_tex_h / names.length * i,
            wheel_tex_w,
            wheel_tex_h / names.length);
    }
}

let wheel_r = 50;
let wheel_h = 50;
let wheel_quality = 62;
let wheel_stroke = wheel_tex_h * 0.005;

let rim_r = 5;

let rot = 0.00;
let rot_v = 0.00;

function draw() {
    orbitControl();

    // #1390c0
    background(0x13, 0x90, 0xc0, 0xff);
    
    translate(-(wheel_h + 8) + wheel_h/2, 0, 805);
    rotateX(rot);
    rot_v *= 0.98;
    rot += rot_v;
    rotateZ(TAU/4);
    
    smooth();
    // Set-up shader
    cylinder_shader.setUniform("tex0", wheel_tex);
    cylinder_shader.setUniform("colours", colours_tex);
    shader(cylinder_shader);
    
    cylinder(wheel_r, wheel_h, wheel_quality, 1);

    // Revert to default shader
    resetShader();

    // Axle
    fill(0);
    noStroke();
    cylinder(wheel_r * 0.33, wheel_h * 1.1, 24, 1);
    
    // Rim
    fill(0x6e, 0x55, 0x3d) // ##6e553d
    push();
        rotateX(TAU/4);
        translate(0, 0, wheel_h / 2);
        torus(wheel_r, 2, wheel_quality, rim_r);
        translate(0, 0, -wheel_h);
        torus(wheel_r, 2, wheel_quality, rim_r);
    pop();

    // Pegs
    fill(50);
    for (let i = 0; i < names.length; i++) {
        push();
            rotateY(TAU / names.length * 0.5);
            translate(0, (wheel_h - rim_r) / 2, wheel_r);
            rotateZ(-TAU / 4);
            box(1, 1, 6);
        translate(wheel_h - rim_r, 0, 0);
            box(1, 1, 6);
        pop();
        rotateY(TAU / names.length);
    }

    // Dividers
    fill(255);
    for (let i = 0; i < names.length; i++) {
        push();
            rotateY(TAU / names.length * 0.5);
            translate(0, 0, wheel_r);
            rotateZ(-TAU / 4);
            box(wheel_h * 0.92, 2, 1);
        pop();
        rotateY(TAU / names.length);
    }

    fill(255);
    for (let i = 0; i < names.length; i++) {
        push();
            translate(0, 0, wheel_r*1.005);
            rotateZ(-TAU/4);
            let size = font_size;
            while (textWidth(names[i]) > wheel_h * 0.95) {
                textSize(size);
                size--;
            }
            text(names[i], 0, 0);
        pop();
        rotateY(TAU / names.length);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    perspective(PI / 4.0, width / height, 0.1, 2000);
}

function spinWheel() {
    rot_v = 1.8;
}

function stopWheel() {
    rot_v = 0;
}

const PAGE_DOWN = 34;
const PAGE_UP = 33;

function keyPressed() {
    if (keyCode === PAGE_DOWN) {
        spinWheel()
    } else if (keyCode === PAGE_UP) {
        stopWheel()
    }
}

function mouseClicked() {
    if (mouseX < width * 0.25) {
        spinWheel();
    } else if (mouseX > width * 0.75) {
        stopWheel();
    }
}