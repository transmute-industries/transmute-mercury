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

@connect(
  // Map redux state to props
  ({ web3, mercury }) => ({
    web3: web3,
    mercury: mercury
  }),
  {
    createEventStore: (bindingModel) => (dispatch) => {
      // console.log('Mercury: ', Mercury)
      // console.log('bindingModel: ', bindingModel)
      dispatch(Mercury.createEventStore(bindingModel))
    }
  }
)
export default class TransmuteTerminal extends React.Component {

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { web3, mercury, createEventStore } = this.props
    
    // setTimeout(() => {
    //   let input = document.querySelector('.ReactBash input:enabled')
    //   input.value = `transmute eventstore create --from ${mercury.defaultAddress}`
    //   // console.log()
    // }, 1 * 1000)

    let extensions = buildExtensions(mercury, createEventStore)
    
    return (
      <div style={{ display: 'inline', paddingLeft: '16px' }}>
        <RaisedButton label='Demo' secondary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title='Terminal Demo'
          actions={[
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
