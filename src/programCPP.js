import React, {useEffect, useCallback} from 'react'
import img from "./assets/image2020-11-30_18-49-26.png";
import {
  createPositionBuffer,
  createProgram,
  createTextureBuffer, drawProgram, initProgram
} from "./helpers/webGLHelpers";

export const ProgramCPP = ({angle = 0.0, scale = [1.0,1.0], translate = [0.0, 0.0], int = 0.0}) => {
  const renderWebGL = useCallback((image) => {

    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");
    gl.canvas.width = window.innerWidth
    // gl.canvas.width = window.innerHeight
    gl.canvas.height = window.innerHeight

    const { program } = createProgram(gl)
    const { positionLocation, positionBuffer } = createPositionBuffer(gl, program)
    createTextureBuffer(gl, program, image)
    initProgram(gl, program, positionBuffer, positionLocation, scale, translate, angle, int)
    drawProgram(gl)
  }, [scale, angle, translate, int])

  useEffect(() => {
    const image = new Image()
    image.src = img
    image.onload = function () {
      renderWebGL(image)
    }
  }, [renderWebGL])

  return <canvas id="glCanvas" className="cns" />
}
