/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Header, Button, Grid, Form, Segment, Message, Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import local_storage from 'localStorage';

const menuStyle = {
  borderRadius: 0,
  boxShadow: 'none',
  background: 'inherit',
  padding: '10px',
} 

const NavBarHomePage = () => (
  <Menu secondary size = 'large' style = {menuStyle}>
    <Menu.Item as = {Link} to = '#'>Logo</Menu.Item>
  </Menu>
)

export default class LoginForm extends Component {

  render() {
    return (
      <div className='login-form' style={{ display:"flex", minHeight:"100vh", flexDirection:"column"}}>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <NavBarHomePage />
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to our Site? <a href='/'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
        <Footer />
      </div>
    );
  }
}
