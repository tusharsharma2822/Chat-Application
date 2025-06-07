import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

connectToDB();            

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

export default app;