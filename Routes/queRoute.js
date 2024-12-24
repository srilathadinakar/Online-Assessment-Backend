import express from "express";
import { createQuestion, deleteQuestion, getAllQuestions,  updateQuestion } from "../Controllers/queController.js";
import { authMiddleware } from "../Middleware/authMiddleware";
import { adminMiddleware } from "../Middleware/authMiddleware";


const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createQuestion);
router.get("/allque", getAllQuestions);
router.put("/update/:id", authMiddleware, adminMiddleware, updateQuestion);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteQuestion);


export default router;