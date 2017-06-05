import Constants from './constants'

// https://github.com/reactjs/redux/blob/master/docs/recipes/reducers/ImmutableUpdatePatterns.md

export const readModel = {
  readModelStoreKey: '', // readModelType:contractAddress
  readModelType: 'Faucet',
  contractAddress: '0x0000000000000000000000000000000000000000',
  lastEvent: null, // Last Event Index Processed
  model: {} // where all the updates from events will be made
}

const addIndexedObject = (model, objType, objKey, obj) => {
  return {
    model: Object.assign({}, model, {
      [objType]: {
        [objKey]: obj,
        ...model[objType]
      }
    })
  }
}

const addObjectToIndexedObjectCollection = (
  model,
  objType,
  objKey,
  collectionType,
  collectionKey,
  obj
) => {
  return {
    model: Object.assign({}, model, {
      ...model,
      [objType]: {
        ...model[objType],
        [objKey]: {
          ...model[objType][objKey],
          [collectionType]: {
            ...model[objType][objKey][collectionType],
            [collectionKey]: obj
          }
        }
      }
    })
  }
}

const updatesFromMeta = (meta) => {
  return {
    lastEvent: meta.id
  }
}

const handlers = {

  [Constants.ACCESS_REQUESTED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'requestors', action.payload.requestorAddress, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.ACCESS_GRANTED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'requestors', action.payload.requestorAddress, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.ACCESS_REVOKED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'requestors', action.payload.requestorAddress, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.ETHER_SENT]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'faucet', action.payload.providerId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.ETHER_RECEIVED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'faucet', action.payload.providerId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  }
}

export const reducer = (state = readModel, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
