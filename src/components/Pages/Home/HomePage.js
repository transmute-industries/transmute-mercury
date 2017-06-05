import React, { Component } from 'react'
import { connect } from 'react-redux'

import Splash from './Splash'
import Demo from './Demo'
import OneLiner from './OneLiner'
import OneTwo from './OneTwo'
import OneTwoThree from './OneTwoThree'
import Quotes from './Quotes'
import Accolades from './Accolades'
import Footer from './Footer'

// implement stepper demo...


@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Splash />
        <OneLiner />
        <OneTwoThree />
        <Demo/>
        {/*<OneTwo />
        <Quotes/>
        <Accolades/>*/}
        <Footer />
      </div>
    )
  }
}
