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
let wheel_tex_w = 256;
let wheel_tex_h = 2048;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    wheel_tex = createGraphics(wheel_tex_w, wheel_tex_h);

    textFont(font_girassol);
    textAlign(CENTER, CENTER);
    textSize(font_size);
    perspective(PI / 4.0, width / height, 0.01, 5000);

    // Create the wheel background texture.
    wheel_tex.background(0x30, 0xa0, 0x65); // #30a065
    wheel_tex.fill(0xc0, 0x34, 0x15); // #c03415
    wheel_tex.stroke(255);
    wheel_tex.strokeWeight(wheel_stroke);
    for (let i = 0; i < names.length; i++) {
        if (i % 2 === 0) continue;
        wheel_tex.rect(
            -wheel_stroke,
            wheel_tex_h / names.length * i,
            wheel_tex_w + 2 * wheel_stroke,
            wheel_tex_h / names.length);
    }
    wheel_tex.line(0, 0, wheel_tex_w, 0);
    wheel_tex.line(0, wheel_tex_h, wheel_tex_w, wheel_tex_h);
    wheel_tex.strokeWeight(wheel_stroke);
    wheel_tex.line(wheel_tex_w * 0.25, 0, wheel_tex_w * 0.25, wheel_tex_h);
    wheel_tex.line(wheel_tex_w * 0.75, 0, wheel_tex_w * 0.75, wheel_tex_h);
}

let wheel_r = 50;
let wheel_h = 50;
let wheel_quality = 62;
let wheel_stroke = wheel_tex_h * 0.005;

let rot = 0.00;
let rot_v = 0.00;

function draw() {
    orbitControl();

    // translate(-512, -512, -1000);
    // image(wheel_tex, 0, 0, 1024);
    // return;

    // #1390c0
    background(0x13, 0x90, 0xc0, 0xff);
    
    translate(-(wheel_h + 5) + wheel_h/2, 0, 805);
    rotateX(rot);
    rot_v *= 0.98;
    rot += rot_v;
    rotateZ(TAU/4);
    
    smooth();
    // Set-up shader
    cylinder_shader.setUniform("tex0", wheel_tex);
    shader(cylinder_shader);
    
    cylinder(wheel_r, wheel_h, wheel_quality, 1);

    // Revert to default shader
    resetShader();

    fill(0);
    cylinder(wheel_r * 0.33, wheel_h * 1.1, 24, 1);
    
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

const PAGE_DOWN = 34;
const PAGE_UP = 33;

function keyPressed() {
    if (keyCode === PAGE_DOWN) {
        rot_v = 1.8;
    } else if (keyCode === PAGE_UP) {
        rot_v = 0;
    }
}