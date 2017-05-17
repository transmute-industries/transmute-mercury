import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { LINK_ENCOUNTER_FORM_NAME } from 'constants/formNames'

// import { updateDebugSettings } from 'store/ethereum/web3'

import LinkEncounterForm from './LinkEncounterForm'

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(LINK_ENCOUNTER_FORM_NAME)),
    onSubmit: (formModel) => (dispatch) => {
      console.log('write link event to store here...', formModel)
      // dispatch(updateDebugSettings(formModel))
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

