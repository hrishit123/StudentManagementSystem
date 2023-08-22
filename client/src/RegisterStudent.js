import React from 'react'
import { useState } from 'react'
const RegisterStudent = () => {
    const [name, setname] = useState("");
    const [regno, setregno] = useState("");
    const [mobno, setmobno] = useState("")
    function updateName(e){
        setname(e.target.value)
    }
    function updateRegno(e){
        setregno(e.target.value)
    }
    function updateMobile(e){
        setmobno(e.target.value)
    }
    async function handleSubmit(){
        console.log(name+" "+regno+" "+mobno)
        const response = await fetch("http://localhost:5000/registerStudentRecord" , {
        method:"POST",
        headers:{
        'Content-Type':"application/json"
        },
        body: JSON.stringify({
        name:name,
        regno:regno,
        mobno:mobno
      })
      
    })
    const data = await response.json()
    if(data.status === 'ok'){
        console.log("Student Added Successfully")
        window.location.href="/adminStatus";
    }
    }
  return (
    <div className='register-student'>
        <h1 className='app-header'>Register Student</h1>
        <input type="text" name="name" id="name" placeholder='Name' onChange={updateName}/><br></br>
        <input type="text" name="regno" id="regno" placeholder='Registration number' onChange={updateRegno} /><br></br>
        <input type="text" name="mobno" id="mobno" placeholder='Mobile Number' onChange ={updateMobile} />
        <br></br>
        <button className='login-button'onClick={handleSubmit}>Add Student</button>
    </div>
  )
}

export default RegisterStudent