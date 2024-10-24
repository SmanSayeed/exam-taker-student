import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { persistor, store } from './app/store.js'
import Routes from './exams/router/Routes.jsx'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={Routes} />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
