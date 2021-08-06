exports.isAuthenticated = (req, res, next) => {
  console.log('AUTH CHECKER', req.user);
  if (!req.user) {
    return res.status(401).send('You must login first!');
  }
  next();
};
