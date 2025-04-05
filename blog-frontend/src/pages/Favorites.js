import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setFavorites(res.data.favorites))
        .catch(err => console.error(err))
    }
  }, [token])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Favorite Posts</h1>
      {favorites.length > 0 ? favorites.map(post => (
        <PostCard key={post._id} post={post} />
      )) : <div>No favorites added</div>}
    </div>
  )
}

export default Favorites
