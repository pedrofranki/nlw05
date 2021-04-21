import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
  email: string;
}

class UsersService {
  async create({ email }: IUsersCreate) {
    const usersRepository = getCustomRepository(UsersRepository);

    const isAlreadyUser = await usersRepository.findOne({ email });
    console.log(isAlreadyUser)
    if (isAlreadyUser) {
      throw new Error("User already exists");
    }

    const user = await usersRepository.create({ email });

    usersRepository.save(user);
    console.log(user);
    return user;
  }
}

export { UsersService };
