import { z } from "zod";

// Define a schema for a game session

export const gameSessionSchema = z
  .object({
    id: z.string(),
    playerCount: z.preprocess(
      (value) => Number(value),
      z.number().int().min(2, { message: "Must have at least 2 players" })
    ),
    winnerId: z.string().min(1, { message: "Must select a winner" }),
    date: z.string().date(),
    villains: z
      .array(z.string())
      .min(1, { message: "Must have at least 2 villains" }),
  })
  .refine((data) => data.villains.includes(data.winnerId), {
    message: "Winner must be one of the villains",
    path: ["winnerId"],
  })
  .refine((data) => data.villains.length === data.playerCount, {
    message: "Must have a villain for each player",
    path: ["villains"],
  });

export type TGameSessionSchema = z.infer<typeof gameSessionSchema>;

// Define a schema for a villain

export const villainSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    wins: z.number().int(),
    losses: z.number().int(),
    imageUrl: z.string().url(),
  })
  .refine((data) => data.wins >= 0 && data.losses >= 0, {
    message: "Wins and losses must be positive integers",
  });

export type TVillainSchema = z.infer<typeof villainSchema>;
