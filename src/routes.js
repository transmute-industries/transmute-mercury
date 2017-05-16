import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  DEBUG_PATH,
  SIGNUP_PATH
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/Pages/Home'
import DebugPage from './components/Pages/Debug'
import SignupPage from './components/Pages/Signup'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={DEBUG_PATH} component={DebugPage} />
      <Route path={SIGNUP_PATH} component={SignupPage} />
      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
