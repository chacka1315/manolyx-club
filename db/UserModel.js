import database from './Database.js';

class UserModel {
  constructor(db) {
    this.db = db;
  }

  async createUser(user) {
    const SQL = `
    INSERT INTO users (username, firstname, lastname, password)
    VALUES ($1, $2, $3, $4) 
    `;
    const values = [
      user.username,
      user.firstname,
      user.lastname,
      user.password,
    ];
    await this.db.query(SQL, values);
  }

  async findUserByUsername(username) {
    const SQL = 'SELECT * FROM users WHERE  username = $1';
    const rows = await this.db.query(SQL, [username]);
    return rows[0];
  }

  async findUserById(id) {
    const rows = await this.db.findById('users', id);
    return rows[0];
  }

  async makeMember(id) {
    const SQL = 'UPDATE users SET membership_status = true WHERE id = $1';
    await this.db.query(SQL, [id]);
  }

  async makeAdmin(id) {
    const SQL = 'UPDATE users SET admin = true WHERE id = $1';
    await this.db.query(SQL, [id]);
  }
}

export default new UserModel(database);
