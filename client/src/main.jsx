import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/profilePage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: '',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
