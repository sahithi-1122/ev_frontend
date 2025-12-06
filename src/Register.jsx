import './Register.css';
import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
function Register()
{
   const navigate = useNavigate(); 
  const[data1,setData]=useState("");
  const[data2,setData2]=useState("");
  const[data3,setData3]=useState("");
  const[data4,setData4]=useState("");
  const[formData,setFormData]=useState({});
  const formHandler =async()=>
  {
    const response=await fetch("https://ev-backend-y8vm.onrender.com/api/users/register",
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
   localStorage.setItem("token",result.accessToken);
     setData("");
     setData2("");
     setData3("");
     setData4("");
      navigate("/dashboard");
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    if(data3!=data4)
    {
      alert("Password not matching");
    }
    else
    {
      setFormData({
        name:data1,
        email:data2,
        password:data3

      });
      formHandler();
      

    }
  }
    return(
      <div className='reg'>
         <form onSubmit={submitHandler} className='register'>
      <h2>Register</h2>
      <p>Create an account to manage charging stations</p>

      <div>
        <label>Name</label>
        <input 
        type="text" 
        placeholder="John Doe" 
        value={data1}
        onChange={(e)=>setData(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label> 
        <input type="email" 
        placeholder="name@example.com"
        value={data2}
        onChange={(e)=>setData2(e.target.value)}
         />
      </div>

      <div>
        <label>Password</label> 
        <input type="password" placeholder="password" 
         value={data3}
        onChange={(e)=>setData3(e.target.value)}/>
      </div>

      <div>
        <label>Confirm Password</label> 
        <input type="password" placeholder="confirm Password"
        value={data4}
        onChange={(e)=>setData4(e.target.value)} />
      </div>

      <button type="submit">Register</button>

      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
    </div>
    )
}
export default Register;