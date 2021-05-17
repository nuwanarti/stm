import React, { Fragment, useState, useEffect, useRef } from "react";
import { line, area } from "d3-shape";
import { ScatterPlot, ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Popup, Grid, Button, Header, Table } from "semantic-ui-react";

// import {Link} from 'react-scroll'

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";
// 39, 147, 33
// 120, 67, 59
// 252, 106, 15,
// 27, 98, 165
// 201, 17, 31
128, 78, 175;
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
        code = "#ff6600"; //"#78433B";
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
    return code;
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

      {nodes
        .filter((n) => n.data.serieId === "Pre built" && n.data.matId)
        .map((node) => {
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
        .map((node) => {
          console.log("node node lin reg train");
          console.log(node);
          console.log(node.data.x, node.data.y)
          return (
            <rect
                key={node.id}
                cx={node.data.x}
                cy={node.data.y}
                r={5}
                width={10}
                height={10}
                fill="#FD5935"
                style={{ mixBlendMode: "blendMode" }}
                // onMouseEnter={onMouseEnter}
                // onMouseMove={onMouseMove}
                // onMouseLeave={onMouseLeave}
                // onClick={onClick}
              />
          );
        })} */}
      {nodes
        .filter((n) => n.data.serieId == "linRegTrain")
        .map((node) => {
          return (
            <rect
              key={node.id}
              x={xScale(node.data.x - 0.01)}
              // y={yScale(node.data.y + 0.5)}
              y={yScale((node.data.auc + node.data.acc) / 2 + 1)}
              r={4}
              width={10}
              height={10}
              fill={getColor(node.data.category)}
              stroke={lineColor}
              style={{ pointerEvents: "none" }}
            />
          );
        })}
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

const PopupFlowing = ({ status }) => {
  const [eventsEnabled, setEventsEnabled] = React.useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ id: "" });
  const [color, setColor] = useState('')
  useEffect(() => {
    if(status.data.data){
      setOpen(status.open);
      setData(status.data.data);
      setColor(status.color)
      // console.log(status)
    }
  }, [status]);

  useEffect(() => {
    setEventsEnabled(true);
  }, []);

  return (
    <Popup
      style={{
        position: "fixed",
        left: "0",
        // bottom: '-160',
        height: "160px",
        top: window.innerHeight - 100
      }}
      eventsEnabled={eventsEnabled}
      open={open}
      flowing
      hoverable
    >
      <Grid centered>
      <Table color='teal' sortable celled fixed striped style={{ fontSize: '0.8em' }}>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>
            Material
          </Table.HeaderCell>
          <Table.HeaderCell>
            Category
          </Table.HeaderCell>
          <Table.HeaderCell>
            Accuracy
          </Table.HeaderCell>
          <Table.HeaderCell>
            AUC
          </Table.HeaderCell>
          <Table.HeaderCell>
            T/C
          </Table.HeaderCell>
          <Table.HeaderCell>
            Thickness
          </Table.HeaderCell>
          <Table.HeaderCell>
            Signal Energy
          </Table.HeaderCell>
          <Table.HeaderCell>
            Insertion Loss
          </Table.HeaderCell>
          <Table.HeaderCell>
            Signal To Noice
          </Table.HeaderCell>
          <Table.HeaderCell>
            Peak To Peak
          </Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Row style={{ height: '100%', background: `${color}70` }}> 
                <Table.Cell>{data.matName}</Table.Cell>
                <Table.Cell>{data.category}</Table.Cell>
                <Table.Cell>{data.accuracy}</Table.Cell>
                <Table.Cell>{data.auc}</Table.Cell>
                <Table.Cell>{data.transmissionCoe}</Table.Cell>
                <Table.Cell>{data.thickness}</Table.Cell>
                <Table.Cell>{data.signalEnergy}</Table.Cell>
                <Table.Cell>{data.insertionLoss}</Table.Cell>
                <Table.Cell>{data.signalToNoice}</Table.Cell>
                <Table.Cell>{data.peakToPeakAmp}</Table.Cell>
              </Table.Row>
      </Table>
        {/* <Grid.Column textAlign="center">
          <Header as="h4">Basic Plan</Header>
          <p>
            <b>2</b> {data && data.id}
          </p>
          <Button>Choose</Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header as="h4">Business Plan</Header>
          <p>
            <b>5</b> projects, $20 a month
          </p>
          <Button>Choose</Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header as="h4">Premium Plan</Header>
          <p>
            <b>8</b> projects, $25 a month
          </p>
          <Button>Choose</Button>
        </Grid.Column> */}
      </Grid>
    </Popup>
  );
};

const MyResponsiveScatterPlot = ({ dataOriginal, scrollToRow, dataDup }) => {
  const [data, setData] = useState([]);

  const [popup, setPopup] = useState({
    open: false,
    data: {
      id: "",
    },
  });
  //   const itemsRef = useRef([]);

  //   const [regOut, setRegOut] = useState([]);

  const getColor = (temp) => {
    let code = "";
    switch (temp) {
      case "Glass":
        code = "#3366cc";
        break;
      case "Plastics":
        code = "#ff6600"; //"#78433B";
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
    return code;
  };

  useEffect(() => {
    if (dataDup && dataDup.length > 0) {
      // console.log("came to data dup");
      let temp = [
        ...data.filter((o) => o.id == "linRegTest"),
        ...data.filter((o) => o.id == "linRegTrain"),
        {
          id: "Pre built",
          color: "#4FFF33",
          data: dataDup,
        },
      ];
      // console.log(dataDup);
      // console.log(temp);
      setData(temp);
    } else if (dataOriginal) {
      // console.log("came to data original");
      // console.log(dataOriginal);
      setData(dataOriginal);
    } else {
      setData([]);
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
              textAlign: "left",
              color: getColor(node.data.category),
              background: "#CDF1FF",
              padding: "5px",
              borderRadius: "10px",
              fontSize: "0.8em",
            }}
          >
            <strong>{node.data.matName}</strong>
            <br />
            <strong>Thickness: {node.data.thickness} mm</strong>
            <br />
            <strong>Category: {node.data.category}</strong>
            <br />
            {`Tc: ${node.data.x}`}
            <br />
            {`Performance: ${node.data.y} %`}
          </div>
        )}
        onClick={(node, event) => {
          // console.log("clicked on the node");
          // console.log(node);
          scrollToRow(node.data.matId);
          //   passedRef.current[node.data.matId].current.select()

          // window.location.href='/'
        }}
        onMouseMove={(node) => {
          // console.log(node)
          if (popup.data.id != node.id) {
            console.log({ is: "mousemove", node });
            // console.log(popup.data)
            // console.log(node)
            setPopup({
              open: true,
              data: node,
              color: getColor(node.data.category)
            });
          }
        }}
        onMouseLeave={(data, e) => {
          // console.log('mouse leave')
          setPopup({
              open: false,
              data: {
                id: '',
                data: {
                  id: ''
                }
              },
            });
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
      <PopupFlowing status={popup} />
    </div>
  );
};

export default MyResponsiveScatterPlot;
