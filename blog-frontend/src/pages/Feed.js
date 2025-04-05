import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import { Link } from 'react-router-dom'

const Feed = () => {
  const [latestPosts, setLatestPosts] = useState([])
  const [popularPosts, setPopularPosts] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
         const validPosts = res.data.filter(post => post.author !== null)
         setLatestPosts(validPosts)
      })
      .catch(err => console.error(err))

    axios.get("http://localhost:5000/api/posts/popular")
      .then(res => setPopularPosts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-8">
      {token && (
        <div className="flex justify-end">
          <Link to="/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            New Post
          </Link>
        </div>
      )}
      <section>
        <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
        {latestPosts.length > 0 ? latestPosts.map(post => (
          <PostCard key={post._id} post={post} />
        )) : <div>No posts available</div>}
      </section>
      <section>
        <h1 className="text-3xl font-bold mb-4">Popular Posts</h1>
        {popularPosts.length > 0 ? popularPosts.map(post => (
          <PostCard key={post._id} post={post} />
        )) : <div>No popular posts available</div>}
      </section>
    </div>
  )
}

export default Feed
