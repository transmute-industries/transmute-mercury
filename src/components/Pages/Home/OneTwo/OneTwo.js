
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './OneTwo.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class OneTwo extends React.Component {
    render() {
        return (
            <Grid fluid className={classes.container}>
                <Row>
                    <Col style={{ width: '45%', margin: 'auto', textAlign: 'center'}}>
                        <h2>Problem?</h2>
                        <p>What problem you have? it real?</p>
                    </Col>
                    <Col style={{ width: '45%', margin: 'auto', textAlign: 'center' }}>
                        <h2>Solution?</h2>
                        <p>Easy, why even think about it.</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

