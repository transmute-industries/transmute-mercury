import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MuiEditableTable from "mui-editable-table"

export default class AuthorizeEncounterTable extends Component {

  render() {
      const shouldBeReadOnly = function(rowData) {
          return rowData['title'] != 'Mrs'
      }

      const colSpec = [
          {title: 'Title', fieldName: 'title', inputType: "SelectField", selectOptions: ["Mr", "Mrs", "Miss", "Other"], width: 200, defaultValue: 'Mr'},
          {title: 'Name', fieldName: 'foreName', inputType: "TextField", width: 200},
          {title: 'Surname', fieldName: 'surname', inputType: "TextField", width: 200},
          {title: 'Maiden Name', fieldName: 'maidenName', inputType: "TextField", width: 200, isReadOnly: shouldBeReadOnly},
          {title: 'Employed', fieldName: 'employed', inputType: "Toggle", width: 200}
      ]

      const rowData = [
          { title: 'Mr', foreName: 'John', surname: 'Smith', employed: true},
          { title: 'Miss', foreName: 'Emily', surname: 'Lockhart', employed: false},
          { title: 'Mrs', foreName: 'Marilyn', surname: 'Monroe', employed: true}
      ]

      const onChange = (dataTable) => {
          console.log(dataTable)
      }

      return (
      <MuiThemeProvider>
          <MuiEditableTable
              colSpec={colSpec}
              rowData={rowData}
              onChange={onChange}
              reorderable={true}
          />
      </MuiThemeProvider>
    )
  }
}