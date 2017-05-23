import { Constants } from './constants'

export const mercuryEventStoreUserReadModelInitialState = {
  ReadModelStoreKey: '', // CONTRACT_ADDRESS:READ_MODEL_NAME
  ReadModelType: 'MercuryEventStoreUser', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  BirthDate: '',
  Name: '',
  Role: ''
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_USER_CREATED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Name: transmuteEvent.Name,
      BirthDate: transmuteEvent.BirthDate,
      Role: transmuteEvent.Role,
      LastEvent: transmuteEvent.Id
    })
  }, 
}

export const mercuryEventStoreReadModelReducer = (state = mercuryEventStoreReadModelInitialState, transmuteEvent) => {
  // console.log('transmuteEvent: ', transmuteEvent)
  if (handlers[transmuteEvent.Type]) {
    return handlers[transmuteEvent.Type](state, transmuteEvent)
  }
  return state
}
