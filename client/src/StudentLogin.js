import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const StudentLogin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Username = "+username)
        console.log("Password = "+password)
        const response = await fetch("https://student-management-system-seven.vercel.app/student/login" , {
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
      window.location.href = "/studentStatus"
    }else{
      alert("Invalid Login ID or Password")
    }
    }
  return (
    <div>
        <div>
        <h1 className='app-header'>Student Login</h1>
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

export default StudentLogin