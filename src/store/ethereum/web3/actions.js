import { Constants } from './constants'
import {
  getAccounts,
  sendTransaction
} from './middleware'

import { forEach } from 'lodash'

export const getWeb3Accounts = () => dispatch => {
  getAccounts((addresses) => {
    dispatch({
      type: Constants.RECEIVE_WEB3_ACCOUNTS,
      payload: addresses
    })
  })
}

export const sendEther = (transactionData) => dispatch => {
  sendTransaction(transactionData, (address) => {
    dispatch({
      type: Constants.ETHER_TRANSFERED,
      payload: address
    })
  })
}

const updateLocalStorage = (formModel) => {
    forEach(formModel, (v, k) => {
        localStorage.setItem(k, v)
    })
}

export const updateDebugSettings = (formModel) => dispatch => {
    updateLocalStorage(formModel)
    window.location.href = window.location.href
    dispatch({
        type: WEB3_SETTINGS_UPDATED,
        payload: formModel
    })
}
