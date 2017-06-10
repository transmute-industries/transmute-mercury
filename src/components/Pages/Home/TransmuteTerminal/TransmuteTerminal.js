import React from 'react'
import { connect } from 'react-redux'

import Mercury from 'store/ethereum/mercury'

import Terminal from 'react-bash'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
}

import { styles } from './styles'
import { structure } from './structures'
import buildExtensions from './commands'
const history = [{ value: 'Welcome to the terminal!' }]

import moment from 'moment'

@connect(
  // Map redux state to props
  ({ web3, mercury }) => ({
    web3: web3,
    mercury: mercury
  }),
  {
    createEventStore: (bindingModel) => (dispatch) => {
      dispatch(Mercury.createEventStore(bindingModel))
    },
    writeEvent: (bindingModel) => (dispatch) => {
      dispatch(Mercury.writeEvent(bindingModel))
    }
  }
)
export default class TransmuteTerminal extends React.Component {

  state = {
    open: false,
  }


  handleOpen = () => {
    this.setState({ open: true })
    setTimeout(() => {
      let input = document.querySelector('.ReactBash input:enabled')
      input.value = 'transmute help'
    }, 1 * 1000)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSelectDemoCommand = (command) => {
    console.log('demo command...', command)
    let input = document.querySelector('.ReactBash input:enabled')
    let from = this.props.mercury.defaultAddress
    let simpleEvent = JSON.stringify({
      type: "PATIENT_REGISTERED",
      payload: {
        patientId: 'patient-0',
        patientName: 'Hilary',
        insurance: 'Medicare'
      }
    })

    let writeESEventCommand = `transmute eventstore write --from ${from} --event ${simpleEvent}`
    let createESCommand = `transmute eventstore create --from ${from}`

    switch (command) {
      case 'create': input.value = createESCommand; break
      case 'write': input.value = writeESEventCommand; break
      case 'show': input.value = `transmute eventstore show`; break
    }
  }

  render() {
    const { web3, mercury, createEventStore, writeEvent } = this.props

    let actions = {
      createEventStore,
      writeEvent
    }
    let extensions = buildExtensions(mercury, actions)

    return (
      <div style={{ display: 'inline', paddingLeft: '16px' }}>
        <RaisedButton label='Demo' secondary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title='Terminal Demo'
          actions={[
            <RaisedButton
              label='Create'
              secondary={true}
              onTouchTap={() => { this.handleSelectDemoCommand('create') }}
              style={{ marginRight: '8px' }}
            />,
            <RaisedButton
              label='Write'
              secondary={true}
              onTouchTap={() => { this.handleSelectDemoCommand('write') }}
              style={{ marginRight: '8px' }}
            />,
            <RaisedButton
              label='Show'
              secondary={true}
              onTouchTap={() => { this.handleSelectDemoCommand('show') }}
              style={{ marginRight: '8px' }}
            />,
            <FlatButton
              label='Close'
              primary={true}
              onTouchTap={this.handleClose}
            />

          ]}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <div className='term-container'>
            <Terminal
              prefix='user'
              history={mercury.history}
              structure={structure}
              extensions={extensions}
              theme={Terminal.Themes.DARK}
              styles={styles}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}
