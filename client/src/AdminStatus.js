import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminNavBar from './AdminNavBar'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const AdminStatus = () => {
    const [datar, setdata] = useState([{
        name:"",
        regno:"",
        mobno:""
    }])
    const [name, setname] = useState("")
    const [regno, setregno] = useState("")
    const [mobno, setmobno] = useState("")
    async function showStudentRecords(){
        const req = await fetch("http://localhost:5000/adminStudentRecords",{
            method:"GET",
            headers:{
                "x-access-token":localStorage.getItem("token"),
                "Content-Type":"application.json",
                "Accept":"application/json"
            },
        })
        const data = await req.json()
        console.log(JSON.stringify(data.data))
        const Data = data.data
        for(var i = 0; i < (data.data).length ; i++){
            Data[i].name = (data.data)[i].name;
            Data[i].mobno = (data.data)[i].mobno
            Data[i].regno = (data.data)[i].regno
            
        }
        setdata(Data)
        console.log("Datar -> "+JSON.stringify(datar))
        console.log("Length -> "+datar.length)
    }
    async function deleteData(e){
        const namer = e.target.getAttribute("data-uid");
        console.log(namer);
        const response = await fetch("http://localhost:5000/deleteStudentRecord" , {
        method:"DELETE",
        headers:{
        'Content-Type':"application/json"
        },
        body: JSON.stringify({
        name:namer
      })
      
    })
    const data = await response.json()
        if(data.status === "ok"){
            console.log(namer+" Deleted");
            window.location.href = "/adminStatus"
        }
    }
    async function updateData(e){
        const namer = e.target.getAttribute("data-uid")
        console.log(namer);
        const response = await fetch("http://localhost:5000/updateStudentRecord" , {
        method:"PUT",
        headers:{
        'Content-Type':"application/json"
        },
        body: JSON.stringify({
        name:namer,
        newname:name,
        regno:regno,
        mobno:mobno
      })
      
    })
    const data = await response.json()
    if(data.status==="ok"){
        alert("Update Successful")
        window.location.href = "/adminStatus"
    }else{
        alert("Update Unsuccessful")
        window.location.href("/adminStatus")
    }
    
    }
    function newName(e){
        setname(e.target.value);
    }
    function newRegno(e){
        setregno(e.target.value);
    }
    function newMobno(e){
        setmobno(e.target.value);
    }
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(token){
        const user = token;
        showStudentRecords()
      }else{
          localStorage.removeItem("token")
          window.location.href = "/"
      }

    }, [])
  return (
    <div>
        <h1 className='app-header'>Admin Pannel</h1>
        <AdminNavBar></AdminNavBar>
        <br></br>
        <div className='data-table'>
            {datar.map((item) =>(
                // 
                    <div className='student-list'>
                    <h1 className='student-name'>{item.name}</h1>
                    <Popup trigger={<button className='update-button' data-uid={item.name}>Update</button>}>
                    <input type="text"placeholder='Name'onChange={newName} value={item.name}></input>
                    <input type="text"placeholder='Registration Number'onChange={newRegno} ></input>
                    <input type="text"placeholder='Mobile Number'onChange={newMobno} ></input>
                    <button data-uid={item.name} className='update-button'onClick={updateData}>Update Data</button>
                    </Popup>
                    <button className='update-button' data-uid={item.name} onClick={deleteData}>Delete</button>
                    
                    </div>
                    
                // </div>
                
            ))}

        </div>
        
        </div>
  )
}

export default AdminStatus