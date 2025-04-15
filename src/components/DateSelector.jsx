// src/components/DateSelector.jsx
import React from "react";
import { getColor } from "../utils/getColor";

const DateSelector = ({ dailyData, selectedDate, setSelectedDate }) => {
  return (
    <div className="ds-list">
      {dailyData.map((day, index) => {
        const avg = day.avg;
        const color = getColor(avg);
        const isSelected = selectedDate === day.date;
        const classNames = isSelected ? "ds-item ds-item__selected" : "ds-item";
        return (
          <div
            key={index}
            onClick={() => setSelectedDate(day.date)}
            style={{
              backgroundColor: color
            }}
            className={classNames}
          >
            <div className="ds-text">Avg. PM2.5</div>
            <div className="ds-number">{avg.toFixed(1)}</div>
            <div className="ds-text">µg/m³</div>
            <div className="ds-date">
              {new Date(day.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
