"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const team_enum_1 = require("./team.enum");
class Game {
    constructor(board) {
        this.currentTeam = team_enum_1.Team.RED;
        this.teamCards = {};
        this.board = board;
        this.teamCards[team_enum_1.Team.RED] = [];
        this.teamCards[team_enum_1.Team.BLUE] = [];
    }
    selectCard(cardId) {
        const card = this.board.cards.find((c) => c.id === cardId);
        if (card && !card.selected && !card.visible) {
            card.visible = true;
            card.selected = true;
            if (card.team !== this.currentTeam) {
                this.changeTurn();
            }
        }
    }
    validateClue(clue, number) {
        return true;
    }
    changeTurn() {
        this.currentTeam = this.currentTeam === team_enum_1.Team.RED ? team_enum_1.Team.BLUE : team_enum_1.Team.RED;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map