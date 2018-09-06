import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from 'connected-react-router'

import reducer from './state/reducers/index'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
