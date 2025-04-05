const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { addComment, getCommentsByPost, deleteComment } = require("../controllers/commentController")
router.get("/post/:postId", getCommentsByPost)
router.post("/post/:postId", authMiddleware, addComment)
router.delete("/:id", authMiddleware, deleteComment)
module.exports = router
