import { Navigate } from "react-router-dom";
import  {useAuth}  from "../context/AuthContext";

const ProtectedRoute=({children,}) =>{
  const { user } = useAuth();                          //call useAuth  to know which user is logged in

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

//if user logged in then only access to other pages else login page