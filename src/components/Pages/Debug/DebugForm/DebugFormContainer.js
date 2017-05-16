import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import DebugForm from './DebugForm'
import { DEBUG_FORM_NAME } from 'constants/formNames'

import { updateDebugSettings } from 'store/debug'

@connect(
  // Map redux state to props
  ({ debug, web3 }) => ({
    web3: web3,
    debug: debug
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(DEBUG_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      dispatch(updateDebugSettings(formModel))
    }
  }
)
export default class DebugFormContainer extends Component {
  render () {
    const { debug, web3, submitForm, onSubmit } = this.props
    return (
      <DebugForm
        web3={web3}
        debug={debug}
        submitForm={submitForm}
        onSubmit={onSubmit}
        />
    )
  }
}
