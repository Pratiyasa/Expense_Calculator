import api from "../api/axios";

export const updateProfile =
async(data)=>{

const res =
await api.put(
"/auth/update-profile",
data
);

return res.data;

};