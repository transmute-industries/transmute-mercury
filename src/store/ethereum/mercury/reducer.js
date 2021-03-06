import Constants from './mock/healthcare/constants'


import events from './mock/healthcare/events'

import { reducer } from './mock/healthcare/reducer'

export const initialState = {
  events: events,
  step: 0,
  history: [
    {
      value: '👑   Transmute Framework   👑'
    }
  ],
  defaultAddress: null,
  factoryEventStores: [],
  factoryLoaded: false,
  transmuteEvents: [],
  transmuteEventsLoaded: false
}

const handlers = {

  ['RECEIVE_WEB3_ACCOUNTS']: (state, action) => {
    let defaultAddress = action.payload[0]
    return Object.assign({}, state, {
      defaultAddress: defaultAddress
    })
  },

  ['FACTORY_EVENT_STORE_ADDRESSES_RECEIVED']: (state, action) => {
    if (action.payload.length === 0) {
      return state
    }
    let defaultEventStoreAddress = action.payload[0]
    let step = state.step + 1
    return Object.assign({}, state, {
      step: step,
      eventStoreAddress: defaultEventStoreAddress
    })
  },

  ['EVENT_STORE_ADDRESS_RECEIVED']: (state, action) => {
    if (action.payload.length === 0) {
      return state
    }
    let defaultEventStoreAddress = action.payload
    let step = state.step + 1
    return Object.assign({}, state, {
      step: step,
      eventStoreAddress: defaultEventStoreAddress
    })
  },

  ['EVENT_STORE_RECEIVED']: (state, action) => {
    let step = state.step + 1
    return Object.assign({}, state, {
      EventStore: action.payload
    })
  },

  ['EVENT_STORE_UPDATED']: (state, action) => {
    let step = state.step + 1
    return Object.assign({}, state, {
      step: step,
      EventStore: action.payload
    })
  },

  ['FACTORY_EVENT_STORES_RECEIVED']: (state, action) => {
    return Object.assign({}, state, {
      factoryEventStores: action.payload,
      factoryLoaded: true
    })
  },

  ['DEMO_STEP']: (state, action) => {
    return Object.assign({}, state, {
      step: action.payload,
    })
  },

  ['EVENTS_READ']: (state, action) => {
    return Object.assign({}, state, {
      transmuteEvents: action.payload,
      transmuteEventsLoaded: true
    })
  }

}

export const mercuryReducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}


