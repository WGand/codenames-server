import { Board } from './board.interface';
import { Card } from './card.interface';
import { Team } from './team.enum';

export class Game {
  private currentTeam: Team = Team.RED;
  private board: Board;
  private teamCards: { [team: string]: Card[] } = {};

  constructor(board: Board) {
    this.board = board;
    this.teamCards[Team.RED] = [];
    this.teamCards[Team.BLUE] = [];
  }

  selectCard(cardId: number): void {
    const card = this.board.cards.find((c) => c.id === cardId);
    if (card && !card.selected && !card.visible) {
      card.visible = true;
      card.selected = true;
      if (card.team !== this.currentTeam) {
        this.changeTurn();
      }
    }
  }

  validateClue(clue: string, number: number): boolean {
    // Lógica para validar la pista dada por el spymaster
    // Retorna true si la pista es válida, false en caso contrario
    // Implementa tu lógica de validación personalizada aquí
    return true;
  }

  changeTurn(): void {
    this.currentTeam = this.currentTeam === Team.RED ? Team.BLUE : Team.RED;
  }
}
