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

export default class UserHome extends Component {
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
            birthday : '',
            about    : '',
            friends  : [],   
            posts    : []
        }
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
            alert(error);
        });
        this.render();
    }
    
    componentWillMount(){
        if(local_storage.getItem("loggedIn")!=="true"){
            window.location = "/";
        } else {
            const user = JSON.parse(local_storage.getItem("userData"))
            this.setState({
                _id      : user._id,
                wallId   : user.wallId,
                email    : user.email,
                name     : user.name,
                username : user.username,
                password : user.password,
                birthday : user.birthday,
                about    : user.about,
                friends  : user.friends
            })
            this.getPosts();
        }
    }
    render() {
        console.log(this.state)
        return(
            <div>
                <NavBar />
                <Grid centered columns={1}>
                    <Grid.Column width={1} ></Grid.Column>
                    <Grid.Column width={3} >
                        <ProfileCard userData={this.state}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Container text style={{ marginTop: '6em' }}>
                            <PostFeed posts={this.state.posts} getPosts={this.getPosts} userData={this.state}/>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={3} ></Grid.Column>
                    <Grid.Column width={1} ></Grid.Column>
                </Grid>
                
            </div>
        )
    }
}