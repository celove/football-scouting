const config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();
const jogadores = require('./routes/jogadores');
const home = require('./routes/home');

//Configuration
console.log('Application name: ' + config.get('name'));

if (app.get('env' === 'development')) {
    console.log('Running on dev');
}
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/jogadores', jogadores);
app.use('/', home);
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server iniciado na porta: ${port}`));

