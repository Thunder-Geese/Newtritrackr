// const { Pool } = require('pg');
require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.DB_CONNECTION);

const MG_URI = process.env.DB_CONNECTION;

// module.exports =

module.export = mongoose
  .connect(MG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'newtritrakr',
  })
  .then(() => console.log('Database connected'))
  .catch(() => console.log('Error occured while connecting to database'));

// const PG_URI = process.env.DB_CONNECTION;

// const pool = new Pool({
//   connectionString: PG_URI,
// });

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
