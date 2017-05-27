import Constants from './constants'

export const readModel = {
  ReadModelStoreKey: '', // CONTRACT_ADDRESS:READ_MODEL_NAME
  ReadModelType: 'MercuryEventStore', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  Patients: {},
  Providers: {},
  Insurers: {},
  Encounters: {}
}

const handlers = {
  [Constants.MERCURY_EVENT_STORE_CREATED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Name: transmuteEvent.Name,
      Creator: transmuteEvent.Creator,
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.PATIENT_REGISTERED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Patients: {
        [transmuteEvent.PatientId]: {
          Name: transmuteEvent.PatientName,
          Insurance: transmuteEvent.Insurance,
        },
        ...state.Patients
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.PROVIDER_REGISTERED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Providers: {
        [transmuteEvent.ProviderId]: {
          Name: transmuteEvent.ProviderName,
        },
        ...state.Providers
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.INSURER_REGISTERED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Insurers: {
        [transmuteEvent.InsurerId]: {
          Name: transmuteEvent.InsurerName,
        },
        ...state.Insurers
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.PATIENT_TREATED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      Encounters: {
            [transmuteEvent.EncounterId]: {
              InsurerId: transmuteEvent.InsurerId,
              PatientId: transmuteEvent.PatientId,
              Notes: transmuteEvent.Notes,
              State: transmuteEvent.State,
              Timestamp: transmuteEvent.Timestamp
            },
            ...state.Encounters
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.CLAIM_FILED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
     Claims: {
          [transmuteEvent.EncounterId]: {
            ProviderId: transmuteEvent.ProviderId,
            PatientId: transmuteEvent.PatientId,
            Notes: transmuteEvent.Notes,
            Amount: transmuteEvent.Amount
          },
          ...state.Claims
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  [Constants.CLAIM_PAYED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
     Claims: {
          [transmuteEvent.EncounterId]: {
            ProviderId: transmuteEvent.ProviderId,
            PatientId: transmuteEvent.PatientId,
            Notes: transmuteEvent.Notes,
            Amount: transmuteEvent.Amount
          },
          ...state.Claims
      },
      LastEvent: transmuteEvent.Id
    })
  }, 

  

}

export const reducer = (state = readModel, transmuteEvent) => {
  // console.log('transmuteEvent: ', transmuteEvent)
  if (handlers[transmuteEvent.Type]) {
    return handlers[transmuteEvent.Type](state, transmuteEvent)
  }
  return state
}
