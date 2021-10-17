const config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();
const jogadores = require('./routes/jogadores');
const home = require('./routes/home');
const mongoose = require('mongoose');
//Configuration
console.log('Application name: ' + config.get('name'));

if (app.get('env' === 'development')) {
    console.log('Running on dev');
}

app.use(morgan('tiny'));
app.use(express.json());

//mongoDB
mongoose.connect('mongodb://localhost:27017/scouting')
    .then(() => {
        console.log('connected to MongoDB...');
    })
    .catch(err => console.error('error: ' + err));

//routes
app.use('/api/jogadores', jogadores);
app.use('/api/home', home);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server iniciado na porta: ${port}`));

