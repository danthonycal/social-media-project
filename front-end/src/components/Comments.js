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

export default class Comments extends Components {
    constructor(props) {
        super(props);
        autobind(this);
    }
    render() {
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar as='a' src={Laura} />
                    <Comment.Content>
                    <Comment.Author>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                        <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                        The hours, minutes and seconds stand as visible reminders that your effort put them all
                        there.
                        </p>
                        <p>
                        Preserve until your next run, when the watch lets you see how Impermanent your efforts
                        are.
                        </p>
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar as='a' src={Laura} />
                    <Comment.Content>
                    <Comment.Author>Christian Rocha</Comment.Author>
                    <Comment.Metadata>
                        <div>2 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>I re-tweeted this.</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}