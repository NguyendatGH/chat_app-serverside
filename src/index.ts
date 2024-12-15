import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import contactRoutes from "./routes/contact";
import conversationRoutes from "./routes/conversation";
import { PrismaClient } from "@prisma/client";
import WebSocket from "./controllers/socket";

dotenv.config();

const app = express();
const port = process.env.PORT || "5000";
const server = http.createServer(app);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", [authRouter, contactRoutes, conversationRoutes]);

const io = new Server(server, {
  cors: {
    origin:  ["http://localhost:3000", "http://127.0.0.1:3000"], // react running on this port
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const webSocket = new WebSocket(socket, prisma);
  const myID = socket.handshake.query.userId;

  const transportType = socket.conn.transport.name;
  console.log(`new connection : ${socket.id}, Transport type: ${transportType}`)

  webSocket.connection(myID);
  console.log("socketid: ", socket.id);

  socket.on("login", async (userId: string) => {
    if (userId) {
      console.log(`User logged in successfully with ID: ${userId}`);
      
    }
    await webSocket.login(userId);
  });

  socket.on("logout", (userId: string) => webSocket.logout(userId));
  socket.on("message", ({ message, conversation, myUserId }) => {
    console.log("message");
    webSocket.message(message, conversation, myUserId);
  });

  socket.on("disconnect", (reason) => webSocket.disconnection(reason, myID));
  socket.on("conversationChange", ({ conversation, myUserId }) =>
    webSocket.conversationChange(conversation, myUserId)
  );
});


server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
