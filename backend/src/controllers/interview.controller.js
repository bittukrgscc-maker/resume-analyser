const pdfParse=require("pdf-parse");
const {generateInterviewReport,generateResumePdf} =require("../services/ai.service");

const interviewReportModel=require("../models/interviewReport.model")

async function generateInterviewReportController(req,res){
    const {selfDescription,jobDescription}=req.body
    if(!jobDescription || (!req.file && !selfDescription)){
        return res.status(400).json({ message:"Please provide a job description and either a PDF resume or a self-description." })
    }
    const resumeContent = req.file
        ? await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        : { text:"" }

    // kucch cheezein toh ai deg PHIR USKO HUM APNE actual wale mai daaleneghe
    const interViewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
        // ai ko jo jo ccheze lageneg ek toh pdf se extracted text, 
        // ek selfdescription, ek jobdescription
})

    const interviewReport= await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
   
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}

async function getInterviewReportByIdController(req,res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({
        _id:interviewId,
        user:req.user.id,
        
    })
     if(!interviewReport){
      return res.status(402).json({
         mesage:" interview report not found"
      })
   }
      return res.status(200).json({
         mesage:" interview fetched successfully.",
         interviewReport
      })
}

async function getAllInterviewReportsController(req,res){
    // jo login hai usek liye 
    const interviewReports=await interviewReportModel.find({
        user:req.user.id
    }).sort({
        createdAt:-1
    }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}

// ab ek resume pdf generate ke liye v kucch
async function generateResumePdfController(req,res){
    const {interviewReportId}=req.params

    const interviewReport=await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id })

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    const{resume ,jobDescription, selfDescription,}=interviewReport

    const pdfBuffer=await generateResumePdf({ resume, jobDescription, selfDescription})

    res.set({
        "Content-Type":"application/pdf",
        "Content-Disposition":`attachment;filename=resume_${interviewReportId}.pdf`
    })
    res.send(pdfBuffer)
}
module.exports={
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController

}
