import { web3 } from 'env'

const contract = require('truffle-contract')

import MercuryEventStore from '../../../../build/contracts/MercuryEventStore.json'
import MercuryEventStoreFactory from '../../../../build/contracts/MercuryEventStoreFactory.json'

const mercuryEventStoreContract = contract(MercuryEventStore)
mercuryEventStoreContract.setProvider(web3.currentProvider)

const mercuryEventStoreFactory = contract(MercuryEventStoreFactory)
mercuryEventStoreFactory.setProvider(web3.currentProvider)

import TransmuteFramework from 'transmute-framework'

import { 
  readModel, 
  reducer
} from './mock/healthcare/reducer'


import { extend, cloneDeep } from 'lodash'

export const getMercuryEventStoreByCreator = async (fromAddress, _callback) => {
  let factory = await mercuryEventStoreFactory.deployed()
  let eventStoreAddress = await factory.getMercuryEventStoreByCreator({
    from: fromAddress
  })
  _callback(eventStoreAddress)
}

export const getMercuryEventStoreAddresses = async (fromAddress, _callback) => {
  let factory = await mercuryEventStoreFactory.deployed()
  let mercuryEventStoreContractAddresses = await factory.getMercuryEventStores({
    from: fromAddress
  })
  _callback(mercuryEventStoreContractAddresses)
}

export const createMercuryEventStore = async (bindingModel, _callback) => {
  let {fromAddress, name} = bindingModel
  let factory = await mercuryEventStoreFactory.deployed()
  let tx = await factory.createMercuryEventStore(name, {
      from: fromAddress,
      gas: 2000000,
  })
  console.warn(`transactionToEventCollection has a known issue handling multiple multi property events: 
  https://github.com/transmute-industries/transmute-framework/issues/27`)
  let events = TransmuteFramework.Transactions.transactionToEventCollection(tx)
  let createdEvent = events[1]
  _callback(createdEvent.ContractAddress)
}

export const getCachedReadModel = async (contractAddress, eventStore, readModel, reducer) =>{
  readModel.ReadModelStoreKey = `${readModel.ReadModelType}:${contractAddress}`
  readModel.ContractAddress = contractAddress
  return await TransmuteFramework.ReadModel.maybeSyncReadModel(eventStore, readModel, reducer)
}

export const rebuild = async (bindingModel, _callback) =>{
  let { contractAddress } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}

export const saveEvent = async(bindingModel, _callback) => {
  let { contractAddress, fromAddress,  event } = bindingModel
  event = cloneDeep(event)
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeEvent(eventStore, event, fromAddress)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}


// move this to another function... for later..
// let events = await TransmuteFramework.EventStore.readEvents(eventStore, 0)
// console.log('all-events: ', events)