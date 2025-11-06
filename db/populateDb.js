import { Client } from 'pg';

const userModel = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username  VARCHAR (255) UNIQUE,
  password VARCHAR (255),
  firstname VARCHAR (255),
  lastname VARCHAR (255),
  membership_status BOOLEAN DEFAULT false,
  admin BOOLEAN DEFAULT false
)`;

const postsModel = `
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR (255),
  message TEXT,
  added TIMESTAMP DEFAULT NOW()
)`;

async function main() {
  const connectionString = process.argv[2];

  if (!connectionString) {
    throw new Error('No database URL provided!');
  }

  const client = new Client({
    connectionString,
  });

  try {
    console.log('🚀 Sending...');
    await client.connect();
    await client.query(userModel);
    await client.query(postsModel);
    console.log('✅ Done!');
  } catch (error) {
    console.log('❌ Error!');
    throw error;
  } finally {
    client.end();
  }
}

main();
