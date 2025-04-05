const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  socialLinks: {
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" }
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  banned: { type: Boolean, default: false },
  bannedUntil: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model("User", UserSchema)
