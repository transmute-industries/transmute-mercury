import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

// import { updateDebugSettings } from 'store/ethereum/web3'
import RaisedButton from 'material-ui/RaisedButton'
import EventCode from './EventCode'
import JsonPreview from './JsonPreview'

import { Grid, Row, Col } from 'react-flexbox-grid'

export default class CreateEvent extends React.Component {
  render() {
    return (
        <Grid fluid>
          <Row>
            <Col>
              <EventCode/>
            </Col>
            <Col>
              <JsonPreview/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

