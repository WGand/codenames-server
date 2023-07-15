"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
const game_service_1 = require("../application/game.service");
const word_repository_1 = require("./word.repository");
const game_controller_1 = require("../interfaces/game.controller");
let GameModule = exports.GameModule = class GameModule {
};
exports.GameModule = GameModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [game_controller_1.GameController],
        providers: [game_service_1.GameService, word_repository_1.WordRepository, websocket_gateway_1.MyWebSocketGateway],
    })
], GameModule);
//# sourceMappingURL=game.module.js.map