import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
// import global styles
import './styles/global.css'
// import fonts
import './styles/fonts.css'
import { BrowserRouter } from 'react-router-dom'
import { createStore, StoreContext } from './app/IoC/container'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={createStore()}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
