import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const StudentStatus = () => {
    var Data
    const [StudentNumber, setStudentNumber] = useState(0)
    const [marks, setmarks] = useState(0)
    const [code, setcode] = useState("")
    const [subject, setsubject] = useState("")
    const [datar, setdatar] = useState([{
        code:"",
        subject:"",
        regno: 0,
        marks:0
    }])
    async function fetchStudentRecords (e) {
        
        const req = await fetch("http://localhost:5000/fetchStudentRecords",{
            method:"GET",
            headers:{
                "x-access-token":localStorage.getItem("token"),
                "Content-Type":"application/json",
                'Accept': 'application/json'
            },
        
        })
        // e.preventDefault();
        // const data = await req.json()
        const data = await req.json()
        // const result = JSON.stringify(data)
        // console.log("Data -> "+result )
        Data = data.data
        // console.log("Marks of Student -> "+data.marks)
        console.log("Length of data:"+(data.data).length)
        // const ListItems = data.map((item) => {
        //     <div className='student-data'>
        //         <h2>Code: {item.code}</h2>
        //         <h2>Subject: {item.subject}</h2>
        //         <h2>Marks: {item.marks}</h2>
        //     </div>
        // })
        // setcode(data.code)
        // setmarks(data.marks)
        // setsubject(data.subject)
        // setStudentNumber(data.regno)
        for(var i = 0; i < (data.data).length ; i++){
            Data[i].code = (data.data)[i].code;
            Data[i].subject = (data.data)[i].subject
            Data[i].regno = (data.data)[i].regno
            Data[i].marks = (data.data)[i].marks
        }
        setdatar(Data)
        setStudentNumber((data.data[0]).regno)
        console.log("Rishikesh Data -> "+JSON.stringify(datar))
    }
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(token){
        const user = token;
        fetchStudentRecords()
      }else{
          localStorage.removeItem("token")
          window.location.href = "/"
      }
    }, [])
    
  return (
      <div>
          <div className='login-pannel'>
            <h1 className='app-header'>Student Status</h1>
            
            <button className='login-button' onClick={fetchStudentRecords}>Show Status</button>
            <h2 className='app-header'>Data for {StudentNumber}</h2>
            {/* <div className='student-data'>
                <h2>{code}</h2>
                <h2>{subject}</h2>
                <h2 >{marks}</h2>
            </div> */}
            <div className='data'>
            {datar.map((item) => (
            <div className='student-data'>
                <h2>Code: {item.code}</h2>
                <h2>Subject: {item.subject}</h2>
                <h2>Marks: {item.marks}</h2>
            </div>
            ))}
            </div>
           
    
                
          </div>
        
      </div>
    
  )
}

export default StudentStatus