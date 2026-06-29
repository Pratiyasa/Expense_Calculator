import { BrowserRouter, Routes, Route} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import { useAuth } from "./context/AuthContext";


export default function App() {

const { user, loading } = useAuth();

if (loading) {
  return <div>Loading...</div>;
}

 return (
  <BrowserRouter>
   <Routes>


   <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />}/>

    <Route path="/login" element={<Login />}/>

    <Route path="/goals" element={<ProtectedRoute>
                                  <Goals />
                                  </ProtectedRoute>
      }/>

    <Route path="/dashboard" element={<ProtectedRoute>
                                         <Dashboard />
                                       </ProtectedRoute>
     }/>
     <Route path="/expenses" element={<Expenses/>}/>


   </Routes>
  </BrowserRouter>
 );
}