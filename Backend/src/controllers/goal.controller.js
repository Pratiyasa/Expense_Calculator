import Goal from "../models/goal.model.js";

import ApiResponse from "../utils/ApiResponse.js";

import asyncHandler from "../utils/asyncHandler.js";
import { updateBalance } from "../utils/updateBalance.js";


export const createGoal =
asyncHandler(async(req,res)=>{

const {
title,
targetAmount,
monthlySaving
}=req.body;

const goal =
await Goal.create({

title,
targetAmount,
monthlySaving,
owner:req.user._id

});

try{

await updateBalance(
req.user._id
);

}catch(err){

console.log(err);

}

return res.status(201).json(

new ApiResponse(
201,
goal,
"Goal Created"
)

);

});




export const getGoals =
asyncHandler(async(req,res)=>{

console.log("GET GOALS HIT");

const goals=
await Goal.find({
owner:req.user._id
});

return res.status(200).json(
new ApiResponse(
200,
goals
)
);

});

export const updateGoal =
asyncHandler(async(req,res)=>{

const goal =
await Goal.findOneAndUpdate(

{
_id:req.params.id,
owner:req.user._id
},

req.body,

{
new:true
}

);

await updateBalance(
req.user._id
);

return res.status(200).json(

new ApiResponse(
200,
goal,
"Goal Updated"

)

);

});


export const deleteGoal =
asyncHandler(async(req,res)=>{

const goal =
await Goal.findOne({

_id:req.params.id,
owner:req.user._id

});

if(!goal){

throw new Error("Goal not found");

}

await goal.deleteOne();

await updateBalance(
req.user._id
);

return res.status(200).json(

new ApiResponse(
200,
{},
"Goal deleted"
)

);

});