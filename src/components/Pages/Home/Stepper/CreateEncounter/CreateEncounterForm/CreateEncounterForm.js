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

import { CREATE_ENCOUNTER_FORM_NAME } from 'constants/formNames'

import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader } from 'material-ui/Card'


// validation functions
const required = value => (value == null ? 'Required' : undefined)

import classes from './CreateEncounterForm.scss'

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
            title='Encounter'
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
                name='lastMeal'
                component={TimePicker}
                format={null}
                // and redux-form defaults to ''
                hintText='When was your last meal?'
                validate={required}
              />
            </Row>

            <Row className={classes.settingRow}>
              <Field
                name='notes'
                component={TextField}
                hintText='Notes'
                floatingLabelText='Notes'
                multiLine
                rows={2}
              />
            </Row>
            <Row className={classes.settingRow}>
              <Field
                name='referral'
                component={AutoComplete}
                floatingLabelText='How did you find us?'
                openOnFocus
                filter={MUIAutoComplete.fuzzyFilter}
                dataSourceConfig={{ text: 'name', value: 'id' }}
                dataSource={[
                  { id: 0, name: 'Facebook' },
                  { id: 1, name: 'Yelp' },
                  { id: 2, name: 'TV Ad' },
                  { id: 3, name: 'Friend' },
                  { id: 4, name: 'Other' }
                ]}
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
  form: CREATE_ENCOUNTER_FORM_NAME
})(Form)

const getUser = (ReadModels) =>{
  let user
  Object.keys(ReadModels)
  .forEach((key) =>{
    let value = ReadModels[key]

    if (value.ReadModelType === 'MercuryEventStoreUser'){
      user = value
    }
  })

  return user
}

Form = connect(
  state => ({
    initialValues: {
      name: 'ENCOUNTER_' + Math.random().toString().substring(0, 6),
      notes: getUser(state.mercury.ReadModels).Name + ' was born ' + getUser(state.mercury.ReadModels).BirthDate,
      contractAddress: state.mercury.currentMercuryEventStoreAddress, 
      fromAddress: state.web3.defaultAddress 
    } 
  }),
  // { load: loadAccount }           
)(Form)

export default Form