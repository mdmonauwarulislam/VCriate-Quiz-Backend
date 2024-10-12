const mongoose = require('mongoose');

const dbConnection =  (url) => {
    mongoose.connect(url);
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connected successfully');
});

module.exports = {dbConnection};