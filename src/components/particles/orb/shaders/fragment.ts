const fragmentShader: string = `
void main() {
  vec3 color = vec3(1.0, 0.1, 0.1);
  gl_FragColor = vec4(color, 1.0);
}`;

export default fragmentShader;