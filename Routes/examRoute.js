//examRoute
import express from "express";
import { createExam, getAllExams } from "../Controllers/examController.js";

const router = express.Router();

router.post("/create", createExam);
router.get("/all", getAllExams);

export default router;