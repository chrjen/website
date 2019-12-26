#ifdef GL_ES
precision mediump float;
#endif

#define TAU 6.283185307179586

// Values from vertex shader.
varying vec3 vPosition;
varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec2 vColor;

// Uniforms
uniform sampler2D tex0;
uniform sampler2D colours;


void main (void) {

    vec3 posNorm = vPosition/2.0 + 0.5;
    float u = atan(vPosition.x, vPosition.z) / TAU + 0.5;
    
    float v = posNorm.y;

    if (v <= 0.2501) {
        v = sqrt(vPosition.x*vPosition.x + vPosition.z*vPosition.z) / 4.0;
    }
    if (v >= 0.7499) {
        v = 1.0 - sqrt(vPosition.x*vPosition.x + vPosition.z*vPosition.z) / 4.0;
    }

    float colourIdx = floor(texture2D(tex0, vec2(v, u)).r * 256.0 + 0.5) + 0.5;
    vec4 colour = texture2D(colours, vec2(colourIdx/256.0, 0.5));
    
    float r = 0.0;
    if (floor(texture2D(tex0, vec2(v, u)).r * 256.0 + 0.5) > 0.0) {
        r = 1.0;
    }
    gl_FragColor = texture2D(tex0, vec2(v, u));
}