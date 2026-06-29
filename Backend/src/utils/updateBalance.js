import Wallet from "../models/wallet.model.js";

import Income from "../models/income.model.js";

import Expense from "../models/expense.model.js";

import Goal from "../models/goal.model.js";


export const updateBalance =
async(userId)=>{

console.log("UPDATE BALANCE CALLED");
const income =
await Income.findOne({

owner:userId

});


const expenses =
await Expense.find({

owner:userId

});


const goals =
await Goal.find({

owner:userId

});



// TOTAL INCOME
const totalIncome =

Number(income?.salary || 0)

+

Number(income?.bonus || 0);



// TOTAL EXPENSES
const totalExpense =
expenses.reduce(

(sum,item)=>

sum + Number(item.amount),

0

);



// MONTHLY SAVINGS
const totalGoalSaving =
goals.reduce(

(sum,item)=>

sum + Number(item.monthlySaving),

0

);



// FINAL BALANCE
const currentBalance =
totalIncome
-
totalExpense
-
totalGoalSaving;

console.log("====== WALLET ======");

console.log("Income Doc:", income);

console.log("Expense Docs:", expenses);

console.log("Goal Docs:", goals);

console.log("Total Income:", totalIncome);

console.log("Total Expense:", totalExpense);

console.log("Total Goal:", totalGoalSaving);

console.log("Final Balance:", currentBalance);

console.log("====================");


let wallet =
await Wallet.findOne({

owner:userId

});


if(!wallet){

wallet =
new Wallet({

owner:userId

});

}


wallet.currentBalance =
currentBalance;

await wallet.save();


return wallet;

};