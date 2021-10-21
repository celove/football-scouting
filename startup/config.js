
const config = require('config');

module.exports = function (app) {
    console.log('Application name: ' + config.get('name'));
    console.log('Running on ' + app.get('env'));
    if (!config.get('jwtPrivateKey')) {
        console.error('Fatal ERROR: jwtPrivateKey não está definida');
        process.exit(1);
    }
}