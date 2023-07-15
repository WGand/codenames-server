import { Board } from '../domain/board.interface';
import { WordRepository } from '../infrastructure/word.repository';
export declare class GameService {
    private readonly wordRepository;
    private games;
    constructor(wordRepository: WordRepository);
    createBoard(name: string): Board;
    private getCardTeam;
    private generateCoordinates;
    selectCard(gameId: string, cardId: number): void;
    validateClue(gameId: string, clue: string, number: number): boolean;
    changeTurn(gameId: string): void;
}
