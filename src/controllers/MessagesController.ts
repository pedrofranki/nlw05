import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, user_id, text } = request.body;
    const messagesServices = new MessagesService();

    try {
      const message = await messagesServices.create({
        admin_id,
        user_id,
        text,
      });

      return response.json(message);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesServices = new MessagesService();

    const messageList = await messagesServices.listByUSer(id);

    return response.json(messageList)
    
  }
}

export { MessagesController };
