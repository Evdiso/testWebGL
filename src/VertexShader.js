export const VERTEX_SHADER = `
  attribute vec2 a_position;
  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;
  uniform mat3 rotationMatrix;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
    
  void main()
  {  
    gl_Position = vec4( (rotationMatrix * translationMatrix * projectionMatrix * vec3(a_position, 1.0)).xy, 0, 1);
    v_texCoord = vec2(a_position * vec2(u_resolution[0], u_resolution[1]));
  }
`;
