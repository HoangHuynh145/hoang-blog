import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from "./context/ThemeContext"
import { PostProvider } from "./context/PostContext"
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import client from "./graphql-client/clientConfig"
import { PopupProvider } from './context/PopupContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <PopupProvider>
            <PostProvider>
              <BrowserRouter>
                <ApolloProvider client={client} >
                  <App />
                </ApolloProvider>
              </BrowserRouter>
            </PostProvider>
          </PopupProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
