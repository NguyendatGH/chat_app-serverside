import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import contactRoutes from "./routes/contact";
import conversationRoutes from "./routes/conversation";

dotenv.config();

const app = express();
const port = process.env.PORT || "5000";
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", [authRouter, contactRoutes, conversationRoutes]);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000", // react running on this port
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket);
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
