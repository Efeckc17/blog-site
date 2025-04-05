import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [form, setForm] = useState({ username:"", email:"", password:"" })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Registration error")
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  )
}
export default Register
