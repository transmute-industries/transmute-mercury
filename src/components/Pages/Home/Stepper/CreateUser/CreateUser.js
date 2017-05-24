import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { CREATE_USER_FORM_NAME } from 'constants/formNames'


import CreateUserForm from './CreateUserForm'

import Mercury from 'store/ethereum/mercury'
import moment from 'moment'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(CREATE_USER_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      let bindingModel = {
        contractAddress: formModel.contractAddress,
        fromAddress:  formModel.fromAddress,
        event:{
          Type: 'MERCURY_EVENT_STORE_USER_CREATED',
          Name: formModel.name,
          BirthDate:  moment(formModel.birthDate).format('YYYY-MM-DD'),
          Role: formModel.role
        }
      }
      dispatch(Mercury.createEventStoreUserReadModel(bindingModel))
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

