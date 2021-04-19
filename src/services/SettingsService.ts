import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  async create({ chat, username }: ISettingsCreate) {
    const settingRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = settingRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User Already exists");
    }

    const setting = settingRepository.create({
      username,
      chat,
    });

    settingRepository.save(setting);

    return setting;
  }
}

export { SettingsService };
