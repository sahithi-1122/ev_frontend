import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
function PrivateRoute({ children}) {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading

  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await fetch("https://ev-backend-y8vm.onrender.com/api/users/current", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthorized(true); // valid token
        } else {
          localStorage.removeItem("token");
          setIsAuthorized(false); // invalid token
        }
      } catch (error) {
        console.error("Validation error:", error);
        localStorage.removeItem("token");
        setIsAuthorized(false);
      }
    };

    validateToken();
  }, [token]);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // or a spinner
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;