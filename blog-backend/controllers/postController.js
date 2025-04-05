const Post = require("../models/Post")
exports.createPost = async (req, res) => {
  const { title, content, image } = req.body
  try {
    const newPost = new Post({ title, content, image, author: req.user.id })
    await newPost.save()
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ error: "Error creating post" })
  }
}
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username profilePicture").sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" })
  }
}
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
      .populate("author", "username profilePicture")
    if(!post) return res.status(404).json({ error: "Post not found" })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: "Error fetching post details" })
  }
}
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post) return res.status(404).json({ error: "Post not found" })
    if(post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(uid => uid.toString() !== req.user.id)
    } else {
      post.likes.push(req.user.id)
    }
    await post.save()
    res.json({ likes: post.likes })
  } catch (err) {
    res.status(500).json({ error: "Error updating like" })
  }
}
exports.getPopularPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username profilePicture").sort({ views: -1 }).limit(3)
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: "Error fetching popular posts" })
  }
}
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post) return res.status(404).json({ error: "Post not found" })
    if(post.author.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ error: "Unauthorized" })
    await Post.findByIdAndDelete(req.params.id)
    res.json({ message: "Post deleted" })
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" })
  }
}
