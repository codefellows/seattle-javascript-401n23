const PORT = process.env.PORT || 3002;
const server = require('./server.js');
const { sequelizeDatabase } = require('./models');

sequelizeDatabase
  .sync()
  .then(() => server.listen(PORT))
  .catch((e) => console.error(e));
