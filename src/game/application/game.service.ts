import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Board } from '../domain/board.interface';
import { Card } from '../domain/card.interface';
import { Team } from '../domain/team.enum';
import { Game } from '../domain/game';
import { WordRepository } from '../infrastructure/word.repository';

@Injectable()
export class GameService {
  private games: { [gameId: string]: Game } = {};

  constructor(private readonly wordRepository: WordRepository) {}

  createBoard(name: string): Board {
    const words = this.wordRepository.getRandomWords(16);
    const cards: Card[] = words.map((word, index) => ({
      id: word.id,
      word: word.value,
      team: this.getCardTeam(index),
      visible: false,
      selected: false,
      coordinates: this.generateCoordinates(index),
    }));

    const board: Board = {
      id: uuid(),
      name,
      cards,
    };
    const game = new Game(board);
    this.games[board.id] = game;
    return board;
  }

  private getCardTeam(index: number): Team {
    return index < 8 ? Team.RED : Team.BLUE;
  }

  private generateCoordinates(index: number): string {
    const row = String.fromCharCode(65 + Math.floor(index / 4));
    const column = String.fromCharCode(49 + (index % 4));
    return row + column;
  }

  selectCard(gameId: string, cardId: number): void {
    const game = this.games[gameId];
    if (game) {
      game.selectCard(cardId);
    }
  }

  validateClue(gameId: string, clue: string, number: number): boolean {
    const game = this.games[gameId];
    if (game) {
      return game.validateClue(clue, number);
    }
    return false;
  }

  changeTurn(gameId: string): void {
    const game = this.games[gameId];
    if (game) {
      game.changeTurn();
    }
  }
}
