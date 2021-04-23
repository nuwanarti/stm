import faker from "faker";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Dropdown, Button, Form } from "semantic-ui-react";

import MyModal from "../Modal/Modal";

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}));

const MultipleSearchSelection = ({ data, predictNewReg }) => {
  const [categories, setCategories] = useState([]);

  const [selected, setSelected] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [chosen, setChosen] = useState({});

  const [v, setValue] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data.length > 0) setCategories(data[0].data);
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
    setCategories(
      categories.map((c) => {
        if (id == c.id) {
          console.log("came here to change the name");
          c.matName = c.matName + " ACC: " + acc + " AUC: " + auc;
        }
        return c;
      })
    );
    setValue([...v, id]);
    setSelected([...selected, { id, auc, acc }]);
  };

  return (
    <Form>
      <Form.Group inline>
        <Dropdown
          placeholder="Please select the materials"
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
            text: obj.matName,
            value: obj.id,
          }))}
          style={{ marginRight: "10px" }}
        />
        <Button color="teal" compact onClick={() => predictNewReg(selected)}>
          Plot Materials
        </Button>
      </Form.Group>
      <MyModal open={openModal} obj={chosen} handleAucAcc={handleAucAcc} />
    </Form>
  );
};

export default MultipleSearchSelection;
