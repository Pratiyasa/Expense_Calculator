import { useState } from "react";
import { saveIncome } from "../services/income.service";

export default function IncomeModal({
setIncome
}) {

const [show,setShow]=
useState(false);

const [salary,setSalary]=
useState("");

const [bonus,setBonus]=
useState("");

const submit =
async()=>{

const res =
await saveIncome({

salary,
bonus

});

setIncome(
res.data
);

setShow(false);

};


return(

<>

<button
onClick={()=>
setShow(true)
}
className="
bg-indigo-600
text-white
px-5
py-3
rounded-xl
"
>

Add / Edit Income

</button>


{

show && (

<div
className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
"
>

<div
className="
bg-white
p-8
rounded-3xl
w-[450px]
"
>

<h2 className="text-2xl mb-5">

Income

</h2>


<input
placeholder="Salary"
value={salary}
onChange={(e)=>
setSalary(
e.target.value
)
}
className="
border
w-full
p-3
mb-4
rounded-xl
"
/>


<input
placeholder="Bonus"
value={bonus}
onChange={(e)=>
setBonus(
e.target.value
)
}
className="
border
w-full
p-3
rounded-xl
"
/>


<button
onClick={submit}
className="
mt-5
bg-green-600
text-white
px-5
py-3
rounded-xl
"
>

Save

</button>

</div>

</div>

)

}

</>

);

}