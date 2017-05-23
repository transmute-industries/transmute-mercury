import { web3 } from 'env'

const contract = require('truffle-contract')

import MercuryEventStore from '../../../build/contracts/MercuryEventStore.json'
import MercuryEventStoreFactory from '../../../build/contracts/MercuryEventStoreFactory.json'

const mercuryEventStoreContract = contract(MercuryEventStore)
mercuryEventStoreContract.setProvider(web3.currentProvider)

const mercuryEventStoreFactory = contract(MercuryEventStoreFactory)
mercuryEventStoreFactory.setProvider(web3.currentProvider)

// import { readEvents } from '../../../ti-framework/event-store'

export const getMercuryEventStoreAddresses = (_callback) => {

  // web3.eth.getAccounts((err, addresses) => {
  //   if (err) { throw err }
  //   _callback(addresses)
  // })
  
}
