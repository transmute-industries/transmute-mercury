
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './OneTwoThree.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class OneTwoThree extends React.Component {
    render() {
        return (
            <Grid fluid className={classes.container}>
                <Row>
                    <Col xs={12} sm={4}>
                        <h2 >Event Store</h2>
                        <p>Read and write flux standard actions, use familar tools like the redux time traveling debugger.</p>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h2>Middleware</h2>
                        <p>An async interface for reading and writing to blockchains and distributed storage.</p>
                    </Col>
                     <Col xs={12} sm={4}>
                        <h2 >Event Types</h2>
                        <p>TypeScript module providing type conversion for on and offchain events.</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

