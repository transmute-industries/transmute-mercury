import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { LINK_ENCOUNTER_FORM_NAME } from 'constants/formNames'

// import { updateDebugSettings } from 'store/ethereum/web3'

import LinkEncounterForm from './LinkEncounterForm'


import Mercury from 'store/ethereum/mercury'
import moment from 'moment'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(LINK_ENCOUNTER_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      let bindingModel = {
        contractAddress: formModel.contractAddress,
        fromAddress:  formModel.fromAddress,
        event:{
          Type: 'MERCURY_EVENT_STORE_USER_ENCOUNTER_LINKED',
          Name: formModel.name,
          ReadEvents: formModel.readEvents.toString(),
          WriteEvents: formModel.writeEvents.toString(),
          Expires:  moment(formModel.expires).toISOString(),
        }
      }
      console.log('trying to create an event..', bindingModel)
      dispatch(Mercury.createEventStoreUserEncounterLinkReadModel(bindingModel))
    }
  }
)
export default class LinkEncounter extends React.Component {
  render() {
    const { web3, submitForm, onSubmit } = this.props
    return (
      <div>
      <LinkEncounterForm
      web3={web3}
      submitForm={submitForm}
      onSubmit={onSubmit}
      />
      </div>
    )
  }
}

