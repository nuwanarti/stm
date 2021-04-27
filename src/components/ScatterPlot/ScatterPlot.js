import React, { Fragment, useState, useEffect, useRef } from "react";
import { line, area } from "d3-shape";
import { ScatterPlot, ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Popup } from 'semantic-ui-react'

// import {Link} from 'react-scroll'

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";
// 39, 147, 33
// 120, 67, 59
// 252, 106, 15,
// 27, 98, 165
// 201, 17, 31
128, 78, 175
const Line = ({ nodes, xScale, yScale }) => {
  const lineGenerator = line()
    .x((node) => xScale(node.data.x))
    .y((node) => yScale(node.data.y));

  const getColor = (temp) => {
    let code = "";
    switch (temp) {
      case "Glass":
        code = "#3366cc";
        break;
      case "Plastics":
        code = "#ff6600"//"#78433B";
        break;
      case "Woods":
        code = "#53ac69";
        break;
      case "Paper":
        code = "#ff0066";
        break;
      case "Fabrics":
        code = "#bf00ff";
        break;
      case "Ceramic":
        code = "#990033";
        break;
      default:
        break;
    }
    return code ;
    // if (temp >= 0 && temp < 10) {
    //   return "#17BECF"; //23, 190, 207
    // } else if (temp >= 10 && temp < 20) {
    //   return "#1F77B4"; // 31, 119, 1180
    // } else if (temp >= 20 && temp < 30) {
    //   return "#F98015"; // 255, 127, 14
    // } else {
    //   // console.log('thickness ')
    //   // console.log(temp)
    //   return "#2CA02C"; //44, 160, 44
    // }
  };

  // const areaGenerator = area()
  //     .x(d => xScale(d.data.x))
  //     .y0(d => yScale(d.data.y- d.data.thickness))
  //     .y1(d => yScale(d.data.y+ d.data.thickness))
  //     .curve(curveMonotoneX)

  return (
    <Fragment>
      <path
        d={lineGenerator(nodes.filter((n) => n.data.serieId == "linRegTest"))}
        fill="none"
        stroke={"#0095ff"}
        style={{ pointerEvents: "painted" }}
      />
      {/* <path d={areaGenerator(nodes)} fill="rgba(232, 193, 160, .65)" /> */}
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
              fill={getColor(node.data.category)} //"#FD5935"
              stroke={getColor(node.data.category)}
              style={{ pointerEvents: "none" }}
            />
          );
        })}
      {/* {nodes
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
        ))} */}
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

const MyResponsiveScatterPlot = ({ dataOriginal, scrollToRow, dataDup }) => {

    const [ data, setData ] = useState([])
  //   const itemsRef = useRef([]);

  //   const [regOut, setRegOut] = useState([]);

  const getColor = (temp) => {
    let code = "";
    switch (temp) {
      case "Glass":
        code = "#3366cc";
        break;
      case "Plastics":
        code = "#ff6600"//"#78433B";
        break;
      case "Woods":
        code = "#53ac69";
        break;
      case "Paper":
        code = "#ff0066";
        break;
      case "Fabrics":
        code = "#bf00ff";
        break;
      case "Ceramic":
        code = "#990033";
        break;
      default:
        break;
    }
    return code ;
  };

  useEffect(() => {

    if(dataDup && dataDup.length > 0){
        console.log('came to data dup')
        let temp = [...data.filter(o => o.id == 'linRegTest'), {
            id: 'Pre built',
            color: '#4FFF33',
            data: dataDup
        }]
        console.log(dataDup)
        console.log(temp)
        setData(temp)
    }else if(dataOriginal){
        console.log('came to data original')
        console.log(dataOriginal)
        setData(dataOriginal)
    }else{
        setData([])
    }
    // console.log(data);
    // if(!dataDup && dataOriginal)
    //     setData(dataOriginal)
    // else
    //     setData([...data.filter(o => o.id == 'linRegTest'), {
    //         id: 'Pre built',
    //         color: '#4FFF33',
    //         data: dataDup
    //     }])
  }, [dataOriginal, dataDup]);

  //   const executeScroll = () => myRef.current.scrollIntoView()

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 30, right: 45, bottom: 70, left: 80 }}
        xScale={{ type: "linear", min: 0, max: 1 }}
        xFormat={function (e) {
          return e.toFixed(2);
        }}
        yScale={{ type: "linear", min: 0, max: 100 }}
        yFormat={function (e) {
          return e.toFixed(2) + " %";
        }}
        tooltip={({ node }) => (
          <div
            style={{
              color: getColor(node.data.category),
              background: "#CDF1FF",
              padding: "5px",
              borderRadius: "10px",
              fontSize: '0.8em'
            }}
          >
            <strong>{node.data.matName}</strong>
            <br />
            <strong>Thickness: {node.data.thickness}</strong>
            <br />
            <strong>Category: {node.data.category}</strong>
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
