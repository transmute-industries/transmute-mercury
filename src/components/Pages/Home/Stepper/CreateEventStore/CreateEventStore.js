import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { CREATE_EVENT_STORE_FORM_NAME } from 'constants/formNames'

import Mercury from 'store/ethereum/mercury'

import CreateEventStoreForm from './CreateEventStoreForm'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(CREATE_EVENT_STORE_FORM_NAME)),
    onSubmit: (bindingModel) => (dispatch) => {
      // console.log('bindingModel: ', bindingModel)
      dispatch(Mercury.createMercuryEventStore(bindingModel))
    }
  }
)
export default class CreateEventSchemaStep extends React.Component {
  render() {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <div>
      <CreateEventStoreForm
      web3={web3}
      submitForm={submitForm}
      onSubmit={onSubmit}
      />
      </div>
    )
  }
}

