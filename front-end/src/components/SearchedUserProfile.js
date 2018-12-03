/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react'
import PostFeed from './PostFeed';
import NavBar from './NavBar';
import Footer from './Footer';
import ProfileCard from './ProfileCard';
import 'semantic-ui-css/semantic.min.css';
import Laura from '../assets/img/avatar/laura-large.jpg';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

// const date = '3 days ago'


export default class SearchedUserProfile extends Component {
    constructor(props) {
        super(props);
        autobind(this);
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
            posts    : []
        }
    }
    getPosts(){
        console.log(this.state.wallId)
        axios.get("/app/get-posts/"+this.state.wallId)
        .then((response) => {
            this.setState({
                posts: response.data
            })
        })
        .catch((error) => {
            console.log(error);
            // window.location.reload();
        });
        this.render();
    }
    
    componentWillMount(){
        if(local_storage.getItem("loggedIn")!=="true"){
            window.location = "/";
        } else {
            console.log(this.props.match.params.username)
            axios.get("/app/find-by-username/"+this.props.match.params.username)
            .then(function(response) {
                local_storage.setItem("SelectedUser",JSON.stringify(response.data));
                const selectedUser = JSON.parse(local_storage.getItem("SelectedUser"));
                this.setState({
                    wallId   : selectedUser._id,
                    _id      : selectedUser._id,
                    email    : selectedUser.email,
                    name     : selectedUser.name,
                    username : selectedUser.username,
                    password : selectedUser.password,
                    bday     : selectedUser.birthday,
                    about    : selectedUser.about,
                    friends  : selectedUser.friends
                })
            });
        }
        this.getPosts();
    }
    render() {
        const selectedUser = JSON.parse(local_storage.getItem("SelectedUser"));
        return(
            <div>
                <NavBar />
                <Grid centered columns={1}>
                    <Grid.Column width={1} ></Grid.Column>
                    <Grid.Column width={3} >
                        <ProfileCard userData={selectedUser}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Container text style={{ marginTop: '6em' }}>
                            <PostFeed posts={this.state.posts} getPosts={this.getPosts} userData={selectedUser}/>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={3} ></Grid.Column>
                    <Grid.Column width={1} ></Grid.Column>
                </Grid>
                
            </div>
        )
    }
}