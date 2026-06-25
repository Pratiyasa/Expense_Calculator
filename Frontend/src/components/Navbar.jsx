import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

 const { user, setUser } = useAuth();
 const nav = useNavigate();

 const handleLogout = async () => {
  try {

   await logout();

   setUser(null);

   nav("/login");

  } catch (err) {

   console.log(err);

  }
 };

 return (

<nav className="bg-white shadow">

<div className="max-w-7xl mx-auto px-8 py-4 flex justify-between">

<Link
to="/"
className="
text-2xl
font-bold
text-indigo-600
"
>

ExpenseTracker

</Link>


<div className="flex items-center gap-5">

<span className="text-gray-600">

Hi,
{" "}
{user?.fullname}

</span>


<button

onClick={handleLogout}

className="
bg-red-500
text-white
px-5
py-2
rounded-xl
hover:bg-red-600
"

>

Logout

</button>

</div>

</div>

</nav>

);

}