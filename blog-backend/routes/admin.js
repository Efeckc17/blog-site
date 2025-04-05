const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { getAllUsers, getAllPosts, deleteUser, banUser, unbanUser } = require("../controllers/adminController")
const adminMiddleware = (req, res, next) => {
  if(req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" })
  next()
}
router.get("/users", authMiddleware, adminMiddleware, getAllUsers)
router.get("/posts", authMiddleware, adminMiddleware, getAllPosts)
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser)
router.put("/users/:id/ban", authMiddleware, adminMiddleware, banUser)
router.put("/users/:id/unban", authMiddleware, adminMiddleware, unbanUser)
module.exports = router
