import TransmuteFramework from 'transmute-framework'

const eventStoreArtifacts = require('../build/contracts/EventStore')
const eventStoreFactoryArtifacts = require('../build/contracts/EventStoreFactory')

export default TransmuteFramework.init({
    env: localStorage.getItem('provider'),
    esa: eventStoreArtifacts,
    esfa: eventStoreFactoryArtifacts
})
