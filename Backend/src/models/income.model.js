import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({

salary:{
type:Number,
default:0
},

bonus:{
type:Number,
default:0
},

owner:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
unique:true
}

},{timestamps:true});

export default mongoose.model(
"Income",
incomeSchema
);