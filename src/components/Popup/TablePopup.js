import React, { useState, useEffect } from 'react'
import { Popup, Grid, Button, Header } from "semantic-ui-react";


const TablePopup = ({ status }) => {
    const [eventsEnabled, setEventsEnabled] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({id: ''})
  
    useEffect(() => {
      setOpen(status.open)
      setData(status.data)
    }, [status])
  
    useEffect(() => {
      setEventsEnabled(true)
    }, [])
    
  
    return (
      <Popup 
      eventsEnabled={eventsEnabled}
      open={open}
      flowing hoverable
      style>
        <Grid centered divided columns={3}>
          <Grid.Column textAlign="center">
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
          </Grid.Column>
        </Grid>
      </Popup>
    );
  };

  export default TablePopup