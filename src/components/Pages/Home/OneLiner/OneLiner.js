
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './OneLiner.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class OneTwoThree extends React.Component {
    render() {
        return (
            <Grid fluid >
                <Row style={{ textAlign: 'center', padding: '16px' }} className={classes.container}>
                    <h1>Transmute Redux Ethereum</h1>
                </Row>
            </Grid>
        )
    }
}

