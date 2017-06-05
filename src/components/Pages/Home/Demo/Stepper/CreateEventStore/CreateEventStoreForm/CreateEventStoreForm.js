import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'

// https://github.com/erikras/redux-form-material-ui/blob/master/example/src/Form.js

import { CREATE_EVENT_STORE_FORM_NAME } from 'constants/formNames'

import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader } from 'material-ui/Card'


// validation functions
const required = value => (value == null ? 'Required' : undefined)

import classes from './CreateEventStoreForm.scss'

class Form extends Component {
  componentDidMount() {
    // this.refs.name // the Field
    //   .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    //   .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    //   // .focus() // on TextField
  }

  render() {
    const { handleSubmit, pristine, numPizzas, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} className={classes.container}>
       <RaisedButton
          style={{ marginRight: 'none' }}
          label='Create Store'
          primary
          type='submit'
          disabled={submitting}/>
      </form>
    )
  }
}

Form = reduxForm({
  form: CREATE_EVENT_STORE_FORM_NAME
})(Form)

Form = connect(
  state => ({
    initialValues: {
      fromAddress: state.mercury.defaultAddress 
    } 
  }),
  // { load: loadAccount }           
)(Form)

export default Form