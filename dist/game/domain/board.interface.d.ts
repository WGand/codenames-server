import { Card } from "./card.interface";
export interface Board {
    id: string;
    name: string;
    cards: Card[];
}
