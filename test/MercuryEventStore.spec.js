
var Web3 = require('web3')
var MercuryEventStore = artifacts.require('./MercuryEventStore.sol')

contract('MercuryEventStore', (accounts) => {
    it(' is an deployed', () => {
        return MercuryEventStore.deployed()
            .then((instance) => {
                // console.log('here...', instance)
            })
    })
})

