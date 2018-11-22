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
import swal from 'sweetalert2';

const date = '3 days ago'

const UpdateModalStyle = {
    marginTop: '95px',
    marginLeft: '250px'
}

const ProfileCardStyle = {
    marginTop: '7em',
    
}

class ProfileCard extends Component {

    constructor(props){
        super(props);
    
        autobind(this);
        this.state = {
            profile : {
                name: '',
                bday: ''
            },
        };
    }

    render() {
        return (
            <Grid.Column fixed='top' width = {4} style={ ProfileCardStyle }> {/* Profile Info */}
                <Card>
                    <Image src={ Laura } size='large' circular />
                    <Card.Content>
                        <Card.Header textAlign = 'center'>
                            
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
        autobind(this);
        this.state = {
            author      :  '',
            wallId      :  '',  
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
                    <Modal trigger={<Button icon='edit' />} style={UpdateModalStyle} closeIcon>
                        <Header icon='edit' content='Edit Post' />
                        <Modal.Content>
                            <Form>
                                <TextArea placeholder='Update your post' value = {this.state.newContent} onChange = {this.handleStatusEdit} rows={2} style={{ minHeight: 70 }} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button color='red'>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button color='green'  onClick = {() => this.handleUpdate(post._id)} >
                            <Icon name='checkmark' /> Update
                        </Button>
                        </Modal.Actions>
                    </Modal>
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
        const posts = this.props.posts;
        return(
            <Feed>
                <CreatePostForm getPosts={ this.props.getPosts }/>
                <br />
                {
                    posts.reverse().map((post) => {
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
            profile : {
                name: '',
                bday: ''
            },
            posts: [],
        }
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(){
        axios.get("/app/get-posts")
        .then((response) => {
            this.setState({
                posts: response.data
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
                    <Grid.Column width={3} >
                        <ProfileCard />
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <Container text style={{ marginTop: '7em' }}>
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