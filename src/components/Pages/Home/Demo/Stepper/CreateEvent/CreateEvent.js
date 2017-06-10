
import RaisedButton from 'material-ui/RaisedButton'

import React, { Component } from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'
import { submit } from 'redux-form'

import 'brace/mode/json'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change', newValue)
}

import { Grid, Row, Col } from 'react-flexbox-grid'

import { connect } from 'react-redux'

@connect(
  ({ mercury }) => ({
    mercury
  }),
  {
  }
)
export default class CreateEvent extends React.Component {

  state = {
    eventCode: JSON.stringify(this.props.mercury.events[this.props.mercury.step], null, "\t")
  }

  componentWillReceiveProps(nextProps) {
    let event_code = nextProps.mercury.events[nextProps.mercury.step]
    console.log('can has the correct event code...', event_code)
    this.setState({
      eventCode: JSON.stringify(event_code, null, "\t"),
      eventStoreState: JSON.stringify(nextProps.mercury.EventStore, null, "\t")
    })
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={6}>
            <AceEditor
              mode='json'
              theme='monokai'
              onChange={onChange}
              name='EventCode'
              width={'100%'}
              height={'400px'}
              value={this.state.eventCode}
              editorProps={{ $blockScrolling: true }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <AceEditor
              mode='json'
              theme='monokai'
              onChange={onChange}
              name='JsonPreview'
              value={this.state.eventStoreState}
              width={'100%'}
              height={'400px'}
              editorProps={{ $blockScrolling: true }}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

