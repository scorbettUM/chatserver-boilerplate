import { Server as SocketIOServer } from "socket.io";
import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
// import { ChatEvent } from "../constants/chat";
// import { Message } from "../types/chat";
// import { User } from "../types/user";
import { UserServiceClient } from "./UserServiceClient";
import { RoomServiceClient } from "./RoomServiceClient";


export class ChatService {
    public static readonly PORT: number = 8000;
    private _app: express.Application;
    private server: Server;
    private io: SocketIOServer;
    private port: string | number;
    private userClient: UserServiceClient;
    private roomClient: RoomServiceClient;

    constructor(){
        this._app = express();

        this.port = process.env.PORT || ChatService.PORT;

        this._app.use(cors());
        this.server = createServer(this._app);
        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
          });

        this.userClient = new UserServiceClient();
        this.roomClient = new RoomServiceClient();
    }

    

    async listen (): Promise<void> {
        await this.server.listen(this.port);
        // TODO: write chat events.

    }

    get app(): express.Application {
        return this._app;
    }

}