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
//       type: Constants.FACTORY_EVENT_STORE_ADDRESSES_RECEIVED,
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
  Middleware.getEventStoresByCreator(bindingModel.fromAddress, async (addresses) => {

     dispatch({
      type: 'FACTORY_EVENT_STORE_ADDRESSES_RECEIVED',
      payload: addresses
    })

    if(addresses.length){

      let eventStoreModels = await Promise.all(addresses.map((addr) => {
        return Middleware.syncEventStore({
          contractAddress: addr,
          fromAddress: bindingModel.fromAddress
        })
      }))

      dispatch({
        type: 'FACTORY_EVENT_STORES_RECEIVED',
        payload: eventStoreModels
      })

      dispatch({
        type: 'EVENT_STORE_RECEIVED',
        payload: eventStoreModels[0]
      })
    }

   
  })
}

export const createEventStore = (bindingModel) => dispatch => {
  Middleware.createEventStore(bindingModel, (address) => {

    store.dispatch(syncEventStore({
      contractAddress: address,
      fromAddress: bindingModel.fromAddress
    }))

    store.dispatch(getEventStoresByCreator({
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

