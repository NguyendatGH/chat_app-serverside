import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const onlineUser = new Map();

class WebSocket {
  constructor(private socket: Socket, private prisma: PrismaClient) {

  }

  connection() {}
  disconnection() {}
  login() {}
  logout() {}

  async message(){

  }
  async conversationChange(){

  }
}
export default WebSocket;