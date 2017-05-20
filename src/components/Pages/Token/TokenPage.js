import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

import TokenCode from './TokenCode'
import TokenTable from './TokenTable'


import { Grid, Row, Col } from 'react-flexbox-grid'
@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class TokenPage extends Component {

  render() {
    let { web3 } = this.props
    return (
      <div style={{ paddingTop: '20px' }}>
        <Grid fluid>
          <Row>
            <Col>
              <TokenCode />
            </Col>
            <Col>
              <TokenTable />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
