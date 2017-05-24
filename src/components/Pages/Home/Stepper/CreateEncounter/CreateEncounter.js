import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { CREATE_ENCOUNTER_FORM_NAME } from 'constants/formNames'

// import { updateDebugSettings } from 'store/ethereum/web3'

import CreateEncounterForm from './CreateEncounterForm'

import Mercury from 'store/ethereum/mercury'

import moment from 'moment'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(CREATE_ENCOUNTER_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
     let bindingModel = {
        contractAddress: formModel.contractAddress,
        fromAddress:  formModel.fromAddress,
        event:{
          Type: 'MERCURY_EVENT_STORE_USER_ENCOUNTER',
          Name: formModel.name,
          LastMeal:  moment(formModel.lastMeal).toISOString(),
          Notes: formModel.notes,
          Referral: formModel.referral
        }
      }
      dispatch(Mercury.createEventStoreUserEncounterReadModel(bindingModel))
    }
  }
)
export default class SaveEvent extends React.Component {
  render() {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <div>
      <CreateEncounterForm
      web3={web3}
      submitForm={submitForm}
      onSubmit={onSubmit}
      />
      </div>
    )
  }
}

