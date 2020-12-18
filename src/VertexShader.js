export const VERTEX_SHADER = `
  attribute vec2 a_position;
  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;
  uniform mat3 rotationMatrix;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
    
  void main()
  {
  	// преобразуем положение в пикселях к диапазону от 0.0 до 1.0
    // vec2 zeroToOne = a_position / u_resolution;
    
    // преобразуем из 0->1 в 0->2
    // vec2 zeroToTwo = zeroToOne * 2.0;

    // преобразуем из 0->2 в -1->+1 (пространство отсечения)
    // vec2 clipSpace = zeroToTwo - 1.0;
    
    // float ratio = u_resolution.y / u_resolution.x;
    
    // gl_Position = vec4((rotationMatrix * translationMatrix * projectionMatrix * vec3(a_position, 1.0)).xy, 0, 1);
    // v_texCoord = a_position;
    
    float ratio = u_resolution.y / u_resolution.x;
    vec3 scaledPosition = projectionMatrix * vec3(a_position, 1.0);
    vec3 rotatePosition = rotationMatrix * scaledPosition;
    vec3 position = translationMatrix * rotatePosition;
    
    gl_Position = vec4(position * vec3(ratio, 1.0, 1.0), 1);
    v_texCoord = a_position;
  }
`;
