import { Request, Response } from "express";
import { PrismaClient, Conversation } from "@prisma/client";
import { generic500Error } from "../utils/constants";

class ConversationController {
  constructor(private prisma: PrismaClient) {}

  async getConversation(req: Request, res: Response) :Promise<void>  {
    try {
      const myId = req.user?.id as number;
      const conversationId = Number(req.params?.id);

      console.log("---be logggin--- at conversation controller." )
      console.log("user id: ", myId);
      console.log("conversationId", conversationId);

      if (typeof conversationId !== "number") {
        res.status(400).json({ message: "conversation id is not a number!" });
        return;
      }

      const conversation = await this.prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      });
      console.log("conversation/ be/ controller: ", conversation)

      if (!conversation) {
        console.log("cannot find to conversation / conversation controller / be")
        res.status(400).json({ message: "could not find the conversation" });
        return;
      }

      if (!this.isMyConversation(myId, conversation)) {
        console.log("cannot access to conversation / conversation controller / be")
        res.status(401).json({ message: "no access to this conversation!" });
        return;
      }
      res.status(200).json({conversation});
      return ;
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async createMessage(req: Request, res: Response) : Promise<void>  {
    try {
      const myId = req.user?.id as number;
      const { text, conversationId }: { text: string; conversationId: number } = req.body;


      const conversation = await this.prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });
      if (!conversation) {
        res.status(404).json({ message: "not found the conversation" });
        return;
      }
      if (!this.isMyConversation(myId, conversation)) {
        res.status(401).json({ message: "no access to this conversation!" });
        return;
      }

      const newMessage = await this.prisma.message.create({
        data: {
          from: myId,
          text,
          conversationId,
        },
      });
      res.status(201).json({ message: newMessage });
      return;

    } catch (error) {
      generic500Error(res, error);
    }
  }
  isMyConversation(id: number, conversation: Conversation) {
    return conversation.participants.includes(id);
  }
}
export default ConversationController;
