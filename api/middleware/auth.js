const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, "playit")
    req.userData = decoded.id
  }
  catch (error) {
    res.status(202).json({
      message: "Token expired Again login"
    })
  }
  next();
}
