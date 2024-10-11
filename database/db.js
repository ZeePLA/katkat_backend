import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectOptions: { ssl: process.env.DB_SSL === "true" },
  logging: false, // Disables the logging of SQL queries
});

// Logs in with sequelize instance
async function dbLogin() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database", err);
  }
}

// Initialize models with the Sequelize instance
async function syncAll() {
  try {
    await sequelize.sync({ force: true });
    console.log("All tables created successfully!");
  } catch (err) {
    console.error("Unable to create table: ", err);
  }
}
export { sequelize, dbLogin, syncAll };

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
