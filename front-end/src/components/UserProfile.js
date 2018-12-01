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
        	profile : {
	            // email:    '',
	            // name:     '',
	            username: '',
	            // bday:     '',
	            // about:    '',
	            // friends:  [],   
	            // posts:    [],
        	}
        }
    	this.close = this.close.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
    }	

    close = () => this.setState({ open: false })

    handleUsernameChange = (e) => {
    	this.setState({ username : e.target.value })
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
					<Header.Content>{this.props.userData.username}</Header.Content>
				</Header>
				<Modal style={inlineStyle.modal} size='mini' trigger = { <Button icon='edit' size='mini' data-tooltip="Edit username" /> }>
					<Modal.Header>
						Edit Username
					</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Input
								fluid
								placeholder={this.props.userData.username}
								onChange = {this.handleUsernameChange}
							>
							</Form.Input>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button.Group>
							<Button negative onClick= { this.close } >Cancel</Button>
							<Button.Or />
							<Button positive>Save</Button>
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

        this.close = this.close.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleBdayChange = this.handleBdayChange.bind(this)
    }

    close = () => this.setState({ open: false })

    handleNameChange = (e) => {
    	this.setState({ name : e.target.value })
    }

    handleBdayChange = (e) => {
    	this.setState({ bday : e.target.value })
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
								<Profile userData = {this.state} />
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
											<Button positive>Save</Button>
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
											<Button positive>Save</Button>
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