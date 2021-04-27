import React, { Component } from "react";
import { Link } from "react-router";
import { Menu, Icon, Dropdown, Header } from "semantic-ui-react";
import TopSearch from "./TopSearch";
import MyMenu from "./MyMenu";
import Notification from "../Notification/Notification";
import "./TopMenu.css";

class TopMenu extends Component {
  state = { activeItem: "inbox" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    let iconStyle = {
      margin: "0 10px 0 0",
    };

    return (
      <Menu pointing secondary className="top-menu">
        <Menu.Menu>
          <Menu.Item>
            {/* <Link to="dashboard">
              CATALOGUE OF MATERIALS FOR \nMILLIMETRE WEAVELENGTH RADAR SENSING
            </Link> */}
            {/* <Header as="h2" icon> */}
            {/* <Icon name="settings" /> */}
            {/* <div > */}
            <Link
              to="dashboard"
              style={{
                textAlign: "left",
                width: "300px",
                fontSize: "1em",
                color: "#3cbfc8",
              }}
            >
              Catalogue of Materials for Millimetre Wavelength Radar Sensing
            </Link>
            {/* </div> */}
            {/* <Header.Subheader>
                Manage your account settings and set e-mail preferences.
              </Header.Subheader> */}
            {/* </Header> */}
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu className="center menu">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
          <Link
              to="home"
            >
            <Icon name="home" size="large" style={iconStyle} />
            <span>Catalogue</span>
            </Link>
          </Menu.Item>

          <Menu.Item
            name="browser"
            active={activeItem === "browser"}
            onClick={this.handleItemClick}
          >
            <Link
              to="howTo"
            >
              <Icon name="line chart" size="large" style={iconStyle} />
              <span>How To?</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item
            name="portfolio"
            active={activeItem === 'portfolio'}
            onClick={this.handleItemClick}
          > */}
          {/* <Icon name="cubes" size="large" style={iconStyle} />
            <span>Portfolio</span> */}
          {/* <Dropdown>
              <Dropdown.Menu>
                <Dropdown.Header>Categories</Dropdown.Header>
                <Dropdown.Item>Home Goods</Dropdown.Item>
                <Dropdown.Item>Bedroom</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Order</Dropdown.Header>
                <Dropdown.Item>Status</Dropdown.Item>
                <Dropdown.Item>Cancellations</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          {/* </Menu.Item> */}
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item>{/* <TopSearch /> */}</Menu.Item>
          {/* <Menu.Item name="notification" onClick={this.handleItemClick}>
            <Notification icon="alarm outline" numOfNew={3} />
          </Menu.Item> */}
          {/* <Menu.Item name="message" onClick={this.handleItemClick}>
            <Icon name="comments outline" size="large" style={iconStyle} />
          </Menu.Item> */}
          {/* <Menu.Item name="setting" onClick={this.handleItemClick}>
            <MyMenu />
          </Menu.Item> */}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopMenu;
