import mongoose from "mongoose";

const goalSchema =
new mongoose.Schema({

title:{
type:String,
required:true
},

targetAmount:{
type:Number,
required:true
},

monthlySaving:{
type:Number,
required:true
},

owner:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

completed:{
type:Boolean,
default:false
}

},

{

timestamps:true

});

export default mongoose.model(
"Goal",
goalSchema
);