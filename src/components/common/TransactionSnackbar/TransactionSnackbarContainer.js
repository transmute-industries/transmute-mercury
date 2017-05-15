import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionSnackbar from './TransactionSnackbar'

@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class TransactionSnackbarContainer extends Component {
    render() {
        return (
            <TransactionSnackbar web3={this.props.web3} />
        )
    }
}
