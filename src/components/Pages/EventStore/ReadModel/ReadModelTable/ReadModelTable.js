import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import {deepOrange500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'

// https://github.com/hyojin/material-ui-datatables/blob/master/example/src/Main.js
import DataTables from 'material-ui-datatables'

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16,
    color: deepOrange500,
  },
  footerToolbarStyle: {
    padding: '0 100px',
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
    accent1Color: deepOrange500,
  },
})

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'Type',
    label: 'Type',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }
]

const TABLE_DATA = [
  {
    Type: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    Type: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
]

export default class ReadModelTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
    this.handleNextPageClick = this.handleNextPageClick.bind(this)
    this.handlePersonAddClick = this.handlePersonAddClick.bind(this)
    this.handleInfoClick = this.handleInfoClick.bind(this)

    this.state = {
      data: TABLE_DATA,
      page: 1,
    }
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order)
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value)
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows)
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick')
    this.setState({
      data: TABLE_DATA,
      page: 1,
    })
  }

  handleNextPageClick() {
    console.log('handleNextPageClick')
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    })
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick')
  }

  handleInfoClick() {
    console.log('handleInfoClick')
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card style={{margin: 12}}>
              <DataTables
                title={'ReadModels'}
                titleStyle={styles.titleStyle}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={TABLE_DATA}
                showCheckboxes={false}
                showHeaderToolbar={true}
                footerToolbarStyle={styles.footerToolbarStyle}
                tableBodyStyle={styles.tableBodyStyle}
                tableStyle={styles.tableStyle}
                tableWrapperStyle={styles.tableWrapperStyle}
                count={100}
                toolbarIconRight={[
                  <IconButton
                    onClick={this.handlePersonAddClick}
                  >
                    <PersonAdd />
                  </IconButton>,
                  <IconButton
                    onClick={this.handleInfoClick}
                  >
                    <InfoOutline />
                  </IconButton>
                ]}
              />
            </Card>
      </MuiThemeProvider>
    )
  }
}
