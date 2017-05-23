import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import { web3Reducer as web3 } from './ethereum/web3'
import { uportReducer as uport } from './ethereum/uport'
import { mercuryReducer as mercury } from './ethereum/mercury'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    web3,
    uport,
    mercury,
    firebase,
    form,
    routing,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
