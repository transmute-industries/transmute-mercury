import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { LOGIN_PATH } from 'constants/paths'
import { UserIsNotAuthenticated } from 'utils/authWrapper'

import classes from './SignupPage.scss'

import RaisedButton from 'material-ui/RaisedButton'


@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class SignupPage extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  state = {
    snackCanOpen: false
  }

  handleSignup = (creds) => {
    this.setState({
      snackCanOpen: true
    })

    // Make changes here to support address based logins...
    const { createUser, login } = this.props.firebase
    createUser(creds, { email: creds.email, username: creds.username })
      .then(() => {
        login(creds)
      })
  }
  providerLogin = (provider) => {
    this.setState({
      snackCanOpen: true
    })
    this.props.firebase.login({ provider })
  }

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state
    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <h1>Welcome </h1>
          <h3>This test application only supports google auth for demo purposes.</h3>
          <br/>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </Paper>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={() => this.setState({ snackCanOpen: false })}
            />
        }
      </div>
    )
  }
}
