import faker from "faker";
import _ from "lodash";
import React, { useEffect, useState } from "react";
// import { Grid } from "semantic-ui-react";
import { Dropdown, Button, Form, Grid } from "semantic-ui-react";

import MyModal from "../Modal/Modal";

const options = [
  { key: 1, text: "All Materials", value: 1 },
  { key: 2, text: "05 <= Thick < 10", value: 2 },
  { key: 3, text: "10 <= Thick < 20", value: 3 },
  { key: 4, text: "20 <= Thick < 30", value: 4 },
  { key: 5, text: "30 <= Thick < 40", value: 5 },
];

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}));

const MultipleSearchSelection = ({ data, predictNewReg }) => {
  // format of one object
  //   {
  //     "matName": "100Xpaper (Radecepapir Copy Paper 80G/M2)",
  //     "peakToPeakAmp": 0.63,
  //     "median": 16.54,
  //     "auc": 80,
  //     "signalEnergy": 178738,
  //     "category": "paper",
  //     "signalToNoice": 0.34,
  //     "id": 37,
  //     "thickness": 11,
  //     "accuracy": 66,
  //     "asum": 10341,
  //     "mean": 17.21,
  //     "insertionLoss": 4,
  //     "transmissionCoe": 0.63,
  //     "max": 19.99,
  //     "x": 0.63,
  //     "y": 73,
  //     "matId": 37
  // }
  const [categories, setCategories] = useState([]);

  // selected items from the dropdown, id, auc, acc
  const [selected, setSelected] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  // current chosen object for the modal to get acc and auc
  const [chosen, setChosen] = useState({});

  // selected items from the dropdown, ids only and this is the value for the dropdown menu
  const [v, setValue] = useState([]);

  useEffect(() => {
    console.log("logging out data");
    console.log(data);
    // if (data.length > 0) setCategories(data[0].data);
    if (data.length > 0) setCategories(data);
  }, [data]);
  useEffect(() => {
    console.log("v");
    console.log(v);
  }, [v]);
  useEffect(() => {
    console.log("selected changed");
    console.log(selected);
  }, [selected]);
  const findObj = (id) => {
    categories.forEach((obj) => {
      if (obj.id == id) setChosen(obj);
    });
  };

  const handleAucAcc = (id, auc, acc) => {
    // setCategories(
    //   categories.map((c) => {
    //     if (id == c.id) {
    //       console.log("came here to change the name");
    //       c.matName = c.matName + " ACC: " + acc + " AUC: " + auc;
    //     }
    //     return c;
    //   })
    // );
    setValue([...v, id]);
    const item = categories.find((c) => c.id == id);
    setSelected([...selected, { ...item, id, auc, acc }]);
  };

  const filterMaterials = (from, to) =>
    categories
      .filter((o) => from <= o.thickness && o.thickness < to)
      .map((o) => {
        o["acc"] = o.accuracy;
        o["auc"] = o.auc;
        return o;
      });

  const renderName = (obj) => {
    return (
      <span>
        {"N: " +
          <span style="color: red"> obj.matName </span> +
          " T: " +
          obj.thickness}
      </span>
    );
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {/* <Form> */}
          <Dropdown
            // style
            width={10}
            placeholder="Please add a minimum of 3 materials."
            fluid
            multiple
            search
            selection
            value={v}
            onChange={(event, { value }) => {
              if (value.length < v.length) {
                //   setValue(value)
                let removed = v.filter((vv) => !value.includes(vv))[0];
                console.log("removed " + removed);
                categories.map((c) => {
                  if (removed == c.id) {
                    console.log("changing the name");
                    c.matName = c.matName.replace(/ACC.*$/g, "").trim();
                  }
                  return c;
                });
                setValue(value);
                setSelected(selected.filter((s) => s.id != removed));
              } else {
                setOpenModal(true);
                findObj(value[value.length - 1]);
              }
              //   setValue(value)
            }}
            options={_.map(categories, (obj, index) => ({
              key: obj.id,
              text: obj.matName + " (" + obj.thickness + "mm)",
              value: obj.id,
            }))}
            style={{ marginRight: "10px" }}
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <Button
            // color="teal"
            compact
            onClick={() => predictNewReg(selected)}
            width={3}
            disabled={selected.length > 2 ? false : true}
            style={{ width: "100%", backgroundColor: '#299BD7' }}
          >
            Build Model
          </Button>
        </Grid.Column>
        <Grid.Column width={2}>
          <Button
            // color="red"
            compact
            onClick={() => window.location.reload()}
            width={3}
            style={{ width: "100%", backgroundColor: '#C9111F' }}
            // disabled={selected.length>2?false : true}
          >
            Reset
          </Button>
        </Grid.Column>
        {/* <Grid.Column width={3} style={{ display: 'none'}}>
          <Dropdown
            style={{ marginLeft: '20px'}}
            search
            selection
            options={options}
            width={3}
            onChange={(event, { value }) => {
              console.log(value);
              switch (value) {
                case 1:
                  setValue(filterMaterials(0, 100).map((o) => o.id));
                  setSelected(filterMaterials(0, 100));
                  break;
                case 2:
                  setValue(filterMaterials(5, 10).map((o) => o.id));
                  setSelected(filterMaterials(5, 10));
                  break;
                case 3:
                  setValue(filterMaterials(10, 20).map((o) => o.id));
                  setSelected(filterMaterials(10, 20));
                  break;
                case 4:
                  setValue(filterMaterials(20, 30).map((o) => o.id));
                  setSelected(filterMaterials(20, 30));
                  break;
                case 5:
                  setValue(filterMaterials(30, 40).map((o) => o.id));
                  setSelected(filterMaterials(30, 40));
                  break;
                default:
                  break;
              }
            }}
            placeholder="Select Thickness"
          />
        </Grid.Column> */}
      </Grid.Row>
      {/* </Form.Group> */}
      <MyModal open={openModal} obj={chosen} handleAucAcc={handleAucAcc} />
    </Grid>
  );
};

export default MultipleSearchSelection;
