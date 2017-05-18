import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

import EventSummary from './EventSummary'

@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class EventStorePage extends Component {

  render() {
    let { web3 } = this.props
    return (
      <div style={{ paddingTop: '20px' }}>
        <EventSummary />
      </div>
    )
  }
}
