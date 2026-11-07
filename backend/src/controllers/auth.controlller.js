const userModel=require("../models/user.model")
const  express=require("express")
const mongoose=require("mongoose")
const jwt= require("jsonwebtoken")
const bcrypt=require("bcrypt")

const isProduction = process.env.NODE_ENV === "production"
const authCookieOptions = {
   httpOnly: true,
   secure: isProduction,
   sameSite: isProduction ? "none" : "lax"
}

// isme register karne ke lye teen chchexzein lagi thi 
// username, email, pasword
async function registerUserController(req,res){
        const{username,email,password}=req.body

        // ab yahi par check laga do ki agar ye teeno nahi hait toh
        // hume koi invalid request bhej dena hai
        if(!username || !email || !password){
             return res.status(401).json({
                message:"please provide username,emil,password"
             })
        } // aacha ye check ilsiye lagaay agaya hai taaki agar koi v usr 
        // bina inn teeno ko bhare hue sign in  button ke usspe cl;ick kare toh usko 
        // ye error wala message jaayega

        // ab ek baar register ho gaya hai toh check karna hai
        // boh user already registertt hau toh cooki mai stpiore mkarke rrakgh do
         const isUserExists= await userModel.findOne({
            $or:[{username},{email}]
         })

         // agar user pehle se hi registered hai toh usko message bhejo ki sab sahi hai
         if(isUserExists){
            //isime uska paswword wagewra sab hash karo
            return res.status(201).json({
                message:"Acoount already existes with this email or uisername"
            })
         }

         // ab hash karna suru karo
         const hash= await bcrypt.hash(password,10)
         // sabse pehle voh bcrypt karo 16 digit mai

         // phir uske baad voh usko create kardo taaki pasword hash mai hi rahe
         const user= await userModel.create({
            username,
            email,
            password:hash
         })

         // ab jab account create  hua toh token mai save karenge

         const token=jwt.sign(
            {id:user._id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
         )

         // ab hume cookie ke saath response bhejna hai
         res.cookie("token",token,authCookieOptions)

         res.status(201).json({
            messsage:"User registerd successfully",
            user:{
               id:user._id,
               username:user.username,
               email:user.email
            }
         })
}
// ab login ke liyte jo jo cchshiaye voh  code karde
async function loginUserController(req,res){
   const{email,password}=req.body

   // ab check karenge ki email paasword jo bheja hai voh humafe database mai hai ya mahoi
   // agar database mi hai toh login kar denge
   // aur ccokie se usk data save kareneg
   const user=await userModel.findOne({email})

   // ab wahi agar user mkil gay toh kya karn ahiaa auar agar user nahi mila toh kya larnma hai
   // bas eahi check lagao

   if(!user){
      return res.status(401).json({
         message:"invalid email address"
      })
   }

   // ab agar humne dekh liya hai ki  email sahi hai toh ab iska psword jo daalega a
   // voh ahsh mai hpna chahiye


   // tip-- har baar ye ek naya variable bana rahe hai taaki hum us[e operation laga sake]
   const isPasswordValid= await bcrypt.compare(password, user.password)

   // haa yahi par  chcek karlo ki iska paaswprd sahi hai ya nahi

   // agar nahi hai toh fir se error
   if(!isPasswordValid){
      return res.status(402).json({
         mesage:" pasword is unmatched"
      })
   }

   // ab wahi agar dono sahio hai toh token bana ke bhej do
   const token=jwt.sign(
      { id: user._id , username:user.username},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
   )

   // ab jab token mi save ho gaya toh ab hum isko 
   // ab hume isko sednd karbna hoga response side par ki user login ho gay ahai
   
   res.cookie("token",token,authCookieOptions)
   res.status(201).json({
      message:"login suce4ssfully",
      user:{
         id:user._id,
         username:user.username,
         email:user.email
      }
   })
}

// ab jab login ho  gaya hai toh ab hume vohg dekhna hoag logout waala 

async function logoutUsercobntroller(req,res){

   // ab isme hume voh token hatana hpga
   // aur voh token haatene ke baad cookie hata na hoga


   // humara jo token hota hai voh save hota hai cookies mai
    const token= req.cookies.token

    res.clearCookie("token",authCookieOptions)
    res.status(200).json({
      message:"User logout SuccessFully"
    })
}

// ek ab ye getme controller bhi aayega
async function getmeControlller(req,res){
   const user = await userModel.findById(req.user.id)

   res.status(201).json({
      message:"User details fetched successfully ",
      user:{
         id:user._id,
         username:user.username,
         email:user.email
      }
   })
}

module.exports={
   registerUserController,
   loginUserController,
   logoutUsercobntroller,
   getmeControlller
}
