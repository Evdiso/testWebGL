import React, {useEffect, useCallback} from 'react'
import img from "./assets/test.png";
import {
  createPositionBuffer,
  createProgram,
  createTextureBuffer, drawProgram, initProgram
} from "./helpers/webGLHelpers";

export const ProgramCPP = ({angle = 0.0, scale = [1.0,1.0]}) => {
  const renderWebGL = useCallback((image) => {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");
    gl.canvas.width = window.innerHeight
    gl.canvas.height = window.innerHeight

    const { program } = createProgram(gl)
    const { positionLocation, positionBuffer } = createPositionBuffer(gl, program)
    createTextureBuffer(gl, program, image)
    initProgram(gl, program, positionBuffer, positionLocation, scale)
    drawProgram(gl)
  }, [scale])

  useEffect(() => {
    const image = new Image()
    image.src = img
    image.onload = function () {
      renderWebGL(image)
    }
  }, [renderWebGL])

  return <canvas id="glCanvas" className="cns" />
}
