import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
// import global styles
import './styles/global.css'
// import fonts
import './styles/fonts.css'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from './app/IoC/container'
import { ApptrixApi } from './app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from './app/IoC/types'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
