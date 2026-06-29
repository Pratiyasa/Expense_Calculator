import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ExpenseModal from "../components/ExpenseModal";

import {
getExpenses,
deleteExpense
}
from "../services/expense.service";

export default function Expenses(){

const [expenses,setExpenses]=useState([]);

const [filtered,setFiltered]=useState([]);

const [show,setShow]=useState(false);

const [editing,setEditing]=useState(null);

const [timeFilter,setTimeFilter]=
useState("all");

const [categoryFilter,setCategoryFilter]=
useState("all");

const [customDate,setCustomDate]=
useState("");


const load=async()=>{

const res=
await getExpenses();

const data=
res.data || [];

setExpenses(data);

setFiltered(data);

};


useEffect(()=>{

load();

},[]);



useEffect(()=>{

let data=[...expenses];


// CATEGORY

if(categoryFilter!=="all"){

data=
data.filter(

exp=>

exp.category===categoryFilter

);

}


// DATE FILTER

const now=
new Date();


if(timeFilter==="today"){

data=
data.filter(exp=>{

const d=
new Date(exp.date);

return(

d.toDateString()

===

now.toDateString()

);

});

}


if(timeFilter==="week"){

const week=
new Date();

week.setDate(

week.getDate()-7

);

data=
data.filter(

exp=>

new Date(exp.date)>=week

);

}


if(timeFilter==="month"){

data=
data.filter(exp=>{

const d=
new Date(exp.date);

return(

d.getMonth()

===

now.getMonth()

&&

d.getFullYear()

===

now.getFullYear()

);

});

}


if(

timeFilter==="date"

&&

customDate

){

data=
data.filter(

exp=>

exp.date.slice(0,10)

===

customDate

);

}


setFiltered(data);

},

[

expenses,

timeFilter,

categoryFilter,

customDate

]

);


const remove=
async(id)=>{

await deleteExpense(id);

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
mb-8
"
>

<h1 className="text-4xl font-bold">

Expense History

</h1>


<button

onClick={()=>{

setEditing(null);

setShow(true);

}}

className="
bg-indigo-600
text-white
px-6
py-3
rounded-xl
"

>

+ Add Expense

</button>

</div>



{

show &&

<ExpenseModal

close={()=>{

setShow(false);

setEditing(null);

}}

reload={load}

editingExpense={editing}

/>

}



{/* FILTERS */}

<div className="flex gap-4 mb-8">


<select

value={timeFilter}

onChange={(e)=>

setTimeFilter(

e.target.value

)

}

className="
p-3
rounded-xl
bg-white
"

>

<option value="all">

All Time

</option>

<option value="today">

Today

</option>

<option value="week">

This Week

</option>

<option value="month">

This Month

</option>

<option value="date">

Custom Date

</option>

</select>



{

timeFilter==="date"

&&

<input

type="date"

value={customDate}

onChange={(e)=>

setCustomDate(

e.target.value

)

}

className="
p-3
rounded-xl
"

/>

}



<select

value={categoryFilter}

onChange={(e)=>

setCategoryFilter(

e.target.value

)

}

className="
p-3
rounded-xl
bg-white
"

>

<option value="all">

All Categories

</option>

<option value="Food">

Food</option>

<option value="Transport">

Transport</option>

<option value="Shopping">

Shopping</option>

<option value="Bills">

Bills</option>

<option value="Health">

Health</option>

<option value="Entertainment">

Entertainment</option>

<option value="Other">

Other</option>

</select>


</div>




<div className="space-y-5">

{

filtered.length

?

filtered.map((exp)=>(

<div

key={exp._id}

className="
bg-white
rounded-3xl
shadow
p-6
"

>

<div className="flex justify-between">


<div>

<h2 className="text-2xl font-bold">

{exp.title}

</h2>

<p>

{exp.category}

</p>

<p>

{exp.paymentMode}

</p>

<p>

{exp.note}

</p>

</div>



<div>

<h2 className="text-3xl font-bold">

₹{exp.amount}

</h2>

<p>

{

new Date(
exp.date
)

.toLocaleDateString()

}

</p>


<div className="flex gap-3 mt-5">

<button

onClick={()=>{

setEditing(exp);

setShow(true);

}}

className="
bg-yellow-500
text-white
px-4
py-2
rounded-xl
"

>

Update

</button>


<button

onClick={()=>

remove(
exp._id
)

}

className="
bg-red-500
text-white
px-4
py-2
rounded-xl
"

>

Delete

</button>

</div>

</div>

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
text-center
"
>

No expenses found

</div>

)

}

</div>


</div>

</div>

);

}