import db from '../db/queries.js';
const getAllPosts = async (req, res) => {
  const posts = await db.getAllPosts();
  res.render('pages/index', {
    posts,
    title: 'Home',
  });
};

export default { getAllPosts };
