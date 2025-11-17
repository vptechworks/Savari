import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(express.json());

//routes import 
import userRoutes from "./routes/user.routes.js"
import otpRoutes from "./routes/otp.routes.js"
//routes declaration
app.use("/api/user",userRoutes);
app.use("/api/otp",otpRoutes);

export default app;