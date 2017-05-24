import { Constants } from './constants'


import { store } from 'app'

import { actions as MercuryActions } from 'store/ethereum/mercury'

export const initialState = {
  demo: {
    step: 0,
  },
  addresses: [],
  ReadModels: {}
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_ADDRESS_RECEIVED]: (state, action) => {
    if (action.payload === '0x0000000000000000000000000000000000000000'){
      return state
    }
    store.dispatch(MercuryActions.getEventStoreReadModel({
      contractAddress: action.payload,
      fromAddress: localStorage.getItem('defaultAddress')
    }))
    return Object.assign({}, state, {
      demo: {
        step: 1
      },
      currentMercuryEventStoreAddress: action.payload
    })
  },
  [Constants.MERCURY_EVENT_STORE_ADDRESSES_RECEIVED]: (state, action) => {

   
    

    return Object.assign({}, state, {
      addresses: action.payload
    })
  },

  [Constants.MERCURY_EVENT_STORE_READ_MODEL_RECEIVED]: (state, action) => {
    let step = 1

    if (action.payload.ReadModelType === 'MercuryEventStore'){
      store.dispatch(MercuryActions.getEventStoreUserReadModel({
          contractAddress: action.payload.ContractAddress,
          fromAddress: localStorage.getItem('defaultAddress')
      }))
    }
    if (action.payload.ReadModelType === 'MercuryEventStoreUser'){
      step = 2 
      store.dispatch(MercuryActions.getEventStoreUserEncounterReadModel({
          contractAddress: action.payload.ContractAddress,
          fromAddress: localStorage.getItem('defaultAddress')
      }))
    }

    if (action.payload.ReadModelType === 'MercuryEventStoreUserEncounter'){
      step = 3
    }

    return Object.assign({}, state, {
      demo: {
        step: step
      },
      ReadModels: {
        ...state.ReadModels,
        [action.payload.ReadModelStoreKey]: action.payload
      }
    })
  },

  [Constants.MERCURY_EVENT_STORE_CREATED]: (state, action) => {
    store.dispatch(MercuryActions.getEventStoreReadModel({
      contractAddress: action.payload,
      fromAddress: localStorage.getItem('defaultAddress')
    }))
    return Object.assign({}, state, {
      demo: {
        step: 1
      },
      currentMercuryEventStoreAddress: action.payload
    })
  },
  [Constants.WEB3_SETTINGS_UPDATED]: (state, action) => {
    return Object.assign({}, state, ...action.payload)
  }
}

export const mercuryReducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
