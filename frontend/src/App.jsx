import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
    </Routes>
  )
}

export default App
