import React, { useState, useEffect } from "react";
import { Modal, Input, Label } from "semantic-ui-react";

import "./Modal.css";

const MyModal = ({ open, obj, handleAucAcc }) => {
  const [op, setOpen] = useState(false);
  const [ob, setObj] = useState("");

  const [auc, setAuc] = useState(0)
  const [acc, setAcc] = useState(0)

  useEffect(() => {
    setOpen(open);
    setObj(obj);
  }, [open, obj]);

  const show = () => setOpen(true);
  const close = () => {
    setOpen(false)
    setObj({})
    setAuc(0)
    setAcc(0)

  };

  const handleChange = (e) => {
    if(e.target.name == 'auc'){
      // console.log('came to change auc ' + e.target.value)
      setAuc(parseFloat(e.target.value))
    }else{
      // console.log('came to change acc' + e.target.value)

      setAcc(parseFloat(e.target.value))
    }
  }

  return (
    <Modal
      // centered={true}
      className="modal-wrapper"
      // dimmer={"bluring"}
      size={"small"}
      open={op}
      onClose={() => close()}
      closeIcon={true}
      style={{ marginTop: "25%", marginLeft: "20%" }} //"margin-top: 25%; margin-left: 20%"
    >
      <Modal.Header>
        Please select ACC and AUC for{" "}
        <span style={{ color: "#dsdsds" }}>{ob.matName} </span>
      </Modal.Header>
      <Modal.Content>
        <Input labelPosition="right" type="number" placeholder="Accuracy">
          <Label basic>ACC: </Label>
          <input min={0} max={100} size={25} maxLength={10} name="acc" value={acc} onChange={handleChange} />
          <Label> % </Label>
        </Input>
        <br/>
        <br/>
        <Input labelPosition="right" type="number" placeholder="AUC">
          <Label basic>AUC: </Label>
          <input min={0} max={100} size={25} maxLength={10} name="auc" value={auc} onChange={handleChange} />
          <Label> % </Label>
        </Input>
      </Modal.Content>
      <Modal.Actions>
        <button className="modal-close" onClick={() => close()}>
          <p>Close</p>
        </button>
        <button className="modal-okay" onClick={() => {
          handleAucAcc(ob.id, auc, acc)
          close()
        }}>
          <p>Okay</p>
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default MyModal;
