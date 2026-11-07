const express= require("express")
const cookieParser= require("cookie-parser")

const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials:true
}))

// ssaare routes ko yaha par require karna higa
const authRouter=require("./routes/authroutes")
const interviewRouter=require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports=app
