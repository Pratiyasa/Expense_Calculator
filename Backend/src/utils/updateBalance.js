import Wallet from "../models/wallet.model.js";

export const updateBalance =
async(

userId,

change

)=>{

let wallet =
await Wallet.findOne({

owner:userId

});


if(!wallet){

wallet =
await Wallet.create({

owner:userId,

currentBalance:0

});

}


wallet.currentBalance += change;

await wallet.save();

return wallet;

};