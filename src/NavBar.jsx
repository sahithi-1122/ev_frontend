import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";



function NavBar({setIsModalOpen}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
     navigate('/');

  };

  return (
   <div className="dashboard-header">
        <h1 className="dashboard-title">EV Charging Stations</h1>
        <div className="header-actions">
          <button className="add-station-btn" onClick={() => setIsModalOpen(true)}>
            + Add Station
          </button>
          <button onClick={() =>handleLogout()} className="logout-btn">↗ Logout</button>
        </div>
      </div>
  );
}

export default NavBar;
