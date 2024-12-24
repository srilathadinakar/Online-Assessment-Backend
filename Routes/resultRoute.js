import express from "express";
import { getResult, saveResult} from "../Controllers/resultController.js";

const router = express.Router();

router.post('/results', saveResult);
router.get('/results/:userId', getResult);

export default router;