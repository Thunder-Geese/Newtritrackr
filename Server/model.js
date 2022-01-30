const { Pool } = require('pg');

const PG_URI = "postgres://ugrhyhqu:kwoIa7kys7XRMSPV_ANs1Bh58Og9T1qW@castor.db.elephantsql.com/ugrhyhqu"

const pool = new Pool({
    connectionString: PG_URI
})

module.exports ={
    query: (text, params, callback) =>{
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}