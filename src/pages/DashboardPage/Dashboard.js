/* eslint-disable no-sequences */
import React, { Component } from "react";
import { Segment, Grid, Loader, Dimmer, Header } from "semantic-ui-react";
import { scroller } from "react-scroll";


// import publicIp from 'public-ip'

import LineChartComponent from "../../components/Chart/LineChartComponent";
import FullCalendar from "../../components/Calendar/FullCalendar";

import MyResponsiveScatterPlot from "../../components/ScatterPlot/ScatterPlot";
// import SyncCharts from "../../components/CustomPlot/CustomPlot";
import MyResponsiveSankey from "../../components/Sankey/Sankey";

import MultipleSearchSelection from "../../components/MultipleDropdown/MultipleDropdown";

import SortableTable from "../../components/SortableTable/SortableTable";

import TablePopup from "../../components/Popup/TablePopup";

// import MyModal from "../../components/Modal/Modal";

import "./Dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      data: [],
      data2: [],
      data3: {},
      sankyData: [], // data for sanky diagram, regular objects
      ready: false,
      tableData: [],
      passedRefs: [],
      initialRegressedData: [],
      datDup: [],
      tablePopupData: {
        open: false,
        data: { id: "" },
      },
      selected: [],
      customModel: false,
    };
    this.myRef = [];
    this.handleRadioClick = this.handleRadioClick.bind(this);
  }

  predictData = (postData, test) => {
    // console.log("printing y");
    // console.log(test);
    let m = (test[1].y - test[0].y) / (test[1].x - test[0].x);
    let c = test[0].y; // y intercept

    // let objs = this.initialRegressedData.filter(o => !postData.find(oo => oo.id == o.id)).map(o => {
    let objs = this.state.initialRegressedData
      .filter((o) => !postData.find((oo) => oo.id == o.id))
      .map((o) => {
        // if (o["acc"]) {
        //   return o;
        // }
        let y = m * o.transmissionCoe + c;
        // o["accuracy"] = y;
        o["auc"] = y;
        o["acc"] = y;
        o["x"] = o.transmissionCoe;
        o["y"] = y;
        return o;
      });

    // return [...objs, ...postData];
    // console.log("printing objs");
    // console.log(objs);
    return [...objs, ...postData];
  };

  filterScatterData = (ddd) => {
    this.setState({
      dataDup: ddd,
      tableData: ddd.length > 0 ? ddd : this.state.initialRegressedData,
    });
  };

  handleRadioClick(model) {
    // console.log("came here");
    // console.log(model);

    let query = "";
    if (model == "lstm") {
      query = "lstm";
      this.setState({
        selected: [],
      });
    } else if (model == "conv3d") {
      query = "conv3d";
      this.setState({
        selected: [],
      });
    } else {
      this.setState({
        customModel: true,
      });
      return;
    }
    this.setState({
      customModel: false,
    });

    this.setState({
      ready: false,
    });
    fetch(
      "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/?model=" +
        query
      // "http://localhost:5000/solidsonsoli/us-central1cors/cors/cat/?model=" +
      //   query
    )
      .then((response) => response.json())
      .then((data) => {
        data = data.data;
        data = data.map((o) => {
          o["x"] = o.transmissionCoe;
          o["y"] = (o.auc + o.accuracy) / 2;
          o["matId"] = o.id;
          return o;
        });
        fetch(
          "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/getLinearRegOut/?model=" +
            query
          // "http://localhost:5000/solidsonsoli/us-central1cors/cors/cat/getLinearRegOut/?model=" + query
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
                // {
                //   id: "linRegTrain",
                //   color: "#DE6260",
                //   data: train,
                // },
                {
                  id: "linRegTest",
                  color: "#F4FD35",
                  data: test,
                },
              ],
              initialRegressedData: data,
            });
            this.setState({
              tableData: data,
              sankyData: data,
            });
            // console.log("came here");
            // console.log(data);
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

  componentDidMount() {
    // console.log('logging images')
    // console.log(images)
    fetch(
      "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/?model=lstm"
    )
      // fetch(
      //   "http://localhost:5000/solidsonsoli/us-central1cors/cors/cat/?model=lstm"
      // )
      .then((response) => response.json())
      .then((data) => {
        data = data.data;
        data = data.map((o) => {
          o["x"] = o.transmissionCoe;
          o["y"] = (o.auc + o.accuracy) / 2;
          o["matId"] = o.id;
          return o;
        });
        fetch(
          "https://us-central1-solidsonsoli.cloudfunctions.net/cors/cat/getLinearRegOut/?model=lstm"
          // "http://localhost:5000/solidsonsoli/us-central1cors/cors/cat/getLinearRegOut/?model=lstm"
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
                // {
                //   id: "linRegTrain",
                //   color: "#DE6260",
                //   data: train,
                // },
                {
                  id: "linRegTest",
                  color: "#F4FD35",
                  data: test,
                },
              ],
              initialRegressedData: data,
            });
            this.setState({
              tableData: data,
              sankyData: data,
            });
            // console.log("came here");
            // console.log(data);
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
    // console.log("selected");
    // console.log(selected);
    this.setState({
      ready: false,
    });
    this.setState({
      sankyData: selected,
    });
    // console.log("hi there hi there");
    // console.log(selected);
    if (selected.length < 3) {
      alert("Please choose at least 3 materials");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const postData = selected.map((obj) => {
      let temp = {};
      // console.log("data");
      // console.log(this.state.data[0]);
      this.state.initialRegressedData.forEach((o) => {
        // if (o.id == obj.id) {
        //   temp["x"] = o.x;
        //   temp["y"] = (obj.acc + obj.auc) / 2;
        //   temp["id"] = obj.id
        // }
        if (o.id == obj.id) {
          temp = { ...o };
          temp["x"] = o.x;
          temp["y"] = (obj.acc + obj.auc) / 2;
        }

        // return o
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
      // "http://localhost:5000/solidsonsoli/us-central1/cors/cat/predict/",
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
        // console.log("post data");
        // console.log(postData);
        let postDataAndPredicted = this.predictData(postData, test);
        // this.setState({
        //   sankyData: selected,
        // });
        this.setState({
          data: [
            // ...necessaryData,
            {
              id: "Pre built",
              color: "hsl(700, 70%, 50%)",
              data: postDataAndPredicted,
            },
            {
              id: "linRegTest",
              color: "hsl(700, 70%, 50%)",
              data: test,
            },
            {
              id: "linRegTrain",
              color: "hsl(300, 70%, 50%)",
              data: selected,
            },
          ],
          // tableData: this.state.initialRegressedData.filter((t) =>
          //   postData.find((o) => o.id == t.id)
          // ),
          sankyData: postDataAndPredicted,
          selected: selected,
          ready: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  scrollToRow = (id) => {
    console.log(id);
    scroller.scrollTo("row" + id, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -55,
    });

    this.setState({
      current: id,
    });
  };

  // eslint-disable-next-line no-undef
  handleOpenModal = (open) => {
    this.setState({
      open: true,
    });
  };

  handleTablePopup = (data) => {
    this.setState({
      tablePopupData: data,
    });
  };
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              {/* <FullCalendar data={this.state.data} /> */}
              <MyResponsiveScatterPlot
                // data={this.state.data}
                dataOriginal={this.state.data}
                scrollToRow={this.scrollToRow}
                dataDup={this.state.dataDup}
                handleTablePopup={this.handleTablePopup}
              />
              <Dimmer active={!this.state.ready}>
                <Loader> Running Regression Model </Loader>
              </Dimmer>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            {/* <Segment style={{ height: "70px" }}></Segment> */}
            <Segment>
              {/* <LineChartComponent /> */}
              {/* <SyncCharts /> */}
              {/* <stories.render /> */}
              <MyResponsiveSankey
                data={this.state.data3}
                sankeyData={this.state.sankyData}
                filterScatterData={this.filterScatterData}
              />
              <Dimmer active={!this.state.ready}>
                <Loader> Processing Dataset </Loader>
              </Dimmer>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <Grid.Column width={16}>
            <Segment>
              <MultipleSearchSelection
                // data={this.state.data}
                data={this.state.initialRegressedData}
                predictNewReg={this.predictNewReg}
                handleRadioClick={this.handleRadioClick}
                customModel={this.state.customModel}
                // handleOpenModal={this.handleOpenModal}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <Grid.Column width={16}>
            <Segment>
              <SortableTable
                tableData={this.state.tableData}
                highlight={this.state.current}
                selectedFromDropdown={this.state.selected}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {/* <div style={{ marginTop: '300px', marginLeft: '300px' }}> */}
        {/* <MyModal open={this.state.open} /> */}
        {/* </div> */}
        {/* <TablePopup status={this.state.tablePopupData} /> */}
      </Grid>
    );
  }
}

export default Dashboard;
