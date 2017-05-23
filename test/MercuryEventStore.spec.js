
var Web3 = require('web3')
var MercuryEventStore = artifacts.require('./MercuryEventStore.sol')

var TransmuteFramework = require('transmute-framework').TransmuteFramework

contract('MercuryEventStore', (accounts) => {
    let eventStore
    it(' is an deployed', async () => {
        eventStore = await  MercuryEventStore.deployed()
    })

    it(' TransmuteFramework ', async () => {
       
        let events = await TransmuteFramework.EventStore.writeEvent(eventStore, {
            Type: 'TEST_EVENT',
            CustomValue: 4
        }, accounts[0])

        console.log(events)
    })
})