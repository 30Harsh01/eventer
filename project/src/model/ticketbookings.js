// const { MongoServerClosedError } = require('mongodb')
const mongoose=require('mongoose')

const bookings=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
        required:true,
        unique:true,
    }

})

const bookingdata=new mongoose.model("bookingdata",bookings)

module.exports=bookingdata