const jwt = require("jsonwebtoken")
const User = require("../models/User")
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      if (!user) return res.status(401).json({ error: "User not found" })
      if (user.banned && (!user.bannedUntil || new Date() < user.bannedUntil)) {
        return res.status(403).json({ error: "User is banned" })
      }
      req.user = { id: user._id.toString(), role: user.role }
      next()
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" })
    }
  } else {
    return res.status(401).json({ error: "Token missing" })
  }
}
module.exports = authMiddleware
