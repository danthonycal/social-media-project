/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Header, Button, Grid, Form, Segment, Message, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

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

  constructor(props) {
    super(props);

    this.state = {
      email : "",
      password : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleEmailChange = (e) => {
    this.setState( {email : e.target.value} )
  }

  handlePasswordChange = (e) => {
    this.setState( {password : e.target.value} )
  }

  handleSubmit = (e) => {
    // e.preventDefault()
    console.log("Logging in...");
    const {email, password} = this.state;
    axios.post("/app/login", {
      email: email, 
      password: password,
    })
    .then(function (response) {
      if (response.status === 200){
        if (response.status === 200) {     
          swal("Success!", "Successfully logged in!", "success", {
            button: "Okay"
          }).then(function () {
            let userData = {
              _id:      response.data._id,
              email:    response.data.email,
              name:     response.data.name,
              username: response.data.username,
              password: response.data.password,
              birthday: response.data.birthday,
              about:    response.data.about,
              friends:  response.data.friends
            }
            console.log("Successfully logged in!");
            local_storage.setItem("loggedIn", "true");
            local_storage.setItem("userData", JSON.stringify(userData));
            window.location = "/home";
          });
        } else {
          swal("Login failed!", "Invalid password. Try again.","error", {
            buttons:  "Okay"
          }).then(function () {          
            console.log("Invalid password!")
            window.location = "/login"
          });
        }
      } else {
        window.alert("Something went wrong. Try again.")
        window.location = "/login"
      } 
    })
    .catch(function(error) {
        window.location = "/login"
        console.log("error")
    })
  }

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
                  value = {this.state.email}
                  onChange = {this.handleEmailChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value = {this.state.password}
                  onChange = {this.handlePasswordChange}
                />
                <Button color='teal' fluid size='large' onClick = {this.handleSubmit}>Login</Button>
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
