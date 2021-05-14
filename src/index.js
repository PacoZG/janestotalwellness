import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './i18n'
import './index.css'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="loading...">
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
)
