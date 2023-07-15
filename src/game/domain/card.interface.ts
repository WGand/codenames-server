import { Team } from "./team.enum";

export interface Card {
  id: number;
  word: string;
  team: Team;
  visible: boolean;
  selected: boolean;
  coordinates: string;
}

  