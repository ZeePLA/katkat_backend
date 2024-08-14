require("dotenv").config({ path: "../live.env" });
const { Pool, Client } = require("pg");

const localPool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: "5432",
  database: "postgres",
});

const localClient = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: "5432",
  database: "postgres",
});

const renderPool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: "5432",
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

const renderClient = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: "5432",
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { localPool, localClient, renderPool, renderClient };

/* PARAMETERIZED QUERY EXAMPLE


/* TRANSACTION EXAMPLE
const client = await pool.connect()
 
try {
  await client.query('BEGIN')
  const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
  const res = await client.query(queryText, ['brianc'])
 
  const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
  const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
  await client.query(insertPhotoText, insertPhotoValues)
  await client.query('COMMIT')
} catch (e) {
  await client.query('ROLLBACK')
  throw e
} finally {
  client.release()
}
*/

// Query configurations
// https://node-postgres.com/features/queries
