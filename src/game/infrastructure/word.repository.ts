import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { Word } from "../domain/word.interface";

@Injectable()
export class WordRepository {
  private readonly filePath: string = path.resolve(
    __dirname,
    "../../../src/data/words.json"
  );

  private words: Word[] = [];

  constructor() {
    this.loadWords();
  }

  private loadWords(): void {
    const fileContents = fs.readFileSync(this.filePath, "utf-8");
    const { words } = JSON.parse(fileContents);
    this.words = words.map((word: string, index: number) => ({
      id: index + 1,
      value: word,
    }));
  }

  getRandomWords(count: number): Word[] {
    const shuffledWords = this.words.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, count);
  }
}
