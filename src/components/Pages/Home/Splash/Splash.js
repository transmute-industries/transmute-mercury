
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import RaisedButton from 'material-ui/RaisedButton'

import classes from './Splash.scss'

import HeroRow from 'components/common/HeroRow'

import TransmuteTerminal from '../TransmuteTerminal'
import GetMetaMask from '../GetMetaMask'

@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Splash extends React.Component {
    render() {
        return (

            <HeroRow renderParticles>
                <div style={{ textAlign: 'center' }}>
                    <h1 className={classes.white} style={{ fontWeight: '400' }}>Transmute Framework</h1>
                    <h3 className={classes.white}>Smart Contracts Simplified</h3>
                    <RaisedButton
                        label='Docs'
                        primary={true}
                        onClick={() => {
                            window.location.href = 'https://framework.transmute.industries'
                        }}
                    />
                    {
                        this.props.web3.defaultAddress &&
                        <TransmuteTerminal />
                    }
                    {
                        !this.props.web3.defaultAddress &&
                        <GetMetaMask />
                    }
                </div>
            </HeroRow>

        )
    }
}

