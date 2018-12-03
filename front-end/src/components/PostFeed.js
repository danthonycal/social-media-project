/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, div, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react';
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
        this.setState( {content : e.target.value} );
    }
    handleUpdate = (_id, e) => {
        axios.post('/app/edit-post/'+_id, {
            params: {
                _id        : _id,
                newContent : this.state.content
            }
        })
        .then(function(response) {
            swal("Updated post!", "nice!","success", {
                button : "oks"
            })
        })
        this.setState({
            content: ''
        })
        // this.props.getPosts();
        this.render();
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
            <Card fluid>
                <Card.Content>
                    <Card.Header>{this.state.authorName}</Card.Header>
                    <Card.Meta>{this.state.timestamp} | {this.state.wallOwner}'s wall</Card.Meta>
                    <Card.Description>{this.state.content}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Modal trigger={<Button size='mini' content='Edit post' icon='edit' />} style={UpdateModalStyle} closeIcon>
                        <Header icon='edit' content='Edit Post' />
                        <Modal.Content>
                            <Form>
                                <TextArea placeholder='Update your post' value = {this.state.content} onChange={this.handleStatusEdit} rows={2} style={{minHeight: 70}} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button size='mini' color='red' content='Cancel' icon='remove' />
                            <Button size='mini' color='green' content='Update' icon='checkmark'  onClick = {() => this.handleUpdate(this.state._id)} />
                        </Modal.Actions>
                    </Modal>
                    <Button size='mini' content='Delete post' icon='trash' onClick={() => this.handleDeletePost(this.state._id)} />
                    <Comments getPost={this.props.getPost} comments={this.state.comments} userData={this.state} />
                </Card.Content>
            </Card>
            // <Feed.Event>
			// 	<Feed.Label image={ Laura } />
			// 	<Feed.Content>
			// 		<Feed.Summary>
			// 			{this.state.authorName} 
			// 			<Feed.Date>{this.state.timestamp} | {this.state.wallOwner}'s wall</Feed.Date>
			// 		</Feed.Summary>
			// 		<Feed.Extra text>
			// 			{this.state.content}
			// 		</Feed.Extra>
			// 		<Feed.Meta>
						

			// 		</Feed.Meta>
            //         <Feed.Extra>
            //             <Comments getPost={this.props.getPost} comments={this.state.comments} userData={this.state} />
            //         </Feed.Extra>
			// 	</Feed.Content>
            // </Feed.Event>
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
        const wallData={_id: this.state.wallId, name: this.state.name}
        return(
			<div>
				<CreatePostForm wallData={wallData} getPosts={this.props.getPosts} />
                <Card.Group>
                    {
                        posts.reverse().map((post) => {
                            return(
                                <Post key={post._id} postData={post} getPosts={this.props.getPosts} userData={this.state}/>
                            )
                        })
                    }
                </Card.Group>
			</div>
        )
    }
}