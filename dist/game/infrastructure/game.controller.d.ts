import { MyWebSocketGateway } from "./websocket.gateway";
export declare class GameController {
    private readonly gateway;
    constructor(gateway: MyWebSocketGateway);
    sendMessage(): string;
}
