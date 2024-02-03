import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className='app-wrapper'>
      <Outlet />
    </div>
  );
}

export default App
