import { Constants } from './constants'

export const mercuryEventStoreReadModelInitialState = {
  ReadModelType: 'MercuryEventStore', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  ContractAddress: '',
  Name: '',
  Creator: ''
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_CREATED]: (state, action) => {
    return Object.assign({}, state, action.payload)
  }, 
}

export const mercuryEventStoreReadModelReducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
