import Constants from './mock/healthcare/constants'

import { store } from 'app'

import { actions as MercuryActions } from 'store/ethereum/mercury'

import events from './mock/healthcare/events'

import { reducer } from './mock/healthcare/reducer'

export const initialState = {
  events: events,
  step: 0,
  history: [
    {
      value: 'welcome to transmute mercury!'
    },
    {
      value: 'type help'
    }
  ]
}

const handlers = {
  [Constants.EVENT_STORE_ADDRESSES_RECEIVED]: (state, action) => {
    
    if (action.payload.length === 0){
      return state
    }

    store.dispatch(MercuryActions.rebuild({
      contractAddress: action.payload[0],
      fromAddress: localStorage.getItem('defaultAddress')
    }))
    
    let step = state.step + 1
    return Object.assign({}, state, {
      step: step,
      eventStoreAddress: action.payload[0]
    })
  },

  [Constants.EVENT_STORE_RECEIVED]: (state, action) => {
    let step = state.step + 1
    return Object.assign({}, state, {
      EventStore: action.payload
    })
  },

  [Constants.EVENT_STORE_UPDATED]: (state, action) => {
    let step = state.step + 1
    return Object.assign({}, state, {
      step: step,
      EventStore: action.payload
    })
  },
  [Constants.DEMO_STEP]: (state, action) => {
    return Object.assign({}, state, {
      step: action.payload,
    })
  }
}

export const mercuryReducer = (state = initialState, action) => {

  // if (action.Type){
  //   return reducer(state, action)
  // }
  
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}


