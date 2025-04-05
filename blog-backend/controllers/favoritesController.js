const User = require("../models/User")
exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(user.favorites.includes(req.params.postId)) return res.status(400).json({ error: "Already favorited" })
    user.favorites.push(req.params.postId)
    await user.save()
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ error: "Error adding favorite" })
  }
}
exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    user.favorites = user.favorites.filter(pid => pid.toString() !== req.params.postId)
    await user.save()
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ error: "Error removing favorite" })
  }
}
