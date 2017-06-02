
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
                    <Col xs={12} sm={4} >
                        <h2>Contact</h2>
                        <ul>
                            <li>
                                <a href='mailto:hello@transmute.industries'>hello@transmute.industries</a>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h2>Links</h2>
                        <ul>
                            <li>
                                <a href='https://framework.transmute.industries/'>Framework</a>
                            </li>
                            <li>
                                <a href='https://faucet.transmute.industries/'>Faucet</a>
                            </li>
                            <li>
                                <a href='http://news.transmute.industries/'>News</a>
                            </li>
                        </ul>
                    </Col>
                     <Col xs={12} sm={4}>
                        <h2>Social</h2>
                        <ul>
                            <li>
                                <a href='https://github.com/transmute-industries'>Github</a>
                            </li>
                            <li>
                                <a href='https://austin-ethereum.slack.com'>Slack</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Grid>
            <div className={classes.lastLine}>
                Transmute Industries
            </div>
        </div>
        )
    }
}

