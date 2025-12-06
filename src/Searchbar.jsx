function Searchbar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by name or location"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input"
    />
  )
}

export default Searchbar
