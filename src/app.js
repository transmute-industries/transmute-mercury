import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'

// Theming/Styling
import Theme from 'theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { getWeb3Accounts } from './store/ethereum/web3'


import routes from './routes'
import createStore from './store/createStore'

const initialState = window.___INITIAL_STATE__
export const store = createStore(initialState)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(getWeb3Accounts())

import TransactionSnackbarContainer from 'components/common/TransactionSnackbar'

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  static propTypes = {
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { routes, history, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history}>
            {routes}
          </Router>
          <TransactionSnackbarContainer />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(
  <AppContainer
    store={store}
    history={history}
    routes={routes(store)}
  />,
  document.getElementById('mount')
)
