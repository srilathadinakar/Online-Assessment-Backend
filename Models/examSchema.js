//examSchema
import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
