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
const websocket_gateway_1 = require("./websocket.gateway");
let GameController = exports.GameController = class GameController {
    constructor(gateway) {
        this.gateway = gateway;
    }
    sendMessage() {
        const s = null;
        this.gateway.handleCreateBoard(s, "test");
        return "Message sent";
    }
};
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameController.prototype, "sendMessage", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)("v0/game"),
    __param(0, (0, common_1.Inject)(websocket_gateway_1.MyWebSocketGateway)),
    __metadata("design:paramtypes", [websocket_gateway_1.MyWebSocketGateway])
], GameController);
//# sourceMappingURL=game.controller.js.map