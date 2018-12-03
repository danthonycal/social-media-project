/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import local_storage from 'localStorage';
import { Button,  Container, Checkbox, Dropdown, Header, Icon, Menu,  Segment, Image, Sticky, Rail} from 'semantic-ui-react'
import SearchUser from './SearchUser';

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
  handleLogout = () => {
    if(local_storage.getItem("logged") !== "true") {
      window.location = "/";
    } else {
      local_storage.clear();  // clearing of localStorage
      window.location = "/";
    } 
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
              <Icon disabled name='users' size='big' />
              AntiSocial
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <SearchUser />
              </Menu.Item>
              <Menu.Item as='a' header name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                Home
              </Menu.Item>
              <Menu.Item as='a' header name='account' active={activeItem === 'account'} onClick={this.handleItemClick}>
                  <Icon name='vcard' />View Profile
              </Menu.Item>
              <Menu.Item as='a' onClick={this.handleLogout}>
                Logout
              </Menu.Item>
            </Menu.Menu>
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