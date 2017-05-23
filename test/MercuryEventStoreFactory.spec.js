
var Web3 = require('web3')
var MercuryEventStoreFactory = artifacts.require('./MercuryEventStoreFactory.sol')

var {
    transactionToEventCollection,
} = require('./helpers')


contract('MercuryEventStoreFactory', (accounts) => {
    let factory
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
            // console.log(tx)
            let events = transactionToEventCollection(tx)
            let createdEvent = events[0]
            let auditEvent = events[1]
            // console.log(events)
            assert(createdEvent.Type === 'EVENT_STORE_CREATED')
            assert(auditEvent.Type === 'EVENT_STORE_AUDIT_LOG')
        })
    })

    describe('.getMercuryEventStores', () => {
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

