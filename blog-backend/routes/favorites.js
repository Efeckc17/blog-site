const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/userController")
router.post("/:postId", authMiddleware, addFavorite)
router.delete("/:postId", authMiddleware, removeFavorite)
router.get("/", authMiddleware, getFavorites)
module.exports = router
