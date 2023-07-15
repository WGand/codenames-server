import { Server, Socket } from "socket.io";
import { GameService } from "../application/game.service";
export declare class MyWebSocketGateway {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    handleCreateBoard(client: Socket, name: string): void;
    handleSelectCard(client: Socket, data: {
        gameId: string;
        cardId: number;
    }): void;
    handleValidateClue(client: Socket, data: {
        gameId: string;
        clue: string;
        number: number;
    }): void;
}
