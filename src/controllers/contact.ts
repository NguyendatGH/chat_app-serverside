import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {generic500Error} from "../utils/constants";

class ContactController {
  constructor(private prisma: PrismaClient) {}

  async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const MyId = req.user?.id as number;
      // console.log("get contact / log from Contact controller:  ", MyId)
      const contacts = await this.prisma.contact.findMany({
        where: {userId: MyId},
        orderBy: {createdAt: "asc"},
      });
      // console.log("contacts: ", contacts)
       res.status(200).json({contacts});
    } catch (error) {
       generic500Error(res, error);
    }
  }

  async createContact(req: Request, res: Response): Promise<void> {
    try {
      const MyId = req.user?.id as number;
      const {username}: {username: string} = req.body;

      // check if there is a user with the given username
      const relatedUser = await this.prisma.user.findUnique({where: {username}});
      // console.log("relatedUser: ", relatedUser);
      
      if (!relatedUser) {
        // console.log("could not find related contact")
       res.status(404).json({message: "Could not find related contact"});
       return;
      }

      // check if the username is actually my user
      if (relatedUser.id === MyId) {
         res.status(400).json({message: "Cannot add yourself as a contact"});
         return;
      }

      // check if the I already have this contact
      const isContactExists = await this.prisma.contact.findFirst({
        where: {userId: MyId, username},
      });

      if (isContactExists) {
        //  console.log("contact exits")
         res.status(400).json({message: "Contact already exists"});
         return;
      }

      // is there already a conversation between my user and the contact
      const foundConversation = await this.prisma.conversation.findFirst({
        where: {participants: {hasEvery: [MyId, relatedUser.id]}},
      });

      // console.log("found conversation/ be: ",foundConversation)

      // this flow is going to run if conversation exists
      if (foundConversation) {
        const contact = await this.newContact({
          userId: MyId,
          username,
          photo: relatedUser.photo,
          conversationId: foundConversation.id,
        });
        // console.log("new conversastion");
         res.status(201).json({message: "New contact created", contact});
         return;
      }

      // this flow is going to run if the conversation does not exists
      const conversation = await this.newConversation([MyId, relatedUser.id]);
      const contact = await this.newContact({
        userId: MyId,
        username,
        photo: relatedUser.photo,
        conversationId: conversation.id,
      });

       res.status(201).json({message: "New contact created", contact});
       return;
    } catch (error) {
       generic500Error(res, error);
       return;
    }
  }

  async newContact({
    userId,
    username,
    photo,
    conversationId,
  }: {
    userId: number;
    username: string;
    photo: string;
    conversationId: number;
  }) {
    return await this.prisma.contact.create({
      data: {
        userId,
        username,
        photo,
        conversationId,
      },
    });
  }

  async newConversation(idArray: number[]) {
    return await this.prisma.conversation.create({
      data: {
        participants: idArray,
      },
    });
  }
}

export default ContactController;
