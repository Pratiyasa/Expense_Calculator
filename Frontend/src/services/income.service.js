import api from "../api/axios";

export const getIncome = async () => {
const res =
await api.get("/income");

return res.data;
};

export const saveIncome = async (data) => {
const res =
await api.post(
"/income",
data
);

return res.data;
};