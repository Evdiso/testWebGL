import {FRAGMENT_SHADER} from "../FragmentShader";
import {VERTEX_SHADER} from "../VertexShader";

export const createProgram = (gl) => {
  const frShader = gl.createShader(gl.FRAGMENT_SHADER)
  const vsShader = gl.createShader(gl.VERTEX_SHADER)

  gl.shaderSource(frShader, FRAGMENT_SHADER)
  gl.shaderSource(vsShader, VERTEX_SHADER)

  gl.compileShader(frShader)
  if (!gl.getShaderParameter(frShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(frShader));
    return null;
  }

  gl.compileShader(vsShader)
  if (!gl.getShaderParameter(vsShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vsShader));
    return null;
  }

  const program = gl.createProgram()
  gl.attachShader(program, vsShader)
  gl.attachShader(program, frShader)
  gl.linkProgram(program)

  return { program }
}

export const createPositionBuffer = (gl, program) => {
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, 1.0,
    1.0, 1.0,
    1.0, -1.0,
    1.0, -1.0,
    -1.0, -1.0,
    -1.0, 1.0
  ]), gl.STATIC_DRAW);

  return { positionBuffer, positionLocation }
}

export const createTextureBuffer = (gl, program, image) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

export const initProgram = (gl, program, positionBuffer, positionLocation) => {
  resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(
    positionLocation, 2, gl.FLOAT, false, 0, 0);

  const beginAngle = gl.getUniformLocation(program, "beginAngle");
  gl.uniform1f(beginAngle, 0.0);

  const deltaAngle = gl.getUniformLocation(program, "deltaAngle");
  gl.uniform1f(deltaAngle, 360.0 * Math.PI / 180);

  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
}

export const drawProgram = (gl) => {
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
}


export const resizeCanvasToDisplaySize = (canvas, multiplier) => {
  multiplier = multiplier || 1;
  const width  = canvas.clientWidth  * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width ||  canvas.height !== height) {
    canvas.width  = width;
    canvas.height = height;
    return true;
  }
  return false;
}
