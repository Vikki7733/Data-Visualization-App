import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./GraphSection.css";

interface DataPoint {
  month: string;
  value: number;
  growthIndicator?: number;
  target?: number;
}

interface GraphSectionProps {
  data: DataPoint[];
}

const GraphSection: React.FC<GraphSectionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [dropdownValue, setDropdownValue] = useState("Unsatisfied Demand %");

  const handleMouseMove = (e: any) => {
    if (
      e.isTooltipActive &&
      e.activeTooltipIndex !== null &&
      e.activeTooltipIndex >= 0 &&
      e.activeTooltipIndex < data.length
    ) {
      setActiveIndex(e.activeTooltipIndex);

      // Calculate the tooltip position when hovering on a plot point (circle)
      const { chartX, chartY, width, height } = e;
      const newTooltipPosition = calculateTooltipPosition(chartX, chartY, width, height);
      setTooltipPosition(newTooltipPosition);
    } else {
      setActiveIndex(null);
      setTooltipPosition(null);
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
  };
  /*
  TODO!!!
  1. Update the tooltip hover logic to dynamically detect the tooltip position based on the mouse hover position
  */
  const calculateTooltipPosition = (x: number, y: number, width: number, height: number) => {
    const rightBoundary = window.innerWidth;
    const bottomBoundary = window.innerHeight;
    console.log("right", rightBoundary);
    console.log("bottomBoundary", bottomBoundary);
    let posX = x;
    let posY = y;

    // Check right boundary for overflow
    if (x + width > rightBoundary) {
      posX = x - width; // Move left if it overflows right
    } else if (x - width < 0) {
      posX = x + width; // Move right if it overflows left
    }

    // Check bottom boundary for overflow
    if (y + height > bottomBoundary) {
      posY = y - height; // Move up if it overflows bottom
    } else if (y - height < 0) {
      posY = y + height; // Move down if it overflows top
    }

    return { x: posX, y: posY };
  };

  const activeDataPoint = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="graph-section">
      <h3 className="graph-title">Graphs</h3>
      <div className="chart-container">
        <div className="dropdown-container">
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="dropdown"
          >
            <option value="Unsatisfied Demand %">Unsatisfied Demand %</option>
            <option value="Demand %">Demand %</option>
            <option value="Satisfaction Rate">Satisfaction Rate</option>
          </select>
        </div>
        <ResponsiveContainer width="103%" height={450}>
          <LineChart
            data={data}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveIndex(null)}
            margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
            <XAxis
              dataKey="month"
              tick={{ color: "#A6A6A6", fontSize: 12, fontFamily: "Inter, sans-serif" }}
              tickLine={false}
            />
            <YAxis
              tick={{ color: "#A6A6A6", fontSize: 12, fontFamily: "Inter, sans-serif" }}
              tickFormatter={(tickValue) => `$${tickValue / 1000}K`}
              axisLine={false}
              tickLine={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#A2FA63"
              fill="rgba(200, 233, 114, 1)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Tooltip content={<></>} />

            {/* Display hover card when a plot point is hovered */}
            {activeDataPoint && activeIndex !== null && tooltipPosition && (
              <foreignObject
                x={tooltipPosition.x + 200 > window.innerWidth ? tooltipPosition.x - 200 : tooltipPosition.x}
                y={tooltipPosition.y - 100 < 0 ? tooltipPosition.y + 100 : tooltipPosition.y - 100}
                width={200}
                height={100}
                style={{ pointerEvents: "none" }}
              >
                <div className="hover-card">
                  <h4>{activeDataPoint.month}</h4>
                  <p>Value: ${activeDataPoint.value}</p>
                  {activeDataPoint.target !== undefined && (
                    <p>
                      Above Target:{" "}
                      {activeDataPoint.value - activeDataPoint.target > 0
                        ? `${activeDataPoint.value - activeDataPoint.target} (↑)`
                        : `${activeDataPoint.value - activeDataPoint.target} (↓)`}
                    </p>
                  )}
                  {activeDataPoint.growthIndicator && (
                    <p>Growth: {activeDataPoint.growthIndicator}%</p>
                  )}
                </div>
              </foreignObject>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphSection;
