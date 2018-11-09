/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Button,  Container,  Divider, Grid, Header,Icon,  Image, Form,  List,  Menu,  Responsive,  Segment,  Sidebar,  Visibility} from 'semantic-ui-react'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical
          style={{
            margin: '0em 0em 0em 0em',
            padding: '1.4em 0em',
            backgroundColor: 'white'
          }}>
         <Container textAlign='center'>
           <p style ={{color : 'gray'}}> Copyright CMSC 100. All rights reserved. </p>
         </Container>
        </Segment>
      </div>
    )
  }
}
