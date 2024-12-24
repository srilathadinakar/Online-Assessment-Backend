import Result from '../Models/resultSchema.js';

export const saveResult = async (req, res) => {
    try {
        const { userId, userName, questionsAttempted, score, percentageScore } = req.body;

        const result = new Result({ userId, userName, questionsAttempted, score, percentageScore });
        await result.save();
        res.json({ message: 'Result saved successfully',result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};

//calculate results based on user submission
const calculateResult = (questionsAttempted) => {
    let score = 0;

    questionsAttempted.forEach((question) => {
        if (question.userAnswer === question.correctAnswer) {
            score++;
        }
    });

    return score;
};


//get results of a user
export const getResult = async (req, res) => {
    try {
        const result = await Result.findOne({ userId: req.params.userId });
        res.json({result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
