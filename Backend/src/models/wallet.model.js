import mongoose from "mongoose";

const walletSchema =
new mongoose.Schema({

owner:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
unique:true
},

currentBalance:{
type:Number,
default:0
}

},

{

timestamps:true

});

export default mongoose.model(
"Wallet",
walletSchema
);