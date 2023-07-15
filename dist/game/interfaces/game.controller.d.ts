import { GameService } from '../application/game.service';
import { Board } from '../domain/board.interface';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getBoards(): Board[];
    createBoard(body: {
        name: string;
    }): Board;
    selectCard(gameId: string, cardId: number): void;
    validateClue(gameId: string, body: {
        clue: string;
        number: number;
    }): void;
    private loadBoardsData;
    private saveBoardsData;
    private addBoardToData;
}
