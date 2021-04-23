import React, { Component } from "react";
import { Segment, Grid, Loader, Dimmer } from "semantic-ui-react";
import LineChartComponent from "../../components/Chart/LineChartComponent";
import FullCalendar from "../../components/Calendar/FullCalendar";

import MyResponsiveScatterPlot from "../../components/ScatterPlot/ScatterPlot";
// import SyncCharts from "../../components/CustomPlot/CustomPlot";
import MyResponsiveSankey from "../../components/Sankey/Sankey";

import MultipleSearchSelection from "../../components/MultipleDropdown/MultipleDropdown";
// import MyModal from "../../components/Modal/Modal";

import "./Dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      data: [],
      data2: [
        {
          id: "japan",
          color: "hsl(147, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 65,
            },
            {
              x: "helicopter",
              y: 96,
            },
            {
              x: "boat",
              y: 162,
            },
            {
              x: "train",
              y: 241,
            },
            {
              x: "subway",
              y: 73,
            },
            {
              x: "bus",
              y: 134,
            },
            {
              x: "car",
              y: 44,
            },
            {
              x: "moto",
              y: 53,
            },
            {
              x: "bicycle",
              y: 231,
            },
            {
              x: "horse",
              y: 12,
            },
            {
              x: "skateboard",
              y: 144,
            },
            {
              x: "others",
              y: 190,
            },
          ],
        },
        {
          id: "france",
          color: "hsl(261, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 162,
            },
            {
              x: "helicopter",
              y: 259,
            },
            {
              x: "boat",
              y: 170,
            },
            {
              x: "train",
              y: 1,
            },
            {
              x: "subway",
              y: 270,
            },
            {
              x: "bus",
              y: 114,
            },
            {
              x: "car",
              y: 69,
            },
            {
              x: "moto",
              y: 77,
            },
            {
              x: "bicycle",
              y: 172,
            },
            {
              x: "horse",
              y: 57,
            },
            {
              x: "skateboard",
              y: 30,
            },
            {
              x: "others",
              y: 61,
            },
          ],
        },
        {
          id: "us",
          color: "hsl(138, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 120,
            },
            {
              x: "helicopter",
              y: 121,
            },
            {
              x: "boat",
              y: 89,
            },
            {
              x: "train",
              y: 142,
            },
            {
              x: "subway",
              y: 41,
            },
            {
              x: "bus",
              y: 180,
            },
            {
              x: "car",
              y: 44,
            },
            {
              x: "moto",
              y: 234,
            },
            {
              x: "bicycle",
              y: 46,
            },
            {
              x: "horse",
              y: 166,
            },
            {
              x: "skateboard",
              y: 251,
            },
            {
              x: "others",
              y: 27,
            },
          ],
        },
        {
          id: "germany",
          color: "hsl(245, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 183,
            },
            {
              x: "helicopter",
              y: 208,
            },
            {
              x: "boat",
              y: 100,
            },
            {
              x: "train",
              y: 181,
            },
            {
              x: "subway",
              y: 100,
            },
            {
              x: "bus",
              y: 81,
            },
            {
              x: "car",
              y: 67,
            },
            {
              x: "moto",
              y: 231,
            },
            {
              x: "bicycle",
              y: 127,
            },
            {
              x: "horse",
              y: 96,
            },
            {
              x: "skateboard",
              y: 177,
            },
            {
              x: "others",
              y: 8,
            },
          ],
        },
        {
          id: "norway",
          color: "hsl(81, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 1,
            },
            {
              x: "helicopter",
              y: 244,
            },
            {
              x: "boat",
              y: 63,
            },
            {
              x: "train",
              y: 161,
            },
            {
              x: "subway",
              y: 240,
            },
            {
              x: "bus",
              y: 8,
            },
            {
              x: "car",
              y: 161,
            },
            {
              x: "moto",
              y: 258,
            },
            {
              x: "bicycle",
              y: 154,
            },
            {
              x: "horse",
              y: 209,
            },
            {
              x: "skateboard",
              y: 104,
            },
            {
              x: "others",
              y: 229,
            },
          ],
        },
      ],
      data3: {
        nodes: [
          {
            id: "Woods",
            color: "hsl(267, 70%, 50%)",
          },
          {
            id: "Plastics",
            color: "hsl(257, 70%, 50%)",
          },
          {
            id: "Glass",
            color: "hsl(332, 70%, 50%)",
          },
          {
            id: "Paper",
            color: "hsl(327, 70%, 50%)",
          },
          {
            id: "Fabrics",
            color: "hsl(17, 70%, 50%)",
          },
          {
            id: "Ceramics",
            color: "hsl(208, 70%, 50%)",
          },
          {
            id: "GOOD",
            color: "hsl(107, 70%, 50%)",
          },
          {
            id: "MEDIUM",
            color: "hsl(405, 70%, 50%)",
          },
          {
            id: "BAD",
            color: "hsl(698, 70%, 50%)",
          },
        ],
        links: [
          {
            source: "Woods",
            target: "GOOD",
            value: 10 * 5,
          },
          {
            source: "Woods",
            target: "MEDIUM",
            value: 50 * 5,
          },
          {
            source: "Woods",
            target: "BAD",
            value: 40 * 5,
          },
          {
            source: "Plastics",
            target: "GOOD",
            value: 90 * 4,
          },
          {
            source: "Plastics",
            target: "MEDIUM",
            value: 5 * 4,
          },
          {
            source: "Plastics",
            target: "BAD",
            value: 5 * 4,
          },
          {
            source: "Glass",
            target: "GOOD",
            value: 95 * 3,
          },
          {
            source: "Glass",
            target: "MEDIUM",
            value: 5 * 3,
          },
          {
            source: "Paper",
            target: "GOOD",
            value: 100 * 2,
          },
          {
            source: "Fabrics",
            target: "MEDIUM",
            value: 100 * 1,
          },
          {
            source: "Ceramics",
            target: "MEDIUM",
            value: 100 * 0.5,
          },
        ],
      },
      ready: false,
    };
  }

  componentDidMount() {
    fetch("https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/")
      .then((response) => response.json())
      .then((data) => {
        data = data.data;
        data = data.map((o) => ({
          x: o.transmissionCoe,
          y: (o.auc + o.accuracy) / 2,
          matName: o.matName,
          id: o.id,
        }));

        fetch(
          "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/getLinearRegOut/"
        )
          .then((response) => response.json())
          .then((d) => {
            const testX = d.testValues;
            const testY = d.predict;
            const trainX = d.xTrain;
            const trainY = d.yTrain;
            const test = [];
            Object.keys(testX).forEach((key) => {
              let obj = {
                x: testX[key],
                y: testY[key],
              };
              test.push(obj);
            });
            const train = [];
            Object.keys(trainX).forEach((key) => {
              let obj = {
                x: trainX[key],
                y: trainY[key],
              };
              train.push(obj);
            });

            this.setState({
              data: [
                {
                  id: "Pre built",
                  color: "#4FFF33",
                  data: data,
                },
                {
                  id: "linRegTrain",
                  color: "#DE6260",
                  data: train,
                },
                {
                  id: "linRegTest",
                  color: "#F4FD35",
                  data: test,
                },
              ],
            });
            // data["test"] = test;
            // data["train"] = train;
            // this.setState({data: data.data})
            this.setState({
              ready: true,
            });
          });
        // console.log(data)
        // this.setState({data: data.data})
      });
  }

  // eslint-disable-next-line no-undef
  predictNewReg = (selected) => {
    this.setState({
      ready: false
    })
    console.log("hi there hi there");
    console.log(selected);
    if (selected.length < 3) {
      alert("Please choose at least 3 materials");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const postData = selected.map((obj) => {
      let temp = {};
      console.log("data");
      console.log(this.state.data[0]);
      this.state.data[0].data.forEach((o) => {
        if (o.id == obj.id) {
          temp["x"] = o.x;
          temp["y"] = (obj.acc + obj.auc) / 2;
        }
      });
      return temp;
    });
    var raw = JSON.stringify({
      data: postData,
    });
    // var raw = JSON.stringify({
    //   data: [
    //     { x: 0.4, y: 55, id: 4 },
    //     { x: 0.5, y: 65, id: 5 },
    //     { x: 0.6, y: 75, id: 6 },
    //     { x: 0.7, y: 85, id: 7 },
    //     { x: 0.8, y: 55, id: 4 },
    //   ],
    // });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/predict/",
      requestOptions
    )
      .then((response) => response.json())
      .then((d) => {
        const testX = d.testValues;
        const testY = d.predict;
        const trainX = d.xTrain;
        const trainY = d.yTrain;
        const test = [];
        const train = [];
        Object.keys(testX).forEach((key) => {
          let obj = {
            x: testX[key],
            y: testY[key],
          };
          test.push(obj);
        });
        // const train = [];
        Object.keys(trainX).forEach((key) => {
          let obj = {
            x: trainX[key],
            y: trainY[key],
          };
          train.push(obj);
        });
        let necessaryData = this.state.data.filter(
          (obj) =>
            obj.id == "Pre built" ||
            obj.id == "linRegTrain" ||
            obj.id == "linRegTest"
        );
        this.setState({
          data: [
            ...necessaryData,
            {
              id: "linRegCustomizedTrain",
              color: "hsl(700, 70%, 50%)",
              data: train,
            },
            {
              id: "linRegCustomizedTest",
              color: "hsl(700, 70%, 50%)",
              data: test,
            },
          ],
          ready: true
        });
      })
      .catch((error) => console.log("error", error));
  };

  // eslint-disable-next-line no-undef
  handleOpenModal = (open) => {
    this.setState({
      open: true,
    });
  };
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment style={{ height: "70px" }}>
              <MultipleSearchSelection
                data={this.state.data}
                predictNewReg={this.predictNewReg}
                // handleOpenModal={this.handleOpenModal}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              {/* <FullCalendar data={this.state.data} /> */}
              <MyResponsiveScatterPlot data={this.state.data} />
              <Dimmer active={!this.state.ready}>
                <Loader inderminate> Running Regression Model </Loader>
              </Dimmer>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            {/* <Segment style={{ height: "70px" }}></Segment> */}
            <Segment>
              {/* <LineChartComponent /> */}
              {/* <SyncCharts /> */}
              {/* <stories.render /> */}
              <MyResponsiveSankey data={this.state.data3} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {/* <div style={{ marginTop: '300px', marginLeft: '300px' }}> */}
        {/* <MyModal open={this.state.open} /> */}
        {/* </div> */}
      </Grid>
    );
  }
}

export default Dashboard;
