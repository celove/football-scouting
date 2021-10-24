const express = require('express');
const app = express();

require('./startup/rotas')(app);
require('./startup/db')();
require('./startup/config')(app);
require('express-async-errors');

console.log(process.env);
const port = process.env.port || 3000;
const host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(port, host, () => console.log(`Server iniciado na porta: ${port}.`));
