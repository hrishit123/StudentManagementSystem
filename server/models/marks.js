const mongoose = require("mongoose")

const Marks = new mongoose.Schema({
    code:{type:String , required:true},
    subject:{type:String , required:true},
    regno:{type:String , required:true},
    marks:{type:Number , required:true}
},
{collection:"marks"})
const model = mongoose.model("marks" , Marks)

module.exports = model