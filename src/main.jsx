import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './app/store.js'
import Routes from './exams/router/Routes.jsx'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <ThemeProvider>
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
