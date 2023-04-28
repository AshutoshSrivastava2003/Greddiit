const mongoose=require("mongoose")
const Schema=mongoose.Schema
const postSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    posted_by:{
        type:String,
        required:true
    },
    posted_in:{
        type:String,
        required:true,
    },
    upvotes:{
        type:String,
        required:true,
    },
    downvotes:{
        type:String,
        required:true,
    },
    // userId:{
    //     type:String,
    //     required:true,
    // },
    // subGreddiitId:{
    //     type:String,
    //     required:true,
    // }
})
module.exports=mongoose.model("post",postSchema)