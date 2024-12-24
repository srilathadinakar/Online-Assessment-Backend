import Question from "../Models/queSchema.js";

export const createQuestion = async (req, res) => {
    try {
      const { questionText, options, correctAnswer, difficultyLevel } = req.body;
      const question = await Question.create({ questionText, options, correctAnswer, difficultyLevel });
      res.status(201).json({ message: "Question created successfully", question});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({message: "All Question Fetched successfully", questions});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params; 
    const { questionText, options, correctAnswer, difficultyLevel } = req.body;

    // Find the question by ID and update it
    const updatedQuestion = await Question.findByIdAndUpdate(
      id, 
      { questionText, options, correctAnswer, difficultyLevel }, 
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question updated successfully", question: updatedQuestion }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Question Deleted successfully", question});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






