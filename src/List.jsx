function List({ searchQuery, tasks, statusQuery, connectQuery }) {
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.Location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusQuery || task.Status === statusQuery
    const matchesConnector = !connectQuery || task.ConnectorType === connectQuery

    return matchesSearch && matchesStatus && matchesConnector
  })

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Power Output</th>
            <th>Connector Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.Name}</td>
              <td>{task.Location}</td>
              <td>
                <span
                  className={`status-badge ${task.Status.toLowerCase() === "active" ? "status-active" : "status-inactive"}`}
                >
                  {task.Status}
                </span>
              </td>
              <td>{task.PowerOutput}</td>
              <td>{task.ConnectorType}</td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" title="Edit">
                    ✏️
                  </button>
                  <button className="action-btn delete" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
