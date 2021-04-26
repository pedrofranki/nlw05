import { serverHttp, serverSocket } from "./http";
import './websocket/client'

serverHttp.listen(3333, () => console.log("Server rodando top"));
