import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  DEBUG_PATH
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/Pages/Home'
import DebugPage from './components/Pages/Debug'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={DEBUG_PATH} component={DebugPage} />
      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
