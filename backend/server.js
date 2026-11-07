require("dotenv").config()
// const express=require("express")
const app= require("./src/app")
const {resume,selfDescription,jobDescription}=require("./src/services/ai.service")
const generateInterViewReport=require("./src/services/ai.service")
// const port=3000;
const connectToDB=require("./src/config/database")

// generateInterViewReport({resume,selfDescription,jobDescription})
connectToDB()
app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})

