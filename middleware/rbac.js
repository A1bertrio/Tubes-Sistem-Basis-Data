module.exports = function allowRole(role) {
  return (req, res, next) => {
    const userRole = req.headers['x-role'];
    if (userRole !== role) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }
    req.role = userRole;
    next();
  };
};
