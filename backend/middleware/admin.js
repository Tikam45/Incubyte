
const adminOnly = (req, res, next) => {
    console.log(req.user);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = adminOnly;
