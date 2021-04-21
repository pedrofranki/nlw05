import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from '../entities/Message'

interface IMessagesCreate {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>

  constructor(){
      this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: IMessagesCreate) {

    const message = await this.messagesRepository.create({
      admin_id,
      user_id,
      text,
    });

    this.messagesRepository.save(message);

    return message;
  }

  async listByUSer(user_id: string) {

    const list = await this.messagesRepository.find({
      where: {user_id},
      relations: ["user"]
    });

    return list;
  }
}

export { MessagesService };
