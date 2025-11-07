import database from './Database.js';
import { format, formatDistanceToNow } from 'date-fns';

const cleanAddedDate = (rows) => {
  const posts = rows.map((row) => {
    let date;
    date = formatDistanceToNow(row.added, {
      includeSeconds: true,
    });

    if (date.split(' ')[2] === 'days') {
      date = format(row.added, 'PP').split(',')[0];
    }
    return { ...row, added: date };
  });
  return posts;
};

class PostModel {
  constructor(db) {
    this.db = db;
  }

  async getAllPosts() {
    const SQL = `
    SELECT u.firstname AS author, u.membership_status AS author_is_member, 
    u.admin AS author_is_admin,
    p.id, p.title, p.message, p.added
    FROM users AS u
    INNER JOIN posts AS p
    ON u.id = p.user_id
    ORDER BY added DESC 
    `;
    const rows = await this.db.query(SQL);
    const posts = cleanAddedDate(rows);
    return posts;
  }

  async createPost(data) {
    const SQL = `
  INSERT INTO posts (user_id, title, message) 
  VALUES ($1, $2, $3)
  `;
    const values = [data.user_id, data.title, data.message];
    await this.db.query(SQL, values);
  }

  async deletePost(id) {
    await this.db.query('DELETE FROM posts WHERE id = $1', [id]);
  }
}

export default new PostModel(database);
