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
exports.MyWebSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const game_service_1 = require("../application/game.service");
const common_1 = require("@nestjs/common");
let MyWebSocketGateway = exports.MyWebSocketGateway = class MyWebSocketGateway {
    constructor(gameService) {
        this.gameService = gameService;
    }
    handleCreateBoard(client, name) {
        const board = this.gameService.createBoard(name);
        this.server.emit("boardCreated", board);
        console.log(board);
        console.log(name);
    }
    handleSelectCard(client, data) {
        const { gameId, cardId } = data;
        this.gameService.selectCard(gameId, cardId);
        this.server.emit("cardSelected", { gameId, cardId });
    }
    handleValidateClue(client, data) {
        const { gameId, clue, number } = data;
        const isValid = this.gameService.validateClue(gameId, clue, number);
        this.server.emit("clueValidated", { gameId, isValid });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyWebSocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("createBoard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], MyWebSocketGateway.prototype, "handleCreateBoard", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("selectCard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyWebSocketGateway.prototype, "handleSelectCard", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("validateClue"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyWebSocketGateway.prototype, "handleValidateClue", null);
exports.MyWebSocketGateway = MyWebSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, common_1.Inject)(game_service_1.GameService)),
    __metadata("design:paramtypes", [game_service_1.GameService])
], MyWebSocketGateway);
//# sourceMappingURL=websocket.gateway.js.map