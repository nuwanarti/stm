import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MainContainer from '../../pages/MainContainer';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <MainContainer>
        <Grid className="fixed-footer">
          <Grid.Column width={8}>
            <Grid>
              <Grid.Column width={8}></Grid.Column>
              <Grid.Column width={8}>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid.Row columns={2}>
              <Grid.Column>
                
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              © 2021 HICUP Lab
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MainContainer>
    );
  }
}

export default Footer;
