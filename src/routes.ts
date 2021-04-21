import { Router } from "express";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from './controllers/UsersController'
import { MessagesController } from './controllers/MessagesController'
 
const routes = Router();

const settingsController = new SettingsController();
const userController = new UsersController()
const messageController = new MessagesController()

routes.post("/settings", settingsController.create);
routes.post("/users", userController.create)
routes.post("/messages", messageController.create)
routes.get("/messages/:id", messageController.showByUser)


export { routes };
