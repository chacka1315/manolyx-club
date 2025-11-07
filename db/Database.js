import pool from './pool.js';

class Database {
  constructor(pool) {
    this.pool = pool;
  }

  async query(SQL, values) {
    const { rows } = await this.pool.query(SQL, values);
    return rows;
  }

  async findAll(table) {
    return await this.query(`SELECT * FROM ${table}`);
  }

  async findById(table, id) {
    return await this.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  }
}

export default new Database(pool);
