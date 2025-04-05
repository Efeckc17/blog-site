import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const SearchBar = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const handleSearch = e => {
    e.preventDefault()
    if(query.trim()) {
      navigate(`/search?q=${query}`)
    }
  }
  return (
    <form onSubmit={handleSearch} className="flex items-center border rounded">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users & posts" className="p-1 outline-none" />
      <button type="submit" className="p-1"><i className="fa-solid fa-magnifying-glass"></i></button>
    </form>
  )
}
export default SearchBar
