import { TGameSessionSchema } from "../../schemas";
import APIClient from "./apiClient";
import VillainAPI from "./villainApi";

class GameAPI extends APIClient<TGameSessionSchema> {
  private static _instance: GameAPI;

  private constructor() {
    super("games");
  }

  static getInstance(): GameAPI {
    if (!GameAPI._instance) {
      GameAPI._instance = new GameAPI();
    }
    return GameAPI._instance;
  }

  async addGame(game: TGameSessionSchema): Promise<TGameSessionSchema> {
    const savedGame = await this.add(game);

    const villainAPI = VillainAPI.getInstance();
    for (let id of game.villains) {
      await villainAPI.updateStats(id, id === game.winnerId);
    }

    return savedGame;
  }
}

export default GameAPI;
