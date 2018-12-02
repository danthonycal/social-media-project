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
import '../css/userprofile.css'

class Profile extends Component {

    constructor(props) {
        super(props);
        autobind(this);	
        this.state = {
    		_id : '',
            username: '',
            email: '',
        	open : false
        }
    	this.handleClose = this.handleClose.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }	

    handleClose = () => this.setState({ open: false })

    handleUsernameChange = (e) => {
    	this.setState({ newUsername : e.target.value })
    }

    handleEmailChange = (e) => {
    	this.setState({ newEmail : e.target.value })
    }

    componentWillMount(){
        this.setState({
            _id        : this.props.userData._id,
            username   : this.props.userData.username,
            email 	   : this.props.userData.email
        });
    }

	render() {

		const inlineStyle = {
			modal : {
				marginTop: '0px !important',
				marginLeft: 'auto',
				marginRight: 'auto'
			}
		};

		return(
			<div>
				<Header as='h2' icon textAlign='center'>
					<Icon name='users' circular />
					<Header.Content>{this.state.username}</Header.Content>
				</Header>
				Email : {this.state.email}
				<Modal style={inlineStyle.modal} size='mini' trigger = { <Button icon='edit' size='mini' data-tooltip="Edit username" /> }>
					<Modal.Header>
						Edit Username or Email
					</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Input
								fluid
								placeholder={this.state.username}
								onChange = {this.handleUsernameChange}
							>
							</Form.Input>
							<Form.Input
								fluid
								placeholder={this.state.email}
								onChange = {this.handleEmailChange}
							>
							</Form.Input>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button.Group>
							<Button negative onClick={ this.handleClose } >Cancel</Button>
							<Button.Or />
							<Button positive onClick = { () => this.props.handleEditProfile } >Save</Button>
						</Button.Group>
					 </Modal.Actions>
				</Modal>
			</div>
		)
	}	
}

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
			_id :     '',
	        email:    '',
	        name:     '',
	        username: '',
	        bday:     '',
        	open : false
        };

        this.close = this.close.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleBdayChange = this.handleBdayChange.bind(this)
 		// this.handleEditProfile  =  this.handleEditProfile.bind(this)
   //   	this.getProfile = this.getProfile.bind(this)
     }

	getProfile(ID) {
		axios.get('/app/get-user-by-id/'+ID, {
			params : {
				_id: ID
			}
		})
		.then((response) => {
			this.setState({
				_id : response.data._id,
				username : response.data.username,
				name : response.data.name,
				email : response.data.email,
				bday : response.data.birthday
			})
		});
	}

    close = () => this.setState({ open: false })

    handleNameChange = (e) => {
    	this.setState({ newName : e.target.value })
    }

    handleBdayChange = (e) => {
    	this.setState({ newBday : e.target.value })
     }

	handleEditProfile  = (_id, e) => { 
		console.log("Saving changes...")
		axios.post('/app/edit-profile/'+_id, {
			params: {
				_id : _id,
				newUsername : this.state.newUsername,
				newName 	: this.state.newName,
				newBday		: this.state.newBday,
				newEmail	: this.state.newEmail
			}
		})
	    .then(function(response) {
	    	if (response.data === true) {    		
	            swal("Success!", "Profile updated","success", {
	                button : "Okay"
	            }).then(function() {
	            	console.log("Profile updated.")
	            	window.location = '/profile'
	            })
	    	} else {
				swal("Error!", "Something went wrong.", "error", {
					Button: "Okay"
				}).then(function () {
					console.log("Something went wrong.")
				});      		
	    	}
	    })
	    this.setState({
	        newUsername: '',
	        newName: '',
	        newBday: '',
	        newEmail: ''
	    })
	    this.getProfile(this.props.state._id)
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
		  this.getProfile(this.state._id);
		}
	}


	render() {
	
		const inlineStyle = {
			modal : {
			marginTop: '0px !important',
			marginLeft: 'auto',
			marginRight: 'auto'
			}
		};

		return(
			<div>
				<NavBar />
				<div className='profile'>
					<Grid celled>
						<Grid.Row>
							<Grid.Column width={3}>
								<Profile userData = {this.state} handleEditProfile = { this.handleEditProfile } getProfile = { this.getProfile } />
							</Grid.Column>
							<Grid.Column width={13}>
								<Button><Icon name='user plus' />Add as friend</Button>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={3}>
								<h2>About</h2>
								Name: {this.state.name}
								<Modal style={inlineStyle.modal} size='mini' trigger = { <Button icon='edit' floated='right' size='mini' data-tooltip="Edit name" /> }>
									<Modal.Header>
										Edit Name
									</Modal.Header>
									<Modal.Content>
										<Form>
											<Form.Field>
												<input placeholder={this.state.name} />
											</Form.Field>
										</Form>
									</Modal.Content>
									<Modal.Actions>
										<Button.Group>
											<Button negative >Cancel</Button>
											<Button.Or />
											<Button positive onClick = {() => this.handleEditProfile(this.state._id)}>Save</Button>
										</Button.Group>
									</Modal.Actions>
								</Modal>
								<br /><br />
								Birthday: {this.state.bday}
								<Modal style={inlineStyle.modal} size='mini' position='fixed' trigger = { <Button icon='edit' floated='right' size='mini' data-tooltip="Edit birthday"/> } >
									<Modal.Header>
										Edit Birthday
									</Modal.Header>
									<Modal.Content>
										<Form.Input
											fluid
											type = 'date'
										/>
									</Modal.Content>
									<Modal.Actions>
										<Button.Group>
											<Button negative onClose={this.close}>Cancel</Button>
											<Button.Or />
											<Button positive onClick = {() => this.handleEditProfile(this.state._id)}>Save</Button>
										</Button.Group>
									</Modal.Actions>
								</Modal>
								<br />
							</Grid.Column>
							<Grid.Column width={10}>
								
							</Grid.Column>
							<Grid.Column width={3}>
								
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		)
	}	
}