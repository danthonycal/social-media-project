/* eslint-disable no-unused-vars */
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Message, Container,  Divider, Grid, Header,Icon, Input, Image, Form,  List,  Menu,  Responsive,  Segment,  Sidebar,  Visibility} from 'semantic-ui-react'
import '../assets/css/homepage.css';
import Footer from './Footer';
import NavBar from './NavBar';
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

const Section1 = () => (
  <div>
    <Segment inverted style={{ height: '600px',padding: '1em', backgroundColor: '#7abbff'}} vertical>
      <p>Hey</p>
    </Segment>
  </div>
)

const SubsectionStyle = {
  margin : '10px',
  height: '500px',
  backgroundColor : '#edf6ff',
  border : 'none'
}

const SignUp = ({state}) => (
  <div>
    <Segment textAlign = 'center' style={{ height: '600px',padding: '1em 3em 0em 3em', backgroundColor : '#f9fcff'}} vertical>
      <Header as = 'h1' content = "Logo" style = {{padding: '3px'}}/>
      <Segment textAlign = 'center' style = {SubsectionStyle}>
        <Divider horizontal/>
        <Grid verticalAlign = 'middle' textAlign='center'>
          <Grid.Column style={{ maxWidth: 400 }}>
            <Button as={Link} to = '/login' fluid color = 'teal' >Log in</Button>
            <Divider horizontal>Or</Divider>
            <Form error = {state.state.form_error}>
              <Form.Input
                fluid
                placeholder ='Email'
                required    = {true}
                value       = {state.state.temp_email}
                onChange    = {state.handleEmailChange}
                error       = {state.state.email_error}
              />
              <Form.Input
                fluid
                placeholder ='Name'
                required    = {true}
                value       = {state.state.temp_name}
                onChange    = {state.handleNameChange}
                error       = {state.state.name_error}
              />
              <Form.Input
                fluid
                placeholder ='Username'
                required    = {true}
                value       = {state.state.temp_username}
                onChange    = {state.handleUsernameChange}
                error       = {state.state.username_error}
              />
              <Form.Input
                fluid
                placeholder ='Password'
                required    = {true}
                type        = 'password'
                value       = {state.state.temp_password}
                onChange    = {state.handlePasswordChange}

              />
              <Form.Input
                fluid
                required    = {true}
                type        = 'date'
                value       = {state.state.temp_bday}
                onChange    = {state.handleBdayChange}

              />
              <Form.Button fluid color = 'teal' onClick = {state.handleClick}>Sign Up</Form.Button>
            </Form>
            <Message>
              By signing up, you agree to our <strong>Terms and Conditions</strong>.
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment>
  </div>
)

/**************************************************
*         START OF HOMEPAGE COMPONENT             *
**************************************************/
export default class HomePage extends Component {

  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      temp_email    : '',
      temp_name     : '',
      temp_username : '',
      temp_password : '',
      temp_bday     : '',


      email_error   : false,
      name_error    : false,
      username_error: false,
      password_error: false,
      bday_error    : false,
      form_error    : false,
    }
 }

 /* event handlers for the sign up form */

 handleEmailChange = (e) => {
   this.setState( {temp_email : e.target.value} )
 }

 handleNameChange = (e) => {
   this.setState( {temp_name : e.target.value} )
 }

 handleUsernameChange = (e) => {
   this.setState( {temp_username : e.target.value} )
 }

 handlePasswordChange = (e) => {
   this.setState( {temp_password : e.target.value} )
 }

 handleBdayChange = (e) => {
   this.setState( {temp_bday : e.target.value} )
 }

 handleClick = (e) => {
  //  e.preventDefault();
  console.log("Signing up...");
  axios.post("/app/signup", {
    email     : this.state.temp_email,
    name      : this.state.temp_name,
    username  : this.state.temp_username,
    password  : this.state.temp_password,
    birthday  : this.state.temp_bday,
    posts     : [],
    friends   : [],
    isSearchable : 1,
    isAccepting  : 1,
  })
  .then(function(response) {
    swal("Success!", "Successfully signed up!", "success", {
      button: "Okay"
    })
    .then(function (response) {
      window.location.href="/";
    });
  })
 }


  render() {
    return (
      <div style={{ display:"flex", minHeight:"100vh", flexDirection:"column"}}>
        <NavBarHomePage />
        <Grid>
          <Grid.Column width = {8} style = {{padding: '0em '}}>
            <Section1 />
          </Grid.Column>
          <Grid.Column width = {8} style = {{padding: '0em'}}>
            <SignUp state = {this} />
          </Grid.Column>
        </Grid>
        <Footer />
      </div>
    )
  }
}
