import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/db.js"


dotenv.config()

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{    //main thing 
        
             console.log(`App is listening on PORT ${process.env.PORT}`)
         })
     app.on("error",(error)=>{
            console.log("error :",error)
            throw error
        })
}).catch((e)=>{
    console.log("Error :",e)
});
