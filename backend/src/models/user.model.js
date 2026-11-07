const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true,  // matlab sureuat aur aakhri ka space hata dega
        lowercase :true,
        unique:[true, "Email already exists."],
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
    },
    password:{
        type:String,
        required:[true, "password is required"],
        minlength:[6,"password should contain 6 character"],
    },
    username:{
        type:String,
        required:true,
        unique:[true, "username already exists."],
    }
    
},{
    timestamps:true
})

const userModel=mongoose.model("User",userSchema);

module.exports=userModel


