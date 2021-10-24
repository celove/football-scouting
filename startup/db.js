
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    mongoose.connect(config.get('db_url'))
        .then(() => {
            console.log('connected to MongoDB...');
        })
        .catch(err => console.error('error connecting to mongoDB: ' + err));
}