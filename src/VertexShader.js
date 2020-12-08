export const VERTEX_SHADER = `
  attribute vec2 a_position;
  // uniform mat3 u_matrix;
  
  void main()
  {
    // Multiply the position by the matrix.
    // vec2 position = (u_matrix * vec3(a_position, 1)).xy;
    // gl_Position = vec4(a_position, 0.0, 1.0);
    gl_Position = vec4(a_position, 0, 1);
  }
`;
