import { Constants } from './constants'

export const mercuryEventStoreReadModelInitialState = {
  ReadModelStoreKey: '', // CONTRACT_ADDRESS:READ_MODEL_NAME
  ReadModelType: 'MercuryEventStore', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  ContractAddress: '',
  Name: '',
  Creator: ''
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_CREATED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Name: transmuteEvent.Name,
      LastEvent: transmuteEvent.Id
    })
  }, 
}

export const mercuryEventStoreReadModelReducer = (state = mercuryEventStoreReadModelInitialState, transmuteEvent) => {
  if (handlers[transmuteEvent.Type]) {
    return handlers[transmuteEvent.Type](state, transmuteEvent)
  }
  return state
}
