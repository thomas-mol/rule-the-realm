import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TGameSessionSchema } from "../../schemas";
import GameAPI from "../client/gameApi";

const api = GameAPI.getInstance();

export const useGames = () => {
  return useQuery<TGameSessionSchema[], Error>({
    queryKey: ["games"],
    queryFn: () => api.getAll(),
  });
};

export const useAddGame = () => {
  const queryClient = useQueryClient();
  return useMutation<TGameSessionSchema, Error, TGameSessionSchema>({
    mutationFn: (game) => api.addGame(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["villains"] });
    },
  });
};
