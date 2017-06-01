
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './Quotes.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Quotes extends React.Component {
    render() {
        return (
            <Grid fluid className={classes.container}>
                <Row>
                    <h1 className={classes.quote}>"Obama loves us"</h1>
                </Row>
            </Grid>
        )
    }
}

