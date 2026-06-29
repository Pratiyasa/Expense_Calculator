import { useState, useEffect } from "react";

import {
createGoal,
updateGoal
} from "../services/goal.service";

export default function GoalCard({

reload,
editGoal,
close

}) {

const [form,setForm]=useState({

title:"",
targetAmount:"",
monthlySaving:""

});


useEffect(()=>{

if(editGoal){

setForm({

title:editGoal.title,

targetAmount:editGoal.targetAmount,

monthlySaving:editGoal.monthlySaving

});

}

},[editGoal]);


const save=async()=>{

try{

if(editGoal){

await updateGoal(
editGoal._id,
form
);

}

else{

await createGoal(
form
);

}

reload();

close();

}

catch(error){

console.log(error);

}

};


return (

<div
className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
"
>

<div
className="
bg-white
w-[450px]
rounded-3xl
p-8
"
>

<h2 className="text-3xl font-bold mb-6">

{

editGoal

?

"Edit Goal"

:

"Add Goal"

}

</h2>


<div className="space-y-4">

<input
placeholder="Goal Name"
value={form.title}
onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}
className="
w-full
border
rounded-xl
p-3
"
/>


<input
type="number"
placeholder="Target Amount"
value={form.targetAmount}
onChange={(e)=>
setForm({
...form,
targetAmount:e.target.value
})
}
className="
w-full
border
rounded-xl
p-3
"
/>


<input
type="number"
placeholder="Monthly Saving"
value={form.monthlySaving}
onChange={(e)=>
setForm({
...form,
monthlySaving:e.target.value
})
}
className="
w-full
border
rounded-xl
p-3
"
/>


<div className="flex gap-4">

<button
onClick={save}
className="
flex-1
bg-indigo-600
text-white
p-3
rounded-xl
"
>

Save

</button>


<button
onClick={close}
className="
flex-1
border
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