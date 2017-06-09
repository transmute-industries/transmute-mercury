import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import CircularProgress from 'material-ui/CircularProgress'

import { each } from 'lodash'

  const esAuthorizedAddressReadModel = {
      'a': 'Granted',
      'b': 'Revoked',
      'c': 'Pending'
    }


// this.props.faucet
const eventStoreContractState = {
  name: 'test contract',
  address: 'a',
  balance: 1
}

export default class FaucetAuthorizeTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fixedHeader: false,
      showFooter: false,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: 'auto',
      dialogOpen: false,
      selectedRequestor: null,
      selectedRows: [],
      dialogMessage: '',
      dialogActionChoice: ''
    }
  }

  onRowSelection = (rows) => {
    let selectedRows = []
    let addresses = Object.keys(esAuthorizedAddressReadModel)

    if (rows === 'all') {
      selectedRows = addresses
    } else {
      selectedRows = rows.map((index) => {
        return addresses[index]
      })
    }
    this.setState({
      selectedRows: selectedRows
    })
  }

  renderTableHeaderFooter () {
    return (
      <TableRow>
        <TableHeaderColumn tooltip='Requesting Address'>Requesting Address</TableHeaderColumn>
        <TableHeaderColumn tooltip='Address Status'>Status</TableHeaderColumn>
      </TableRow>
    )
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      selectedRequestor: null
    })
  }

  handleConfirmDialog = () => {
    if (this.state.dialogActionChoice === 'grant') {

      // this.state.selectedRows.forEach((requestingAddress) => {
      //   if (esAuthorizedAddressReadModel[requestingAddress] !== 'Granted') {
      //     let payload = {
      //       faucetAddress: eventStoreContractState.address,
      //       requestorAddress: requestingAddress,
      //       fromAddress: eventStoreContractState.creator
      //     }
      //     this.props.onAuthorizeFaucetAccess(payload)
      //   }
      // })

    }

    if (this.state.dialogActionChoice === 'revoke') {

      // this.state.selectedRows.forEach((requestingAddress) => {
      //   if (esAuthorizedAddressReadModel[requestingAddress] !== 'Revoked') {
      //     let payload = {
      //       faucetAddress: eventStoreContractState.address,
      //       requestorAddress: requestingAddress,
      //       fromAddress: eventStoreContractState.creator
      //     }
      //     this.props.onRevokeFaucetAccess(payload)
      //   }
      // })

    }
    this.setState({
      dialogOpen: false
    })
  }

  handleUpdateDialog = (action) => {
    let dialogMessage = ''

    if (action === 'grant') {
      dialogMessage = 'Are you sure you want to grant access to ' + this.state.selectedRows.length + ' addresses?'
    }

    if (action === 'revoke') {
      dialogMessage = 'Are you sure you want to revoke access for ' + this.state.selectedRows.length + ' addresses?'
    }

    this.setState({
      dialogOpen: true,
      dialogActionChoice: action,
      dialogMessage: dialogMessage
    })
  }

  handleGrant = () => {
    this.handleUpdateDialog('grant')
  }

  handleRevoke = () => {
    this.handleUpdateDialog('revoke')
  }

  isSelected = (address) => {
    return this.state.selectedRows.indexOf(address) !== -1
  }

  hasAccess = (address) => {
    return esAuthorizedAddressReadModel[address] === 'Granted'
  }

  render () {

    const esName = 'test es'
  

    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleCloseDialog}
        />,
      <FlatButton
        label='Confirm'
        primary
        onTouchTap={this.handleConfirmDialog}
        />
    ]

    const isLoaded = () => {
      return esAuthorizedAddressReadModel !== null
    }

    const readModelToRows = () => {
      let rows = []
      each(esAuthorizedAddressReadModel, (v, k) => {
        rows.push(
          <TableRow key={k} selected={this.isSelected(k)}>
            <TableRowColumn>{k.substring(0, 6) + '...'}</TableRowColumn>
            <TableRowColumn>
              {v}
            </TableRowColumn>
          </TableRow>
        )
      })
      return rows
    }

    if (!isLoaded()) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress mode='indeterminate' size={80} />
        </div>
      )
    } else {
      if (false) {
        return (
          <div style={{ textAlign: 'center' }}>
            <h1 >
              No users have requested access.
          </h1>
          <FlatButton
            label='Go Home'
            primary
            href='/'
            />
        </div>
      )
    } else {
      return (
        <Card>
          <CardTitle
            title={eventStoreContractState.name} style={{ 'textTransform': 'capitalize' }}
            subtitle={'Balance: ' + eventStoreContractState.balance + ' Ether'}
            />
          <CardText>
            <div>
              <Table
                height={this.state.height}
                onRowSelection={this.onRowSelection}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                bodyStyle={{ overflow: 'visible' }}
                >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                  >
                  {this.renderTableHeaderFooter()}
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                  >
                  {isLoaded() &&
                    readModelToRows()
                  }
                </TableBody>
              </Table>
              <Dialog
                title='Authorization Change'
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleCloseDialog}
                >
                {this.state.dialogMessage}
              </Dialog>
            </div>
          </CardText>
          <CardActions style={{ textAlign: 'right' }}>
            {
              this.state.selectedRows.length ?
              <div>
                {this.hasAccess(this.state.selectedRows[0]) ?
                <FlatButton
                  label='Revoke'
                  primary
                  onTouchTap={this.handleRevoke}
                  />
                :
                <FlatButton
                  label='Grant'
                  primary
                  onTouchTap={this.handleGrant}
                  />}
              </div>
              :
              <div />
            }

          </CardActions>
        </Card>
      )
    }
  }
}
}
