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

import { CREATE_USER_FORM_NAME } from 'constants/formNames'

import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader } from 'material-ui/Card'


// validation functions
const required = value => (value == null ? 'Required' : undefined)

import classes from './CreateUserForm.scss'

class Form extends Component {
  componentDidMount() {
    this.refs.name // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus() // on TextField
  }

  render() {
    const { handleSubmit, pristine, numPizzas, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            title='User'
          />
          <Grid fluid>
            <Row className={classes.settingRow}>
              <Field
                name='name'
                component={TextField}
                hintText='Name'
                floatingLabelText='Name'
                validate={required}
                ref='name'
                withRef
              />
            </Row>
            <Row className={classes.settingRow}>
              <Field
                name='role'
                component={TextField}
                hintText='Role'
                floatingLabelText='Role'
                validate={required}
                ref='role'
                withRef
              />
            </Row>
            <Row className={classes.settingRow}>
              <Field
                name='birthDate'
                component={DatePicker}
                format={null}
                hintText='Birthday'
                validate={required}
              />
            </Row>
          </Grid>
          <CardActions className={classes.actions}>
            <RaisedButton
              type='button'
              disabled={pristine || submitting}
              onClick={reset}
              label='Clear'
            />
            <RaisedButton
              style={{ marginRight: 'none' }}
              label='Save Changes'
              primary
              type='submit'
              disabled={submitting}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

Form = reduxForm({
  form: CREATE_USER_FORM_NAME
})(Form)

Form = connect(
  state => ({
    initialValues: {
      name: 'USER_' + Math.random(),
      role: 'Developer',
      contractAddress: state.mercury.currentMercuryEventStoreAddress, 
      fromAddress: state.web3.defaultAddress 
    } 
  }),
  // { load: loadAccount }           
)(Form)

export default Form