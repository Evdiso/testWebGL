import React, {useState} from "react";
import {ProgramCPP} from "./programCPP";

export const App = () => {
  const [angle, setAngle] = useState(0.0)
  const [range, setRange] = useState(1.0)
  const [int, setInt] = useState(0.0)
  const [x, setX] = useState(0.0)
  const [y, setY] = useState(0.0)

  const _onChangeAngle = (ang) => {
    setAngle(ang)
  }

  const _onChangeRange = (value) => {
    setRange(value)
  }

  return <div className="App">
    <ProgramCPP angle={angle * Math.PI / 180} scale={[range, range]} translate={[x, y]} int={int} />
    <div className="controls">
      <label className="scale-label">
        Angle
        <input type="number" min={-360.0} max={360.0} step="1.0" value={angle}
               onChange={(e) => _onChangeAngle(e.target.value)}
        />
      </label>
      <label className="scale-label">
        Scale
        <input type="number" min={0.0} value={range} step={0.01}
               onChange={(e) => _onChangeRange(e.target.value)}
        />
      </label>
      <label className="scale-label">
        X
        <input type="number" value={x} step={0.01}
               onChange={(e) => setX(e.target.value)}
        />
      </label>
      <label className="scale-label">
        Y
        <input type="number" value={y} step={0.01}
               onChange={(e) => setY(e.target.value)}
        />
      </label>
      <label className="scale-label">
        int
        <input type="number" value={int} step={0.01} max={1.0} min={0.0}
               onChange={(e) => setInt(e.target.value)}
        />
      </label>
    </div>
  </div>
}
