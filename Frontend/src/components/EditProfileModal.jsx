import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { updateProfile } from "../services/user.service";

function EditProfileModal() {

const { user, setUser } = useAuth();

const [editing, setEditing] = useState(false);

const [form, setForm] = useState({

fullname: user?.fullname || "",

occupation: user?.occupation || "",

freelance: user?.freelance || false,

address: user?.address || ""

});


const save = async () => {

try {

const res =
await updateProfile(form);


// backend returns ApiResponse
setUser(
res.data
);

setEditing(false);

}

catch(error){

console.log(error);

}

};



return (

<div className="space-y-5">


{/* FULL NAME */}

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
rounded-xl
p-3
w-full
"
/>

:

<p className="font-semibold">

{user?.fullname}

</p>

}

</div>



{/* OCCUPATION */}

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
rounded-xl
p-3
w-full
"
/>

:

<p>

{user?.occupation || "Not Added"}

</p>

}

</div>



{/* ADDRESS */}

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
rounded-xl
p-3
w-full
"
/>

:

<p>

{user?.address || "Not Added"}

</p>

}

</div>



{/* FREELANCE */}

<div>

<p className="text-gray-500">

Freelance

</p>

{

editing

?

<label className="flex gap-3">

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

Freelancer

</label>

:

<p>

{user?.freelance

?

"Yes"

:

"No"}

</p>

}

</div>



<div className="flex gap-4">

{

editing

?

<>

<button

onClick={save}

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


<button

onClick={()=>

setEditing(false)

}

className="
bg-gray-200
px-5
py-2
rounded-xl
"

>

Cancel

</button>

</>

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

Edit Profile

</button>

}

</div>


</div>

);

}

export default EditProfileModal;
