import { web3 } from 'env'

const contract = require('truffle-contract')

import EventStore from '../../../../build/contracts/EventStore.json'
import EventStoreFactory from '../../../../build/contracts/EventStoreFactory.json'

const esContract = contract(EventStore)
esContract.setProvider(web3.currentProvider)

const esfContract = contract(EventStoreFactory)
esfContract.setProvider(web3.currentProvider)

import TransmuteFramework from 'transmute-framework'

console.log(TransmuteFramework)

import {
  readModel,
  reducer
} from './mock/faucet/reducer'

import * as _ from 'lodash'

export const getEventStoresByCreator = async (fromAddress, _callback) => {
    let factory = await esfContract.deployed()
    let eventStoreAddresses = await factory.getEventStoresByCreator({
        from: fromAddress
    })
    // console.log('from middleware: ', eventStoreAddresses)
    _callback(eventStoreAddresses)
}

export const createEventStore = async (bindingModel, _callback) => {
    let { fromAddress, name } = bindingModel
    let factory = await esfContract.deployed()
    let tx = await factory.createEventStore({
        from: fromAddress,
        gas: 2000000,
    })
    // console.log('tx: ', tx)
    let events = await Promise.all( TransmuteFramework.EventStore.EventTypes.reconstructTransmuteEventsFromTxs([tx]) )
    let createdEvent = events[0]
    _callback(createdEvent.payload)
}

export const getCachedReadModel = async (contractAddress, eventStore, fromAddress, readModel, reducer) =>{
  readModel.readModelStoreKey = `${readModel.readModelType}:${contractAddress}`
  readModel.contractAddress = contractAddress
  let maybeSyncReadModel = TransmuteFramework.EventStore.ReadModel.maybeSyncReadModel
  readModel = await maybeSyncReadModel(eventStore, fromAddress, readModel, reducer)
//   console.log('readModel: ', readModel)
  return readModel
}

export const syncEventStore = async (bindingModel, _callback) =>{
  let { contractAddress, fromAddress } = bindingModel
  let eventStore = await esContract.at(contractAddress)
//   console.log('eventStore: ', eventStore)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModel, reducer)
//   console.log('updatedReadModel: ', updatedReadModel)
  _callback(updatedReadModel)
}

export const writeEvent = async(bindingModel, _callback) => {
  let { contractAddress, fromAddress,  event } = bindingModel
  event = _.cloneDeep(event)
  let eventStore = await esContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeTransmuteCommand(eventStore, fromAddress, event )
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
