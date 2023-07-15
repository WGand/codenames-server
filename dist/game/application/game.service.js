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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const team_enum_1 = require("../domain/team.enum");
const game_1 = require("../domain/game");
const word_repository_1 = require("../infrastructure/word.repository");
let GameService = exports.GameService = class GameService {
    constructor(wordRepository) {
        this.wordRepository = wordRepository;
        this.games = {};
    }
    createBoard(name) {
        const words = this.wordRepository.getRandomWords(16);
        const cards = words.map((word, index) => ({
            id: word.id,
            word: word.value,
            team: this.getCardTeam(index),
            visible: false,
            selected: false,
            coordinates: this.generateCoordinates(index),
        }));
        const board = {
            id: (0, uuid_1.v4)(),
            name,
            cards,
        };
        const game = new game_1.Game(board);
        this.games[board.id] = game;
        return board;
    }
    getCardTeam(index) {
        return index < 8 ? team_enum_1.Team.RED : team_enum_1.Team.BLUE;
    }
    generateCoordinates(index) {
        const row = String.fromCharCode(65 + Math.floor(index / 4));
        const column = String.fromCharCode(49 + (index % 4));
        return row + column;
    }
    selectCard(gameId, cardId) {
        const game = this.games[gameId];
        if (game) {
            game.selectCard(cardId);
        }
    }
    validateClue(gameId, clue, number) {
        const game = this.games[gameId];
        if (game) {
            return game.validateClue(clue, number);
        }
        return false;
    }
    changeTurn(gameId) {
        const game = this.games[gameId];
        if (game) {
            game.changeTurn();
        }
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [word_repository_1.WordRepository])
], GameService);
//# sourceMappingURL=game.service.js.map