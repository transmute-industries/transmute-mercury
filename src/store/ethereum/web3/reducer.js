import { Constants } from './constants'

export const initialState = {
  provider: localStorage.getItem('provider') || 'metamask',
  defaultAddress: localStorage.getItem('defaultAddress') || null,
  addresses: [],
  transfers: [],
  transferInitialValue: {
    amountInEther: 0.125
  }
}

const handlers = {
  [Constants.RECEIVE_WEB3_ACCOUNTS]: (state, action) => {
    let defaultAddress = action.payload[0]
    localStorage.setItem('defaultAddress', defaultAddress)

    return Object.assign({}, state, {
      addresses: action.payload,
      defaultAddress: defaultAddress
    })
  },
  [Constants.ETHER_TRANSFERED]: (state, action) => {
    return Object.assign({}, state, {
      transfers: state.transfers.concat(action.payload)
    })
  },
  [Constants.WEB3_SETTINGS_UPDATED]: (state, action) => {
    return Object.assign({}, state, ...action.payload)
  }
}

export const web3Reducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
