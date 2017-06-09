
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
                        <Col style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
                            <h2>MetaMask</h2>
                            <p>
MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today.
<br/>
It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
                            </p>
                            <p>
You can change your web3 provider, and default address later.
                            </p>
                            <div style={{ textAlign: 'center' }}>
                                <RaisedButton
                                    label='Web3 Settings'
                                    disableTouchRipple={true}
                                    disableFocusRipple={true}
                                    primary={true}
                                    href='/web3'
                                    style={{ marginRight: 12 }}
                                />
                                {
                                    !this.props.web3.defaultAddress &&
                                    <RaisedButton
                                        label='Get MetaMask'
                                        disableTouchRipple={true}
                                        disableFocusRipple={true}
                                        secondary={true}
                                        href='https://metamask.io/'
                                        style={{ marginRight: 12 }}
                                    />
                                }
                            </div>

                        </Col>

                    </Row>
                </Grid>
            </div>
        )
    }
}

