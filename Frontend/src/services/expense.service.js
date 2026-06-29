import api from "../api/axios";


export const getExpenses = async () => {

const res =
await api.get(
"/expenses"
);

return res.data;

};



export const createExpense =
async(data)=>{

const res =
await api.post(
"/expenses",
data
);

return res.data;

};



export const deleteExpense =
async(id)=>{

const res =
await api.delete(
`/expenses/${id}`
);

return res.data;

};



export const getExpenseById =
async(id)=>{

const res =
await api.get(
`/expenses/${id}`
);

return res.data;

};



export const updateExpense =
async(id,data)=>{

const res =
await api.put(
`/expenses/${id}`,
data
);

return res.data;

};