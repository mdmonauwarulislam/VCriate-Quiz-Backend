const express = require('express');
const Router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {createQuizWithQuestions, getQuizzes, getQuizById, submitQuiz  } = require('../controllers/quizController');

Router.post('/createquize', createQuizWithQuestions);
Router.get('/quizzes', getQuizzes);
Router.get('/quiz/:quizId', getQuizById);
Router.post('/submit', submitQuiz);

module.exports = Router;