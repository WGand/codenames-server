import { Board } from './board.interface';
export declare class Game {
    private currentTeam;
    private board;
    private teamCards;
    constructor(board: Board);
    selectCard(cardId: number): void;
    validateClue(clue: string, number: number): boolean;
    changeTurn(): void;
}
