exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must login first!');
  }
  next();
};
