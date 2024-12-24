//examController
import Exam from "../Models/examSchema.js";

export const createExam = async (req, res) => {
    try {
        const { name, questions, duration, startTime, endTime } = req.body;
        const exam = new Exam({ name, questions, duration, startTime, endTime });
        await exam.save();
        res.status(201).json({ message: "Exam created successfully", exam });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json({ message: "All Exams Fetched successfully", exams });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};