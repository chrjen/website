// p5.js built-in values.
// Attributes
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

// Matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
//uniform mat3 uNormalMatrix;

// Values for fragment shader.
varying vec3 vPosition;
varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec2 vColor;


void main() {
  vPosition = aPosition;
  vTexCoord = aTexCoord;
  
  mat4 MVP = uProjectionMatrix * uModelViewMatrix;
  vec4 positionVec4 = MVP * vec4(aPosition, 1.0);

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}