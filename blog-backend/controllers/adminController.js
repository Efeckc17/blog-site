const User = require("../models/User")
const Post = require("../models/Post")
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" })
  }
}
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username")
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" })
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ error: "User not found" })
    if(user.email === process.env.ADMIN_EMAIL) return res.status(403).json({ error: "Admin account cannot be deleted" })
    await Post.deleteMany({ author: user._id })
    const Comment = require("../models/Comment")
    await Comment.deleteMany({ author: user._id })
    await User.updateMany({}, { $pull: { favorites: { $in: user._id } } })
    await user.deleteOne()
    res.json({ message: "User and related content deleted" })
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" })
  }
}
exports.banUser = async (req, res) => {
  try {
    const { banUntil } = req.body
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ error: "User not found" })
    user.banned = true
    user.bannedUntil = banUntil || null
    await user.save()
    res.json({ message: "User banned", user })
  } catch (err) {
    res.status(500).json({ error: "Error banning user" })
  }
}
exports.unbanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ error: "User not found" })
    user.banned = false
    user.bannedUntil = null
    await user.save()
    res.json({ message: "User unbanned", user })
  } catch (err) {
    res.status(500).json({ error: "Error unbanning user" })
  }
}
