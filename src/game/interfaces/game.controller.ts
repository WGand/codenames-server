import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { GameService } from '../application/game.service';
import { Board } from '../domain/board.interface';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE_PATH = path.resolve(__dirname, '../../../src/data/boards.json');

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('boards')
  getBoards(): Board[] {
    const data = this.loadBoardsData();
    return data.boards;
  }

  @Post('boards')
  createBoard(@Body() body: { name: string }): Board {
    const board = this.gameService.createBoard(body.name);
    this.addBoardToData(board);
    return board;
  }

  @Put('boards/:gameId/cards/:cardId')
  selectCard(
    @Param('gameId') gameId: string,
    @Param('cardId') cardId: number,
  ): void {
    this.gameService.selectCard(gameId, cardId);
    this.gameService.changeTurn(gameId);
  }

  @Put('boards/:gameId/clue')
  validateClue(
    @Param('gameId') gameId: string,
    @Body() body: { clue: string; number: number },
  ): void {
    const { clue, number } = body;
    const isValid = this.gameService.validateClue(gameId, clue, number);
    if (!isValid) {
      throw new Error('Invalid clue');
    }
    this.gameService.changeTurn(gameId);
  }

  private loadBoardsData(): { boards: Board[] } {
    try {
      const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(fileContents);
    } catch (error) {
      return { boards: [] };
    }
  }

  private saveBoardsData(data: { boards: Board[] }): void {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
  }

  private addBoardToData(board: Board): void {
    const data = this.loadBoardsData();
    data.boards.push(board);
    this.saveBoardsData(data);
  }
}
