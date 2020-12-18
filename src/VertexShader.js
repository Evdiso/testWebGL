export const VERTEX_SHADER = `
  attribute vec2 a_position;
  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;
  uniform mat3 rotationMatrix;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
    
  void main()
  { 
    float ratio = u_resolution.x / u_resolution.y;
    vec3 scaledPosition = projectionMatrix * vec3(a_position, 1.0);
    vec3 rotatePosition = rotationMatrix * scaledPosition;
    vec3 position = translationMatrix * rotatePosition;
   
    gl_Position = vec4(position / vec3(ratio, 1.0, 1.0), 1);
    v_texCoord = a_position;
  }
`;
