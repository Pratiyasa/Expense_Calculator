import Navbar from "../components/Navbar";

export default function Dashboard() {

return (

<div className="min-h-screen bg-slate-100">

<Navbar />

<div className="max-w-7xl mx-auto p-8">

<h1
className="
text-4xl
font-bold
mb-8
"
>

Dashboard

</h1>


<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
>

<div
className="
bg-white
rounded-3xl
shadow
p-8
"
>

<h3 className="text-gray-500">

Total Expenses

</h3>

<p className="text-4xl font-bold">

₹0

</p>

</div>


<div
className="
bg-white
rounded-3xl
shadow
p-8
"
>

<h3 className="text-gray-500">

This Month

</h3>

<p className="text-4xl font-bold">

₹0

</p>

</div>


<div
className="
bg-white
rounded-3xl
shadow
p-8
"
>

<h3 className="text-gray-500">

Transactions

</h3>

<p className="text-4xl font-bold">

0

</p>

</div>

</div>



<div className="mt-10">

<button

className="
bg-indigo-600
text-white
px-6
py-3
rounded-xl
hover:bg-indigo-700
"

>

+ Add Expense

</button>

</div>
 <div className="mt-10">

<h2 className="text-2xl font-bold mb-5">

Recent Expenses

</h2>

<div className="space-y-4">

<div
className="
bg-white
rounded-2xl
p-5
shadow
"
>

Food — ₹250

</div>

</div>

</div>
</div>

</div>



);

}