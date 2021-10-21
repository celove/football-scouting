
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/scouting')
        .then(() => {
            console.log('connected to MongoDB...');
        })
        .catch(err => console.error('error connecting to mongoDB: ' + err));
}