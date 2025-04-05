import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState("")
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err))

    axios.get(`http://localhost:5000/api/comments/post/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err))
  }, [id])

  const handleCommentSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/post/${id}`,
        { content: commentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setComments([res.data, ...comments])
      setCommentContent("")
    } catch (err) {
      console.error(err)
    }
  }

  if(!post) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-white text-black p-4 shadow rounded">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="mb-4">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="mb-4" />}
        <div className="text-sm text-gray-600">
          Author: {post.author.username} | {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      <form onSubmit={handleCommentSubmit} className="bg-white dark:bg-white text-black p-4 shadow rounded">
        <textarea
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Comment</button>
      </form>

      <div className="bg-white dark:bg-white text-black p-4 shadow rounded">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        {comments.length > 0 ? comments.map(c => (
          <div key={c._id} className="bg-gray-100 p-2 rounded mb-2">
            <p>{c.content}</p>
            <div className="text-xs text-gray-500">
              By {c.author.username} | {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        )) : <div>No comments yet</div>}
      </div>
    </div>
  )
}

export default PostDetail
