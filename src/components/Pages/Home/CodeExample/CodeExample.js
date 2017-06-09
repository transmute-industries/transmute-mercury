
import React from 'react'

import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow_night_eighties'

import classes from './CodeExample.scss'


let code = `// Actions
export const createEventStore = (bindingModel) => dispatch => {
  Middleware.createEventStore(bindingModel, (address) => {
    store.dispatch(syncEventStore({
      contractAddress: address,
      fromAddress: bindingModel.fromAddress
    }))
    dispatch({
      type: 'EVENT_STORE_ADDRESS_RECEIVED',
      payload: address
    })
  })
}
export const syncEventStore = (bindingModel) => dispatch => {
  Middleware.syncEventStore(bindingModel, (readModel) => {
    dispatch({
      type: 'EVENT_STORE_RECEIVED',
      payload: readModel
    })
  })
}
// Middleware
export const createEventStore = async (bindingModel, _callback) => {
  let factory = await TransmuteFramework.EventStoreFactoryContract.deployed()
  let tx = await factory.createEventStore({
    from: fromAddress,
    gas: 2000000,
  })
  let events = TransmuteFramework.EventStore.EventTypes.reconstructTransmuteEventsFromTxs([tx])
  events = await Promise.all(events)
  _callback(events[0].payload)
}
export const syncEventStore = async (bindingModel, _callback) => {
  let { contractAddress, fromAddress } = bindingModel
  let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress)
  let updatedReadModel = await getCachedReadModel(contractAddress, eventStore, fromAddress, readModel, reducer)
  _callback(updatedReadModel)
}`

@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class CodeExample extends React.Component {
    render() {
        return (
            <div>
                <AceEditor
                    mode='javascript'
                    theme='tomorrow_night_eighties'
                    name='CodeExample'
                    value={code}
                    setOptions={{
                        useWorker: false
                    }}
                    width={'100%'}
                    height={'400px'}
                    editorProps={{ $blockScrolling: true }}
                />
            </div>
        )
    }
}

