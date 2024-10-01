import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || "5000";
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/", []);


server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})