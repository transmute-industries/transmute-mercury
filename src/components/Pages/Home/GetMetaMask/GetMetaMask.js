import React from 'react'
import { connect } from 'react-redux'


import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const customContentStyle = {
  // width: '100%',
  // maxWidth: 'none',
}

@connect(
  // Map redux state to props
  ({ web3, mercury }) => ({
    web3: web3,

  }),
  {

  }
)
export default class GetMetaMask extends React.Component {

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
    const { web3 } = this.props


    return (
      <div style={{ display: 'inline', paddingLeft: '16px' }}>
        <RaisedButton label='Demo' secondary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title='MetaMask is required for the TestNet Live Demo'
          actions={[
            <FlatButton
              label='Close'
              primary={true}
              onTouchTap={this.handleClose}
            />,
           
            <RaisedButton
              style={{marginLeft: '8px'}}
              label='Get MetaMask'
              disableTouchRipple={true}
              disableFocusRipple={true}
              secondary
              href='https://metamask.io/'
            />
          ]}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <div >
          <p>
              MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today.
              It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
          </p>
          </div>
        </Dialog>
      </div>
    )
  }
}


  // <FlatButton
  //                 label='Change Provider'
  //                 disableTouchRipple={true}
  //                 disableFocusRipple={true}
  //                 href='/web3'
  //                 style={{ marginRight: 12 }}
  //             />,