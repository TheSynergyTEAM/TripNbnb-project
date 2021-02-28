import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'styles/global.less'
import axios from 'axios'

// global config of axios
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://tripnbnbserver.herokuapp.com'
    : 'http://localhost:3000'

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
