import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {
  DEBUG_PATH as DebugRoute
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/HomePage'
import DebugFormContainer from './components/DebugForm'

const routes = (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={DebugRoute} component={DebugFormContainer} />
      <Redirect from='*' to='/' />
    </Route>
  )
}

export default routes
