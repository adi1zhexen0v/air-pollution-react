import React from "react";
import { getColor } from "../utils/getColor";

const AQI_LEVELS = [
  { range: "0–50", label: "Good", value: 10 },
  { range: "51–100", label: "Moderate", value: 75 },
  { range: "101–150", label: "Unhealthy for sensitive groups", value: 125 },
  { range: "151–200", label: "Unhealthy", value: 175 },
  { range: "201–300", label: "Very Unhealthy", value: 250 },
  { range: "301+", label: "Hazardous", value: 400 }
];

function AirQualityIndex() {
  return (
    <div className="aqi-legend">
      <h3 className="aqi-title">AQI Legend – US Standard</h3>
      <div className="aqi-scale">
        {AQI_LEVELS.map((level, index) => (
          <div
            key={index}
            className="aqi-box"
            style={{ backgroundColor: getColor(level.value) }}
          >
            <span className="range">{level.range}</span>
            <span className="label">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirQualityIndex;
