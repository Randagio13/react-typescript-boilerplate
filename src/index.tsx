import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { registerObserver } from 'react-perf-devtool'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reducers from 'reducers'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import Routes from 'routes'
// TODO: set only develop mode
const cps = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(reducers, cps)
const { env: { NODE_ENV } } = process
// TODO: set only develop mode
if (registerObserver) {
  registerObserver()
}

const renderApp = (Component: any) => {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        {Component}
      </Provider>
    </AppContainer>
  ), document.getElementById('app'))
}

renderApp((
  <Router>
    <Routes />
  </Router>
))

if (Reflect.get(module, 'hot') !== undefined) {
  // tslint:disable-next-line:no-var-requires
  const nextApp = require('./components').default
  Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
}
