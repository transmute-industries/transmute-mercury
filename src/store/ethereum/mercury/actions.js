import Constants from './mock/healthcare/constants'

import * as Middleware from './middleware'

export const setStep = (step) => dispatch => {
  dispatch({
    type: Constants.DEMO_STEP,
    payload: step
  })
}

// export const getMercuryEventStoreAddresses = (fromAddress) => dispatch => {
//   Middleware.getMercuryEventStoreAddresses(fromAddress, (addresses) => {
//     dispatch({
//       type: Constants.EVENT_STORE_ADDRESSES_RECEIVED,
//       payload: addresses
//     })
//   })
// }
    
export const getEventStoresByCreator = (bindingModel) => dispatch => {
  Middleware.getEventStoresByCreator(bindingModel.fromAddress, (address) => {
    dispatch({
      type: 'EVENT_STORE_ADDRESSES_RECEIVED',
      payload: address
    })
  })
}

export const createEventStore = (bindingModel) => dispatch => {
  Middleware.createEventStore(bindingModel, (address) => {
    dispatch({
      type: 'EVENT_STORE_ADDRESS_RECEIVED',
      payload: address
    })
  })
}

export const syncEventStore = (bindingModel) => dispatch => {
  Middleware.syncEventStore(bindingModel, (readModel) => {
    dispatch({
      type: 'EVENT_STORE_RECEIVED',
      payload: readModel
    })
  })
}

export const writeEvent = (bindingModel) => dispatch => {
  Middleware.writeEvent(bindingModel, (readModel) => {
    dispatch({
      type: 'EVENT_STORE_UPDATED',
      payload: readModel
    })
  })
}

