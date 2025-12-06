import "./DashBoard.css";
import Searchbar from "./Searchbar.jsx";
import Status from "./Status.jsx";
import Connectors from "./Connectors.jsx";
import { useState, useEffect } from "react";
import List from "./List.jsx";
import MapView from "./MapView.jsx";
import Pop from "./Pop.jsx";
import NavBar from "./NavBar.jsx";

function Dashboard({ isModalOpen, setIsModalOpen }) {
  const [tasks, setTasks] = useState([]); // dynamic tasks state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusQuery, setstatusQuery] = useState("");
  const [connectQuery, setconnectQuery] = useState("");
  const [currentView, setCurrentView] = useState("list");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://ev-backend-y8vm.onrender.com/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data); // set fetched tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle new task submission from Pop
  const handleSubmit = (newTask) => {
    console.log("New task submitted:", newTask);
    // Ensure a unique id exists
    const taskWithId = { ...newTask, id: newTask._id || Date.now() };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  return (
    <div className="dashboard">
      {/* Pop Modal */}
      <Pop
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Navigation */}
      <NavBar setIsModalOpen={setIsModalOpen} />

      {/* View Toggle Buttons */}
      <div className="view-toggle-container">
        <div className="view-toggle">
          <button
            className={`view-btn ${currentView === "list" ? "active" : ""}`}
            onClick={() => setCurrentView("list")}
          >
            List View
          </button>
          <button
            className={`view-btn ${currentView === "map" ? "active" : ""}`}
            onClick={() => setCurrentView("map")}
          >
            Map View
          </button>
        </div>
      </div>

      {/* Filters (only in list view) */}
      {currentView === "list" && (
        <div className="filters-container">
          <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Status statusQuery={statusQuery} setstatusQuery={setstatusQuery} />
          <Connectors connectQuery={connectQuery} setconnectQuery={setconnectQuery} />
        </div>
      )}

      {/* Content */}
      <div className="content-container">
        {currentView === "list" ? (
          <div className="table-container">
            <List
              searchQuery={searchQuery}
              tasks={tasks}
              statusQuery={statusQuery}
              connectQuery={connectQuery}
            />
          </div>
        ) : (
          <MapView tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
