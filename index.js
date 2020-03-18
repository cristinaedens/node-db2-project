const server = require('./api/server'); //import api server

//set port to run api
const port = process.env.PORT || 5005;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));