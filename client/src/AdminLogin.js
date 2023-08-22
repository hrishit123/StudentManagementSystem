import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const AdminLogin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Username = "+username)
        console.log("Password = "+password)
        const response = await fetch("http://localhost:5000/admin/login" , {
        method:"POST",
        headers:{
        'Content-Type':"application/json"
        },
        body: JSON.stringify({
        username,
        password
      })
      
    })
    const data = await response.json()
    if(data.user){
        localStorage.setItem("token",data.user)
      alert("Login Successful")
      window.location.href = "/adminStatus"
    }else{
      alert("Invalid Login ID or Password")
    }
    }
  return (
    <div>
        <div>
        <h1 className='app-header'>Admin Login</h1>
        <div className='login-pannel'>
        <input type="text" placeholder="Username" className='inputs' onChange={(e) => {
            setusername(e.target.value)
            
        }}></input>
        <br></br>
        <input type="password" placeholder="Password" className='inputs' onChange={(e) => {
            setpassword(e.target.value)
        }}></input>
        <br></br>
        <button className='login-button' onClick={handleSubmit}>Login</button>
        </div>
    </div>
    </div>
  )
}

export default AdminLogin