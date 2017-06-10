var Web3 = require('web3')
var EventStore = artifacts.require('./TransmuteFramework/EventStore.sol')

contract('EventStore', (accounts) => {

    let Events = {
        testUnauthorizedAddressValueEvent: {
            Type: 'TEST_EVENT',
            Version: 'v0',
            ValueType: 'Address',
            IsAuthorizedEvent: false,
            PermissionDomain: 'ES',
            AddressValue: web3.eth.accounts[1],
            UIntValue: 0,
            Bytes32Value: '',
            PropertyCount: 0
        },
        testAuthorizedAddressValueEvent: {
            Type: 'TEST_AUTH_EVENT',
            Version: 'v0',
            ValueType: 'Address',
            IsAuthorizedEvent: true,
            PermissionDomain: 'ES',
            AddressValue: web3.eth.accounts[1],
            UIntValue: 0,
            Bytes32Value: '',
            PropertyCount: 0
        },
        testAuthorizedAddressValueEventWithProperty: {
            Type: 'TEST_AUTH_EVENT',
            Version: 'v0',
            ValueType: 'Object',
            IsAuthorizedEvent: true,
            PermissionDomain: 'ES',
            AddressValue: web3.eth.accounts[1],
            UIntValue: 0,
            Bytes32Value: '',
            PropertyCount: 1
        }
    }

    function toAscii(value) {
        return web3.toAscii(value).replace(/\u0000/g, '')
    }

    function isVmException(e) {
        return e.toString().indexOf('VM Exception while') !== -1
    }

    function isTypeError(e) {
        return e.toString().indexOf('TypeError') !== -1
    }

    function writeEvent({Type, Version, ValueType, IsAuthorizedEvent, PermissionDomain, AddressValue, UIntValue, Bytes32Value, PropertyCount}, options) {
        return _eventStore.writeEvent(Type, Version, ValueType, IsAuthorizedEvent, PermissionDomain, AddressValue, UIntValue, Bytes32Value, PropertyCount, options)
    }

    let _eventStore
    let _creator

    beforeEach(async () => {
        _eventStore = await EventStore.deployed()
    })

    contract('getVersion', async () => {
        it('should return 1', async () => {
            let version = (await _eventStore.getVersion()).toNumber()
            assert(version === 1)
        })
    })

    contract('solidityEventCount', async () => {
        it('is initialized to 0', async () => {
            let count = (await _eventStore.solidityEventCount()).toNumber()
            assert(count === 0)
        })
        it('increases by 1 for every event that is written', async () => {
            let originalCount = (await _eventStore.solidityEventCount()).toNumber()
            assert(originalCount === 0)
            let tx = await writeEvent(Events.testUnauthorizedAddressValueEvent, {})
            let newCount = (await _eventStore.solidityEventCount()).toNumber()
            assert(newCount === originalCount + 1)
        })
    })

    // contract('creator', async () => {
    //     it('is the address of the contract creator', async () => {
    //         let creator = await _eventStore.creator()
    //         assert(creator === accounts[0])
    //     })
    // })

    contract('getACLAddresses', async () => {
        it('contains nothing when first initialized', async () => {
            let creator = await _eventStore.creator()
            let initialACLAddresses = await _eventStore.getACLAddresses()
            assert(initialACLAddresses.length === 0)
        })

        it('contains a new address after that address requests access', async () => {
            let tx = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', '', '', false, 'ES', accounts[0])
            let updatedACLAddresses = await _eventStore.getACLAddresses()
            assert(updatedACLAddresses.length === 1)
            assert(updatedACLAddresses[0] === accounts[0])
        })
    })

    contract('addACLAddress', async () => {
        it('emits EsEvents: ES_ACCESS_REQUESTED of ValueType Address, ES_READ_GRANTED of ValueType Address, ES_WRITE_GRANTED of ValueType Address', async () => {
            let tx = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[1])
            assert(tx.logs.length === 3)
            assert(tx.logs[0].event === 'EsEvent')
            let accessRequestedEvent = tx.logs[0].args
            let readGrantedEvent = tx.logs[1].args
            let writeGrantedEvent = tx.logs[2].args

            assert.equal(toAscii(accessRequestedEvent.Type), 'ES_ACCESS_REQUESTED', 'expected event to be on type ES_ACCESS_REQUESTED')
            assert.equal(toAscii(readGrantedEvent.Type), 'ES_READ_GRANTED', 'expected event to be on type ES_READ_GRANTED')
            assert.equal(toAscii(writeGrantedEvent.Type), 'ES_WRITE_GRANTED', 'expected event to be on type ES_WRITE_GRANTED')

            assert.equal(web3.isAddress(accessRequestedEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(accessRequestedEvent.TxOrigin, accounts[0], "expected TxOrigin to be accounts[0]")

            assert.equal(toAscii(accessRequestedEvent.ValueType), "Address", "expected ValueType to be Address")
            assert.equal(accessRequestedEvent.AddressValue, accounts[1], "expected AddressValue to be accounts[1]")
        })

        it('adds a requestor address to the requestorAddress AddressSet', async () => {
            let initialACLAddresses = await _eventStore.getACLAddresses()
            assert.equal(initialACLAddresses.length, 1, 'expected 1 address at this point')
            let tx = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', '', '', false, 'ES', accounts[2])
            let updatedACLAddresses = await _eventStore.getACLAddresses()
            assert.equal(updatedACLAddresses.length, 2)
            assert.equal(updatedACLAddresses[1], accounts[2])
        })
    })

    contract('grantReadAccess', async () => {
        it('emits a EsEvent, ES_READ_GRANTED of ValueType Address', async () => {
            let adminTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[0])
            let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', '', '', false, 'ES', accounts[1])
            let grantTX = await _eventStore.grantReadAccess('ES_READ_GRANTED', true, 'ES', accounts[1]);
            assert(reqTX.logs.length === 1)
            assert(grantTX.logs.length === 1)
            assert(grantTX.logs[0].event === 'EsEvent')
            let solidityEvent = grantTX.logs[0].args

            assert.equal(toAscii(solidityEvent.Type), 'ES_READ_GRANTED', 'expected event to be on type ES_READ_GRANTED')

            assert.equal(web3.isAddress(solidityEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(solidityEvent.TxOrigin, accounts[0], "expected TxOrigin to be accounts[0]")

            assert.equal(toAscii(solidityEvent.ValueType), "Address", "expected ValueType to be Address")
            assert.equal(solidityEvent.AddressValue, accounts[1], "expected AddressValue to be accounts[1]")
        })
    })

    contract('revokeReadAccess', async () => {
        it('emits a EsEvent, ES_READ_REVOKED of ValueType Address', async () => {
            let adminTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[0])
            let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', '', false, 'ES', accounts[1])
            let revokeTX = await _eventStore.revokeReadAccess('ES_READ_REVOKED', true, 'ES', accounts[1]);
            assert(reqTX.logs.length === 2)
            assert(revokeTX.logs.length === 1)
            assert(revokeTX.logs[0].event === 'EsEvent')
            let solidityEvent = revokeTX.logs[0].args

            assert.equal(toAscii(solidityEvent.Type), 'ES_READ_REVOKED', 'expected event to be on type ES_READ_REVOKED')

            assert.equal(web3.isAddress(solidityEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(solidityEvent.TxOrigin, accounts[0], "expected TxOrigin to be accounts[0]")

            assert.equal(toAscii(solidityEvent.ValueType), "Address", "expected ValueType to be Address")
            assert.equal(solidityEvent.AddressValue, accounts[1], "expected AddressValue to be accounts[1]")
        })
    })

    contract('grantWriteAccess', async () => {
        it('emits a EsEvent, ES_WRITE_GRANTED of ValueType Address', async () => {
            let adminTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[0])
            let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', '', '', false, 'ES', accounts[1])
            let grantTX = await _eventStore.grantWriteAccess('ES_WRITE_GRANTED', true, 'ES', accounts[1]);
            assert(reqTX.logs.length === 1)
            assert(grantTX.logs.length === 1)
            assert(grantTX.logs[0].event === 'EsEvent')
            let solidityEvent = grantTX.logs[0].args

            assert.equal(toAscii(solidityEvent.Type), 'ES_WRITE_GRANTED', 'expected event to be on type ES_WRITE_GRANTED')

            assert.equal(web3.isAddress(solidityEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(solidityEvent.TxOrigin, accounts[0], "expected TxOrigin to be accounts[0]")

            assert.equal(toAscii(solidityEvent.ValueType), "Address", "expected ValueType to be Address")
            assert.equal(solidityEvent.AddressValue, accounts[1], "expected AddressValue to be accounts[1]")
        })
    })

    contract('revokeWriteAccess', async () => {
        it('emits a EsEvent, ES_WRITE_REVOKED of ValueType Address', async () => {
            let adminTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[0])
            let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', '', 'ES_WRITE_GRANTED', false, 'ES', accounts[1])
            let revokeTX = await _eventStore.revokeWriteAccess('ES_WRITE_REVOKED', true, 'ES', accounts[1])
            assert(reqTX.logs.length === 2)
            assert(revokeTX.logs.length === 1)
            assert(revokeTX.logs[0].event === 'EsEvent')
            let solidityEvent = revokeTX.logs[0].args

            assert.equal(toAscii(solidityEvent.Type), 'ES_WRITE_REVOKED', 'expected event to be on type ES_WRITE_REVOKED')

            assert.equal(web3.isAddress(solidityEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(solidityEvent.TxOrigin, accounts[0], "expected TxOrigin to be accounts[0]")

            assert.equal(toAscii(solidityEvent.ValueType), "Address", "expected ValueType to be Address")
            assert.equal(solidityEvent.AddressValue, accounts[1], "expected AddressValue to be accounts[1]")
        })
    })

    // contract('isAddressAuthorized', async () => {
    //     it('returns true for addresses that have been authorized', async () => {
    //         let reqTX = await _eventStore.addRequestorAddress(accounts[5])
    //         let authTX = await _eventStore.authorizeRequestorAddress(accounts[5])
    //         let isAddress5Authorized = await _eventStore.isAddressAuthorized(accounts[5])
    //         assert.equal(isAddress5Authorized, true, "expected address 5 to be authorized]")
    //     })
    // })

    contract('writeEvent', async () => {
        // it('throws a type error if called by an unauthorized address and event is authorized', async () => {
        //     try {
        //         let tx = await writeEvent(Events.testAuthorizedAddressValueEvent, {from: accounts[1], gas: 2000000})
        //         console.log('tx: ', tx)
        //     } catch (e) {
        //         console.log('e: ', e)
        //         assert.equal(isTypeError(e), true, "expected an unauthorized write to cause a type error")
        //     }
        // })
        //
        // it('throws a vm exception if called by an unauthorized ACLAddress and event is authorized', async () => {
        //     try {
        //         let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', '', false, 'ES', accounts[1])
        //         let tx = await writeEvent(Events.testAuthorizedAddressValueEvent, {from: accounts[1], gas: 2000000})
        //         console.log('tx: ', tx)
        //     } catch (e) {
        //         console.log('e: ', e)
        //         assert.equal(isVmException(e), true, "expected an unauthorized write to cause a vm exception")
        //     }
        // })

        it('emits EsEvent ' + Events.testAuthorizedAddressValueEvent.Type + ' of ValueType Address if called by an authorized ACLAddress', async () => {
            let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', '', false, 'ES', accounts[1])
            let grantTX = await _eventStore.grantWriteAccess('ES_WRITE_GRANTED', true, 'ES', accounts[1])
            let tx = await writeEvent(Events.testAuthorizedAddressValueEvent, {from: accounts[1], gas: 2000000})

            let solidityEvent = tx.logs[0].args
            assert.equal(toAscii(solidityEvent.Type), Events.testAuthorizedAddressValueEvent.Type, 'expected event to be on type ' + Events.testAuthorizedAddressValueEvent.Type)
            assert.equal(web3.isAddress(solidityEvent.TxOrigin), true, "expected TxOrigin to be an address")
            assert.equal(solidityEvent.TxOrigin, accounts[1], "expected TxOrigin to be accounts[1]")
        })
    })
    //
    // contract('writeEventProperty', async () => {
    //     it('throws a type error if called by an unauthorized address and event is authorized', async () => {
    //         let reqTX = await _eventStore.addACLAddress('ES_ACCESS_REQUESTED', 'ES_READ_GRANTED', 'ES_WRITE_GRANTED', false, 'ES', accounts[1])
    //         let eventTX = await writeEvent(Events.testAuthorizedAddressValueEventWithProperty, {from: accounts[1], gas: 2000000})
    //         let solidityEvent = eventTX.logs[0].args
    //         try {
    //             let propTx = await _eventStore.writeEventProperty(solidityEvent.Id, 0, 'CustomKey', 'Bytes32', true, 'Ls', 0, 0, 'CustomValue', {
    //                 from: accounts[2],
    //                 gas: 2000000
    //             })
    //         } catch (e) {
    //             console.log('e: ', e)
    //             assert.equal(isTypeError(e), true, "expected an unauthorized write to cause a type error")
    //         }
    //     })
    //
    //     it('throws a vm exception if called by an unauthorized ACLAddress and event is authorized', async () => {
    //         let eventTX = await writeEvent(Events.testAuthorizedAddressValueEventWithProperty, {from: accounts[1], gas: 2000000})
    //         let revokeTX = await _eventStore.revokeWriteAccess('ES_WRITE_REVOKED', true, 'ES', accounts[1])
    //         let solidityEvent = eventTX.logs[0].args
    //         try {
    //             let propTx = await _eventStore.writeEventProperty(solidityEvent.Id, 0, 'CustomKey', 'Bytes32', true, 'ES', 0, 0, 'CustomValue', {
    //                 from: accounts[1],
    //                 gas: 2000000
    //             })
    //         } catch (e) {
    //             assert.equal(isVmException(e), true, "expected an unauthorized write to cause a vm exception")
    //         }
    //     })
        //
        // it('throws an error if property already exists', async () => {
        //     let reqTX = await _eventStore.addRequestorAddress(accounts[6])
        //     let authTX = await _eventStore.authorizeRequestorAddress(accounts[6])
        //     let eventTx = await _eventStore.writeEvent(Type, Version, 'Object', 0, 0, '', 1, {
        //         from: accounts[6],
        //         gas: 2000000
        //     })
        //     let solidityEvent = eventTx.logs[0].args
        //     let propTx = await _eventStore.writeEventProperty(solidityEvent.Id, 0, 'CustomKey', 'Bytes32', 0, 0, 'CustomValue', {
        //         from: accounts[6],
        //         gas: 2000000
        //     })
        //     try {
        //         let propTx = await _eventStore.writeEventProperty(solidityEvent.Id, 0, 'CustomKey', 'Bytes32', 0, 0, 'CustomValue2', {
        //             from: accounts[6],
        //             gas: 2000000
        //         })
        //         // console.log(propTx)
        //     } catch (e) {
        //         assert.equal(isVmException(e), true, "expected an unauthorized write to cause a vm exception")
        //     }
        // })
        //
        // it('emit a EsEventProperty', async () => {
        //     let reqTX = await _eventStore.addRequestorAddress(accounts[7])
        //     let authTX = await _eventStore.authorizeRequestorAddress(accounts[7])
        //     let eventTx = await _eventStore.writeEvent(Type, Version, 'Object', 0, 0, '', 1, {
        //         from: accounts[7],
        //         gas: 2000000
        //     })
        //     let solidityEvent = eventTx.logs[0].args
        //     let propTx = await _eventStore.writeEventProperty(solidityEvent.Id, 0, 'CustomKey', 'Bytes32', 0, 0, 'CustomValue', {
        //         from: accounts[7],
        //         gas: 2000000
        //     })
        //     // console.log(propTx)
        //     assert(propTx.logs.length === 1)
        //     assert(propTx.logs[0].event === 'EsEventProperty')
        //     let solidityEventProp = propTx.logs[0].args
        //     assert.equal(toAscii(solidityEventProp.ValueType), 'Bytes32', 'expected event prop type to be Bytes32')
        //     assert.equal(toAscii(solidityEventProp.Bytes32Value), 'CustomValue', 'expected event prop bytes32Value to be CustomValue')
        // })
    // })

    //
    // contract('readEvent', async () => {
    //     it('throws an error if called by an unauthorized address', async () => {
    //         let reqTX = await _eventStore.addRequestorAddress(accounts[2])
    //         let authTX = await _eventStore.authorizeRequestorAddress(accounts[2])
    //         let eventTx = await _eventStore.writeEvent(Type, Version, ValueType, AddressValue, UIntValue, Bytes32Value, PropertyCount, {
    //             from: accounts[2],
    //             gas: 2000000
    //         })
    //         let solidityEvent = eventTx.logs[0].args
    //         try {
    //             let eventType = await _eventStore.readEvent.call(solidityEvent.Id, {
    //                 from: accounts[4],
    //                 gas: 2000000
    //             })
    //             // console.log(eventType)
    //         } catch (e) {
    //             assert.equal(isVmException(e), true, "expected an unauthorized write to cause a vm exception")
    //         }
    //     })
    //     it('emits a EsEvent', async () => {
    //         let reqTX = await _eventStore.addRequestorAddress(accounts[3])
    //         let authTX = await _eventStore.authorizeRequestorAddress(accounts[3])
    //         let eventTx = await _eventStore.writeEvent(Type, Version, 'Object', 0, 0, '', 1, {
    //             from: accounts[3],
    //             gas: 2000000
    //         })
    //         let solidityEvent = eventTx.logs[0].args
    //         let returnVals = await _eventStore.readEvent.call(solidityEvent.Id, {
    //             from: accounts[3]
    //         })
    //
    //         // console.log(returnVals)
    //
    //         let eventId = returnVals[0].toNumber()
    //         assert.equal(eventId, solidityEvent.Id, 'expected read to match write')
    //
    //         let eventType = toAscii(returnVals[1])
    //         assert.equal(eventType, toAscii(solidityEvent.Type), 'expected read to match write')
    //
    //         let eventVersion = toAscii(returnVals[2])
    //         assert.equal(eventVersion, toAscii(solidityEvent.Version), 'expected read to match write')
    //
    //         let valueType = toAscii(returnVals[3])
    //         assert.equal(valueType, toAscii(solidityEvent.ValueType), 'expected read to match write')
    //
    //         let addressValue = returnVals[4]
    //         assert.equal(addressValue, solidityEvent.AddressValue, 'expected read to match write')
    //
    //         let uintValue = returnVals[5].toNumber()
    //         assert.equal(uintValue, solidityEvent.UIntValue.toNumber(), 'expected read to match write')
    //
    //         let bytes32Value = toAscii(returnVals[6])
    //         assert.equal(bytes32Value, toAscii(solidityEvent.Bytes32Value), 'expected read to match write')
    //
    //         let txOrigin = returnVals[7]
    //         assert.equal(txOrigin, solidityEvent.TxOrigin, 'expected read to match write')
    //
    //         let created = returnVals[8].toNumber()
    //         assert.equal(created, solidityEvent.Created.toNumber(), 'expected read to match write')
    //
    //         let propCount = returnVals[9].toNumber()
    //         assert.equal(propCount, solidityEvent.PropertyCount.toNumber(), 'expected read to match write')
    //
    //     })
    // })
    //
    // contract('readEventProperty', async () => {
    //     it('throws an error if called by an unauthorized address', async () => {
    //         let eventTx = await _eventStore.writeEvent(Type, Version, 'Object', 0, 0, '', 1)
    //         let solidityEvent = eventTx.logs[0].args
    //         let lastEventId = solidityEvent.Id.toNumber()
    //         let propWriteTx = await _eventStore.writeEventProperty(lastEventId, 0, 'CustomKey', 'Bytes32', 0, 0, 'CustomValue')
    //         try {
    //             let eventType = await _eventStore.readEventProperty.call(lastEventId, 0, {
    //                 from: accounts[5],
    //                 gas: 2000000
    //             })
    //             // console.log(eventType)
    //         } catch (e) {
    //             // console.log(e)
    //             assert.equal(isVmException(e), true, "expected an unauthorized write to cause a vm exception")
    //         }
    //     })
    //     it('emits a EsEventProperty', async () => {
    //         let reqTX = await _eventStore.addRequestorAddress(accounts[3])
    //         let authTX = await _eventStore.authorizeRequestorAddress(accounts[3])
    //         let eventTx = await _eventStore.writeEvent(Type, Version, 'Object', 0, 0, '', 1, {
    //             from: accounts[3],
    //             gas: 2000000
    //         })
    //         let solidityEvent = eventTx.logs[0].args
    //         let lastEventId = solidityEvent.Id.toNumber()
    //         let propWriteTx = await _eventStore.writeEventProperty(lastEventId, 0, 'CustomKey', 'Bytes32', 0, 0, 'CustomValue', {
    //             from: accounts[3],
    //             gas: 2000000
    //         })
    //          let returnVals = await _eventStore.readEventProperty.call(lastEventId, 0, {
    //             from: accounts[3]
    //         })
    //
    //         // console.log(returnVals)
    //
    //         let eventId = returnVals[0].toNumber()
    //         assert.equal(eventId, solidityEvent.Id, 'expected read to match write')
    //
    //         let propIndex = returnVals[1].toNumber()
    //         assert.equal(propIndex, 0, 'expected read to match write')
    //
    //         let propName = toAscii(returnVals[2])
    //         assert.equal(propName, 'CustomKey', 'expected read to match write')
    //
    //         let propType = toAscii(returnVals[3])
    //         assert.equal(propType, 'Bytes32', 'expected read to match write')
    //
    //         let addressValue = returnVals[4]
    //         assert.equal(addressValue, 0, 'expected read to match write')
    //
    //         let uintValue = returnVals[5].toNumber()
    //         assert.equal(uintValue, 0, 'expected read to match write')
    //
    //         let bytes32Value = toAscii(returnVals[6])
    //         assert.equal(bytes32Value, 'CustomValue', 'expected read to match write')
    //     })
    // })
})
