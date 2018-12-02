/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item} from 'semantic-ui-react'
import local_storage from 'localStorage';
import swal from 'sweetalert2';

const DashboardStyle = {
    zIndex: '3',
    borderRadius: '0px',
    minHeight:'50px',
    paddingBottom: '10px',
    marginTop: '-10px',
}
export default class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            authorId    :  '',
            authorName  :  '',
            wallId      :  '',
            wallOwner   :  '',  
            content     :  '',
            timestamp   : new Date(),
            comments    : [],
        }
    }
    handleStatusChange = (e) => {
        this.setState({content : e.target.value});
    }
    handleClick = (e) => {
        axios.post('/app/add-posts', {
            authorId   : this.state.authorId,
            authorName : this.state.authorName,
            wallId     : this.state.wallId,
            wallOwner  : this.state.wallOwner,
            content    : this.state.content,
            timestamp  : this.state.timestamp,
            comments   : this.state.comments
        })
        .then(function(response) {
            swal("Added post!", "nice!","success", {
                button : "oks"
            });
        })
        this.setState({
            content: ''
        });
        this.props.getPosts();
    }
    componentWillMount() {
        const user = JSON.parse(local_storage.getItem("userData"));
        this.setState({
            authorId   : user._id,
            wallId     : user.wallId,
            authorName : user.name,
            wallOwner  : user.name,
        });
    }
    render() {
        return(
            <div>
                <Grid centered columns={1} style={DashboardStyle}>
                    <Card fluid>
                        <Card.Content>
                        <Card.Header>
                            Make a post
                        </Card.Header>
                        <Card.Meta></Card.Meta>
                        <Card.Description>
                            <Form>
                                <TextArea placeholder='Add a post' value = {this.state.content} onChange = {this.handleStatusChange} rows={2} style={{ minHeight: 70 }} />
                            </Form>
                        </Card.Description>
                        <Button floated="right" onClick = {this.handleClick}>Post</Button>
                        </Card.Content>
                    </Card>
                </Grid>
            </div>
        )
    }
} 
