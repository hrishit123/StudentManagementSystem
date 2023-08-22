const mongoose = require("mongoose")

const Student = new mongoose.Schema({
    name:{type:String, required:true},
    regno:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    mobno:{type:String , required:true}
},
{collection:"students"})
const model = mongoose.model("students" , Student)

module.exports = model