import React, { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
function App() {

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/projects/:id' element={<ProtectedRoute><ProjectDetails/></ProtectedRoute>}/>
      <Route path='/projects' element={<ProtectedRoute><Projects/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
   </BrowserRouter>  
    </>
  )
}

export default App
