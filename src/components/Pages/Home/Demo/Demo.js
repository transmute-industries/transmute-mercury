
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './Demo.scss'
import Stepper from './Stepper'

@connect(
    ({ web3, mercury }) => ({
        web3: web3,
        mercury: mercury
    })
)
export default class Demo extends React.Component {
    render() {
        return (
            <div>
                <div style={{ marginTop: '64px', marginBottom: '64px'}}>
                {/*<h3> Live Demo </h3>*/}
                {/*<p>Please install <a href='https://metamask.io/'>MetaMask</a></p>*/}
                {
                    this.props.mercury.defaultAddress && 
                    <Stepper />
                }
                </div>
             </div>
        )
    }
}

