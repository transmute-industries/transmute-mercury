
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

export const syncEventStore = async (bindingModel, _callback = ()=>{}) => {
  if (TransmuteFramework.EventStoreContract) {
    let { contractAddress, fromAddress } = bindingModel
    let readModelBase = _.cloneDeep(readModel)
    readModelBase.contractAddress = contractAddress
    let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
    let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModelBase , reducer)
    _callback(updatedReadModel)
    return updatedReadModel
  } else {
    _callback(readModel)
  }
}

export const writeEvent = async (bindingModel, _callback) => {
  let { contractAddress, fromAddress, event } = bindingModel
  event = _.cloneDeep(event)
  let readModelBase = _.cloneDeep(readModel)
  readModelBase.contractAddress = contractAddress
  let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeTransmuteCommand(eventStore, fromAddress, event)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModelBase, reducer)
  _callback(updatedReadModel)
  return updatedReadModel
}

export const readEvents = async (bindingModel, _callback) => {
  let { contractAddress, fromAddress, eventIndex } = bindingModel
  let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.readTransmuteEvents(eventStore, fromAddress, eventIndex || 0)
  events = events.map((event) =>{
    return TransmuteFramework.EventStore.EventTypes.flatten(event)
  })
  _callback(events)
  return events
}