import "./DashBoard.css"
import Searchbar from "./Searchbar.jsx"
import Status from "./Status.jsx"
import Connectors from "./Connectors.jsx"
import { useState } from "react"
import List from "./List.jsx"
import MapView from "./MapView.jsx"
import Pop from "./Pop.jsx"
import NavBar from "./NavBar.jsx"
function Dashboard({ isModalOpen, setIsModalOpen }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusQuery, setstatusQuery] = useState("")
  const [connectQuery, setconnectQuery] = useState("")
  const [currentView, setCurrentView] = useState("list") 

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const tasks = [
    {
      id: 1,
      Name: "Test-1",
      Location: "Address Testing",
      Status: "Active",
      PowerOutput: "40KW",
      ConnectorType: "Type-2",
      Actions: "delete",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      Name: "Test-2",
      Location: "Delhi",
      Status: "Active",
      PowerOutput: "940KW",
      ConnectorType: "Type-1",
      Actions: "delete",
      lat: 40.7589,
      lng: -73.9851,
    },
  ]

  return (
    <div className="dashboard">
      <Pop isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit}></Pop>
     <NavBar setIsModalOpen={setIsModalOpen}/>
     
      
      {/* View Toggle Buttons */}
      <div className="view-toggle-container">
        <div className="view-toggle">
          <button
            className={`view-btn ${currentView === "list" ? "active" : ""}`}
            onClick={() => setCurrentView("list")}
          >
            List View
          </button>
          <button className={`view-btn ${currentView === "map" ? "active" : ""}`} onClick={() => setCurrentView("map")}>
            Map View
          </button>
        </div>
      </div>

      {/* Conditionally render filters only for list view */}
      {currentView === "list" && (
        <div className="filters-container">
          <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Status statusQuery={statusQuery} setstatusQuery={setstatusQuery} />
          <Connectors connectQuery={connectQuery} setconnectQuery={setconnectQuery} />
        </div>
      )}

      {/* Content Section */}
      <div className="content-container">
        {currentView === "list" ? (
          <div className="table-container">
            <List searchQuery={searchQuery} tasks={tasks} statusQuery={statusQuery} connectQuery={connectQuery} />
          </div>
        ) : (
          <MapView tasks={tasks} />
        )}
      </div>
    </div>
  )
}

export default Dashboard