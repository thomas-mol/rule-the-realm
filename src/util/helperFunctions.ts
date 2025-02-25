import { TVillainSchema } from "../schemas";

export function getWinrate(villain: TVillainSchema) {
  const totalGames = villain.wins + villain.losses;
  const winrate = (villain.wins / totalGames) * 100;
  return totalGames === 0 ? 0 : Number(winrate.toFixed(1));
}

export function getTransformedImage(url: string, options: string = "") {
  return url.replace("/upload/", `/upload/${options}/`);
}
