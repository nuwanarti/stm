/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";

function ImageModal({ image }) {
  const [open, setOpen] = React.useState(false);

  return (
    image ? <Modal
      closeIcon
      basic
      centered
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Image size="tiny" src={image} alt="" style={{ cursor: 'pointer', padding: '10px' }}/>}
    >
      {/* <Header icon> */}
        {/* <Icon name='archive' />
        Archive Old Messages */}
      {/* </Header> */}
      <Modal.Content>
        {/* <div> */}
        {/* <div > */}
        <Image
          src={image}
          size="big"
          style={{
            width: '100%',
            marginTop: '10%'
          }}
          // style={{
          //   // position: "absolute",
          //   // top: "50%",
          //   // left: "50%",
          //   //   marginLeft: "auto",
          //   //   marginRight: "auto",
          //   width: "100%",
          //   //   transform: 'translate(-50%, -50%)'
          //   //   padding: "auto",
          // }}
        />
        {/* </div> */}

        {/* <Image
          size="large"
          src={image}
          wrapped
        /> */}
        {/* </div> */}
      </Modal.Content>
      {/* <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions> */}
    </Modal>: <div></div>
  );
}

export default ImageModal;
