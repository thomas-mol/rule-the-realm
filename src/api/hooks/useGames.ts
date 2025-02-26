import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TGameSessionSchema } from "../../schemas";
import GameAPI from "../client/gameApi";

const api = GameAPI.getInstance();

export const useGames = () => {
  return useQuery<TGameSessionSchema[], Error>({
    queryKey: ["games"],
    queryFn: () => api.getAll(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useAddGame = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TGameSessionSchema,
    Error,
    TGameSessionSchema,
    { prevGames?: TGameSessionSchema[] }
  >({
    mutationFn: (game) => api.addGame(game),
    onMutate: async (game) => {
      await queryClient.cancelQueries({ queryKey: ["games"] });

      const prevGames = queryClient.getQueryData<TGameSessionSchema[]>([
        "games",
      ]);

      queryClient.setQueryData<TGameSessionSchema[]>(
        ["games"],
        (oldGames = []) => [...oldGames, { ...game, id: "temp-id" }]
      );
      return { prevGames };
    },
    onError: (error, __, context) => {
      console.error(error);

      if (context?.prevGames) {
        queryClient.setQueryData(["games"], context.prevGames);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["villains"] });
    },
  });
};
