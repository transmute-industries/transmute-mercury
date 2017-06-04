import Constants from './constants'

// https://github.com/reactjs/redux/blob/master/docs/recipes/reducers/ImmutableUpdatePatterns.md

export const readModel = {
  readModelStoreKey: '', // readModelType:contractAddress
  readModelType: 'HealthcareSystem', 
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

  [Constants.PATIENT_REGISTERED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'patient', action.payload.patientId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.PATIENT_REGISTERED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'patient', action.payload.patientId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.PROVIDER_REGISTERED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'provider', action.payload.providerId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.INSURER_REGISTERED]: (state, action) => {
    let updatesToModel = addIndexedObject(state.model, 'insurer', action.payload.insurerId, action.payload)
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.PATIENT_TREATED]: (state, action) => {
    let updatesToModel = addObjectToIndexedObjectCollection(
      state.model,
      'provider', action.payload.providerId,
      'encounters', action.payload.encounterId,
      {
        notes: action.payload.notes,
        time: action.payload.timestamp
      }
    )
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.CLAIM_FILED]: (state, action) => {
    let updatesToModel = addObjectToIndexedObjectCollection(
      state.model,
      'insurer', action.payload.insurerId,
      'claims', action.payload.encounterId,
      {
        notes: action.payload.notes,
        amount: action.payload.amount
      }
    )
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  },

  [Constants.CLAIM_PAYED]: (state, action) => {
    let updatesToModel = addObjectToIndexedObjectCollection(
      state.model,
      'provider', action.payload.providerId,
      'claims', action.payload.encounterId,
      {
        notes: action.payload.notes,
        amount: action.payload.amount
      }
    )
    let updatesToMeta = updatesFromMeta(action.meta)
    return Object.assign({}, state, updatesToModel, updatesToMeta)
  }
}

export const reducer = (state = readModel, action) => {
  console.log('ti: ', action)
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}