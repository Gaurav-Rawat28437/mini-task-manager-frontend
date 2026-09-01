import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Tasks from './pages/Tasks'



function App() {
  return (
    <div>
      <Toaster/>

      <Routes>

        
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        
        <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                

        </Route>

      
      </Routes>
    </div>
  )
}

export default App
