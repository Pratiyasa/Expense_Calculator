import Wallet from "../models/wallet.model.js";

import Income from "../models/income.model.js";

export const updateBalance =
async(userId)=>{

let wallet =
await Wallet.findOne({

owner:userId

});


if(!wallet){

wallet =
new Wallet({

owner:userId,

currentBalance:0,

lastSalaryCredit:null

});

}


const income =
await Income.findOne({

owner:userId

});


if(!income){

await wallet.save();

return wallet;

}


const now =
new Date();


const currentMonth =

`${now.getFullYear()}-${
now.getMonth()
}`;


const lastMonth =

wallet.lastSalaryCredit

?

`${wallet.lastSalaryCredit.getFullYear()}-${
wallet.lastSalaryCredit.getMonth()
}`

:

null;



if(currentMonth!==lastMonth){

wallet.currentBalance +=

Number(income.salary||0)

+

Number(income.bonus||0);


wallet.lastSalaryCredit =
now;

}


await wallet.save();

return wallet;

};