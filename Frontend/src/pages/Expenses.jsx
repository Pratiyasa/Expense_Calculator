import {
useEffect,
useState
}
from "react";

import Navbar from "../components/Navbar";

import ExpenseModal from "../components/ExpenseModal";

import {
getExpenses,
deleteExpense
}
from "../services/expense.service";

export default function Expenses(){

const[
expenses,
setExpenses
]=
useState([]);

const[
show,
setShow
]=
useState(false);

const[
editing,
setEditing
]=
useState(null);



const load=
async()=>{

const res=
await getExpenses();

setExpenses(
res.data || []
);

};


useEffect(()=>{

load();

},[]);



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

<h1
className="
text-4xl
font-bold
"
>

Expense History

</h1>


<button

onClick={()=>
setShow(true)
}

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



<div className="space-y-5">

{

expenses.map((exp)=>(

<div

key={exp._id}

className="
bg-white
rounded-3xl
shadow
p-6
"
>

<div
className="
flex
justify-between
"
>

<div>

<h2
className="
text-2xl
font-bold
"
>

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

<h2
className="
text-3xl
font-bold
"
>

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

}

</div>

</div>

</div>

);

}