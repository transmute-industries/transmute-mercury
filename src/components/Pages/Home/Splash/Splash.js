
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import RaisedButton from 'material-ui/RaisedButton'

import classes from './Splash.scss'

import HeroRow from 'components/common/HeroRow'

import TransmuteTerminal from '../TransmuteTerminal'

@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class Splash extends React.Component {
    render() {
        return (
            <div>
                <HeroRow renderParticles>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Transmute Framework</h1>
                        <h3>Smart Contracts Simplified</h3>
                        <RaisedButton
                            style={{ marginRight: '8px' }}
                            label='Docs'
                            primary={true}
                            href='https://framework.transmute.industries'
                        />

                        {
                            this.props.web3.defaultAddress &&
                            <TransmuteTerminal />
                        }
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
                </HeroRow>
            </div>
        )
    }
}

