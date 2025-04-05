import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import PostCard from '../components/PostCard'

const Profile = () => {
  const { username } = useParams()
  const [profileData, setProfileData] = useState(null)
  const localUser = JSON.parse(localStorage.getItem("user") || "null")

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${username}`)
      .then(res => setProfileData(res.data))
      .catch(err => console.error(err))
  }, [username])

  if(!profileData) return <div className="text-center">Loading...</div>

  const isOwner = localUser && localUser.username === profileData.user.username

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-white text-black p-4 shadow rounded flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4">
        {profileData.user.profilePicture ? (
          <img
            src={profileData.user.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <i className="fa-solid fa-user text-3xl"></i>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{profileData.user.username}</h1>
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-200 rounded whitespace-pre-wrap text-base">
            {profileData.user.bio || "No bio added yet."}
          </div>
          {profileData.user.socialLinks && (
            <div className="mt-2 space-x-2">
              {profileData.user.socialLinks.twitter && (
                <a
                  href={profileData.user.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              )}
              {profileData.user.socialLinks.facebook && (
                <a
                  href={profileData.user.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              )}
              {profileData.user.socialLinks.instagram && (
                <a
                  href={profileData.user.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-500"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              )}
              {profileData.user.socialLinks.linkedin && (
                <a
                  href={profileData.user.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              )}
            </div>
          )}
        </div>
        {isOwner && (
          <div className="mt-4 md:mt-0 md:ml-auto">
            <Link
              to="/profile-edit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-white text-black p-4 shadow rounded">
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        {profileData.posts.length > 0 ? (
          profileData.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>

      <div className="bg-white dark:bg-white text-black p-4 shadow rounded">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        {profileData.comments.length > 0 ? (
          profileData.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-2 rounded mb-2">
              <p>{comment.content}</p>
              <div className="text-xs text-gray-600">
                On <Link to={`/post/${comment.post}`}>Post</Link> | {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div>No comments available</div>
        )}
      </div>
    </div>
  )
}

export default Profile
