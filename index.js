const express = require('express');
const app = express();

require('./startup/rotas')(app);
require('./startup/db')();
require('./startup/config')(app);
require('express-async-errors');

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server iniciado na porta: ${port}.`));
