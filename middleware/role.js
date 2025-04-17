const role = (requiredRole) => (req, res, next) => {
    console.log(req.user);
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  module.exports = role;
  