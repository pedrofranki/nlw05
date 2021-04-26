import { serverSocket } from "../http";
import { ConnectionService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams {
  text: string
  email: string
}

serverSocket.on("connect", (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UsersService();
  const messageService = new MessagesService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;

    let user_id = null;

    const { text, email } = params as IParams;

    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create({ email });

      await connectionService.create({
        socket_id,
        user_id: user.id,
      });
      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionService.findByUserID(userExists.id);

      if (!connection) {
        connectionService.create({ socket_id, user_id: userExists.id });
      } else {
        connection.socket_id = socket_id;
        await connectionService.create(connection);
      }
    }

    await messageService.create({
      user_id,
      text,
    });
  });
});
