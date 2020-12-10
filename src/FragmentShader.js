export const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif
#define PI 3.14159265359
uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform float deltaAngle;
uniform float beginAngle;
uniform vec2 u_scale;

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

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main()
{
   vec2 normFrCoord = gl_FragCoord.xy/ u_resolution.xy;
   
   // vec2 t = scale(u_scale) * normFrCoord;
      
   vec2 fragCoord = vec2(normFrCoord.x * 2.0 - 1.0 , normFrCoord.y * 2.0 - 1.0);
   

    // fragCoord -= vec2(0.5);
    // fragCoord = scale(u_scale) * fragCoord;
    // fragCoord += vec2(0.5);


   float radius = dot(fragCoord,fragCoord);
   if (radius  > 1.0)
   { discard; }

   float angle =  (getAngle(fragCoord.x, fragCoord.y) - beginAngle) / deltaAngle;
   vec2 texCoord =  vec2(radius, angle);
      
   vec4 texColor = texture2D(u_image, texCoord);
   
   // gl_FragColor = mix(vec4(1.0,1.0,1.0, 1.0), vec4(0.0,0.6,0.08, 1.0), texColor.r);
   //
   //
   //  if (texColor.r > 0.5 && texColor.g > 0.5 && texColor.b > 0.5) {
   //    texColor.a = 0.0;
   //  }

   gl_FragColor = vec4(v_texCoord.x, 0, 0, 1);
   // gl_FragColor = texColor;
}

`
