import { Constants } from './constants'

export const initialState = {
  ReadModelStoreKey: '', // CONTRACT_ADDRESS:READ_MODEL_NAME
  ReadModelType: 'MercuryEventStoreUserEncounter', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  LastMeal: '',
  Name: '',
  Notes: '',
  LinkedAccess: []
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_USER_ENCOUNTER]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Name: transmuteEvent.Name,
      LastMeal: transmuteEvent.LastMeal,
      Notes: transmuteEvent.Notes,
      Referral: transmuteEvent.Referral,
      LastEvent: transmuteEvent.Id
    })
  }, 
  [Constants.MERCURY_EVENT_STORE_USER_ENCOUNTER_LINKED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      LinkedAccess: state.LinkedAccess.concat(transmuteEvent),
      LastEvent: transmuteEvent.Id
    })
  }, 
}

export const reducer = (state = initialState, transmuteEvent) => {
  // console.log('transmuteEvent: ', transmuteEvent)
  if (handlers[transmuteEvent.Type]) {
    return handlers[transmuteEvent.Type](state, transmuteEvent)
  }
  return state
}
