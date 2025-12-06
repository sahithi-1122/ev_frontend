function Status({ statusQuery, setstatusQuery }) {
  return (
    <select value={statusQuery} onChange={(e) => setstatusQuery(e.target.value)} className="filter-select">
      <option value="">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  )
}

export default Status