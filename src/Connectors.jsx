function Connectors({ connectQuery, setconnectQuery }) {
  return (
    <select value={connectQuery} onChange={(e) => setconnectQuery(e.target.value)} className="filter-select">
      <option value="">All Connectors</option>
      <option value="Type-1">Type 1</option>
      <option value="Type-2">Type 2</option>
    </select>
  )
}

export default Connectors
