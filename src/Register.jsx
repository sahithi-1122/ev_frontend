import './Register.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const formHandler = async (formData) => {
    try {
      const response = await fetch("https://ev-backend-y8vm.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text(); // read as text first
      let result;
      try {
        result = JSON.parse(text); // try parsing JSON
      } catch (err) {
        console.error("Backend returned invalid JSON:", text);
        alert("Server error. Please try again later.");
        return;
      }

      if (!response.ok) {
        console.error("Registration failed:", result);
        alert(result.message || "Registration failed");
        return;
      }

      // Success
      localStorage.setItem("token", result.accessToken);
      resetForm();
      navigate("/dashboard");
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = { name, email, password };
    formHandler(formData);
  };

  return (
    <div className='reg'>
      <form onSubmit={submitHandler} className='register'>
        <h2>Register</h2>
        <p>Create an account to manage charging stations</p>

        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>

        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Register;
