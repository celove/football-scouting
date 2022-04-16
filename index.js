const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
require('./startup/rotas')(app);
require('./startup/db')();
require('./startup/config')(app);
require('express-async-errors');

const port = process.env.PORT || 3100;
const host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(port, host, () => console.log(`Server iniciado na porta: ${port} e host: ${host}.`));
