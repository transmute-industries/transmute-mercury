import TransmuteFramework from 'transmute-framework'


const eventStoreArtifacts = require('../build/contracts/EventStore')
const eventStoreFactoryArtifacts = require('../build/contracts/EventStoreFactory')

export const  { web3 } = TransmuteFramework.init({
    env: 'infura',
    esa: eventStoreArtifacts,
    esfa: eventStoreFactoryArtifacts
})
