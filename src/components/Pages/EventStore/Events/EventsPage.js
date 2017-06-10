import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

import EventsTable from './EventsTable'

import { Grid, Row, Col } from 'react-flexbox-grid'
import Mercury from 'store/ethereum/mercury'

@connect(
  ({ mercury }) => ({
    mercury: mercury
  }),
  {
    readEvents: (bindingModel) => (dispatch) => {
      dispatch(Mercury.readEvents(bindingModel))
    },
  }
)
export default class EventsPage extends Component {

  componentDidMount = () =>{
    let contractAddress = window.location.pathname.split('/')[2]
    this.props.readEvents({
      contractAddress: contractAddress,
      fromAddress: this.props.mercury.defaultAddress,
      eventIndex: 0
    })
  }
  
  render() {
    let { mercury } = this.props
     return (
        <div>
          { mercury.transmuteEventsLoaded &&  <EventsTable />  }
          { !mercury.transmuteEventsLoaded &&    
          <div style={{ textAlign: 'center',  paddingTop: '100px' }}>
            <CircularProgress mode='indeterminate' size={80} />
          </div>  
          }
      </div>
      )
  }
}
