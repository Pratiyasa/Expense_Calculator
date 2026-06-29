import { useState } from "react";

import {
createExpense,
updateExpense
}
from "../services/expense.service";

export default function ExpenseModal({

close,
reload,
editingExpense

}){

const [form,setForm]=
useState({

title:
editingExpense?.title || "",

amount:
editingExpense?.amount || "",

category:
editingExpense?.category || "Food",

paymentMode:
editingExpense?.paymentMode || "Cash",

note:
editingExpense?.note || "",

date:
editingExpense?.date?.slice(0,10) || ""

});


const save=
async()=>{

try{

if(editingExpense){

await updateExpense(
editingExpense._id,
form
);

}

else{

await createExpense(
form
);

}

reload();

close();

}

catch(err){

console.log(err);

}

};



return(

<div
className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"
>

<div
className="
bg-white
w-[500px]
rounded-3xl
p-8
"
>

<h2
className="
text-3xl
font-bold
mb-6
"
>

{

editingExpense

?

"Update Expense"

:

"Add Expense"

}

</h2>


<div className="space-y-4">

<input
placeholder="Title"
value={form.title}
onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"
/>


<input
type="number"
placeholder="Amount"
value={form.amount}
onChange={(e)=>

setForm({

...form,

amount:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"
/>


<select

value={form.category}

onChange={(e)=>

setForm({

...form,

category:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"

>

<option>Food</option>

<option>Transport</option>

<option>Shopping</option>

<option>Bills</option>

<option>Health</option>

<option>Entertainment</option>

<option>Other</option>

</select>


<select

value={form.paymentMode}

onChange={(e)=>

setForm({

...form,

paymentMode:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"

>

<option>Cash</option>

<option>Online</option>

</select>


<input
type="date"
value={form.date}
onChange={(e)=>

setForm({

...form,

date:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"
/>


<textarea

placeholder="Note"

value={form.note}

onChange={(e)=>

setForm({

...form,

note:e.target.value

})

}

className="
border
p-3
rounded-xl
w-full
"
/>


<div className="flex gap-3">

<button

onClick={save}

className="
bg-indigo-600
text-white
flex-1
py-3
rounded-xl
"

>

Save

</button>


<button

onClick={close}

className="
bg-gray-300
flex-1
rounded-xl
"

>

Cancel

</button>

</div>

</div>

</div>

</div>

);

}