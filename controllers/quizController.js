const QuizModel = require('../models/quizModel');
const QuestionModel = require('../models/questionModel');
const httpsStatusCode = require('../constants/httpsStatusCode');

// create a quiz and its associated questions
const createQuizWithQuestions = async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        // Create questions and store their ObjectIds
        const createdQuestions = await Promise.all(
            questions.map(async (question) => {
                return await QuestionModel.create({
                    question: question.question,
                    options: question.options, 
                    correctAnswer: question.correctAnswer
                });
            })
        );

        
        const newQuiz = await QuizModel.create({
            title,
            description,
            questions: createdQuestions.map(q => q._id)
        });

        return res.status(httpsStatusCode.CREATED).json({
            status: true,
            message: "Quiz created successfully with questions",
            data: newQuiz
        });
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
};

// get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizModel.find().populate('questions');
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Quizzes found",
            data: quizzes
        });
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
};


const getQuizById = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await QuizModel.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(httpsStatusCode.NOT_FOUND).json({
                status: false,
                message: "Quiz not found"
            });
        }

        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Quiz found",
            data: quiz
        });
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
};

// submit a quiz
const submitQuiz = async (req, res) => {
    const { quizId, answers } = req.body;

    try {
        const quiz = await QuizModel.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(httpsStatusCode.NOT_FOUND).json({
                status: false,
                message: "Quiz not found"
            });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score += 4; 
            }else{
                score -= 1;
            }
        });

        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Quiz submitted",
            data: { score, totalQuestions: quiz.questions.length }
        });
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
};

module.exports = { createQuizWithQuestions, getQuizzes, getQuizById, submitQuiz };
