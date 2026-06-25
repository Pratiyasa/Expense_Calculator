import Navbar from "../components/Navbar";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { updateProfile } from "../services/user.service";

export default function Dashboard() {

const nav = useNavigate();

const { user, setUser } = useAuth();


const [editing, setEditing] = useState(false);


const [form, setForm] = useState({

fullname: user?.fullname || "",

occupation: user?.occupation || "",

freelance: user?.freelance || false,

address: user?.address || ""

});


const saveProfile = async () => {

try {

const res =
await updateProfile(form);

setUser(res.data);

setEditing(false);

}

catch(error){

console.log(error);

}

};



return (

<div className="min-h-screen bg-slate-100">

<Navbar />

<div className="max-w-7xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8">

Dashboard

</h1>



<div
className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
"
>


{/* PROFILE */}

<div
className="
bg-white
rounded-3xl
shadow
p-8
"
>

<div
className="
flex
justify-between
items-center
mb-8
"
>

<h2 className="text-2xl font-bold">

Profile

</h2>


{

editing

?

<button

onClick={saveProfile}

className="
bg-green-600
text-white
px-5
py-2
rounded-xl
"

>

Update

</button>

:

<button

onClick={()=>

setEditing(true)

}

className="
bg-indigo-600
text-white
px-5
py-2
rounded-xl
"

>

Edit

</button>

}

</div>



<div className="space-y-5">


<div>

<p className="text-gray-500">

Full Name

</p>

{

editing

?

<input

value={form.fullname}

onChange={(e)=>

setForm({

...form,

fullname:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"

/>

:

<p className="font-semibold">

{user?.fullname}

</p>

}

</div>



<div>

<p className="text-gray-500">

Username

</p>

<p>

{user?.username}

</p>

</div>



<div>

<p className="text-gray-500">

Email

</p>

<p>

{user?.email}

</p>

</div>



<div>

<p className="text-gray-500">

Occupation

</p>

{

editing

?

<input

value={form.occupation}

onChange={(e)=>

setForm({

...form,

occupation:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"

/>

:

<p>

{user?.occupation || "Not Added"}

</p>

}

</div>



<div>

<p className="text-gray-500">

Freelance

</p>

{

editing

?

<input

type="checkbox"

checked={form.freelance}

onChange={(e)=>

setForm({

...form,

freelance:e.target.checked

})

}

/>

:

<p>

{user?.freelance ? "Yes" : "No"}

</p>

}

</div>



<div>

<p className="text-gray-500">

Address

</p>

{

editing

?

<input

value={form.address}

onChange={(e)=>

setForm({

...form,

address:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"

/>

:

<p>

{user?.address || "Not Added"}

</p>

}

</div>


</div>

</div>



{/* INCOME */}

<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-2xl font-bold mb-4">

Income

</h2>

<div className="bg-indigo-50 rounded-2xl p-6">

<p className="text-gray-600">

Salary

</p>

<p className="text-4xl font-bold">

₹0

</p>

<p className="mt-4 text-gray-600">

Bonus

</p>

<p className="text-xl">

₹0

</p>

<button
className="
mt-6
bg-indigo-600
text-white
px-5
py-3
rounded-xl
"
>

Add Income

</button>

</div>

</div>

</div>



<div
className="
mt-8
bg-green-600
text-white
rounded-3xl
p-8
shadow
"
>

<p className="text-lg">

Current Balance

</p>

<h2 className="text-5xl font-bold">

₹0

</h2>

</div>



<div className="mt-10">

<div className="flex justify-between">

<h2 className="text-2xl font-bold">

Recent Expenses

</h2>

<button
onClick={()=>
nav("/expenses")
}
className="text-indigo-600"
>

View All →

</button>

</div>

</div>


</div>

</div>

);

}