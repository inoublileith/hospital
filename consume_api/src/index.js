// import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './index.css'
import Register from './components/register'
import Login from './components/login'
import Connexion from './components/connexion'
import Welcom from './components/welcome'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
let path = window.location.pathname
const Layout = () => {
  let ret = '/'
  const { user: currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  let inter = '/'
  if (path === '/register') {
    inter = <Register />
    console.log('test', path)
    if (localStorage.getItem('isRefresh') === undefined) {
      localStorage.setItem('isRefresh', true)
      // window.location.reload()
    }
  } else if (path === '/login') {
    inter = <Login />
    console.log('test', path)
    if (localStorage.getItem('isRefresh') === undefined) {
      localStorage.setItem('isRefresh', true)
      // window.location.reload()
    }
  } else if (path === '/connexion') {
    inter = <Connexion />
    console.log('test', path)
    if (localStorage.getItem('isRefresh') === undefined) {
      localStorage.setItem('isRefresh', true)
      // window.location.reload()
    }
  } 

  if (path === '/') {
    inter = <Welcom />
    console.log('test', path)
    if (localStorage.getItem('isRefresh') === undefined) {
      localStorage.setItem('isRefresh', true)
      window.location.reload()
    }
  }
  currentUser ? (ret = <App/>) : (ret = inter)

  return ret
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
