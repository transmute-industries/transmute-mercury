
var _ = require('lodash')

const SOLIDITY_EVENT = 'SOLIDITY_EVENT'
const SOLIDITY_EVENT_PROPERTY = 'SOLIDITY_EVENT_PROPERTY'


const SolidityEventPropertySchema = {
    EventIndex: 'BigNumber',
    EventPropertyIndex: 'BigNumber',
    Name: 'String',
    Type: 'String',

    AddressValue: 'String',
    UIntValue: 'BigNumber',
    StringValue: 'String'
}

const SolidityEventSchema = {
    Id: 'BigNumber',
    Type: 'String',
    Created: 'BigNumber',
    IntegrityHash: 'String',
    PropertyCount: 'BigNumber'
}

const TruffleEventSchema = {
    [SOLIDITY_EVENT]: SolidityEventSchema,
    [SOLIDITY_EVENT_PROPERTY]: SolidityEventPropertySchema,
}

const solidityEventPropertyToObject = (prop) => {
    let _obj = {}
    switch (prop.Type) {
        case 'String': _obj[prop.Name] = prop.StringValue; break;
        case 'BigNumber': _obj[prop.Name] = prop.UIntValue; break;
        case 'Address': _obj[prop.Name] = prop.AddressValue; break;
    }
    return _obj
}

const getPropFromSchema = (propType, value) => {
    switch (propType) {
        case 'String': return value.toString()
        case 'Address': return value.toString()
        case 'BigNumber': return value.toNumber()
        default: throw Error(`UNKNWON propType ${propType} for value '${value}'. Make sure your schema is up to date.`)
    }
}

const eventFromLog = (log) => {
    let schema = TruffleEventSchema[log.event]
    let event = {}
    _.forIn(log.args, (value, key) => {
        let prop = getPropFromSchema(schema[key], value)
        _.extend(event, {
            [key]: prop
        })
    })
    return event
}

const eventsFromTransaction = (tx) => {
    return tx.logs.map((log) => {
        return eventFromLog(log)
    })
}



const transactionEventsToEventObject = (events) => {

    let eventObjs = _.filter(events, (evt) => {
        return evt.Id !== undefined
    })

    eventObjs.forEach((eventObj) => {
        let propIndex = 0;
        while (propIndex < eventObj.PropertyCount) {
            let eventProp = _.find(events, (evt) => {
                return evt.EventPropertyIndex === propIndex
            })
            let eventPropObj = solidityEventPropertyToObject(eventProp)
            _.extend(eventObj, eventPropObj)
            propIndex++;
        }
    })
    return eventObjs
}

const transactionToEventCollection = (tx) => {
    let events = eventsFromTransaction(tx)
    let eventCollection = transactionEventsToEventObject(events)
    return eventCollection
}

module.exports = {
    eventsFromTransaction,
    transactionEventsToEventObject,
    transactionToEventCollection,
    TruffleEventSchema,
    SOLIDITY_EVENT,
    SOLIDITY_EVENT_PROPERTY,
    SolidityEventSchema,
    SolidityEventPropertySchema,
    solidityEventPropertyToObject
}