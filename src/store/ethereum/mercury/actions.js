import { Constants } from './constants'
import * as Middleware from './middleware'

    
export const getMercuryEventStoreByCreator = (fromAddress) => dispatch => {
  Middleware.getMercuryEventStoreByCreator(fromAddress, (address) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_ADDRESS_RECEIVED,
      payload: address
    })
  })
}

export const getMercuryEventStoreAddresses = (fromAddress) => dispatch => {
  Middleware.getMercuryEventStoreAddresses(fromAddress, (addresses) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_ADDRESSES_RECEIVED,
      payload: addresses
    })
  })
}

export const createMercuryEventStore = (bindingModel) => dispatch => {
  Middleware.createMercuryEventStore(bindingModel, (address) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_CREATED,
      payload: address
    })
  })
}
export const getEventStoreReadModel = (bindingModel) => dispatch => {
  Middleware.getEventStoreReadModel(bindingModel, (readModel) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_READ_MODEL_RECEIVED,
      payload: readModel
    })
  })
}

export const createEventStoreUserReadModel = (bindingModel) => dispatch => {
  Middleware.createEventStoreUserReadModel(bindingModel, (readModel) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_READ_MODEL_RECEIVED,
      payload: readModel
    })
  })
}

export const getEventStoreUserReadModel = (bindingModel) => dispatch => {
  Middleware.getEventStoreUserReadModel(bindingModel, (readModel) => {
    dispatch({
      type: Constants.MERCURY_EVENT_STORE_READ_MODEL_RECEIVED,
      payload: readModel
    })
  })
}




