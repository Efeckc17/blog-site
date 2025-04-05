import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(storedMode)
    if(storedMode) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [])

  const handleToggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode)
    if(newMode) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <nav className="bg-white dark:bg-[#161b22] shadow p-4 mb-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <i className="fa-solid fa-blog text-2xl text-blue-500"></i>
          <span className="font-bold text-xl text-gray-800 dark:text-[#c9d1d9]"></span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar />
        <button onClick={handleToggleDarkMode} className="p-2 focus:outline-none">
          {darkMode ? <i className="fa-solid fa-sun text-yellow-400"></i> : <i className="fa-solid fa-moon text-gray-800"></i>}
        </button>
        {token ? (
          <>
            <Link to="/favorites" className="text-blue-500">
              <i className="fa-solid fa-bookmark"></i>
            </Link>
            {user && user.role === "admin" && (
              <Link to="/admin" className="text-blue-500">
                <i className="fa-solid fa-gear"></i>
              </Link>
            )}
            {user && user.profilePicture ? (
              <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            ) : (
              <Link to={`/profile/${user.username}`}>
                <i className="fa-solid fa-user text-2xl dark:text-[#c9d1d9]"></i>
              </Link>
            )}
            <button onClick={handleLogout} className="text-red-500">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
            <Link to="/register" className="text-blue-500">
              <i className="fa-solid fa-user-plus"></i>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
