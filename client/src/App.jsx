import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context' 
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage'
import { FaGamepad } from "react-icons/fa";

const httpLink = createHttpLink({ uri: '/graphql' })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token? `token holder ${token}`: '' 
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className='app-wrapper'>
          <div className='app-container'>
            <header className="app-header">
              <div className="app-logo">
                <FaGamepad />
              </div>
              <h1 className="app-title">VGH</h1>
            </header>
            <Outlet />
          </div>
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
