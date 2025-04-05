import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProfileEdit = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    profilePicture: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: ""
  })
  const [message, setMessage] = useState("")

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null")
    if (storedUser) {
      setForm({
        profilePicture: storedUser.profilePicture || "",
        bio: storedUser.bio || "",
        twitter: (storedUser.socialLinks && storedUser.socialLinks.twitter) || "",
        facebook: (storedUser.socialLinks && storedUser.socialLinks.facebook) || "",
        instagram: (storedUser.socialLinks && storedUser.socialLinks.instagram) || "",
        linkedin: (storedUser.socialLinks && storedUser.socialLinks.linkedin) || ""
      })
    }
  }, []) 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        profilePicture: form.profilePicture,
        bio: form.bio,
        socialLinks: {
          twitter: form.twitter,
          facebook: form.facebook,
          instagram: form.instagram,
          linkedin: form.linkedin
        }
      }
      const res = await axios.put("http://localhost:5000/api/users/update", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      localStorage.setItem("user", JSON.stringify(res.data))
      setMessage("Profile updated successfully!")
      setTimeout(() => {
        navigate(`/profile/${res.data.username}`)
      }, 1500)
    } catch (err) {
      setMessage(err.response?.data?.error || "Error updating profile")
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-white text-black p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={form.profilePicture}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <input
          type="text"
          name="twitter"
          placeholder="Twitter URL"
          value={form.twitter}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook URL"
          value={form.facebook}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit
