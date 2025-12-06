import './LoginForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleForm = async (formData) => {
    try {
      const response = await fetch(
        "https://ev-backend-y8vm.onrender.com/api/users/login",
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
        console.error("Login failed:", result);
        alert(result.message || "Email or password is not valid!");
        resetForm();
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

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = { email, password };
    handleForm(formData);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
