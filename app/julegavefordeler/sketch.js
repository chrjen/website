function preload() {
    default_tex = loadImage("assets/default_tex.png");
    
    cylinder_shader = loadShader("assets/cylinder.vert", "assets/cylinder.frag");
}

function setup() {
    createCanvas(1920, 1080, WEBGL);
    perspective(PI / 4.0, width / height, 0.1, 5000);
}

let wheel_r = 60;
let wheel_h = 50;
let wheel_quality = 8;

let rot = 2.25;
let rot_v = -0.1;

function draw() {
    orbitControl();
    
    // #1390c0
    background(0x13, 0x90, 0xc0);
    //texture(default_tex);
    translate(-(wheel_h + 5) + wheel_h/2, 0, 800);
    rotateX(rot);
    rot_v *= 0.995;
    rot += rot_v;
    rotateZ(TAU/4);
    
    // Set-up shader
    cylinder_shader.setUniform("tex0", default_tex);
    shader(cylinder_shader);

    cylinder(wheel_r, wheel_h, wheel_quality, 2);
}