const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if(user) return res.status(400).json({ error: "Email already registered" })
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user"
    user = new User({ username, email, password: await bcrypt.hash(password, 10), role })
    await user.save()
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.status(201).json({ token, user: { id: user._id, username, email, role, profilePicture: user.profilePicture, bio: user.bio, socialLinks: user.socialLinks } })
  } catch (err) {
    res.status(500).json({ error: "Registration error" })
  }
}
exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({ error: "User not found" })
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ error: "Incorrect password" })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.json({ token, user: { id: user._id, username: user.username, email, role: user.role, profilePicture: user.profilePicture, bio: user.bio, socialLinks: user.socialLinks } })
  } catch (err) {
    res.status(500).json({ error: "Login error" })
  }
}
