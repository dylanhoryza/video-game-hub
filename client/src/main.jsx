import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import BlogPage from './pages/BlogPage.jsx'; // list path here 
import CreatePostPage from './pages/CreatePostPage.jsx';
import UserPostsPage from './pages/UserPosts.jsx';
import SoloThread from './pages/SoloThread.jsx';

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
      },
      {
        path: '/blog',
        element: <BlogPage />
      },
      {
        path: '/create-post',
        element: <CreatePostPage />
      },
      {
        path: '/user-posts',
        element: <UserPostsPage />
      },
      {
        path: '/solo-thread/:postId',
        element: <SoloThread />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
