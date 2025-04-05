import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NewPost = () => {
  const [form, setForm] = useState({ title:"", content:"", image:"" })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/posts", form, { headers: { Authorization: `Bearer ${token}` } })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Error creating post")
    }
  }
  return (
    <div className="max-w-lg mx-auto bg-black p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create Post</button>
      </form>
    </div>
  )
}
export default NewPost
