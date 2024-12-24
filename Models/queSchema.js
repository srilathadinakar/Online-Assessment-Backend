import mongoose from "mongoose";
import cron from "node-cron";

const questionSchema = new mongoose.Schema({
    questionText: { 
        type: String, 
        required: true 
    },
    options: [{ 
        type: String
    }],
    correctAnswer: { 
        type: String 
    },
    difficultyLevel: { 
        type: String, 
        enum: ["easy", "medium", "hard"],
        topic: { type: String },
        subject: { type: String }
    }
    
});

const Question = mongoose.model("Question", questionSchema);

export default Question;