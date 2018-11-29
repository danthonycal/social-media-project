/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react'
import NavBar from './NavBar';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css';
import CreatePostForm from './CreatePostForm';
import Laura from '../assets/img/avatar/laura-large.jpg';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

class Profile extends Component {

    constructor(props) {
        super(props);

        autobind(this);	
        this.state = {
        	profile : {
	            email:    '',
	            name:     '',
	            username: '',
	            bday:     '',
	            about:    '',
	            friends:  [],   
	            // posts:    [],
        	}
        }
    }	

	render() {
		return(
			<Container>
				<div>
					<Header as='h2' icon textAlign='center'>
						<Icon name='users' circular />
						<Header.Content>{this.props.userData.name}</Header.Content>
					</Header>
				</div>
			</Container>
		)
	}	
}

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	profile : {
	            email:    '',
	            name:     '',
	            username: '',
	            bday:     '',
	            about:    '',
	            friends:  [],   
	            // posts:    [],
        	}
        }
    }

	componentWillMount() {
		if(local_storage.getItem("loggedIn")!=="true") {
		  window.location ="/";
		} else {
		  const user = JSON.parse(local_storage.getItem("userData"))
		  this.setState({
		    _id: user._id,
		    email:    user.email,
		    name:     user.name,
		    username: user.username,
		    password: user.password,
		    bday:     user.birthday,
		    about:    user.about,
		    friends:  user.friends
		  })
		}
	}

	render() {
		return(
			<div>
				<NavBar />
                <Grid centered columns={1}>
                    <Grid.Column width={1} ></Grid.Column>
                    <Grid.Column width={3} >
                        <Profile userData = {this.state} />
                    </Grid.Column>
                </Grid>
				
			</div>
		)
	}	
}