import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app-wrapper'>
      <div className='app-container'>
      <Outlet />

      </div>
      
    </div>
  );
}

export default App
