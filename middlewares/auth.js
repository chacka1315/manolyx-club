const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).render('pages/login', {
    title: 'Sign in',
    formData: {},
  });
};

const isMember = [
  isAuth,
  (req, res, next) => {
    if (req.user.membership_status === true) return next();
    res.status(401).render('pages/beMember', {
      title: 'Join club',
    });
  },
];

const isAdmin = [
  isMember,
  (req, res, next) => {
    if (req.user.admin) return next();
    res.status(401).render('pages/beAdmin', {
      title: 'Beccome admin',
    });
  },
];

export default { isAuth, isMember, isAdmin };
