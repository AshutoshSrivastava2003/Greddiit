const mongoose=require("mongoose")
const Schema=mongoose.Schema
const reportSchema=new Schema({
    reported_by:{
        type:String,
        required:true
    },
    reported_user:{
        type:String,
        required:true
    },
    concern:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("report",reportSchema)