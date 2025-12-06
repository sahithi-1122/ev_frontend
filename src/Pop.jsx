import { useState } from "react";
import "./Pop.css";

function Pop({ isOpen, onClose, onSubmit }) {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("Active");
  const [data6, setData6] = useState("");
  const [data7, setData7] = useState("Type 2");

  const [isConnectorDropdownOpen, setIsConnectorDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const connectorTypes = ["Type 1", "Type 2", "CCS", "CHAdeMO", "Tesla"];
  const statusOptions = ["Active", "Inactive", "Maintenance"];

  if (!isOpen) return null;

  const resetForm = () => {
    setData1("");
    setData2("");
    setData3("");
    setData4("");
    setData5("Active");
    setData6("");
    setData7("Type 2");
  };

  const submitForm = async (formData) => {
    try {
      const response = await fetch(
        "https://ev-backend-y8vm.onrender.com/api/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const text = await response.text(); // Read as text first
      let result;
      try {
        result = JSON.parse(text); // Try parsing JSON
      } catch (err) {
        console.error("Backend returned invalid JSON:", text);
        alert("Server error. Please try again later.");
        return;
      }

      if (!response.ok) {
        console.error("Error creating task:", result);
        alert(result.message || "Failed to add station");
        return;
      }

      alert("Station added successfully!");
      resetForm();
      onClose(); // close the modal
      if (onSubmit) onSubmit(result); // callback to parent if needed
    } catch (err) {
      console.error("Network or server error:", err);
      alert("Network error. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: data1,
      address: data2,
      latitude: data3,
      longitude: data4,
      status: data5,
      poweroutput: data6,
      connectortype: data7,
    };

    submitForm(formData);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Charging Station</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Station Name"
              value={data1}
              onChange={(e) => setData1(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="Full Address"
              value={data2}
              onChange={(e) => setData2(e.target.value)}
              required
            />
          </div>

          {/* Latitude & Longitude */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                className="form-input"
                placeholder="e.g. 40.7128"
                value={data3}
                onChange={(e) => setData3(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                className="form-input"
                placeholder="e.g. -74.0060"
                value={data4}
                onChange={(e) => setData4(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="dropdown-container">
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                {data5} <span className="dropdown-arrow">▼</span>
              </button>
              {isStatusDropdownOpen && (
                <div className="dropdown-menu">
                  {statusOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${data5 === option ? "selected" : ""}`}
                      onClick={() => {
                        setData5(option);
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {data5 === option && <span className="checkmark">✓</span>}
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Power Output */}
          <div className="form-group">
            <label className="form-label">Power Output (kW)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 50"
              value={data6}
              onChange={(e) => setData6(e.target.value)}
              required
            />
          </div>

          {/* Connector Type Dropdown */}
          <div className="form-group">
            <label className="form-label">Connector Type</label>
            <div className="dropdown-container">
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setIsConnectorDropdownOpen(!isConnectorDropdownOpen)}
              >
                {data7} <span className="dropdown-arrow">▼</span>
              </button>
              {isConnectorDropdownOpen && (
                <div className="dropdown-menu">
                  {connectorTypes.map((type) => (
                    <div
                      key={type}
                      className={`dropdown-item ${data7 === type ? "selected" : ""}`}
                      onClick={() => {
                        setData7(type);
                        setIsConnectorDropdownOpen(false);
                      }}
                    >
                      {data7 === type && <span className="checkmark">✓</span>}
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pop;
