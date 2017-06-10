import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

import EventStoreTable from './EventStoreTable'

import { Grid, Row, Col } from 'react-flexbox-grid'
@connect(
  ({ web3, mercury }) => ({
    web3: web3,
    mercury: mercury
  })
)
export default class FactoryPage extends Component {
  render() {
    let { web3, mercury } = this.props
     return (
        <div>
          { mercury.factoryLoaded &&  <EventStoreTable />  }
          { !mercury.factoryLoaded &&    
          <div style={{ textAlign: 'center',  paddingTop: '100px' }}>
            <CircularProgress mode='indeterminate' size={80} />
          </div>  
          }
      </div>
      )
  }
}
