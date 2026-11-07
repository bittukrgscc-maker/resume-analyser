const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controllers/interview.controller")


const interviewRouter=express.Router()

const uplaod=require("../middleware/file.middleware")


interviewRouter.post("/",authMiddleware.authUser,uplaod.single("resume"), interviewController.generateInterviewReportController)

// isme report milega by id
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

// ab wahi voh logged in user ka routes
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

//ab woh pdf wala v hoga routes

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports=interviewRouter
