export const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif
#define PI 3.14159265359
uniform sampler2D u_image;
uniform float deltaAngle;
uniform float beginAngle;
uniform float u_int;
varying vec2 v_texCoord;

float getAngle(in float x, in float y)
{
    float angle = 0.0;

    if (x == 0.0)
    {
        if (y > 0.0)
            angle = PI / 2.0;
        else if (y < 0.0)
            angle = PI * 3.0 / 2.0;
        else
            angle = 0.0;
    }
    else if (x > 0.0)
    {
        if (y >= 0.0)
            angle = (atan(y / x));
        else if (y < 0.0)
           angle = (atan(y / x) + 2.0 * PI);
    }
    else
       angle = atan(y / x) + PI;

    return angle;
}

void main()
{
   float radius = sqrt(dot(v_texCoord,v_texCoord));
   if (radius  > 1.0)
   { discard; }

   float angle =  (getAngle(v_texCoord.x, v_texCoord.y) - 0.0) / deltaAngle;
   vec2 texCoord =  vec2(radius, angle);
      
   vec4 texColor = texture2D(u_image, texCoord);
   
   gl_FragColor = mix(vec4(1.0,1.0,1.0, 1.0), vec4(0.0,0.6,0.08, 1.0), texColor.r);


    if (texColor.r < u_int && texColor.g < u_int && texColor.b < u_int) {
      discard;
    }
    
   gl_FragColor = texColor;
   
   if (v_texCoord.y < 0.002 && v_texCoord.y > -0.002) {
    gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
   }

   if (v_texCoord.x < 0.001 && v_texCoord.x > -0.001) {
    gl_FragColor = vec4(0.0,1.0,0.0, 1.0);
   }
}

`
