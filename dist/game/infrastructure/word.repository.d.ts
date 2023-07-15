import { Word } from "../domain/word.interface";
export declare class WordRepository {
    private readonly filePath;
    private words;
    constructor();
    private loadWords;
    getRandomWords(count: number): Word[];
}
