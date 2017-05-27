import Constants from './mock/healthcare/constants'

import * as Middleware from './middleware'

export const setStep = (step) => dispatch => {
  dispatch({
    type: Constants.DEMO_STEP,
    payload: step
  })
}

export const getMercuryEventStoreAddresses = (fromAddress) => dispatch => {
  Middleware.getMercuryEventStoreAddresses(fromAddress, (addresses) => {
    dispatch({
      type: Constants.EVENT_STORE_ADDRESSES_RECEIVED,
      payload: addresses
    })
  })
}
    
export const getMercuryEventStoreByCreator = (fromAddress) => dispatch => {
  Middleware.getMercuryEventStoreByCreator(fromAddress, (address) => {
    dispatch({
      type: Constants.EVENT_STORE_ADDRESS_RECEIVED,
      payload: address
    })
  })
}


export const createMercuryEventStore = (bindingModel) => dispatch => {
  Middleware.createMercuryEventStore(bindingModel, (address) => {
    dispatch({
      type: Constants.EVENT_STORE_ADDRESS_RECEIVED,
      payload: address
    })
  })
}

export const rebuild = (bindingModel) => dispatch => {
  Middleware.rebuild(bindingModel, (readModel) => {
    dispatch({
      type: Constants.EVENT_STORE_RECEIVED,
      payload: readModel
    })
  })
}

export const saveEvent = (bindingModel) => dispatch => {
  Middleware.saveEvent(bindingModel, (readModel) => {
    dispatch({
      type: Constants.EVENT_STORE_UPDATED,
      payload: readModel
    })
  })
}

// export const getEventStoreUserReadModel = (bindingModel) => dispatch => {
//   Middleware.getEventStoreUserReadModel(bindingModel, (readModel) => {
//     dispatch({
//       type: Constants.EVENT_STORE_UPDATED,
//       payload: readModel
//     })
//   })
// }


// export const createEventStoreUserEncounterReadModel = (bindingModel) => dispatch => {
//   Middleware.createEventStoreUserEncounterReadModel(bindingModel, (readModel) => {
//     dispatch({
//       type: Constants.EVENT_STORE_UPDATED,
//       payload: readModel
//     })
//   })
// }

// export const getEventStoreUserEncounterReadModel = (bindingModel) => dispatch => {
//   Middleware.getEventStoreUserEncounterReadModel(bindingModel, (readModel) => {
//     dispatch({
//       type: Constants.EVENT_STORE_UPDATED,
//       payload: readModel
//     })
//   })
// }



// export const createEventStoreUserEncounterLinkReadModel = (bindingModel) => dispatch => {
//   Middleware.createEventStoreUserEncounterLinkReadModel(bindingModel, (readModel) => {
//     dispatch({
//       type: Constants.EVENT_STORE_UPDATED,
//       payload: readModel
//     })
//   })
// }



// export const getEventStoreUserEncounterLinkReadModel = (bindingModel) => dispatch => {
//   Middleware.getEventStoreUserEncounterLinkReadModel(bindingModel, (readModel) => {
//     dispatch({
//       type: Constants.EVENT_STORE_UPDATED,
//       payload: readModel
//     })
//   })
// }









