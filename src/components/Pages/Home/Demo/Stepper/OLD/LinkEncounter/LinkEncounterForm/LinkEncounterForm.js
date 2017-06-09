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

import { LINK_ENCOUNTER_FORM_NAME } from 'constants/formNames'

import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader } from 'material-ui/Card'


const expiresTooLong = value => (value > 30 ? 'Longer expirations are less safe.' : undefined)


// validation functions
const required = value => (value == null ? 'Required' : undefined)

import classes from './LinkEncounterForm.scss'

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
            title='Link Encounter'
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
                name='expires'
                component={TimePicker}
                format={null}
                // and redux-form defaults to ''
                hintText='Expires'
                validate={required}
              />
            </Row>

            <Row className={classes.settingRow}>
              <Field
                name='readEvents'
                component={Toggle}
                label='Read Events'
                labelPosition='right'
              />
            </Row>
            <Row className={classes.settingRow}>
              <Field
                name='writeEvents'
                component={Toggle}
                label='Write Events'
                labelPosition='right'
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
  form: LINK_ENCOUNTER_FORM_NAME
})(Form)

Form = connect(
  state => ({
    initialValues: {
      name: 'USER_' + Math.random().toString().substring(0, 6),
      readEvents: true,
      writeEvents: false,
      contractAddress: state.mercury.currentMercuryEventStoreAddress, 
      fromAddress: state.web3.defaultAddress 
    } 
  }),
  // { load: loadAccount }           
)(Form)

export default Form