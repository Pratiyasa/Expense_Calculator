import {
useEffect,
useState
}
from "react";

import Navbar from "../components/Navbar";

import GoalModal from "../components/GoalModal";

import {

getGoals,
deleteGoal

}

from "../services/goal.service";


export default function Goals(){

const [goals,setGoals]=
useState([]);

const [open,setOpen]=
useState(false);

const [editGoal,setEditGoal]=
useState(null);


const load=
async()=>{

try{

const res=
await getGoals();

setGoals(
res.data || []
);

}

catch(error){

console.log(error);

}

};


useEffect(()=>{

load();

},[]);


const remove=
async(id)=>{

await deleteGoal(
id
);

load();

};



return(

<div className="min-h-screen bg-slate-100">

<Navbar/>


<div className="max-w-6xl mx-auto p-8">


<div
className="
flex
justify-between
items-center
mb-10
"
>

<h1 className="text-4xl font-bold">

Goal History

</h1>


<button

onClick={()=>{

setEditGoal(null);

setOpen(true);

}}

className="
bg-indigo-600
text-white
px-6
py-3
rounded-xl
"
>

+ Add Goal

</button>

</div>



<div
className="
grid
md:grid-cols-2
gap-6
"
>

{

goals.length

?

goals.map((goal)=>(

<div
key={goal._id}
className="
bg-white
rounded-3xl
shadow
p-8
"
>

<h2 className="text-2xl font-bold">

{goal.title}

</h2>


<p className="mt-4">

Target:
₹{goal.targetAmount}

</p>


<p>

Monthly Saving:
₹{goal.monthlySaving}

</p>


<div className="mt-6 flex gap-3">

<button

onClick={()=>{

setEditGoal(goal);

setOpen(true);

}}

className="
bg-yellow-500
text-white
px-5
py-2
rounded-xl
"
>

Edit

</button>


<button

onClick={()=>
remove(goal._id)
}

className="
bg-red-500
text-white
px-5
py-2
rounded-xl
"
>

Delete

</button>

</div>

</div>

))

:

(

<div
className="
bg-white
rounded-3xl
p-8
"
>

No goals yet

</div>

)

}

</div>

{

open && (

<GoalModal

open={open}

close={()=>{

setOpen(false);

setEditGoal(null);

}}

reload={load}

editGoal={editGoal}

/>

)

}
</div>

</div>

);

}