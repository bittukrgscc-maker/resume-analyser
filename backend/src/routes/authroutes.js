const express=require("express")
const userModel=require("../models/user.model")
// const registerUserController=require("../controllers/auth.controller")
// const loginUserController=require("../controllers/auth.controlller")
// const logoutUsercobntroller=require("../controllers/auth.controlller")

const authController=require("../controllers/auth.controlller")
const authMiddleware=require("../middleware/auth.middleware")

const {Router}= require("express")

const authRouter= Router()

// ab routes bana createuserka 
// loginuserka
// ogoutuserka

authRouter.post("/register",authController.registerUserController)


authRouter.post("/login",authController.loginUserController)


authRouter.post("/logout",authController.logoutUsercobntroller)
authRouter.get("/logout",authController.logoutUsercobntroller)

authRouter.get("/get-me",authMiddleware.authUser, authController.getmeControlller)


module.exports= authRouter
