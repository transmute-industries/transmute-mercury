
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './GetWeb3.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class GetWeb3 extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center'}}>
                        Our demo requires MetaMask
                    </h1>
            <Grid fluid className={classes.container}>
                <Row>
                    {/*<Col style={{ width: '45%', margin: 'auto' }}>
                       <h2 style={{ textAlign: 'center'}}>UPort</h2>
                        <p>
uPort is an open source software project to establish a global, unified, sovereign identity system 
for people, businesses, organizations, devices, and bots.
                        </p>
                         <div style={{ textAlign: 'center'}}>
                            <RaisedButton
                            label='Get Started'
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            href='https://www.uport.me/'
                            style={{ marginRight: 12 }}
                            />
                        </div>
                    </Col>*/}
                    <Col style={{ width: '75%', margin: 'auto'}}>
                        <h2 style={{ textAlign: 'center'}}>MetaMask</h2>
                        <p>
MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today. 
It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
                        </p>
                         <div style={{ textAlign: 'center'}}>
                            <RaisedButton
                            label='Get Started'
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            secondary={true}
                            href='https://metamask.io/'
                            style={{ marginRight: 12 }}
                            />
                         </div>
                          
                    </Col>
                    
                </Row>
            </Grid>
            </div>
        )
    }
}

