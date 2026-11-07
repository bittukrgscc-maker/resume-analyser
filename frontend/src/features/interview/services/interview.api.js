import axios from "axios";
const api= axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

// isme kucch kuch backend se frontend ko connect ke liye likh gaya hai

export const generateInterViewReport=async ({ jobDescription , selfDescription , resumeFile})=>{
     const formData= new FormData()
     formData.append("jobDescription",jobDescription)
     formData.append("selfDescription",selfDescription)
     formData.append("resume",resumeFile)

     const response=await api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
     })
     return response.data
}

// interview report interview id se v toh hai

export const getInterviewReportById=async (interviewId)=>{
     const response=await api.get(`/api/interview/report/${interviewId}`)

     return response.data
}

// ab fir ek bacha logged in wala aur ek padf wala

export const getAllInterviewReports=async ()=>{
    const response= await api.get("/api/interview")

    return response.data
}

export const generateResumePdf= async ({ interviewReportId})=>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob"
        // pdf ko pdf ke hi format mai karna hia toh blob
        // blob matlab binary large object
        // pdf  ko json mai nahi bali pdf mai rakhne ke liye hum blob use kartye hai
    })
    return response.data
}
