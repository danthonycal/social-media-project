/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container, Checkbox, Dropdown, Header,Icon, Menu,  Segment, Image, Sticky, Rail} from 'semantic-ui-react'

const menuStyle = {
  borderRadius: 0,
  boxShadow: 'none',
  background: '#f00',
  padding: '10px',
  zIndex: '1',
}


class Nav extends Component {
  

  render() {
    
    return(
      <Menu borderless size = 'large' style = {menuStyle}>
        
                <Container>
                  <Menu.Item as = {Link} to = '#'>Logo</Menu.Item>
                  <Menu.Item ></Menu.Item>
                  <Menu.Item position = 'right'>
                    <Dropdown text = {'samp'} icon = 'user circle outline' pointing>
                      <Dropdown.Menu>
                        <Dropdown.Item>Button 1</Dropdown.Item>
                        <Dropdown.Item>Button 2</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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