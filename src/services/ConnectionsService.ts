import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { Repository, getCustomRepository } from "typeorm";
import { Connection } from "../entities/Connection";

interface ICreateConnecion {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ socket_id, user_id, admin_id, id }: ICreateConnecion) {
    const connection = await this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserID(user_id: string) {
    return this.connectionRepository.findOne({ user_id });
  }
}

export { ConnectionService };
