import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String },
     questionsAttempted: [{
      questionId: { type: String, required: true },
      questionText: { type: String },
      userAnswer: { type: String },
      correctAnswer: { type: String }
    }],
    score: { type: Number },
    percentageScore:{type: Number},
   
    timestamp: { type: Date, default: Date.now }
  });
  
const Result = mongoose.model('Result', resultSchema);

export default Result;