import express, { request, response } from "express";
import { createServer } from 'http';
import { Server, Socket} from 'socket.io'
import { routes } from "./routes";
import "./database";
import path from 'path'

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/client", (request, response)=>{
    return response.render("html/client.html")
})

const serverHttp = createServer(app)
const serverSocket = new Server(serverHttp) 

serverSocket.on("connection", (socket: Socket)=> {
    console.log("showw", socket.id)
})

app.use(express.json())
app.use(routes);

export {serverHttp, serverSocket}