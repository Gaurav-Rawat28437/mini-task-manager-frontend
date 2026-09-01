import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Register from './pages/Register'


function App() {
  return (
    <div>
      <Toaster/>

      <Routes>

        {/* <Route path="/" element={<Register/>}></Route> */}
        <Route path="/register" element={<Register/>}></Route>
        
      
      </Routes>
    </div>
  )
}

export default App
