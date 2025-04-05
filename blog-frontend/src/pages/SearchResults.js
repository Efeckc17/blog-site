import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams, Link } from 'react-router-dom'
const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({ users: [], posts: [] })
  useEffect(() => {
    if(query) {
      setLoading(true)
      axios.get(`http://localhost:5000/api/search?q=${query}`)
        .then(res => { setResults(res.data); setLoading(false) })
        .catch(err => { setLoading(false) })
    }
  }, [query])
  if(loading) return <div className="text-center">Loading...</div>
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      <div>
        <h2 className="text-2xl font-bold mb-2">Users</h2>
        {results.users.length > 0 ? results.users.map(user => (
          <div key={user._id} className="bg-white p-4 shadow rounded mb-2 flex items-center">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover mr-4" />
            ) : (
              <i className="fa-solid fa-user text-2xl mr-4"></i>
            )}
            <Link to={`/profile/${user.username}`} className="text-xl font-bold">{user.username}</Link>
          </div>
        )) : <div>No users found</div>}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2 mt-4">Posts</h2>
        {results.posts.length > 0 ? results.posts.map(post => (
          <div key={post._id} className="bg-white p-4 shadow rounded mb-2">
            <Link to={`/post/${post._id}`} className="text-xl font-bold">{post.title}</Link>
            <div className="text-sm text-gray-500">By {post.author.username}</div>
          </div>
        )) : <div>No posts found</div>}
      </div>
    </div>
  )
}
export default SearchResults
