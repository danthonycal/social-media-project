/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react'
import NavBar from './NavBar';
import Footer from './Footer';
import StatusUpdateForm from './StatusUpdateForm';
import Laura from '../assets/img/avatar/laura-large.jpg';
import swal from 'sweetalert2';

const date = '3 days ago'
const summary = 'Laura Faucet created a post'
const extraText = "Have you seen what's going on in Israel? Can you believe it."


class ProfileCard extends Component {
    render() {
        return (
            <Grid.Column width = {4}> {/* Profile Info */}
                <Card>
                    <Image src={ Laura } size='large' circular />
                    <Card.Content>
                        <Card.Header textAlign = 'center'>
                        Surname, FirstName M.I.
                        </Card.Header>
                        <Card.Meta textAlign = 'center'>
                        <p>Birthday</p>
                        </Card.Meta>
                        <Card.Description textAlign = 'center'>
                        <p>Friend: </p>
                        <p>Friend, Friend, Friend</p>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }
}
class Post extends Component {
    constructor(props) {
        super(props);
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }
    handleDeletePost = (_id, e) => {
        // console.log(this.props.postData._id)
        axios.delete('/app/delete-post/'+_id, {
            params: {
                _id: _id,
            }
        })
        this.props.getPosts();
    }
    render() {
        const post = this.props.postData;
        return(
            <Feed.Event key={post._id}>
            <Feed.Label image={ Laura } />
            <Feed.Content>
                <Feed.Summary>
                { post.author } 
                <Feed.Date>3 days ago on { post.author }'s wall</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    { post.content }
                </Feed.Extra>
                <Feed.Meta>
                    <Button icon='trash' onClick={() => this.handleDeletePost(post._id)} />
                </Feed.Meta>
            </Feed.Content>
            </Feed.Event>
        )
    } 
}
class PostFeed extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const posts = this.props.posts
        
        return(
            <Feed>
                {
                    posts.map((post) => {
                        return(
                            <Post postData = { post } getPosts = { this.props.getPosts } />
                        )
                    })
                }
            </Feed>
        )
    }

}

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.getPosts = this.getPosts.bind(this);        
    }
    getPosts(){
        console.log("Getting posts..");
        axios.get("/app/get-posts")
        .then((response) => {
            console.log("response.data: ");
            console.log(response.data);
            this.setState({
                posts: response.data,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentWillMount(){
        this.getPosts();    
    }
    render() {
        return(
            <div>
                <NavBar />
                <Grid centered columns={1}>
                    <Grid.Column width={1} ></Grid.Column>
                    <Grid.Column width={3} ></Grid.Column>
                    <Grid.Column width={8} >
                        <Container text style={{ marginTop: '7em' }}>
                            <StatusUpdateForm getPosts={ this.getPosts }/>
                            <PostFeed posts={ this.state.posts } getPosts={ this.getPosts } />
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={3} ></Grid.Column>
                    <Grid.Column width={1} ></Grid.Column>
                </Grid>
                
            </div>
        )
    }
}