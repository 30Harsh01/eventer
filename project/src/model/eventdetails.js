const mongoose=require("mongoose")

const eventdata=new mongoose.Schema({
    createdby:{
        type:String,
        // required:true,
    },
    description:{
        type:String,
        // required:true
    },
    date:{
        type:String,
        // required:true
    },
    time:{
        type:String,
        // required:true,
    },
    venue:{
        type:String,
        // required:true
    },
    id:{
        type:String,
        unique:true
    }


})

const eventdetails=new mongoose.model("eventdetails",eventdata);
module.exports=eventdetails
