import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { line, area } from "d3-shape";
import { Bar } from "@nivo/bar";

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";

// `v` is used for bars
// `v1` is used for line
// `v2` is used for area
const data = [
  { x: "0", v: 3.3, v1: 2.0, v2: 1.2 },
  { x: "1", v: 3.5, v1: 3.1, v2: 1.3 },
  { x: "2", v: 3.8, v1: 2.3, v2: 1.1 },
  { x: "3", v: 4.1, v1: 3.1, v2: 2.3 },
  { x: "4", v: 4.4, v1: 4.0, v2: 2.6 },
  { x: "5", v: 4.7, v1: 3.9, v2: 2.7 },
  { x: "6", v: 4.9, v1: 2.9, v2: 2.3 },
  { x: "7", v: 5.2, v1: 3.3, v2: 1.8 }
];

const Area = ({ bars, xScale, yScale, height }) => {
  const areaGenerator = area()
    .x(bar => xScale(bar.data.index) + bar.width / 2)
    .y0(() => height)
    .y1(bar => yScale(bar.data.data.v2));

  return (
    <path
      d={areaGenerator(bars)}
      fill={areaColor}
      style={{ mixBlendMode: "multiply", pointerEvents: "none" }}
      opacity={0.5}
    />
  );
};

const Line = ({ bars, xScale, yScale }) => {
  const lineGenerator = line()
    .x(bar => xScale(bar.data.index) + bar.width / 2)
    .y(bar => yScale(bar.data.data.v1));

  return (
    <Fragment>
      <path
        d={lineGenerator(bars)}
        fill="none"
        stroke={lineColor}
        style={{ pointerEvents: "none" }}
      />
      {bars.map(bar => (
        <circle
          key={bar.key}
          cx={xScale(bar.data.index) + bar.width / 2}
          cy={yScale(bar.data.data.v1)}
          r={4}
          fill="white"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
      ))}
    </Fragment>
  );
};

const CustomPlot = () => (
  <div className="App">
    <Bar
      width={500}
      height={400}
      data={data}
      keys={["v"]}
      maxValue={6}
      padding={0.6}
      margin={{
        top: 10,
        right: 10,
        bottom: 36,
        left: 36
      }}
      indexBy="x"
      enableLabel={false}
      colors={[barColor]}
      borderRadius={2}
      axisLeft={{
        tickValues: 7
      }}
      layers={["grid", "axes", "bars", Area, Line, "markers", "legends"]}
    />
  </div>
);

export default CustomPlot
