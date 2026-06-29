import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

import {updateProfile} from "../services/user.service";
import {getCurrentUser} from "../services/auth.service";
import IncomeModal from "../components/IncomeModal";

import {
getIncome
}
from "../services/income.service";

import {
getGoals
}
from "../services/goal.service";

import {
getExpenses
}
from "../services/expense.service";

export default function Dashboard(){

const nav=useNavigate();

const { user,setUser }=useAuth();

const [editing,setEditing]=useState(false);

const [form,setForm]=useState({
fullname:"",
occupation:"",
freelance:false,
address:""
});

const [income,setIncome]=useState(null);

const [goals,setGoals]=useState([]);

const [expenses,setExpenses]=useState([]);


// PROFILE PREFILL
useEffect(()=>{

if(user){

setForm({

fullname:user.fullname||"",
occupation:user.occupation||"",
freelance:user.freelance||false,
address:user.address||""

});

}

},[user]);



// SAVE PROFILE
const saveProfile=async()=>{

try{

const res=
await updateProfile(form);

setUser(res.data);

setEditing(false);

}
catch(err){

console.log(err);

}

};



// LOAD DATA
const load=async()=>{

try{

// refresh user (balance updates)
const current=
await getCurrentUser();

setUser(current.data);


// income
const i=
await getIncome();

setIncome(i.data);


// goals
const g=
await getGoals();

setGoals(g.data||[]);


// expenses
const e=
await getExpenses();

setExpenses(e.data||[]);

}
catch(err){

console.log(err);

}

};


// PAGE LOAD
useEffect(()=>{

load();

},[]);



return(

<div className="min-h-screen bg-slate-100">

<Navbar/>

<div className="max-w-7xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8">

Dashboard

</h1>



{/* PROFILE + INCOME */}

<div className="grid lg:grid-cols-2 gap-8">

{/* PROFILE */}

<div className="bg-white rounded-3xl shadow p-8">

<div className="flex justify-between mb-6">

<h2 className="text-2xl font-bold">

Profile

</h2>

<button
onClick={
editing
?
saveProfile
:
()=>setEditing(true)
}
className="
bg-indigo-600
text-white
px-5
py-2
rounded-xl
"
>

{
editing
?
"Update"
:
"Edit"
}

</button>

</div>


<div className="space-y-5">

{[
["Full Name","fullname"],
["Occupation","occupation"],
["Address","address"]
].map(([label,key])=>(

<div key={key}>

<p className="text-gray-500">

{label}

</p>

{

editing

?

<input
value={form[key]}
onChange={(e)=>

setForm({
...form,
[key]:e.target.value
})

}
className="
border
rounded-xl
p-3
w-full
"
/>

:

<p>

{
user?.[key]
||
"Not Added"
}

</p>

}

</div>

))}


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

{
user?.freelance
?
"Yes"
:
"No"
}

</p>

}

</div>

</div>

</div>



{/* INCOME */}

<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-2xl font-bold mb-5">

Income

</h2>

<div className="bg-indigo-50 rounded-2xl p-6">

<p>Total Income</p>

<h1 className="text-5xl font-bold">

₹{
(income?.salary||0)
+
(income?.bonus||0)
}

</h1>

<p className="mt-5">

Salary: ₹{income?.salary||0}

</p>

<p>

Bonus: ₹{income?.bonus||0}

</p>

<div className="mt-5">

<IncomeModal
setIncome={setIncome}
/>

</div>

</div>

</div>

</div>



{/* BALANCE */}

<div className="mt-8 bg-green-600 text-white rounded-3xl p-8">

<h2>

Current Balance

</h2>

<h1 className="text-6xl font-bold">
 {console.log(user)}
₹{
user?.balance 
||
0
}

</h1>

<p className="mt-2">

Income − Expenses − Monthly Goal Savings

</p>

</div>



{/* GOALS */}

<div className="mt-8 bg-white rounded-3xl p-8">

<div className="flex justify-between">

<div>

<p>

Savings Goals

</p>

<h1 className="text-5xl">

{
goals.length
}

</h1>

</div>

<button
onClick={()=>
nav("/goals")
}
className="
bg-indigo-600
text-white
px-5
py-3
rounded-xl
"
>

Manage Goals →

</button>

</div>

</div>



{/* EXPENSES */}

<div className="mt-10">

<div className="flex justify-between mb-5">

<h2 className="text-3xl font-bold">

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


<div className="space-y-4">

{

expenses.length

?

expenses
.slice(0,5)
.map((exp)=>(

<div
key={exp._id}
className="
bg-white
rounded-xl
p-5
shadow
flex
justify-between
"
>

<span>

{
exp.category
}

</span>

<span>

₹{
exp.amount
}

</span>

</div>

))

:

<div className="bg-white p-5 rounded-xl">

No Expenses Added

</div>

}

</div>

</div>

</div>

</div>

);

}