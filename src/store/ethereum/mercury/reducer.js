import { Constants } from './constants'

export const initialState = {
  addresses: []
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_ADDRESSES_RECEIVED]: (state, action) => {
    return Object.assign({}, state, {
      addresses: action.payload
    })
  },
  [Constants.MERCURY_EVENT_STORE_USER_CREATED]: (state, action) => {
    return Object.assign({}, state, {
      transfers: state.transfers.concat(action.payload)
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
