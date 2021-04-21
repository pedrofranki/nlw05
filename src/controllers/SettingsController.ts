import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const setting = await settingsService.create({ chat, username });

      return response.json(setting);
    } catch (e) {
      return response.status(400).json({
        message: e.message,
      });
    }
  }
}

export { SettingsController };
