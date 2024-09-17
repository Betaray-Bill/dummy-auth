import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
  const [state, setState] = useState("")

  axios.defaults.withCredentials = true;
  const addState = async(e) => {
    e.preventDefault()
    // Perform form submission logic here
    // console.log(formData)
    console.log(state)
    if(state.length > 0){
      try{
        const res = await axios.post('http://localhost:5000/api/location/addState', {name: state})
        const data = await res.data
        console.log(data)
        if(data.valid === false){
          navigate("/login")
        }
  
      }catch(e){
        console.log(e)
      }
    }
  }
  return (
        <form onSubmit={addState}>
          <input type="text" name="state" onChange={(e) => setState(e.target.value)} />
          <button type="submit">Add State</button>
        </form>
  )
}

export default Dashboard
