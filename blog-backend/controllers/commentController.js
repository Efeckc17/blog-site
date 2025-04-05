const Comment = require("../models/Comment")
exports.addComment = async (req, res) => {
  const { content } = req.body
  const postId = req.params.postId
  try {
    const newComment = new Comment({ content, post: postId, author: req.user.id })
    await newComment.save()
    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json({ error: "Error adding comment" })
  }
}
exports.getCommentsByPost = async (req, res) => {
  const postId = req.params.postId
  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "username profilePicture")
      .sort({ createdAt: -1 })
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" })
  }
}
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if(!comment) return res.status(404).json({ error: "Comment not found" })
    if(comment.author.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ error: "Unauthorized" })
    await comment.deleteOne()
    res.json({ message: "Comment deleted" })
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment" })
  }
}
