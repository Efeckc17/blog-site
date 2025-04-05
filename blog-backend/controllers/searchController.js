const User = require("../models/User")
const Post = require("../models/Post")
exports.search = async (req, res) => {
  try {
    const q = req.query.q
    const users = await User.find({ username: { $regex: q, $options: "i" } })
      .select("username profilePicture bio")
    const posts = await Post.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "username profilePicture")
      .sort({ createdAt: -1 })
    res.json({ users, posts })
  } catch (err) {
    res.status(500).json({ error: "Search error" })
  }
}
