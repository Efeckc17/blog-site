import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import NewPost from './pages/NewPost'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import SearchResults from './pages/SearchResults'
import AdminPanel from './pages/AdminPanel'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] dark:text-[#c9d1d9]">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
