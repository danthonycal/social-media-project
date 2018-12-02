/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import CreatePostForm from './CreatePostForm';
import Comments from './Comments';
import Laura from '../assets/img/avatar/laura-large.jpg';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

const UpdateModalStyle = {
    marginTop: '95px',
    marginLeft: '250px'
}

class Post extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            _id         :  '',
            authorId    :  '',
            authorName  :  '',
            wallId      :  '',
            wallOwner   :  '',  
            content     :  '',
            timestamp   : new Date(),
            comments    : [],
            modalOpen: false
        }
    }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    handleStatusEdit = (e) => {
        this.setState( {newContent : e.target.value} );
    }
    handleUpdate = (_id, e) => {
        axios.post('/app/edit-post/'+_id, {
            params: {
                _id        : _id,
                newContent :  this.state.newContent
            }
        })
        .then(function(response) {
            swal("Updated post!", "nice!","success", {
                button : "oks"
            })
        })
        this.setState({
            newContent: ''
        })
        this.props.getPosts()
    }
    handleDeletePost = (_id, e) => {
        axios.delete('/app/delete-post/'+_id, {
            params: {
                _id: _id,
            }
        }).catch((error) => {
            console.log(error);
        });
        this.props.getPosts();
    }
    
    componentWillMount(){
        this.setState({
            _id        : this.props.postData._id,
            authorId   : this.props.postData.authorId,
            authorName : this.props.postData.authorName,
            wallId     : this.props.postData.wallId,
            wallOwner  : this.props.postData.wallOwner,
            content    : this.props.postData.content,
            timestamp  : this.props.postData.timestamp,
            comments   : this.props.postData.comments
        });
    }
    render() {
        return(
            <Feed.Event>
				<Feed.Label image={ Laura } />
				<Feed.Content>
					<Feed.Summary>
						{this.state.authorName} 
						<Feed.Date>{this.state.timestamp} | {this.state.wallOwner}'s wall</Feed.Date>
					</Feed.Summary>
					<Feed.Extra text>
						{this.state.content}
					</Feed.Extra>
					<Feed.Meta>
						<Button size='mini' content='Delete post' icon='trash' onClick={() => this.handleDeletePost(this.state._id)} />
						<Modal trigger={<Button size='mini' content='Edit post' icon='edit' />} style={UpdateModalStyle} closeIcon>
							<Header icon='edit' content='Edit Post' />
							<Modal.Content>
								<Form>
									<TextArea placeholder='Update your post' value = {this.state.newContent} onChange={this.handleStatusEdit} rows={2} style={{minHeight: 70}} />
								</Form>
							</Modal.Content>
							<Modal.Actions>
                                <Button size='mini' color='red' content='Cancel' icon='remove' />
                                <Button size='mini' color='green' content='Update' icon='checkmark'  onClick = {() => this.handleUpdate(this.state._id)} />
							</Modal.Actions>
						</Modal>

					</Feed.Meta>
                    <Feed.Extra>
                        <Comments getPost={this.props.getPost} comments={this.state.comments} userData={this.state} />
                    </Feed.Extra>
				</Feed.Content>
            </Feed.Event>
        )
    } 
}
export default class PostFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id      : '',
            wallId   : '',
            email    : '',
            name     : '',
            username : '',
            password : '',
            bday     : '',
            about    : '',
            friends  : [],   
        }
    }
    componentWillMount() {
        this.setState({
            _id      : this.props.userData._id,
            wallId   : this.props.userData.wallId,
            email    : this.props.userData.email,
            name     : this.props.userData.name,
            username : this.props.userData.username,
            password : this.props.userData.password,
            bday     : this.props.userData.bday,
            about    : this.props.userData.about,
            friends  : this.props.userData.friends
        });
    }
    render() {
        const posts=this.props.posts
        return(
			<Grid>
				<Grid.Column width={1}></Grid.Column>
				<Grid.Column width={16}>
					<Feed divided>
						<CreatePostForm getPosts={this.props.getPosts} userData={this.state}/>
						<br />
						{
							posts.reverse().map((post) => {
								return(
									<Post key={post._id} postData={post} getPosts={this.props.getPosts} userData={this.state}/>
								)
							})
						}
					</Feed>
				</Grid.Column>
				<Grid.Column width={1}></Grid.Column>
			</Grid>
        )
    }
}