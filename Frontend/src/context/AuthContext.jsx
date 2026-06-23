import { createContext, useContext,useEffect,useState} from "react";
import { getCurrentUser} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

 const [user,setUser]= useState(null);

 useEffect(()=>{

  const loadUser = async()=>{
                  try{
                    const res =await getCurrentUser();
                    console.log("CURRENT USER:", res);
                    setUser(res); }

                  catch{ setUser(null); }
 };
  loadUser();
 },[]);

 return(<AuthContext.Provider value={{ user, setUser}}>{children}</AuthContext.Provider>);

};

export const useAuth =()=>useContext(  AuthContext );




/*
(workflow when the page is visited and the user is still logged in)
Open website
↓
AuthProvider loads  (main.jsx)
↓
GET /auth/current-user
↓
Browser sends cookies (to backend)
↓
verifyJWT  (middleware)
↓
req.user  
↓
setUser()
↓
Dashboard knows user*/



/*
(workflow when user is set after manually logging in)
main.jsx → calls AuthProvider
AuthProvider → provides auth state  (just makes useState/space)
useAuth() → auth states can be used anywhere in the app  (login page setUser then other components in frontend access it)

Think of AuthProvider as putting a shared auth box around your whole application.*/