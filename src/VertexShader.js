export const VERTEX_SHADER = `
  attribute vec2 a_position;
  uniform vec2 u_scale;
  varying vec2 v_texCoord;
  
  mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
  }
  
  void main()
  {
    vec2 res = scale(u_scale) * a_position;
    gl_Position = vec4(res, 0, 1);
    v_texCoord = res;
  }
`;
