import { web3 } from 'env'

const contract = require('truffle-contract')

import MercuryEventStore from '../../../../build/contracts/MercuryEventStore.json'
import MercuryEventStoreFactory from '../../../../build/contracts/MercuryEventStoreFactory.json'

const mercuryEventStoreContract = contract(MercuryEventStore)
mercuryEventStoreContract.setProvider(web3.currentProvider)

const mercuryEventStoreFactory = contract(MercuryEventStoreFactory)
mercuryEventStoreFactory.setProvider(web3.currentProvider)

import TransmuteFramework from 'transmute-framework'


import { mercuryEventStoreReadModelInitialState, mercuryEventStoreReadModelReducer } from './MercuryEventStore/reducer'

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
  //  console.log('TransmuteFramework: ', TransmuteFramework)
  // console.log('mercuryEventStoreContractAddresses: ', mercuryEventStoreContractAddresses)
  _callback(mercuryEventStoreContractAddresses)
}

export const createMercuryEventStore = async (bindingModel, _callback) => {
  let {fromAddress, name} = bindingModel
  let factory = await mercuryEventStoreFactory.deployed()
  let tx = await factory.createMercuryEventStore(name, {
      from: fromAddress,
      gas: 2000000,
  })

  let events = TransmuteFramework.Transactions.transactionToEventCollection(tx)
  let createdEvent = events[0]
  _callback(createdEvent.ContractAddress)
}

export const getEventStoreReadModel = async (bindingModel, _callback) =>{

  let { fromAddress, contractAddress } = bindingModel

  console.log('TransmuteFramework: ', TransmuteFramework)

  console.log('user the framework and these: ', fromAddress, contractAddress)

  let eventStore = await mercuryEventStoreContract.at(contractAddress)

  let readModel = mercuryEventStoreReadModelInitialState

  readModel.ContractAddress = contractAddress

  let reducer = mercuryEventStoreReadModelReducer

  let events = await TransmuteFramework.EventStore.readEvents(eventStore, 0)

  console.log('why: ', events)

  // let updatedReadModel = await TransmuteFramework.ReadModel.maybeSyncReadModel(eventStore, readModel, reducer)

  console.log('updatedReadModel: ', updatedReadModel)

  // let factory = await mercuryEventStoreFactory.deployed()
  // let tx = await factory.createMercuryEventStore(name, {
  //     from: fromAddress,
  //     gas: 2000000,
  // })

  // let events = TransmuteFramework.Transactions.transactionToEventCollection(tx)
  // let createdEvent = events[0]
  // _callback(createdEvent.ContractAddress)

}


