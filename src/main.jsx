import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './exams/router/Routes.jsx'
import { ThemeProvider } from './providers/ThemeProvider';
import { Provider } from 'react-redux'
import { store } from './app/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <ThemeProvider>
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
