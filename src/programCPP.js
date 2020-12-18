import React, {useEffect, useCallback, useState} from 'react'
import img from "./assets/test.png";
// import img from "./assets/image.png";
// import img from "./assets/image2020-11-30_18-49-26.png";
import {
  createPositionBuffer,
  createProgram,
  createTextureBuffer, drawProgram, initProgram, resizeCanvasToDisplaySize
} from "./helpers/webGLHelpers";

export const ProgramCPP = ({angle = 0.0, scale = [1.0,1.0], translate = [0.0, 0.0], int = 0.0}) => {
  const [GLContext, setGLContext] = useState(null);
  const [GLProgram, setGLProgram] = useState(null);

  const initWebGL = useCallback((image) => {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");

    const { program } = createProgram(gl)
    const { positionLocation, positionBuffer } = createPositionBuffer(gl, program)
    createTextureBuffer(gl, program, image)
    initProgram(gl, program, positionBuffer, positionLocation)

    setGLContext(gl)
    setGLProgram(program)
  }, [])

  useEffect(() => {
    console.time('INIT')
    const image = new Image()
    image.src = img
    image.onload = function () {
      initWebGL(image)
      console.timeEnd('INIT')
    }
  }, [initWebGL])

  useEffect(() => {
    if (Boolean(GLContext) && Boolean(GLProgram)) {
      requestAnimationFrame(() => {
        drawProgram(GLContext, GLProgram, scale, translate, angle, int)
      })
    }
  }, [GLContext, GLProgram, scale, angle, translate, int])

  return <canvas id="glCanvas" className="cns" />
}
