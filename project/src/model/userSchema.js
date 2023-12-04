const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")

const Data=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }

})

Data.pre("save", async function(next) {
    if (this.isModified("password")) {
        const hashPassword = await bcryptjs.hash(this.password, 10);
        this.password = hashPassword;
        this.cpassword=undefined
    }
    next();
})



const userDataregistration=new mongoose.model("userData",Data)
module.exports=userDataregistration