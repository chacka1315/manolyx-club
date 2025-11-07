import postModel from '../db/PostModel.js';
const getAllPosts = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.render('pages/index', {
    posts,
    title: 'Home',
  });
};

export default { getAllPosts };
