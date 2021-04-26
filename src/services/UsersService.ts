import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";

interface IUsersCreate {
  email: string;
}

class UsersService {
  usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  async create({ email }: IUsersCreate) {
    const isAlreadyUser = await this.usersRepository.findOne({ email });

    if (isAlreadyUser) {
      throw new Error("User already exists");
    }

    const user = await this.usersRepository.create({ email });

    await this.usersRepository.save(user);
    
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }
}

export { UsersService };
