import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Web3SettingsForm from './Web3SettingsForm'
import { WEB3_SETTINGS_FORM_NAME } from 'constants/formNames'

import { updateDebugSettings } from 'store/ethereum/web3'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(WEB3_SETTINGS_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      dispatch(updateDebugSettings(formModel))
    }
  }
)
export default class Web3SettingsPage extends Component {
  render () {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <Web3SettingsForm
        web3={web3}
        submitForm={submitForm}
        onSubmit={onSubmit}
        />
    )
  }
}
