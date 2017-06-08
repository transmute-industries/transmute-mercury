import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { Grid, Row } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader } from 'material-ui/Card'

import { WEB3_SETTINGS_FORM_NAME } from 'constants/formNames'
import classes from './Web3SettingsForm.scss'
import MenuItem from 'material-ui/MenuItem'

import {
  SelectField
} from 'redux-form-material-ui'

export const Web3SettingsForm = ({ web3, handleSubmit, submitForm, submitting }) => (
  <form onSubmit={handleSubmit} className={classes.container} >
    <Card className={classes.card}>
      <CardHeader
        title='Debug Settings'
      />
      <Grid fluid>
        <Row className={classes.settingRow}>
          <h3>Web3 Provider</h3>
          <Field style={{ width: '100%' }} name='provider' component={SelectField} hintText='Select a provider'>
            <MenuItem value='testrpc' primaryText='Test RPC' />
            <MenuItem value='metamask' primaryText='MetaMask' />
            <MenuItem value='infura' primaryText='Infura' />
            <MenuItem value='parity' primaryText='Parity' />
          </Field>
        </Row>
        <Row className={classes.settingRow}>
          <h3>Default Address</h3>
          <Field style={{ width: '100%' }} name='defaultAddress' component={SelectField} hintText='Select a default Address'>
            {
              web3.addresses.map((address) => {
              return <MenuItem key={address} value={address} primaryText={address}/>
            })
            }
          </Field>
        </Row>
      </Grid>
      <CardActions className={classes.actions}>
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

const form = reduxForm({
  form: WEB3_SETTINGS_FORM_NAME,
  enableReinitialization: true
})(Web3SettingsForm)

export default connect(
  ({ web3 }) => ({
    initialValues: web3
  }),
)(form)
