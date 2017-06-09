
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './Accolades.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Accolades extends React.Component {
    render() {
        return (
            <Grid fluid className={classes.container}>
                <Row>
                    <Col style={{ width: '30%', margin: 'auto', textAlign: 'center'}}>
                        <h2>We won</h2>
                        <p>What problem you have? it real?</p>
                    </Col>
                    <Col style={{ width: '30%', margin: 'auto', textAlign: 'center' }}>
                        <h2>We did this?</h2>
                        <p>Easy, why even think about it.</p>
                    </Col>
                     <Col style={{ width: '30%', margin: 'auto', textAlign: 'center' }}>
                        <h2>cool stuff</h2>
                        <p>Easy, why even think about it.</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

