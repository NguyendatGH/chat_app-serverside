import { Request, Response } from "express";
import { PrismaClient, Conversation } from "@prisma/client";
import { generic500Error } from "../utils/constants";

class ConversationController {
  constructor(private prisma: PrismaClient) {}

  async getConversation(req: Request, res: Response): Promise<void> {
    try {
      const myId = req.user?.id as number;
      const conversationId = Number(req.params?.id);

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


      if (!conversation) {
       
        res.status(400).json({ message: "could not find the conversation" });
        return;
      }

      if (!this.isMyConversation(myId, conversation)) {
        
        res.status(401).json({ message: "no access to this conversation!" });
        return;
      }
      res.status(200).json({ conversation });

      return;
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const myId = req.user?.id as number;
      const { text, conversationId }: { text: string; conversationId: number } =
        req.body;

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

  async clearAllMessage(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Conversation ID is required." });
    }

    try {
      const conversationId = parseInt(id, 10);

      await this.prisma.message.deleteMany({
        where: { conversationId },
      });

      res.status(200).json({ message: "Conversation reset successfully." });
    } catch (error) {
      console.error("Error resetting conversation:", error);
      res.status(500).json({ message: "Failed to reset conversation." });
    }
  }
  isMyConversation(id: number, conversation: Conversation) {
    return conversation.participants.includes(id);
  }
}
export default ConversationController;
