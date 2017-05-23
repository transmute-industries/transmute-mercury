import { Constants } from './constants'
import * as Middleware from './middleware'

import { forEach } from 'lodash'

export const getMercuryEventStoreAddresses = () => dispatch => {
  Middleware.getMercuryEventStoreAddresses((addresses) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_ADDRESSES_RECEIVED,
      payload: addresses
    })
  })
}

// export const createMercuryEventStoreUser = (transactionData) => dispatch => {
//   sendTransaction(transactionData, (address) => {
//     dispatch({
//       type: Constants.MERCURY_EVENT_STORE_USER_CREATED,
//       payload: address
//     })
//   })
// }