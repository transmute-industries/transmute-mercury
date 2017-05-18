import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

import ProjectionCode from './ProjectionCode'
import ProjectionTable from './ProjectionTable'


import { Grid, Row, Col } from 'react-flexbox-grid'
@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class ProjectionPage extends Component {

  render() {
    let { web3 } = this.props
    return (
      <div style={{ paddingTop: '20px' }}>
        <Grid fluid>
          <Row>
            <Col>
              <ProjectionCode />
            </Col>
            <Col>
              <ProjectionTable />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
