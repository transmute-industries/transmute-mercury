import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  WEB3_PATH,
  LOGIN_PATH,
  ACCOUNT_PATH,
  PROJECTS_PATH,
  PROJECT_PATH,
  EVENTS_PAGE,
  READ_MODEL_PATH,
  PROJECTION_PATH,
  FACTORY_PATH
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/Pages/Home'
import Web3SettingsPage from './components/Pages/Web3'
import SignupPage from './components/Pages/Signup'
import AccountPage from './components/Pages/Account'
import ProjectsPage from './components/Pages/Projects'
import ProjectPage from './components/Pages/Projects/Project'


import ReadModelPage from './components/Pages/EventStore/ReadModel'
import ProjectionPage from './components/Pages/EventStore/Projection'
import FactoryPage from './components/Pages/EventStore/Factory'
import EventsPage from './components/Pages/EventStore/Events'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={WEB3_PATH} component={Web3SettingsPage} />
      <Route path={LOGIN_PATH} component={SignupPage} />
      <Route path={ACCOUNT_PATH} component={AccountPage} />
      <Route path={PROJECTS_PATH} component={ProjectsPage} />
      
      <Route path={READ_MODEL_PATH} component={ReadModelPage} />
      <Route path={PROJECTION_PATH} component={ProjectionPage} />

      <Route path={FACTORY_PATH} component={FactoryPage} />
      <Route path={EVENTS_PAGE} component={EventsPage} />

      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
