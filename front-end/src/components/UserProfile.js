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
			<div>
				<Header as='h2' icon textAlign='center'>
					<Icon name='users' circular />
					<Header.Content>{this.props.userData.username}</Header.Content>
				</Header>
			</div>
		)
	}	
}

class EditModal extends Component {

	state = { open: false }

	closeConfigShow = (closeOnDimmerClick) => () => {
		this.setState({ closeOnDimmerClick, open: true })
	}

	close = () => this.setState({ open: false })

	render() {
		const { open, closeOnDimmerClick } = this.state

		return (
			<div>
				<Button onClick = {this.closeConfigShow(true, false)}>No Close on Dimmer Click </Button>

				<Modal
					
					open={open}
					closeOnDimmerClick={closeOnDimmerClick}
					onClose={this.close}
				>
					<Modal.Header>Delete Your Account</Modal.Header>
					<Modal.Content>
						<p>Are you sure you want to delete your account?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.close} negative>No</Button>
						<Button onClick={this.close} positive labelPosition='right' icon='checkmark' content='Yes'/>
					</Modal.Actions>
				</Modal>
			</div>
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
        	},
        	open : false
        };
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
				<Segment>
					<NavBar />
				<Divider hidden />
					<Grid celled>
						<Grid.Row>
							<Grid.Column width={3}>
								<Profile userData = {this.state} />
							</Grid.Column>
							<Grid.Column width={13}>
								<Button content='Add as friend' icon='user plus' labelPosition='left' />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={3}>
								<h2>About</h2>
								<Icon name='edit' /> Name: {this.state.name}<br />
								<Icon name='edit' /> Age: <br /> 
								<Icon name='edit' /> Birthday: {this.state.bday}<br />
							</Grid.Column>
							<Grid.Column width={10}>
								<Image src='/images/wireframe/paragraph.png' />
							</Grid.Column>
							<Grid.Column width={3}>
								<Image src='/images/wireframe/image.png' />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		)
	}	
}