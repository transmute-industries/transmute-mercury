
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import FlatButton from 'material-ui/FlatButton'
import classes from './Footer.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Footer extends React.Component {
    render() {
        return (
            <div>
            <Grid fluid className={classes.container}>
               <Row>
                    <Col style={{ width: '30%', margin: 'auto', height: '128px'}}>
                        <h2>Contact</h2>
                        <p>What problem you have? it real?</p>
                    </Col>
                    <Col style={{ width: '30%', margin: 'auto', height: '128px' }}>
                        <h2>Links</h2>
                        <p>Easy, why even think about it.</p>
                        <FlatButton label='Transmute Framework' primary={true}/>
                        <FlatButton label='TestNet Faucet' primary={true}/>
                        <FlatButton label='Transmute News' primary={true}/>
                    </Col>
                     <Col style={{ width: '30%', margin: 'auto', height: '128px' }}>
                        <h2>Social</h2>
                        <p>Easy, why even think about it.</p>
                         <FlatButton label='Github' primary={true}/>
                         <FlatButton label='Twitter' primary={true} />
                         <FlatButton label='Slack' primary={true}/>
                    </Col>
                </Row>
            </Grid>
            <div className={classes.lastLine}>
                Copyright 2017 Transmute Industries
            </div>
        </div>
        )
    }
}

