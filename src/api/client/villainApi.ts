import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "../../config/firebase";
import APIClient from "./apiClient";
import { TVillainSchema } from "../../schemas";

class VillainAPI extends APIClient<TVillainSchema> {
  private static _instance: VillainAPI;

  private constructor() {
    super("villains");
  }

  static getInstance(): VillainAPI {
    if (!VillainAPI._instance) {
      VillainAPI._instance = new VillainAPI();
    }
    return VillainAPI._instance;
  }

  async updateStats(villainId: string, won: boolean): Promise<void> {
    await updateDoc(doc(db, this.collectionRef, villainId), {
      wins: increment(won ? 1 : 0),
      losses: increment(won ? 0 : 1),
    });
  }
}

export default VillainAPI;
