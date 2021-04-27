import React, { Component } from "react";
import {
  Grid,
  Segment,
  Dropdown,
  Divider,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";
import DropdownSearch from "../../components/Dropdown/DropdownSearch";
import DropdownButton from "../../components/Dropdown/DropdownButton";

const singleSelectionOptions = [
  {
    text: "Jenny Hess",
    value: "Jenny Hess",
  },
  {
    text: "Steve Jobs",
    value: "Steve Jobs",
  },
  {
    text: "Bill Gates",
    value: "Bill Gates",
  },
];

class SingleSelectionDropdown extends Component {
  render() {
    return (
      <Dropdown
        placeholder="Select an option"
        fluid
        selection
        options={singleSelectionOptions}
      />
    );
  }
}

const multipleSelectionOptions = [
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "html", text: "HTML", value: "html" },
  { key: "javascript", text: "Javascript", value: "javascript" },
];

const MultipleSelectionDropdown = () => (
  <Dropdown
    placeholder="Skills"
    fluid
    multiple
    selection
    options={multipleSelectionOptions}
  />
);

const searchableMultipleSelectionOptions = [
  { key: "English", text: "English", value: "English" },
  { key: "French", text: "French", value: "French" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
  { key: "German", text: "German", value: "German" },
  { key: "Chinese", text: "Chinese", value: "Chinese" },
];

class SearchableMultipleSelectionDropdown extends Component {
  state = { searchableMultipleSelectionOptions };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });

  render() {
    const { currentValues } = this.state;
    return (
      <Dropdown
        options={this.state.searchableMultipleSelectionOptions}
        placeholder="Choose Languages"
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentValues}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

class Dropdowns extends Component {
  render() {
    const squareButtonStyle = {
      borderRadius: "4px",
    };

    const roundedButtonStyle = {
      borderRadius: "32px",
    };

    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={16}>
            {/* <Segment> */}
            <Header as="h2" icon textAlign="center" style={{ paddingTop: '20px'}}>
              {/* <Icon name="wave-square" circular /> */}
              <Header.Content>How to use the catalogue</Header.Content>
            </Header>

            {/* </Segment> */}
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            <Image
              style={{ width: '1000px'}}
              centered
              size="large"
              src="https://firebasestorage.googleapis.com/v0/b/solidsonsoli.appspot.com/o/imgs%2Fphoto5780788430526069546.jpg?alt=media&token=67afbdd8-7c96-4481-9b80-d97409d908cc"
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Dropdowns;
