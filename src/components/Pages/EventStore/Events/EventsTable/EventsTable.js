import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'

// https://github.com/hyojin/material-ui-datatables/blob/master/example/src/Main.js
import DataTables from 'material-ui-datatables'

import { browserHistory } from 'react-router'
const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16
  },
  footerToolbarStyle: {
    padding: '0 100px',
    display: 'none'
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
}

const muiTheme = getMuiTheme({
  palette: {
    // accent1Color: deepOrange500,
  },
})

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'meta.id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
  },
  {
    key: 'meta.txOrigin',
    label: 'Creator',
    sortable: true,
  },
  {
    key: 'meta.created',
    label: 'Created',
    sortable: true,
  }
]

import { connect } from 'react-redux'
import Mercury from 'store/ethereum/mercury'

@connect(
  ({ mercury }) => ({
    mercury: mercury
  }),
  {
    getEventStoresByCreator: (bindingModel) => (dispatch) => {
      console.log('bindingModel: ', bindingModel)
      // dispatch(Mercury.getEventStoresByCreator(bindingModel))
    },
    createEventStore: (bindingModel) => (dispatch) => {
      console.log('bindingModel: ', bindingModel)
      // dispatch(Mercury.createEventStore(bindingModel))
    },

  }
)
export default class EventsTable extends Component {

  componentWillReceiveProps = (nextProps) =>{
      console.log('set state here...', nextProps.mercury.transmuteEvents)
      this.setState({
        data: nextProps.mercury.transmuteEvents
      })
  }

  constructor(props, context) {
    super(props, context)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
    this.handleNextPageClick = this.handleNextPageClick.bind(this)
    this.handleCreateNewEventStoreClick = this.handleCreateNewEventStoreClick.bind(this)
    this.handleRefreshFactoryEventStoresClick = this.handleRefreshFactoryEventStoresClick.bind(this)

    this.state = {
      data: this.props.mercury.transmuteEvents,
      page: 1,
    }
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order)
    let data = _.sortBy(this.props.mercury.transmuteEvents, [key])
    if (order === 'desc'){
      data.reverse()
    }
    this.setState({
      data: data
    })
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value)
    let data = this.props.mercury.transmuteEvents
    if (value !== ''){
      data = _.filter(data, _.matches({ 'type': value }))
    }
     this.setState({
        data: data
      })
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleRowSelection(selectedRows) {
    // console.log('selectedRows: ' + selectedRows)
    // let selectedEs = this.props.mercury.transmuteEvents[selectedRows]
    // console.log('selectedEs.contractAddress: ', selectedEs.contractAddress)
    // browserHistory.push(`/eventstore/${selectedEs.contractAddress}/events`)
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick')
    // this.setState({
    //   data: this.props.mercury.transmuteEvents,
    //   page: 1,
    // })
  }

  handleNextPageClick() {
    console.log('handleNextPageClick')
    // this.setState({
    //   data: this.props.mercury.transmuteEvents,
    //   page: 2,
    // })
  }

  handleCreateNewEventStoreClick() {
    console.log('handleCreateNewEventStoreClick')
     this.props.createEventStore({
      fromAddress: this.props.mercury.defaultAddress
    })
  }

  handleRefreshFactoryEventStoresClick() {
    console.log('handleRefreshFactoryEventStoresClick')
    this.props.getEventStoresByCreator({
      fromAddress: this.props.mercury.defaultAddress
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card style={{margin: 12}}>
              <DataTables
                title={'Events'}
                titleStyle={styles.titleStyle}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={this.state.data}
                showCheckboxes={false}
                showHeaderToolbar={true}
                footerToolbarStyle={styles.footerToolbarStyle}
                tableBodyStyle={styles.tableBodyStyle}
                tableStyle={styles.tableStyle}
                tableWrapperStyle={styles.tableWrapperStyle}
                count={100}
                onRowSelection={this.handleRowSelection}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
               
              />
            </Card>
      </MuiThemeProvider>
    )
  }
}

//  toolbarIconRight={[
//                   <IconButton
//                     onClick={this.handleCreateNewEventStoreClick}
//                   >
//                     <FileCreateNewFolder />
//                   </IconButton>,
//                   <IconButton
//                     onClick={this.handleRefreshFactoryEventStoresClick}
//                   >
//                     <NavigationRefresh />
//                   </IconButton>
//                 ]}