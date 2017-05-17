import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { CREATE_EVENT_STORE_FORM_NAME } from 'constants/formNames'

// import { updateDebugSettings } from 'store/ethereum/web3'

import CreateUserForm from './CreateUserForm'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(CREATE_EVENT_STORE_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      console.log('write event to event store here', formModel)
      // dispatch(updateDebugSettings(formModel))
    }
  }
)
export default class SaveEvent extends React.Component {
  render() {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <div>
      <CreateUserForm
      web3={web3}
      submitForm={submitForm}
      onSubmit={onSubmit}
      />
      </div>
    )
  }
}

