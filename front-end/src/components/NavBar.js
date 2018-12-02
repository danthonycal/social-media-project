/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import local_storage from 'localStorage';
import { Button,  Container, Checkbox, Dropdown, Header, Icon, Menu,  Segment, Image, Sticky, Rail} from 'semantic-ui-react'

const menuStyle = {
  borderRadius: 0,
  boxShadow: 'none',
  background: '#f00',
  padding: '10px',
  zIndex: '1',
}
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === 'account') {
      console.log("View Profile");
      window.location = '/profile';
    } else if (name === 'home') {
      console.log("Home");
      window.location = '/home';
    }
  }
  render() {
    const { activeItem } = this.state
    return(
        <Menu fixed='top' className='right menu' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
              Project Name
            </Menu.Item>
            <Dropdown item simple text='Dropdown'>
              <Dropdown.Menu >
                <Dropdown.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick}>
                    <Icon name='vcard' />View Profile
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as='a' header name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
              Home
            </Menu.Item>
          </Container>
        </Menu>
    )
  }
}
export default class NavBar extends Component {
  render() {
    return(
        <div>
            <Nav />
        </div>
    )
  }
}