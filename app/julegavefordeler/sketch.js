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

function setup() {
    createCanvas(1920, 1080, WEBGL);

    textFont(font_girassol);
    textAlign(CENTER, CENTER);
    textSize(font_size);
    perspective(PI / 4.0, width / height, 0.1, 5000);
}

let wheel_r = 50;
let wheel_h = 50;
let wheel_quality = 62;

let rot = 0.00;
let rot_v = -0.02;

function draw() {
    orbitControl();
    
    // #1390c0
    background(0x13, 0x90, 0xc0, 0xff);
    
    translate(-(wheel_h + 5) + wheel_h/2, 0, 810);
    rotateX(rot);
    rot_v *= 0.999;
    rot += rot_v;
    rotateZ(TAU/4);
    
    // Set-up shader
    cylinder_shader.setUniform("tex0", default_tex);
    shader(cylinder_shader);
    
    cylinder(wheel_r, wheel_h, wheel_quality, 2);
    
    // Revert to default shader
    resetShader();

    for (let i = 0; i < names.length; i++) {
        push();
            translate(0, 0, wheel_r*1.005);
            rotateZ(-TAU/4);
            let size = font_size;
            while (textWidth(names[i]) > wheel_h) {
                textSize(size);
                size--;
            }
            text(names[i], 0, 0);
        pop();
        rotateY(TAU / names.length);
    }
}