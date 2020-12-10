import React, {useState} from "react";
import {ProgramCPP} from "./programCPP";

export const App = () => {
  const [angle, setAngle] = useState(0)
  const [range, setRange] = useState(1.0)

  const _onChangeAngle = (ang) => {
    setAngle(ang)
  }

  const _onChangeRange = (value) => {
    setRange(value)
  }

  return <div className="App">
    <ProgramCPP angle={angle} scale={[parseFloat(range), parseFloat(range)]} />
    <div className="controls">
      <label className="scale-label">
        Angle - {angle}
        <input type="range" min="0.0" max="360.0" step="1.0" value={angle}
               onChange={(e) => _onChangeAngle(e.target.value)}
        />
      </label>
      <label className="scale-label">
        Scale
        <input type="number" min={0.0} value={range} step={0.01}
               onChange={(e) => _onChangeRange(e.target.value)}
        />
      </label>
    </div>
  </div>
}
