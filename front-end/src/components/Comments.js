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

class SingleComment extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            authorId    : '',
            authorName  : '',
            postId      : '',
            postOwner   : '',
            content     : '',
            timestamp   : new Date()
        }
    }
    componentWillMount() {
        this.setState({
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
                    <a>Reply</a>
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
        this.getComments(this.props.userData._id);
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
        this.getComments(this.props.userData._id)
    }
    render() {
        const comments=this.state.comments;
        const collapsed = this.state.collapsed;

        return (
            <Comment.Group minimal>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {
                    comments.reverse().map((comment)=>{
                        return(
                            <SingleComment key={comment._id} commentData={comment} userData={this.state} />
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