import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AdminPanel = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsers(res.data))
      .catch(err => setError("Error fetching users: " + (err.response?.data?.error || err.message)))

      axios.get("http://localhost:5000/api/admin/posts", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setPosts(res.data))
      .catch(err => setError("Error fetching posts: " + (err.response?.data?.error || err.message)))
    } else {
      setError("No token provided. Please login as admin.")
    }
  }, [token])

  const handleBan = (userId) => {
    // 7 gün için banlama örneği
    const banUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    axios.put(`http://localhost:5000/api/admin/users/${userId}/ban`, { banUntil }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert("User banned")
        setUsers(prev => prev.map(user => user._id === userId ? res.data.user : user))
      })
      .catch(err => alert("Error banning user: " + (err.response?.data?.error || err.message)))
  }

  const handleUnban = (userId) => {
    axios.put(`http://localhost:5000/api/admin/users/${userId}/unban`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert("User unbanned")
        setUsers(prev => prev.map(user => user._id === userId ? res.data.user : user))
      })
      .catch(err => alert("Error unbanning user: " + (err.response?.data?.error || err.message)))
  }

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("User deleted")
        setUsers(prev => prev.filter(user => user._id !== userId))
      })
      .catch(err => alert("Error deleting user: " + (err.response?.data?.error || err.message)))
  }

  const handleDeletePost = (postId) => {
    axios.delete(`http://localhost:5000/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("Post deleted")
        setPosts(prev => prev.filter(post => post._id !== postId))
      })
      .catch(err => alert("Error deleting post: " + (err.response?.data?.error || err.message)))
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <section>
        <h2 className="text-2xl font-bold mb-2">Users</h2>
        {users.length === 0 ? (
          <div>No users found.</div>
        ) : (
          users.map(user => (
            <div key={user._id} className="bg-white dark:bg-white text-black p-4 shadow rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{user.username}</p>
                <p>{user.email}</p>
                <p>Status: {user.banned ? "Banned" : "Active"}</p>
              </div>
              <div className="space-x-2">
                {!user.banned ? (
                  <button onClick={() => handleBan(user._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Ban
                  </button>
                ) : (
                  <button onClick={() => handleUnban(user._id)} className="bg-green-600 text-white px-2 py-1 rounded">
                    Unban
                  </button>
                )}
                <button onClick={() => handleDeleteUser(user._id)} className="bg-gray-600 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        {posts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          posts.map(post => (
            <div key={post._id} className="bg-white dark:bg-white text-black p-4 shadow rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{post.title}</p>
                <p>By: {post.author?.username || "Unknown"}</p>
              </div>
              <button onClick={() => handleDeletePost(post._id)} className="bg-gray-600 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default AdminPanel
