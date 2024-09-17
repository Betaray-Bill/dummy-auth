import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password:"" 
      })
    
    const [user, setUser] = useState({})
      const navigate = useNavigate()

      axios.defaults.withCredentials = true;
  const handleSubmit = async(e) => {
    e.preventDefault()
    // Perform form submission logic here
    console.log(formData)

    try{
      await axios.post('http://localhost:5000/api/user/login', {email:formData.email, password:formData.password})
      .then(res => {
        console.log(res.data)
        setUser(res.data)
        if(res.data.isLogin){
            navigate("/dashboard")
        }else{
            navigate("/login")
        }
      })
      

    }catch(e){
      console.log(e)
    }
  }
    
  return (
    <form action="" onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})} />
        <input type="current-password" name="password" onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})} />
        <button type='submit'>Submit</button>
      </form>
  )
}

export default Login
