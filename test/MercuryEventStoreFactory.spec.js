
var Web3 = require('web3')
var MercuryEventStoreFactory = artifacts.require('./MercuryEventStoreFactory.sol')
var MercuryEventStore = artifacts.require('./MercuryEventStore.sol')

var {
    transactionToEventCollection,
} = require('./helpers')

var _ = require('lodash')


contract('MercuryEventStoreFactory', (accounts) => {
    let factory, eventStoreContractAddress
    let factoryCreatorAddress = accounts[0]
    let mercuryStoreName = 'apollo'
    it('is deployed contract', async () => {
        factory = await MercuryEventStoreFactory.deployed()
        return factory
    })

    describe('.createEventStore', () => {
        it('returns an address', async () => {
            let newESAddress = await factory.createMercuryEventStore.call(mercuryStoreName, {
                from: factoryCreatorAddress
            })
            let isNewESAddressValid = web3.isAddress(newESAddress)
            assert(isNewESAddressValid === true)
        })

        it('creates an event store contract', async () => {
            let tx = await factory.createMercuryEventStore(mercuryStoreName, {
                from: factoryCreatorAddress,
                gas: 2000000,
            })
            let events = transactionToEventCollection(tx)
            console.log(events)
            let createdEvent =  _.find(events, (evt) =>{
                return evt.Type === 'EVENT_STORE_CREATED'
            })
            eventStoreContractAddress = createdEvent.ContractAddress
            assert(createdEvent.Type === 'EVENT_STORE_CREATED')
        }) 
    })

    describe('.getMercuryEventStores', () => {

        it('event store has at least 1 event', async () => {
            let eventStore = await MercuryEventStore.at(eventStoreContractAddress) 
            
            let confirmName =  await eventStore.name({
                from: factoryCreatorAddress
            })

            console.log(confirmName)
            // let events = transactionToEventCollection(tx)
            // assert(createdEvent.Type === 'EVENT_STORE_CREATED')
        })

        it('returns an array of mercury event store contract addresses', async () => {
            let mercuryEventStoreContractAddresses = await factory.getMercuryEventStores({
                from: factoryCreatorAddress
            })
            // console.log('mercuryEventStoreContractAddresses: ', mercuryEventStoreContractAddresses)
            mercuryEventStoreContractAddresses.forEach((address) =>{
                assert(web3.isAddress(address))
            })
        })
    })
})

