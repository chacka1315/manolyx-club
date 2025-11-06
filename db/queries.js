import pool from './pool.js';
import { format, formatDistanceToNow } from 'date-fns';

//users queries
async function createUser(user) {
  const SQL = `
    INSERT INTO users (username, firstname, lastname, password)
    VALUES ($1, $2, $3, $4) 
    `;
  const values = [user.username, user.firstname, user.lastname, user.password];
  await pool.query(SQL, values);
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE  username = $1',
    [username],
  );
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE  id = $1', [id]);
  return rows[0];
}

async function makeMember(id) {
  const SQL = 'UPDATE users SET membership_status = true WHERE id = $1';
  await pool.query(SQL, [id]);
}

async function makeAdmin(id) {
  const SQL = 'UPDATE users SET admin = true WHERE id = $1';
  await pool.query(SQL, [id]);
}
//posts queries
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

async function getAllPosts() {
  const SQL = `
    SELECT u.firstname AS author, u.membership_status AS author_is_member, 
    u.admin AS author_is_admin,
    p.id, p.title, p.message, p.added
    FROM users AS u
    INNER JOIN posts AS p
    ON u.id = p.user_id
    ORDER BY added DESC 
    `;
  const { rows } = await pool.query(SQL);
  const posts = cleanAddedDate(rows);
  return posts;
}

async function createPost(data) {
  const SQL = `
  INSERT INTO posts (user_id, title, message) 
  VALUES ($1, $2, $3)
  `;
  const values = [data.user_id, data.title, data.message];
  await pool.query(SQL, values);
}

async function deletePost(id) {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}
export default {
  getAllPosts,
  findUserByUsername,
  createUser,
  findUserById,
  makeMember,
  makeAdmin,
  createPost,
  deletePost,
};
