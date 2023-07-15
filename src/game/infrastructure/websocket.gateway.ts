import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "../application/game.service";
import { Inject } from "@nestjs/common";

@WebSocketGateway()
export class MyWebSocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(GameService)
    private readonly gameService: GameService
  ) {}

  @SubscribeMessage("createBoard")
  handleCreateBoard(client: Socket, name: string): void {
    const board = this.gameService.createBoard(name);
    this.server.emit("boardCreated", board);
    console.log(board)
    console.log(name)
  }

  @SubscribeMessage("selectCard")
  handleSelectCard(
    client: Socket,
    data: { gameId: string; cardId: number }
  ): void {
    const { gameId, cardId } = data;
    this.gameService.selectCard(gameId, cardId);
    this.server.emit("cardSelected", { gameId, cardId });
  }

  @SubscribeMessage("validateClue")
  handleValidateClue(
    client: Socket,
    data: { gameId: string; clue: string; number: number }
  ): void {
    const { gameId, clue, number } = data;
    const isValid = this.gameService.validateClue(gameId, clue, number);
    this.server.emit("clueValidated", { gameId, isValid });
  }
}
