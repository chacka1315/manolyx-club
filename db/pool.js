import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('No database defined for this environnement!')
}

const pool = new Pool({
    connectionString,
})

export default pool