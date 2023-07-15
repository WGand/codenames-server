import { Module } from "@nestjs/common";
import { MyWebSocketGateway } from "./websocket.gateway";
import { GameService } from "../application/game.service";
import { WordRepository } from "./word.repository";
import { GameController } from "../interfaces/game.controller";

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, WordRepository, MyWebSocketGateway],
})
export class GameModule {}
