import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  DEBUG_PATH,
  SIGNUP_PATH,
  ACCOUNT_PATH,
  PROJECTS_PATH
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/Pages/Home'
import DebugPage from './components/Pages/Debug'
import SignupPage from './components/Pages/Signup'
import AccountPage from './components/Pages/Account'
import ProjectsPage from './components/Pages/Projects'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={DEBUG_PATH} component={DebugPage} />
      <Route path={SIGNUP_PATH} component={SignupPage} />
      <Route path={ACCOUNT_PATH} component={AccountPage} />
      <Route path={PROJECTS_PATH} component={ProjectsPage} />
      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
