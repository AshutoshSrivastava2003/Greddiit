const mongoose=require("mongoose")
const Schema=mongoose.Schema
const subgreddiitSchema=new Schema({
    name:{
        type:String,
        // required:true,
        unique:1
    },
    description:{
        type:String,
        unique:0
        // required:true
    },
    tags:{
        type:Array,
        items:{
            type:String
            // unique:1
        },
        unique:0
        // trim:true
        // unique:1
    },
    banned_keywords:{
        type:Array,
        items:{
            type:String
            // unique:1
        },
        unique:0
        // trim:true
    },
    posts:{
        type:[String],
        items:{
            type:String
            // unique:1
        },
        unique:0
        // trim:true
    },
    followers:{
        type:Array,
        items:{
            type:String
        },
        unique:0
        // trim:true
    },
    owner:{
        type:String,
        unique:0
        // required:true,
    },
    requests:
    {
        type:Array,
        items:{
            type:String
        },
        unique:0
    }

})
module.exports=mongoose.model("subgreddiit",subgreddiitSchema)