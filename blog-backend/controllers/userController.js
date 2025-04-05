const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password")
    if (!user) return res.status(404).json({ error: "User not found" })
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 })
    const comments = await Comment.find({ author: user._id }).sort({ createdAt: -1 })
    res.json({ user, posts, comments })
  } catch (err) {
    res.status(500).json({ error: "Profile error" })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { profilePicture, bio, socialLinks } = req.body
    const update = { profilePicture, bio, socialLinks }
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select("-password")
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: "Error updating profile" })
  }
}

exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user.favorites.includes(req.params.postId)) {
      user.favorites.push(req.params.postId)
      await user.save()
    }
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ error: "Error adding favorite" })
  }
}

exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    user.favorites = user.favorites.filter(fav => fav.toString() !== req.params.postId)
    await user.save()
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ error: "Error removing favorite" })
  }
}

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({ 
        path: "favorites", 
        populate: { path: "author", select: "username profilePicture" } 
      })
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ error: "Error fetching favorites" })
  }
}
