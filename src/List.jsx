function List({ searchQuery, tasks, statusQuery, connectQuery }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter((task) => {
    const name = task.name || "";
    const location = task.address || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusQuery || task.status === statusQuery;
    const matchesConnector =
      !connectQuery || task.connectortype === connectQuery;

    return matchesSearch && matchesStatus && matchesConnector;
  });

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
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.address}</td>
              <td>
                <span
                  className={`status-badge ${
                    task.status?.toLowerCase() === "active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td>{task.poweroutput} kW</td>
              <td>{task.connectortype}</td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn">✏️</button>
                  <button className="action-btn delete">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTasks.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No stations found
        </p>
      )}
    </div>
  );
}

export default List;
