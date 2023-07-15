"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("../application/game.service");
const fs = require("fs");
const path = require("path");
const DATA_FILE_PATH = path.resolve(__dirname, '../../../src/data/boards.json');
let GameController = exports.GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    getBoards() {
        const data = this.loadBoardsData();
        return data.boards;
    }
    createBoard(body) {
        const board = this.gameService.createBoard(body.name);
        this.addBoardToData(board);
        return board;
    }
    selectCard(gameId, cardId) {
        this.gameService.selectCard(gameId, cardId);
        this.gameService.changeTurn(gameId);
    }
    validateClue(gameId, body) {
        const { clue, number } = body;
        const isValid = this.gameService.validateClue(gameId, clue, number);
        if (!isValid) {
            throw new Error('Invalid clue');
        }
        this.gameService.changeTurn(gameId);
    }
    loadBoardsData() {
        try {
            const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
            return JSON.parse(fileContents);
        }
        catch (error) {
            return { boards: [] };
        }
    }
    saveBoardsData(data) {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
    }
    addBoardToData(board) {
        const data = this.loadBoardsData();
        data.boards.push(board);
        this.saveBoardsData(data);
    }
};
__decorate([
    (0, common_1.Get)('boards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], GameController.prototype, "getBoards", null);
__decorate([
    (0, common_1.Post)('boards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GameController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Put)('boards/:gameId/cards/:cardId'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "selectCard", null);
__decorate([
    (0, common_1.Put)('boards/:gameId/clue'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "validateClue", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map