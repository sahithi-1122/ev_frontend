import './LoginForm.css';
import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
function LoginForm()
{
   const navigate = useNavigate(); 
  const[datalogin1,setdatalogin1]=useState("");
  const[datalogin2,setdatalogin2]=useState("");
  const[datalogin3,setdatalogin3]=useState({});
  const handleform =async()=>
  {
    const response= await fetch("https://ev-backend-y8vm.onrender.com/api/users/login",
     {
      method:"POST",
       headers: 
       {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(datalogin3),
    }
    )
  

   const result= await response.json();
     if(!response.ok)
    {
      alert("email or password is not valid !");
      setdatalogin1("");
      setdatalogin2("");
    }
   localStorage.setItem("token",result.accessToken);
   setdatalogin1("");
    setdatalogin2("");
    navigate("/dashboard");
  }
  const handleLogin =(e)=>
  {
       e.preventDefault();
       setdatalogin3(
        {
          email:datalogin1,
          password:datalogin2
        }
        
       )
       handleform();
  }
    return(
       <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email"
          
          placeholder="name@example.com"
          
          value={datalogin1}
          onChange={(e) =>setdatalogin1(e.target.value)}

          required />

          <label>Password</label>
          <input type="password" placeholder="password" 
          value={datalogin2}
          onChange={(e) =>setdatalogin2(e.target.value)}
          required />

          <button type="submit" >Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
    )
}
export default LoginForm;