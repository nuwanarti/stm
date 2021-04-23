import React, { Fragment, useState, useEffect } from "react";
import { line, area } from "d3-shape";
import { ScatterPlot, ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Bar } from "@nivo/bar";

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";

const Line = ({ nodes, xScale, yScale }) => {
  // { bars, xScale, yScale }
  console.log('nodes')
  console.log(nodes);
  const lineGenerator = line()
    .x((node) => xScale(node.data.x))
    .y((node) => yScale(node.data.y));

  return (
    <Fragment>
      <path
        d={lineGenerator(nodes.filter((n) => n.data.serieId == "linRegTest"))}
        fill="none"
        stroke={"#0095ff"}
        style={{ pointerEvents: "painted" }}
      />
      <path
        d={lineGenerator(nodes.filter((n) => n.data.serieId == "linRegCustomizedTest"))}
        fill="none"
        stroke={"#FA16FE"}
        style={{ pointerEvents: "painted" }}
      />
      {nodes
        .filter((n) => n.data.serieId == "linRegTrain")
        .map((node) => (
          <circle
            key={node.id}
            cx={xScale(node.data.x)}
            cy={yScale(node.data.y)}
            r={4}
            fill="#FD5935"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
      {nodes
        .filter((n) => n.data.serieId == "linRegTest")
        .map((node) => (
          <circle
            key={node.id}
            cx={xScale(node.data.x)}
            cy={yScale(node.data.y)}
            r={4}
            fill="#F8FF27"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
        {nodes
        .filter((n) => n.data.serieId == "linRegCustomizedTrain")
        .map((node) => (
          <circle
            key={node.id}
            cx={xScale(node.data.x)}
            cy={yScale(node.data.y)}
            r={5}
            fill="#E8A838"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
        {nodes
        .filter((n) => n.data.serieId == "linRegCustomizedTest")
        .map((node) => (
          <circle
            key={node.id}
            cx={xScale(node.data.x)}
            cy={yScale(node.data.y)}
            r={5}
            fill="#2DDAD4"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
      {/* {nodes} */}
    </Fragment>
  );
};

const MyResponsiveScatterPlot = ({ data }) => {
  //   const [regOut, setRegOut] = useState([]);

  useEffect(() => {
    
    // console.log(data);
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat={function (e) {
          return e.toFixed(2);
        }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat={function (e) {
          return e.toFixed(2) + " %";
        }}
        // useMesh={true}
        // debugMesh={true}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Transmission Coefficient",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Avg. Performance",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        //   layers={[]}
        layers={[
          "grid",
          "axes",
          // AreaLayer,
          Line,
        //   "nodes",
          "markers",
          "mesh",
          "legends",
        ]}
      />
    </div>
  );
};

export default MyResponsiveScatterPlot;
