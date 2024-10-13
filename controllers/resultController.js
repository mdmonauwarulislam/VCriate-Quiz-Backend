const resultModel = require('../models/resultModel');
import httpsStatusCode from '../constants/httpsStatusCode';

const getQuizResults = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const results = await resultModel.findOne({ userId }).populate('quizId', 'title');

        if (!results || results.length === 0) {
            return res.status(httpsStatusCode.BAD_REQUEST).json({ 
                status: false, 
                message: 'No results found for this user.'
            });
        }
        return res.status(httpsStatusCode.OK).json({ 
            status: true, 
            message: 'Results found',
            date : results 
        });
    } catch (error) {
        console.error(error);
        res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({ 
            status: false, 
            message: 'Server error' ,
            error: error.message
        });
    }
};

module.exports = { getQuizResults };
