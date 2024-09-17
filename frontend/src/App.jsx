import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {

  const [state, setState] = useState("")
  const addState = async(e) => {
    e.preventDefault()
    // Perform form submission logic here
    console.log(formData)
    console.log(state)
    if(state.length > 0){
      try{
        const res = await axios.post('http://localhost:5000/api/location/addState', {name: state})
        const data = await res.data
        console.log(data)
  
      }catch(e){
        console.log(e)
      }
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>

      {/* {
        user.name && 
        <form onSubmit={addState}>
          <input type="text" name="state" onChange={(e) => setState(e.target.value)} />
          <button type="submit">Add State</button>
        </form>
      } */}
    </div>
  )
}

export default App
