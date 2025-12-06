import { useState } from "react"
import "./Pop.css"

function Pop({ isOpen, onClose, onSubmit }) {
  const[data1,setdata1]=useState("");
  const[data2,setdata2]=useState("");
  const[data3,setdata3]=useState();
  const[data4,setdata4]=useState();
  const[data5,setdata5]=useState("Active");
  const[data6,setdata6]=useState();
  const[data7,setdata7]=useState("Type 2");

  const [formData, setFormData] = useState({})

  const [isConnectorDropdownOpen, setIsConnectorDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)

  const connectorTypes = ["Type 1", "Type 2", "CCS", "CHAdeMO", "Tesla"]
  const statusOptions = ["Active", "Inactive", "Maintenance"]

 const submitform =async()=>
  {
    const response=await fetch("https://ev-backend-y8vm.onrender.com/api/tasks",
      {
        method :"POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      }
    );
   
      
  const result= await response.json();
  if(!response.ok)
   {
    alert("not succefull");
   }
  
    setdata1("")
    setdata2("")
    setdata3("")
    setdata4("")
    setdata5("Active")
    setdata6("")
    setdata7("Type 2")
    onclose()
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData(
      {
     name: data1,
      address: data2,
      latitude: data3,
      longitude: data4,
      status: data5,
      poweroutput: data6,
      connectortype: data7
      }
    )
    submitform();
    
  }

  const handleCancel = () => {
    setFormData({})
    onClose()
  }

  if (!isOpen) return null

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
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Station Name"
              value={data1}
              onChange={(e)=>setdata1(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Full Address"
             value={data2}
              onChange={(e)=>setdata2(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step ="any"
                name="latitude"
                className="form-input"
                placeholder="e.g. 40.7128"
              value={data3}
              onChange={(e)=>setdata3(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step ="any"
                name="longitude"
                className="form-input"
                placeholder="e.g. -74.0060"
            value={data4}
              onChange={(e)=>setdata4(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="dropdown-container">
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              
              >
                {data5}
                <span className="dropdown-arrow">▼</span>
              </button>
              {isStatusDropdownOpen && (
                <div className="dropdown-menu">
                  {statusOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${data5 === option ? "selected" : ""}`}
                      onClick={() => {
                        setdata5(option);
                        setIsStatusDropdownOpen(false)
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

          <div className="form-group">
            <label className="form-label">Power Output (kW)</label>
            <input
              type="number"
              name="powerOutput"
              className="form-input"
              placeholder="e.g. 50"
              value={data6}
              onChange={(e)=>setdata6(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Connector Type</label>
            <div className="dropdown-container">
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setIsConnectorDropdownOpen(!isConnectorDropdownOpen)}
              >
                {data7}
                <span className="dropdown-arrow">▼</span>
              </button>
              {isConnectorDropdownOpen && (
                <div className="dropdown-menu">
                  {connectorTypes.map((type) => (
                    <div
                      key={type}
                      className={`dropdown-item ${data7 === type ? "selected" : ""}`}
                      onClick={() => {
                        setdata7(type)
                        setIsConnectorDropdownOpen(false)
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
  )
}

export default Pop;
