import { useQuery } from "@tanstack/react-query";
import { TVillainSchema } from "../../schemas";
import VillainAPI from "../client/villainApi";

const api = VillainAPI.getInstance();

export const useVillains = () => {
  return useQuery<TVillainSchema[], Error>({
    queryKey: ["villains"],
    queryFn: () => api.getAll(),
  });
};
