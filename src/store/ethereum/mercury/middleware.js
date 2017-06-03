import { web3 } from 'env'

const contract = require('truffle-contract')

import EventStore from '../../../../build/contracts/EventStore.json'
import EventStoreFactory from '../../../../build/contracts/EventStoreFactory.json'

const esContract = contract(EventStore)
esContract.setProvider(web3.currentProvider)

const esfContract = contract(EventStoreFactory)
esfContract.setProvider(web3.currentProvider)

import TransmuteFramework from 'transmute-framework'


// import { 
//   readModel, 
//   reducer
// } from './mock/healthcare/reducer'


// import { extend, cloneDeep } from 'lodash'

// export const getMercuryEventStoresByCreator = async (fromAddress, _callback) => {
//   let factory = await mercuryEventStoreFactory.deployed()
//   let eventStoreAddresses = await factory.getEventStoresByCreator({
//     from: fromAddress
//   })
//   // console.log('from middleware: ', eventStoreAddresses)
//   _callback(eventStoreAddresses)
// }

// export const getMercuryEventStoreAddresses = async (fromAddress, _callback) => {
//   let factory = await mercuryEventStoreFactory.deployed()
//   let mercuryEventStoreContractAddresses = await factory.getMercuryEventStores({
//     from: fromAddress
//   })
//   _callback(mercuryEventStoreContractAddresses)
// }

// export const createMercuryEventStore = async (bindingModel, _callback) => {
//   let {fromAddress, name} = bindingModel
//   let factory = await mercuryEventStoreFactory.deployed()
//   let tx = await factory.createMercuryEventStore(name, {
//       from: fromAddress,
//       gas: 2000000,
//   })
//   console.log('tx: ', tx)
//   // console.warn(`transactionToEventCollection has a known issue handling multiple multi property events: 
//   // https://github.com/transmute-industries/transmute-framework/issues/27`)
//   // let events = TransmuteFramework.Transactions.transactionToEventCollection(tx)
//   // let createdEvent = events[1]
//   // _callback(createdEvent.ContractAddress)
// }

// export const getCachedReadModel = async (contractAddress, eventStore, readModel, reducer) =>{
//   readModel.ReadModelStoreKey = `${readModel.ReadModelType}:${contractAddress}`
//   readModel.ContractAddress = contractAddress
//   // return await TransmuteFramework.ReadModel.maybeSyncReadModel(eventStore, readModel, reducer)
// }

// export const rebuild = async (bindingModel, _callback) =>{
//   let { contractAddress } = bindingModel
//   let eventStore = await mercuryEventStoreContract.at(contractAddress)
//   let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
//   _callback(updatedReadModel)
// }

// export const saveEvent = async(bindingModel, _callback) => {
//   let { contractAddress, fromAddress,  event } = bindingModel
//   event = cloneDeep(event)
//   let eventStore = await mercuryEventStoreContract.at(contractAddress)
//   // let events = await TransmuteFramework.EventStore.writeEvent(eventStore, event, fromAddress)
//   // let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
//   // _callback(updatedReadModel)
// }


// // move this to another function... for later..
// // let events = await TransmuteFramework.EventStore.readEvents(eventStore, 0)
// // console.log('all-events: ', events)