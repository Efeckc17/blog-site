import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PostCard = ({ post }) => {
  if (!post.author) return null
  const [likes, setLikes] = useState(post.likes || [])
  const [isFavorite, setIsFavorite] = useState(false)
  const token = localStorage.getItem("token")

  const handleLike = () => {
    axios.post(`http://localhost:5000/api/posts/${post._id}/like`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setLikes(res.data.likes))
      .catch(err => console.error(err))
  }

  const handleFavorite = () => {
    if (!isFavorite) {
      axios.post(`http://localhost:5000/api/favorites/${post._id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setIsFavorite(true))
        .catch(err => console.error(err))
    } else {
      axios.delete(`http://localhost:5000/api/favorites/${post._id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setIsFavorite(false))
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="bg-white dark:bg-white text-black p-4 shadow rounded mb-4">
      <Link to={`/post/${post._id}`}>
        <h2 className="font-bold text-xl mb-2">{post.title}</h2>
      </Link>
      <p>{post.content.substring(0, 100)}...</p>
      <div className="mt-2 text-sm text-gray-600">
        Author: {post.author.username} | {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="mt-2 flex space-x-4">
        <button onClick={handleLike} className="text-blue-500">
          <i className="fa-solid fa-thumbs-up"></i> {likes.length}
        </button>
        <button onClick={handleFavorite} className="text-blue-500">
          <i className="fa-solid fa-bookmark"></i>
        </button>
      </div>
    </div>
  )
}

export default PostCard
