import React, { useState, useEffect } from "react";
import { FormField } from "semantic-ui-react";
import { Form, Radio } from "semantic-ui-react";

const ModelSelection = ({handleRadioClick}) => {

    const [value, setValue] = useState("lstm")


    // set

  
    const handleChange = (event, target) => {
        console.log(event)
        setValue(target.value)
        handleRadioClick(target.value)

    }
  return (
    <Form>
      <Form.Group inline>
      <label>Please select a model</label>
      <Form.Field>
        <Radio
          label="LSTM"
          name="radioGroup"
          value="lstm"
          checked={value === "lstm"}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Conv3D"
          name="radioGroup"
          value="conv3d"
          checked={value === "conv3d"}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Custom"
          name="radioGroup"
          value="custom"
          checked={value === "custom"}
          onChange={handleChange}
        />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

export default ModelSelection;
