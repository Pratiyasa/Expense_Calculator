import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(cors({
 origin: "http://localhost:5173",
 credentials: true,
 methods: ["GET","POST","PUT","DELETE","PATCH"],
 allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.get("/", (req, res) => {
 res.send("Backend working");
});
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use( "/api/v1/auth", authRoutes)

export default app

//