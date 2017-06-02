
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './Demo.scss'
import Stepper from './Stepper'

@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Demo extends React.Component {
    render() {
        return (
            <Grid fluid >
                <Row>
                    <Stepper />
                </Row>
            </Grid>
        )
    }
}

