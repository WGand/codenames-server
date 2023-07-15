import { Controller, Get, Inject } from "@nestjs/common";
import { MyWebSocketGateway } from "./websocket.gateway";
import { Socket } from "socket.io";

@Controller("v0/game")
export class GameController {
  constructor(
    @Inject(MyWebSocketGateway) private readonly gateway: MyWebSocketGateway
  ) {}

  @Get("/")
  sendMessage() {
    const s: Socket = null;
    this.gateway.handleCreateBoard(s, "test");
    return "Message sent";
  }
}
