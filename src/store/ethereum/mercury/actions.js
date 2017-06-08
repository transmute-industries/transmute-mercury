import Constants from './mock/healthcare/constants'

import * as Middleware from './middleware'

import { store } from 'app'
//   store.dispatch(MercuryActions.syncEventStore({
//   contractAddress: defaultEventStoreAddress,
//   fromAddress: state.defaultAddress
// }))

export const setStep = (step) => dispatch => {
  dispatch({
    type: 'DEMO_STEP',
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


export const syncEventStore = (bindingModel) => dispatch => {
  Middleware.syncEventStore(bindingModel, (readModel) => {
    dispatch({
      type: 'EVENT_STORE_RECEIVED',
      payload: readModel
    })
  })
}


export const getEventStoresByCreator = (bindingModel) => dispatch => {
  Middleware.getEventStoresByCreator(bindingModel.fromAddress, (addresses) => {

    if(addresses.length){
    store.dispatch(syncEventStore({
        contractAddress: addresses[0],
        fromAddress: bindingModel.fromAddress
      }))
    }
    dispatch({
      type: 'EVENT_STORE_ADDRESSES_RECEIVED',
      payload: addresses
    })
  })
}

export const createEventStore = (bindingModel) => dispatch => {
  Middleware.createEventStore(bindingModel, (address) => {

    store.dispatch(syncEventStore({
      contractAddress: address,
      fromAddress: bindingModel.fromAddress
    }))

    dispatch({
      type: 'EVENT_STORE_ADDRESS_RECEIVED',
      payload: address
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

