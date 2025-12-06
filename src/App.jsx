import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import DashBoard from "./DashBoard.jsx";
import Register from './Register.jsx';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
function App() {
  const [isModalOpen,setIsModalOpen]=useState(false)
  return (
    <div>
     
       <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/login" element={<LoginForm />} />
           <Route path="/register" element={<Register/>}/>
           <Route path="/dashboard" element={
             <PrivateRoute>
  <DashBoard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
             </PrivateRoute>
          
            
            }></Route>
        </Routes>

    </div>
     
     
  )
}

export default App;