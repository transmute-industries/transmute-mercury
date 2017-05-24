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
  mercuryEventStoreReadModelInitialState, 
  mercuryEventStoreReadModelReducer 
} from './MercuryEventStore/reducer'

import { 
  initialState as mesUserReadModelInitialState, 
  reducer as mesUserReadModelReducer 
} from './MercuryEventStoreUser/reducer'


import { 
  initialState as mesUserEncounterReadModelInitialState, 
  reducer as mesUserEncounterReadModelReducer 
} from './MercuryEventStoreUserEncounter/reducer'

import {extend} from 'lodash'

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
  // console.log('find the new contract address here somewhere...', events)
  _callback(createdEvent.ContractAddress)
}

// move this to another function... for later..
// let events = await TransmuteFramework.EventStore.readEvents(eventStore, 0)
// console.log('all-events: ', events)

// SO MUCH USELESSS REPETITION HERE>>>>

export const getCachedReadModel = async (contractAddress, eventStore, readModel, reducer) =>{
  readModel.ReadModelStoreKey = `${readModel.ReadModelType}:${contractAddress}`
  readModel.ContractAddress = contractAddress
  return await TransmuteFramework.ReadModel.maybeSyncReadModel(eventStore, readModel, reducer)
}

export const getEventStoreReadModel = async (bindingModel, _callback) =>{
  let { contractAddress } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let readModel = mercuryEventStoreReadModelInitialState
  let reducer = mercuryEventStoreReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}

export const createEventStoreUserReadModel = async(bindingModel, _callback) => {
  let { contractAddress, fromAddress,  event } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeEvent(eventStore, event, fromAddress)
  let readModel = mesUserReadModelInitialState
  let reducer = mesUserReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}

export const getEventStoreUserReadModel = async (bindingModel, _callback) =>{
  let { contractAddress } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let readModel = mesUserReadModelInitialState
  let reducer = mesUserReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}

export const createEventStoreUserEncounterReadModel = async(bindingModel, _callback) => {
  let { contractAddress, fromAddress,  event } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeEvent(eventStore, event, fromAddress)
  let readModel = mesUserEncounterReadModelInitialState
  let reducer = mesUserEncounterReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}


export const getEventStoreUserEncounterReadModel = async(bindingModel, _callback) => {
  let { contractAddress } = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let readModel = mesUserEncounterReadModelInitialState
  let reducer = mesUserEncounterReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}


export const createEventStoreUserEncounterLinkReadModel = async(bindingModel, _callback) => {
  let { contractAddress, fromAddress,  event} = bindingModel
  let eventStore = await mercuryEventStoreContract.at(contractAddress)
  let events = await TransmuteFramework.EventStore.writeEvent(eventStore, event, fromAddress)
  let readModel = mesUserEncounterReadModelInitialState
  let reducer = mesUserEncounterReadModelReducer
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, readModel, reducer)
  _callback(updatedReadModel)
}


