
const contract = require('truffle-contract')

import TransmuteFramework from 'env'

let { getCachedReadModel } = TransmuteFramework.EventStore.ReadModel

import {
  readModel,
  reducer
} from './mock/healthcare/reducer'

import * as _ from 'lodash'

export const getEventStoresByCreator = async (fromAddress, _callback) => {
  if (TransmuteFramework.EventStoreFactoryContract) {
    let factory = await TransmuteFramework.EventStoreFactoryContract.deployed()
    let eventStoreAddresses = await factory.getEventStoresByCreator({
      from: fromAddress
    })
    // console.log('from middleware: ', eventStoreAddresses)
    _callback(eventStoreAddresses)
  } else {
    _callback([])
  }
}

export const createEventStore = async (bindingModel, _callback) => {
  let { fromAddress, name } = bindingModel
  if (TransmuteFramework.EventStoreFactoryContract) {
    let factory = await TransmuteFramework.EventStoreFactoryContract.deployed()
    let tx = await factory.createEventStore({
      from: fromAddress,
      gas: 2000000,
    })
    console.log('tx: ', tx)
    let events = await Promise.all(TransmuteFramework.EventStore.EventTypes.reconstructTransmuteEventsFromTxs([tx]))
    let createdEvent = events[0]
    _callback(createdEvent.payload)
  } else {
    _callback({})
  }
}


export const syncEventStore = async (bindingModel, _callback) => {
  // console.log(TransmuteFramework)
  if (TransmuteFramework.EventStoreContract) {
    let { contractAddress, fromAddress } = bindingModel
    let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
    let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModel, reducer)
    _callback(updatedReadModel)
  } else {
    _callback(readModel)
  }
}

export const writeEvent = async (bindingModel, _callback) => {
  let { contractAddress, fromAddress, event } = bindingModel
  event = _.cloneDeep(event)
  let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeTransmuteCommand(eventStore, fromAddress, event)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModel, reducer)
  _callback(updatedReadModel)
}

// export const getMercuryEventStoreAddresses = async (fromAddress, _callback) => {
//   let factory = await mercuryEventStoreFactory.deployed()
//   let mercuryEventStoreContractAddresses = await factory.getMercuryEventStores({
//     from: fromAddress
//   })
//   _callback(mercuryEventStoreContractAddresses)
// }


// // move this to another function... for later..
// // let events = await TransmuteFramework.EventStore.readEvents(eventStore, 0)
// // console.log('all-events: ', events)