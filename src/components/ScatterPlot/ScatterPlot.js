import React, { Fragment, useState, useEffect, useRef } from "react";
import { line, area } from "d3-shape";
import { ScatterPlot, ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Bar } from "@nivo/bar";

// import {Link} from 'react-scroll'

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";

const Line = ({ nodes, xScale, yScale }) => {
  const lineGenerator = line()
    .x((node) => xScale(node.data.x))
    .y((node) => yScale(node.data.y));


    const getColor = (temp) => {
        if(temp >= 0 && temp < 10){
            return '#17BECF' //23, 190, 207
          }else if(temp >= 10 && temp < 20){
            return '#1F77B4' // 31, 119, 1180
          }else if(temp >= 20 && temp < 30){
            return '#F98015' // 255, 127, 14
          }else{
            // console.log('thickness ')
            // console.log(temp)
            return '#2CA02C' //44, 160, 44
          }
    }

  return (
    <Fragment>
      <path
        d={lineGenerator(nodes.filter((n) => n.data.serieId == "linRegTest"))}
        fill="none"
        stroke={"#0095ff"}
        style={{ pointerEvents: "painted" }}
      />
      {/* <path
        d={lineGenerator(
          nodes.filter((n) => n.data.serieId == "linRegCustomizedTest")
        )}
        fill="none"
        stroke={"#FA16FE"}
        style={{ pointerEvents: "painted" }}
      /> */}
      {/* {nodes
        .filter((n) => n.data.serieId == "linRegTrain")
        .map((node) => {
          console.log("node node");
          console.log(node)
          return (
            <circle
              key={node.id}
              cx={xScale(node.data.x)}
              cy={yScale(node.data.y)}
              r={4}
              fill="#FD5935"
              stroke={lineColor}
              style={{ pointerEvents: "none" }}
            />
          );
        })} */}
      {nodes
        .filter((n) => n.data.serieId === "Pre built" && n.data.matId)
        .map((node) => {
          {
            /* console.log("node node");
          console.log(node.data.matName) */
          }
          return (
            <circle
              key={node.id}
              cx={xScale(node.data.x)}
              cy={yScale(node.data.y)}
              r={4}
              fill={getColor(node.data.thickness)} //"#FD5935"
              stroke={getColor(node.data.thickness)}
              style={{ pointerEvents: "none" }}
            />
          );
        })}
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
      {/* {nodes
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
        ))} */}
      {/* {nodes
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
        ))} */}
      {/* {nodes} */}
    </Fragment>
  );
};

const MyResponsiveScatterPlot = ({ data, scrollToRow }) => {
  //   const itemsRef = useRef([]);

  //   const [regOut, setRegOut] = useState([]);

  const getColor = (temp) => {
    if(temp >= 0 && temp < 10){
        return '#17BECF' //23, 190, 207
      }else if(temp >= 10 && temp < 20){
        return '#1F77B4' // 31, 119, 1180
      }else if(temp >= 20 && temp < 30){
        return '#F98015' // 255, 127, 14
      }else{
        // console.log('thickness ')
        // console.log(temp)
        return '#2CA02C' //44, 160, 44
      }
}

  useEffect(() => {
    // console.log(data);
  }, []);

  //   const executeScroll = () => myRef.current.scrollIntoView()

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
        tooltip={({ node }) => (
          <div style={{ color: getColor(node.data.thickness), background: "#333", padding:'5px', borderRadius: '10px' }}>
            <strong>{node.data.matName}</strong>
            <br />
            <strong>Thickness: {node.data.thickness}</strong>
            <br />
            {`x: ${node.data.x}`}
            <br />
            {`y: ${node.data.y}`}
          </div>
        )}
        onClick={(node, event) => {
          console.log("clicked on the node");
          console.log(node);
          scrollToRow(node.data.matId);
          //   passedRef.current[node.data.matId].current.select()

          // window.location.href='/'
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
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 130,
        //     translateY: 0,
        //     itemWidth: 100,
        //     itemHeight: 12,
        //     itemsSpacing: 5,
        //     itemDirection: "left-to-right",
        //     symbolSize: 12,
        //     symbolShape: "square",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        //   layers={[]}
        layers={[
          "grid",
          "axes",
          // AreaLayer,
          Line,
          //   "nodes",
          "markers",
          "mesh",
        //   "legends",
        ]}
      />
    </div>
  );
};

export default MyResponsiveScatterPlot;
