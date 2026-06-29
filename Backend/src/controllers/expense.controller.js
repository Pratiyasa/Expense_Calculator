import Expense from "../models/expense.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { updateBalance } from "../utils/updateBalance.js";

import Wallet from "../models/wallet.model.js";
/*
CREATE EXPENSE
*/


export const createExpense =
asyncHandler(async(req,res)=>{

const {
title,
amount,
category,
note,
date
}=req.body;


if(
!title
||
!amount
||
!category
){

throw new ApiError(
400,
"All required fields are missing"
);

}


const expense =
await Expense.create({

title,
amount,
category,
note,
date,
owner:req.user._id

});


/* SUBTRACT FROM WALLET */

const wallet =
await Wallet.findOne({

owner:req.user._id

});


if(wallet){

wallet.currentBalance -=

Number(amount);

await wallet.save();

}


/* OPTIONAL:
salary monthly credit check
*/

await updateBalance(
req.user._id
);


return res
.status(201)
.json(

new ApiResponse(

201,

expense,

"Expense created"

)

);

});


/*
GET ALL USER EXPENSES
*/

export const getExpenses =asyncHandler(async (req, res) => {

const expenses =await Expense.getUserExpenses(req.user._id);

return res.status(200)
.json(
new ApiResponse(
200,
expenses,
"Expenses fetched"
)
);

});



/*
GET SINGLE EXPENSE
*/

export const getExpenseById =asyncHandler(async (req,res) => {

const expense =await Expense.findOne({_id:req.params.id,owner:req.user._id,});

if (!expense) {throw new ApiError(404,"Expense not found")}


return res
.status(200)
.json(
new ApiResponse(
200,
expense,
"Expense fetched"
)
);

});



/*
UPDATE EXPENSE
*/

export const updateExpense =
asyncHandler(async(req,res)=>{

const expense =
await Expense.findOne({

_id:req.params.id,

owner:req.user._id

});


if(!expense){

throw new ApiError(
404,
"Expense not found"
);

}


/* SAVE OLD AMOUNT FIRST */

const oldAmount =
Number(
expense.amount
);


const {
title,
amount,
category,
note,
date
}=req.body;


if(title)
expense.title=title;

if(amount)
expense.amount=amount;

if(category)
expense.category=category;

if(note!==undefined)
expense.note=note;

if(date)
expense.date=date;


await expense.save();



const wallet =
await Wallet.findOne({

owner:req.user._id

});


if(wallet){

wallet.currentBalance +=
oldAmount;

wallet.currentBalance -=
Number(
expense.amount
);

await wallet.save();

}


await updateBalance(
req.user._id
);


return res.status(200).json(

new ApiResponse(

200,

expense,

"Expense updated"

)

);

});

/*
DELETE EXPENSE
*/

export const deleteExpense =asyncHandler(async (req,res) => {

const expense =await Expense.findOneAndDelete({_id:req.params.id,owner:req.user._id,});


if (!expense) {
throw new ApiError(404,"Expense not found");
}

const wallet =
await Wallet.findOne({

owner:req.user._id

});

if(wallet){

wallet.currentBalance +=

Number(expense.amount);

await wallet.save();

}

await updateBalance(req.user._id);

return res
.status(200)
.json(
new ApiResponse(
200,
{},
"Expense deleted"
)
);

});