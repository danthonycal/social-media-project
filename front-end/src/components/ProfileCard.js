/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item, List} from 'semantic-ui-react';
import Laura from '../assets/img/avatar/laura-large.jpg';
import local_storage from 'localStorage';
import swal from 'sweetalert2';

const ProfileCardStyle = {
    marginTop: '6em',
    
}

export default class ProfileCard extends Component {

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
                            {this.props.userData.name}
                        </Card.Header>
                        <Card.Meta textAlign = 'center'>
                        <p>{this.props.userData.birthday}</p>
                        </Card.Meta>
                        <Card.Description textAlign = 'center'>
                        {/* <p>Friend: </p> */}
                        
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }
}
