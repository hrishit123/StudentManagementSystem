const express = require("express")
const app = express();
const cors = require("cors")
const Student = require("./models/student")
const Admin = require("./models/admin")
const mongoose = require("mongoose")
const Marks= require("./models/marks")
const jwt = require("jsonwebtoken");
const { json } = require("express");

app.use(cors())//for cross origin
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/studentDB")
app.post("/student/login",async(req , res) => {
    const student = await Student.findOne({regno:req.body.username, password:req.body.password})
    if(student){
        console.log(req.body.regno+" Logged In")
        const token = jwt.sign({
            username:student.regno,
        },"celebal")
        console.log(token)
        return res.json({status:'ok',user:token})
    }else{
        
        console.log(req.body.username+" Is invalid")
        return res.json({status:'error',user:false})
    }
})
app.post("/admin/login",async(req , res) => {
    const admin = await Admin.findOne({id:req.body.username, password:req.body.password})
    if(admin){
        console.log(req.body.regno+" Logged In")
        const token = jwt.sign({
            username:admin.id,
        },"celebal")
        console.log(token)
        return res.json({status:'ok',user:token})
    }else{
        
        console.log(req.body.username+" Is invalid")
        return res.json({status:'error',user:false})
    }
})
app.get("/fetchStudentRecords",async (req , res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token , "celebal");
        console.log("Token -> "+decoded.username)
        const data = await Marks.find({regno:decoded.username})
        const response = JSON.stringify(data)
        console.log(data)
        // console.log("Data of the Student -> "+response)
        // console.log("Marks -> "+data.marks)
        // return res.json({code:data.code , subject: data.subject , regno: data.regno , marks: data.marks , status:"ok"})
        return res.json({data:data,status:"ok"})

    }catch(error){
        console.log(error)
        return res.json({status:"error", error:error})
    }
})
app.get("/adminStudentRecords", async (req,res) => {
    const data = await Student.find()
    if(data){
        console.log(data)
        return res.json({data:data,status:"ok"})
    }else{
        console.log("Error")
        return res.json({erroe:"error"})
    }
    
})
app.post("/registerStudentRecord",async(req , res) => {
    const studentData = await new Student({name:req.body.name,
    regno:req.body.regno,
    password:"student123",
    mobno:req.body.mobno});
    studentData.save((err , stu) => {
        if(err){
            console.log("Error in Adding Student")
            return res.json({status:"error"})
        }else{
            console.log(stu.name+" Saved");
            return res.json({status:"ok"})
        }
    })
})
app.delete("/deleteStudentRecord",async(req,res) => {
    console.log(req.body.name)
    const deleteStudent = await Student.deleteOne({name:req.body.name})
    console.log(deleteStudent)
    if(deleteStudent){
        console.log(req.body.name+" Deleted Successfully")
        return res.json({status:"ok"})
    }else{
        console.log("Deletion Unsuccessful")
        return res.json({status:"error"})
    }
})
app.put("/updateStudentRecord", async(req,res) => {
    console.log(req.body)
    try{
        const updateData = await Student.updateOne({name:req.body.name},{$set:{
            regno:req.body.regno,
            mobno:req.body.mobno
        }})
        return res.json({status:"ok"})
    }catch(err){
        console.log("Error in Updating the Data")
        return res.json({status:"error"})
    }
    
})
app.listen(5000 , () => {
    console.log("Server Running on port 5000")
})