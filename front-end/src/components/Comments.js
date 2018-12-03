/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List, Comment} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Laura from '../assets/img/avatar/laura-large.jpg';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

const UpdateModalStyle = {
    marginTop: '95px',
    marginLeft: '250px'
}

class SingleComment extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            _id         : '',
            authorId    : '',
            authorName  : '',
            postId      : '',
            postOwner   : '',
            content     : '',
            timestamp   : new Date()
        }
    }
    handleCommentEdit = (e) => {
        this.setState({content: e.target.value});
    }
    handleUpdate = (_id, e) => {
        axios.post('/app/edit-comment/'+_id, {
            params: {
                _id        : _id,
                postId     : this.props.postId,
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
        this.props.getComments(this.props.commentData._id);
        window.location.reload()
    }
    handleDeleteComment = (e) => {
        axios.delete('/app/delete-comment/'+this.state._id, {
            params: {
                _id    : this.state._id,
                postId : this.state.postId
            }
        }).catch((error) => {
            console.log(error);
        });
        this.props.getComments(this.props.commentData._id);
        this.render();
        window.location.reload();
    }
    componentWillMount() {
        this.setState({
            _id        : this.props.commentData._id,
            authorId   : this.props.commentData.authorId,
            authorName : this.props.commentData.authorName,
            postId     : this.props.commentData._id,
            postOwner  : this.props.commentData.postOwner,
            content    : this.props.commentData.content,
            timestamp  : this.props.commentData.timestamp
        });
    }
    render() {
        return(
            <Comment>   
                <Comment.Avatar as='a' src={ Laura } />
                <Comment.Content>
                    <Comment.Author as='a'>{this.state.authorName}</Comment.Author>
                    <Comment.Metadata>
                    <span>{this.state.timestamp}</span>
                    </Comment.Metadata>
                    <Comment.Text>{this.state.content}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action onClick={() => this.handleDeleteComment()}>
                            delete
                        </Comment.Action>
                        <Comment.Action>
                            <Modal trigger={<a>edit</a>} style={UpdateModalStyle} closeIcon>
                                <Header icon='edit' content='Edit Comment' />
                                <Modal.Content>
                                    <Form>
                                        <TextArea placeholder='Update comment' value = {this.state.content} onChange={this.handleCommentEdit} rows={2} style={{minHeight: 70}} />
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button size='mini' color='red' content='Cancel' icon='remove' />
                                    <Button size='mini' color='green' content='Update' icon='checkmark'  onClick = {() => this.handleUpdate(this.state._id)} />
                                </Modal.Actions>
                            </Modal>
                        </Comment.Action>
                        {/* <Button size='mini' icon='remove'  /> */}
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }
}

export default class Comments extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            authorId    : '',
            authorName  : '',
            postId      : '',
            postOwner   : '',
            content     : '',
            timestamp   : new Date(),
            comments    : []
        }
    }
    getComments(ID) {
        axios.get('/app/get-comments/'+ID, {
            params: {
                _id: ID
            }
        })
        .then((response) => {
            this.setState({
                comments: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    handleCommentFormChange = (e) => {
        this.setState({content : e.target.value});
    }
    handleClick = (e) => {
        axios.post('/app/add-comment', {
            authorId   : this.state.authorId,
            authorName : this.state.authorName,
            postId     : this.state.postId,
            postOwner  : this.state.postOwner,
            content    : this.state.content,
            timestamp  : this.state.timestamp
        })
        .then(function(response) {
            swal("Added comment!", "nice!","success", {
                button : "oks"
            });
        });
        this.setState({
            content: ''
        });
        this.getComments(this.props.userData._id)
        window.location.reload();
    } 
    componentWillMount(){
        const loggedUser = JSON.parse(local_storage.getItem("userData"));
        this.setState({
            authorId   : loggedUser._id,
            authorName : loggedUser.name,
            postId     : this.props.userData._id,
            postOwner  : this.props.userData.name,
            timestamp  : this.props.userData.timestamp 
        });
        // this.props.getPost();
        this.getComments(this.props.userData._id)
    }
    render() {
        const comments=this.state.comments;
        const collapsed = this.state.collapsed;

        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {
                    comments.reverse().map((comment)=>{
                        return(
                            <SingleComment key={comment._id} getComments={this.getComments} commentData={comment} userData={this.state} />
                        ) 
                    })
                }
                <Form reply>
                    <TextArea placeholder='Add a comment' style={{ maxHeight: 45 }} value={this.state.content} onChange={this.handleCommentFormChange} rows={1} />
                    <Button onClick={this.handleClick} content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}