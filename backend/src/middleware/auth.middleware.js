const express=require("express")
const userModel=require("../models/user.model")
// accha ye middleware sirf blacklist karne ke liye banaya gaya hai

const tokenBlacklistModel=require("../models/blacklist.model")

const jwt= require("jsonwebtoken")


async function authUser(req,res,next){
    const token= req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided."
        })
    }

    const isTokenBlacklist= await tokenBlacklistModel.findOne({
        token
    })

    if(isTokenBlacklist){
        return res.status(401).json({
            message:"token is invalid"
        })
    }
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token."
        })
    }
    //blavklist ka matlab token blacklist aur 
}

module.exports={
    authUser
}