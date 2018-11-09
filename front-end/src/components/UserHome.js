/* eslint-disable no-unused-vars */
import _ from 'lodash';
import autobind from 'react-autobind';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button,  Container,  Divider, Grid, Header, Icon, Input, Image, Form,  Menu,  Responsive,  Segment,  Sidebar,  Visibility, Card, Feed, Sticky, Rail, TextArea, Modal, Item} from 'semantic-ui-react'
import NavBar from './NavBar';
import Footer from './Footer';
import Laura from '../assets/img/avatar/laura-large.jpg';
import swal from 'sweetalert2';

const date = '3 days ago'
const summary = 'Laura Faucet created a post'
const extraText = "Have you seen what's going on in Israel? Can you believe it."

const FeedStyle = {
    //overflowY: 'scroll',
    maxHeight: '50%'
}
const DashboardStyle = {
    borderRadius: '0px',
    minHeight:'50px',
    paddingBottom: '10px',
    marginTop: '-10px',
}
function PostsExist(props) {
    if(true){ //props.data[0] && props.data[0].length > 0
        return(
            <Item.Group divided>
                {
                    props.data[0].map((post) => {
                        return(
                            <Item key={post._id}>
                                <Item.Content>
                                </Item.Content>
                            </Item>
                        )
                    })
                }
            </Item.Group>
        )
    } else {

    }
} 
class StatusUpdate extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            author      :  '',  
            content     :  '',
            timestamp   : new Date(),
            comments    : [],
            likes       : 0
        }
    }

    handleStatusChange = (e) => {
        this.setState( {content : e.target.value} );
    }

    handleClick = (e) => {
        axios.post('/app/add-post', {
            author  : this.state.author,
            content : this.state.content,
            timestamp : this.state.timestamp,
            comments : this.state.comments,
            likes : this.state.likes,
        })
        .then(function(response) {
            swal("Added a comment!", "nice!","success", {
                button : "oks"
            })
        })
    }

    render() {
        return(
            <div>
                <Grid centered columns={1} style={DashboardStyle}>
                    <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                        <Card.Header>
                            Make a post
                        </Card.Header>
                        <Card.Meta></Card.Meta>
                        <Card.Description>
                            <Form>
                                <TextArea placeholder='We can read your mind' value = {this.state.content} onChange = {this.handleStatusChange} rows={2} style={{ minHeight: 70 }} />
                            </Form>
                        </Card.Description>
                        <Button floated="right" onClick = {this.handleClick}>Post</Button>
                        </Card.Content>
                    </Card>
                    
                    </Grid.Column>
                    <Grid.Column width={6}>
                    </Grid.Column>
                </Grid>
                

            </div>
        )
    }
}
const ListExampleDivided = () => (
    <Container>
        <Feed style = { FeedStyle }>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={ Laura } />
                <Feed.Content>
                    <Feed.Summary content={summary} />
                    <Feed.Date content={date} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
        </Feed>
    </Container>
)

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
class HomeBody extends Component {
    render() {
        return(
            <div style={{marginTop: "18em"}}>
                <Grid>
                    <Grid.Column width = {5}>
                    </Grid.Column>
                    <Grid.Column width = {11}>
                        <ListExampleDivided />
                    </Grid.Column>
                    
                    
                </Grid>
            </div>
        )
    }
}
export default class UserHome extends Component {
    state = {}
    handleContextRef = contextRef => this.setState({ contextRef })
    render() {
        const { contextRef } = this.state
        return(
            <div style={{
                display:"flex",
                minHeight:"100%",
                flexDirection:"column",
            }}>
                <div style={{flex:1}}>
                    <Segment style={{ minHeight: 100, padding: 0}} vertical>
                        <div ref={this.handleContextRef}>
                            <Segment style={{padding:0}}>
                                
                                {_.times(1,i =><Container> <HomeBody key={i} /> </Container>)}
                                <Rail style={{minWidth:"100%", padding:0}}>
                                    
                                    <Sticky context={ contextRef } offset={ -1 }>
                                        
                                        <NavBar style={{zIndex:'2'}} />
                                        <Grid>
                                            <Grid.Column width = {1}>
                                            </Grid.Column>
                                            <Grid.Column style={{ marginTop:"3em" }} width = {4}>
                                                <ProfileCard />
                                            </Grid.Column>
                                            <Grid.Column width = {10}>
                                                <StatusUpdate />
                                            </Grid.Column>

                                            <Grid.Column width = {1}>
                                            </Grid.Column>
                                        </Grid>
                                        
                                    </Sticky>
                                </Rail>
                            </Segment>
                        </div>
                    </Segment>
                </div>
            </div>
        )
    }
}