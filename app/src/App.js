import React, { Component } from 'react';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import './App.css';

import Particles from 'react-particles-js';
let particles = require('./particles.json')

import {
  Button,
  IconButton,
  Card,
  CardTitle,
  CardText,
  CardMenu,
  CardActions
} from 'react-mdl';

const Demo = (props) => (
  <div className="Demo">
    <Card shadow={0} style={{ margin: 'auto' }}>
      <CardTitle style={{ color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover' }}>
        Welcome
      </CardTitle>
      <CardText>
        This React app uses the Transmute Framework to interact with the ethereum blockchain.
    </CardText>
      <CardActions border>
        <Button colored>Get Started</Button>
      </CardActions>
      <CardMenu style={{ color: '#fff' }}>
        <IconButton name="share" />
      </CardMenu>
    </Card>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Demo/>
        <div className="Particles">
          <Particles params={particles} />
        </div>
      </div>
    );
  }
}

export default App;
