import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import checkAuth from './routes/checkAuth.js'
import verify from './routes/verify.js'
import morgan from 'morgan';

const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"))

app.use("/api/register", userRoutes);
app.use("/api/login", authRoutes);
app.use('/api/check-auth',checkAuth);
app.use('/api/verification',verify)

const PORT = process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})