import Income from "../models/income.model.js";

import ApiResponse from "../utils/ApiResponse.js";

import asyncHandler from "../utils/asyncHandler.js";

import { updateBalance } from "../utils/updateBalance.js";



/*
CREATE / UPDATE INCOME
*/

export const createIncome =
asyncHandler(async(req,res)=>{

const {

salary,

bonus = 0

} = req.body;


/* CHECK EXISTING */

const existing =
await Income.findOne({

owner:req.user._id

});


/* UPDATE */

if(existing){

const oldIncome =

Number(existing.salary)
+
Number(existing.bonus);


const newIncome =

Number(salary)
+
Number(bonus);


/* SAVE NEW VALUES */

existing.salary =
salary;

existing.bonus =
bonus;

await existing.save();


/* ONLY UPDATE DIFFERENCE */

await updateBalance(

req.user._id);


return res
.status(200)
.json(

new ApiResponse(

200,

existing,

"Income Updated"

)

);

}


/* CREATE */

const income =
await Income.create({

salary,

bonus,

owner:req.user._id

});


/* ADD TO WALLET */

await updateBalance(

req.user._id
);


return res
.status(201)
.json(

new ApiResponse(

201,

income,

"Income Added"

)

);

});




/*
GET INCOME
*/

export const getIncome =
asyncHandler(async(req,res)=>{

const income =
await Income.findOne({

owner:req.user._id

});


return res
.status(200)
.json(

new ApiResponse(

200,

income,

"Income fetched"

)

);

});