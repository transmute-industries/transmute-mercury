import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  WEB3_PATH,
  LOGIN_PATH,
  ACCOUNT_PATH,
  PROJECTS_PATH,
  PROJECT_PATH,
  EVENT_STORE_SUMMARY
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/Pages/Home'
import Web3SettingsPage from './components/Pages/Web3'
import SignupPage from './components/Pages/Signup'
import AccountPage from './components/Pages/Account'
import ProjectsPage from './components/Pages/Projects'
import ProjectPage from './components/Pages/Projects/Project'

import EventStorePage from './components/Pages/EventStore'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={WEB3_PATH} component={Web3SettingsPage} />
      <Route path={LOGIN_PATH} component={SignupPage} />
      <Route path={ACCOUNT_PATH} component={AccountPage} />
      <Route path={PROJECTS_PATH} component={ProjectsPage} />
      <Route path={EVENT_STORE_SUMMARY} component={EventStorePage} />
      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
